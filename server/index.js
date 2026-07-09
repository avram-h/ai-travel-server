const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();

// ========== 速率限制（防止 API 滥用） ==========
const rateLimit = require('express-rate-limit');
const guideLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { code: -1, message: '请求太频繁，请1分钟后再试' }
});
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========== 加载旅行攻略知识库 ==========
const travelKB = JSON.parse(require('fs').readFileSync(path.join(__dirname, 'travel-knowledge.json'), 'utf-8'));
const PROVINCE_NAMES = Object.keys(travelKB.provinces);
const ALL_KB_KEYS = [...PROVINCE_NAMES, ...Object.keys(travelKB.singleCity)];

// 模糊匹配知识库
function matchKB(destination) {
  for (const key of ALL_KB_KEYS) {
    if (destination.includes(key) || key.includes(destination)) {
      if (travelKB.provinces[key]) return { type: 'province', data: travelKB.provinces[key], key };
      if (travelKB.singleCity[key]) return { type: 'city', data: travelKB.singleCity[key], key };
    }
  }
  return null;
}

// 自动从 cloudbaserc.json 加载密钥（本地开发用）
let deepseekKey = process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEKKEY || '';
if (!deepseekKey) {
  try {
    const cloudbase = JSON.parse(require('fs').readFileSync(path.join(__dirname, '..', 'cloudbaserc.json'), 'utf-8'));
    const fn = (cloudbase.functions || []).find(f => f.envVariables && f.envVariables.DEEPSEEKKEY);
    if (fn) deepseekKey = fn.envVariables.DEEPSEEKKEY;
  } catch(e) {}
}
const DEEPSEEK_KEY = deepseekKey;
const PEXELS_KEY = process.env.PEXELS_KEY || 'DbVg0rpDtTLL0p1ObbpT1xTU5hauJv1ICFn7KPlnJTYv8UpiQPETyqPo';
const AMAP_KEY = process.env.AMAP_KEY || 'cb1a09a6eefa6c2cf56ca34f599a9a88';

// ========== 工具函数 ==========
const OVERSEAS = ['日本','泰国','韩国','新加坡','马来西亚','美国','英国','法国','德国','意大利','西班牙','澳大利亚','新西兰','加拿大','埃及','土耳其','迪拜','马尔代夫','巴厘岛','越南','柬埔寨','缅甸','老挝','尼泊尔','冰岛','瑞士','荷兰','印度','菲律宾','印度尼西亚','斯里兰卡','俄罗斯','巴西','阿根廷','墨西哥','南非','肯尼亚','摩洛哥','希腊','葡萄牙','捷克','奥地利','匈牙利','挪威','瑞典','芬兰','丹麦'];
function isOverseas(d) { return OVERSEAS.some(c => d.includes(c)); }
// 目的地标志性景点映射（中英文，英文用于 Pexels 图片搜索）
const LANDMARKS = {
  '日本': {zh:'富士山 东京塔', en:'Mount Fuji Tokyo Tower Japan'},
  '东京': {zh:'东京塔 浅草寺', en:'Tokyo Tower Sensoji Japan'},
  '大阪': {zh:'大阪城 道顿堀', en:'Osaka Castle Dotonbori Japan'},
  '京都': {zh:'金阁寺 伏见稻荷', en:'Kinkakuji Fushimi Inari Kyoto Japan'},
  '泰国': {zh:'大皇宫 普吉岛', en:'Grand Palace Phuket Thailand'},
  '曼谷': {zh:'大皇宫 卧佛寺', en:'Grand Palace Wat Pho Bangkok Thailand'},
  '普吉': {zh:'普吉岛海滩', en:'Phuket beach Thailand'},
  '韩国': {zh:'首尔塔 景福宫', en:'Namsan Tower Gyeongbokgung Seoul Korea'},
  '首尔': {zh:'首尔塔 景福宫 明洞', en:'Seoul Tower Gyeongbokgung Myeongdong Korea'},
  '新加坡': {zh:'滨海湾金沙 鱼尾狮', en:'Marina Bay Sands Merlion Singapore'},
  '马来西亚': {zh:'双子塔 兰卡威', en:'Petronas Twin Towers Langkawi Malaysia'},
  '吉隆坡': {zh:'双子塔', en:'Petronas Towers Kuala Lumpur Malaysia'},
  '美国': {zh:'自由女神 金门大桥', en:'Statue of Liberty Golden Gate Bridge USA'},
  '纽约': {zh:'自由女神 时代广场', en:'Statue of Liberty Times Square New York'},
  '洛杉矶': {zh:'好莱坞 圣莫尼卡', en:'Hollywood Santa Monica Los Angeles'},
  '英国': {zh:'大本钟 伦敦眼', en:'Big Ben London Eye United Kingdom'},
  '伦敦': {zh:'大本钟 伦敦塔桥', en:'Big Ben Tower Bridge London'},
  '法国': {zh:'埃菲尔铁塔 卢浮宫', en:'Eiffel Tower Louvre Paris France'},
  '巴黎': {zh:'埃菲尔铁塔 凯旋门', en:'Eiffel Tower Arc de Triomphe Paris'},
  '意大利': {zh:'斗兽场 威尼斯', en:'Colosseum Venice Italy'},
  '罗马': {zh:'斗兽场 许愿池', en:'Colosseum Trevi Fountain Rome Italy'},
  '西班牙': {zh:'圣家堂 马德里', en:'Sagrada Familia Madrid Spain'},
  '巴塞罗那': {zh:'圣家堂', en:'Sagrada Familia Barcelona Spain'},
  '澳大利亚': {zh:'悉尼歌剧院 大堡礁', en:'Sydney Opera House Great Barrier Reef Australia'},
  '悉尼': {zh:'悉尼歌剧院', en:'Sydney Opera House Australia'},
  '新西兰': {zh:'霍比屯 皇后镇', en:'Hobbiton Queenstown New Zealand'},
  '加拿大': {zh:'尼亚加拉瀑布 班夫', en:'Niagara Falls Banff Canada'},
  '埃及': {zh:'金字塔 狮身人面像', en:'Pyramids Sphinx Egypt'},
  '土耳其': {zh:'蓝色清真寺 热气球', en:'Blue Mosque Cappadocia balloon Turkey'},
  '伊斯坦布尔': {zh:'蓝色清真寺', en:'Blue Mosque Istanbul Turkey'},
  '迪拜': {zh:'哈利法塔 帆船酒店', en:'Burj Khalifa Burj Al Arab Dubai'},
  '马尔代夫': {zh:'马尔代夫水上屋', en:'Maldives water villa overwater bungalow'},
  '巴厘岛': {zh:'巴厘岛海神庙 乌布', en:'Bali Tanah Lot Ubud Indonesia'},
  '越南': {zh:'下龙湾 会安', en:'Halong Bay Hoi An Vietnam'},
  '胡志明': {zh:'统一宫', en:'Ho Chi Minh City Vietnam'},
  '柬埔寨': {zh:'吴哥窟', en:'Angkor Wat Cambodia temple'},
  '暹粒': {zh:'吴哥窟', en:'Angkor Wat Siem Reap Cambodia'},
  '缅甸': {zh:'仰光大金塔 蒲甘佛塔', en:'Shwedagon Pagoda Bagan temple Myanmar'},
  '仰光': {zh:'仰光大金塔', en:'Shwedagon Pagoda Yangon Myanmar'},
  '蒲甘': {zh:'蒲甘佛塔群 热气球', en:'Bagan temples balloon Myanmar'},
  '尼泊尔': {zh:'喜马拉雅 加德满都', en:'Himalaya Kathmandu Nepal'},
  '冰岛': {zh:'极光 蓝湖温泉', en:'Iceland aurora Blue Lagoon northern lights'},
  '瑞士': {zh:'少女峰 卢塞恩', en:'Jungfrau Lucerne Switzerland'},
  '荷兰': {zh:'风车 郁金香', en:'Windmill tulip Netherlands Holland'},
  '阿姆斯特丹': {zh:'运河 风车', en:'Amsterdam canal Netherlands'},
  '老挝': {zh:'琅勃拉邦 光西瀑布', en:'Luang Prabang Kuang Si Falls Laos'},
  '印度': {zh:'泰姬陵 恒河', en:'Taj Mahal Ganges India'},
  '菲律宾': {zh:'长滩岛 巧克力山', en:'Boracay Chocolate Hills Philippines'},
  '印度尼西亚': {zh:'巴厘岛 婆罗浮屠', en:'Bali Borobudur Indonesia'},
  '斯里兰卡': {zh:'狮子岩 高山火车', en:'Sigiriya Lion Rock Sri Lanka train'},
  '俄罗斯': {zh:'红场 冬宫', en:'Red Square Hermitage Moscow Russia'},
  '巴西': {zh:'基督像 伊瓜苏瀑布', en:'Christ Redeemer Iguazu Falls Brazil'},
  '阿根廷': {zh:'伊瓜苏 巴塔哥尼亚', en:'Iguazu Patagonia Argentina'},
  '墨西哥': {zh:'奇琴伊察 坎昆', en:'Chichen Itza Cancun Mexico'},
  '南非': {zh:'桌山 克鲁格公园', en:'Table Mountain Kruger South Africa'},
  '肯尼亚': {zh:'马赛马拉 动物大迁徙', en:'Masai Mara safari Kenya Africa'},
  '摩洛哥': {zh:'撒哈拉 蓝色小镇', en:'Sahara Chefchaouen blue city Morocco'},
  '希腊': {zh:'圣托里尼 卫城', en:'Santorini Acropolis Greece'},
  '葡萄牙': {zh:'里斯本电车 罗卡角', en:'Lisbon tram Cabo da Roca Portugal'},
  '捷克': {zh:'查理大桥 CK小镇', en:'Charles Bridge Cesky Krumlov Czech'},
  '奥地利': {zh:'哈尔施塔特 美泉宫', en:'Hallstatt Schonbrunn Austria'},
  '匈牙利': {zh:'布达佩斯国会大厦', en:'Budapest Parliament Hungary'},
  '挪威': {zh:'峡湾 极光', en:'Norway fjord aurora northern lights'},
  '瑞典': {zh:'斯德哥尔摩老城', en:'Stockholm Gamla Stan Sweden'},
  '芬兰': {zh:'极光 圣诞老人村', en:'Finland aurora Santa Claus village Lapland'},
  '丹麦': {zh:'新港 小美人鱼', en:'Nyhavn Little Mermaid Copenhagen Denmark'},
};
function getImageQuery(destination) {
  for (const [k, v] of Object.entries(LANDMARKS)) {
    if (destination.includes(k)) return v.en + ' famous travel';
  }
  return destination + ' famous landmark travel';
}
function getBudgetLevel(b) { const x = parseInt(b)||0; if(x<=500)return{label:'穷游',icon:'🎒',color:'#0d9f6e'}; if(x<=1500)return{label:'经济',icon:'🚶',color:'#1a73e8'}; if(x<=3000)return{label:'舒适',icon:'🌟',color:'#e3741a'}; if(x<=5000)return{label:'品质',icon:'✨',color:'#9c27b0'}; return{label:'奢华',icon:'👑',color:'#e31a1a'}; }
const CITY_TIER = {'北京':1.35,'上海':1.35,'深圳':1.35,'广州':1.3,'杭州':1.15,'成都':1.1,'南京':1.1,'苏州':1.1,'重庆':1.05,'武汉':1.05,'厦门':1.1,'三亚':1.2,'西安':1.0,'长沙':1.0,'青岛':1.05};

function httpGet(host, path, headers) {
  return new Promise(resolve => {
    const req = https.request({ hostname:host, path, method:'GET', headers:headers||{}, timeout:10000 }, res => {
      let d=''; res.on('data',c=>d+=c); res.on('end',()=>{ try{ resolve(JSON.parse(d)); }catch(e){ resolve(null); } });
    });
    req.on('timeout',()=>{ req.destroy(); resolve(null); });
    req.on('error',()=>resolve(null));
    req.end();
  });
}

function fixHttps(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://')) return url.replace('http://', 'https://');
  if (!url.startsWith('http')) return '';
  return url;
}

function callDeepSeek(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ model:'deepseek-chat', messages:[{role:'system',content:'纯JSON输出'},{role:'user',content:prompt}], temperature:0.7, max_tokens:4000 });
    const req = https.request({ hostname:'api.deepseek.com', path:'/chat/completions', method:'POST', headers:{'Authorization':'Bearer '+DEEPSEEK_KEY,'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}, timeout:30000 }, res => {
      let d=''; res.on('data',c=>d+=c); res.on('end',()=>{ try{ const j=JSON.parse(d); if(j.choices?.[0]?.message?.content) resolve(j.choices[0].message.content); else reject(new Error(j.error?.message||'API异常')); }catch(e){ reject(new Error('解析失败')); } });
    });
    req.on('timeout',()=>{ req.destroy(); reject(new Error('超时')); });
    req.on('error', reject); req.write(body); req.end();
  });
}

function parseAIJson(content) {
  let js = content.trim().replace(/^```(?:json)?\n?/i,'').replace(/\n?```$/i,'');
  const m = js.match(/\[[\s\S]*\]/) || js.match(/\{[\s\S]*\}/);
  return m ? JSON.parse(m[0]) : null;
}

// ========== 高德POI ==========
async function searchAmapPOIs(city, keywords, type, count) {
  const all = [];
  for (let page = 1; all.length < count; page++) {
    const path = '/v3/place/text?keywords='+encodeURIComponent(keywords)+'&city='+encodeURIComponent(city)+'&citylimit=true&types='+type+'&offset=25&page='+page+'&extensions=all&key='+AMAP_KEY+'&output=JSON';
    const r = await httpGet('restapi.amap.com', path, {});
    if (!r||r.status!=='1'||!r.pois||r.pois.length===0) break;
    for (const p of r.pois) {
      if (!p.name||all.length>=count) break;
      const loc = p.location ? p.location.split(',') : [];
      const item = { name: p.name, location: loc.length===2?{longitude:parseFloat(loc[0]),latitude:parseFloat(loc[1])}:null, address: p.address||'' };
      if (p.biz_ext) {
        const r=p.biz_ext.rating; if(r&&!Array.isArray(r))item.rating=parseFloat(r)||null;
        const c=p.biz_ext.cost; if(c&&!Array.isArray(c))item.price=parseFloat(c)||null;
        const s=p.biz_ext.star; if(s&&!Array.isArray(s))item.star=s;
      }
      if(p.tel)item.tel=p.tel;
      if(p.photos&&p.photos.length>0){ item.amapPhotos=p.photos.slice(0,8).map(ph=>{const u=ph.url?.url||ph.url||'';let r=u.startsWith('//')?'https:'+u:u.startsWith('http')?u:'';return fixHttps(r);}).filter(u=>u); }
      all.push(item);
    }
    if(r.pois.length<25)break;
  }
  return all.slice(0, count);
}

// ========== Pexels ==========
async function searchPexels(query, count) {
  // 优先用英文搜 Pexels
  const path='/v1/search?query='+encodeURIComponent(query)+'&per_page='+(count*2)+'&orientation=landscape&size=medium';
  const r=await httpGet('api.pexels.com',path,{'Authorization':PEXELS_KEY});
  let results = [];
  if(r&&r.photos) {
    results = r.photos
      .filter(p => p.width >= 800) // 过滤低分辨率
      .map(p => fixHttps(p.src.large || p.src.medium || p.src.small));
  }
  if (results.length < count) {
    // Pexels 不够，Unsplash 兜底
    const u = await httpGet('api.unsplash.com','/search/photos?query='+encodeURIComponent(query)+'&per_page='+count+'&orientation=landscape',{'Authorization':'Client-ID 4hV3YQwF6gG8KxJ7mN2pR1tL9sB0cD5eA3fI6uO8zW4yH'});
    if (u && u.results) {
      const more = u.results.filter(p => p.width >= 800).map(p => fixHttps(p.urls.regular || p.urls.small));
      results = results.concat(more);
    }
  }
  return results;
}

// ========== 天气 ==========
async function getRealWeather(destination, days) {
  try {
    const w=await httpGet('wttr.in','/'+encodeURIComponent(destination)+'?format=j1',{'User-Agent':'curl'});
    if(!w||!w.weather) return null;
    const wm=['周日','周一','周二','周三','周四','周五','周六'];
    const wi={'Sunny':'☀️ 晴','Clear':'☀️ 晴','Partly cloudy':'⛅ 多云','Partly Cloudy':'⛅ 多云','Cloudy':'☁️ 阴','Overcast':'☁️ 阴','Mist':'🌫️ 雾','Fog':'🌫️ 雾','Freezing fog':'🌫️ 冻雾','Smoky haze':'🌫️ 雾霾','Light rain':'🌦️ 小雨','Light rain shower':'🌦️ 阵雨','Light drizzle':'🌦️ 毛毛雨','Patchy rain nearby':'🌦️ 零星雨','Patchy rain possible':'🌦️ 零星雨','Patchy light rain':'🌦️ 零星雨','Moderate rain':'🌧️ 中雨','Moderate rain at times':'🌧️ 中雨','Heavy rain':'🌧️ 大雨','Heavy rain at times':'🌧️ 大雨','Torrential rain':'🌧️ 暴雨','Moderate or heavy rain shower':'🌧️ 大雨','Thunderstorm':'⛈️ 雷雨','Thundery outbreaks possible':'⛈️ 雷雨','Snow':'❄️ 雪','Light snow':'🌨️ 小雪','Moderate snow':'🌨️ 中雪','Heavy snow':'❄️ 大雪','Blizzard':'❄️ 暴雪','Blowing snow':'🌨️ 吹雪','Light sleet':'🌨️ 雨夹雪','Moderate or heavy sleet':'🌨️ 雨夹雪','Ice pellets':'🌨️ 冰粒','Freezing drizzle':'🌧️ 冻雨','Hail':'🧊 冰雹'};
    return w.weather.slice(0, days).map((d,i)=>{
      const dt=new Date(d.date),h=d.hourly[4]||d.hourly[0],desc=(h.weatherDesc[0].value||'').trim();
      const hi=parseInt(d.maxtempC)||0,lo=parseInt(d.mintempC)||0;
      let condition=wi[desc]; if(!condition){for(const[k,v]of Object.entries(wi)){if(desc.toLowerCase().includes(k.toLowerCase())){condition=v;break;}}} if(!condition)condition='🌤️ '+desc;
      const wl=h.windspeedKmph?h.windspeedKmph+'km/h':'--'; let adv=''; if(/雨|rain|shower/i.test(desc))adv='建议携带雨具'; else if(hi>=35)adv='注意防暑'; else adv='适宜出行';
      return{date:`${dt.getMonth()+1}/${dt.getDate()}`,weekday:wm[dt.getDay()],high:hi,low:lo,condition,humidity:h.humidity?h.humidity+'%':'--',wind:(h.winddir16Point||'')+' '+wl,uv:parseInt(h.uvIndex||0)>=7?'强':parseInt(h.uvIndex||0)>=4?'中':'弱',advice:adv};
    });
  }catch(e){return null;}
}

// ========== 交通 ==========
async function geocode(city) {
  const r = await httpGet('restapi.amap.com', '/v3/geocode/geo?address='+encodeURIComponent(city)+'&key='+AMAP_KEY, {});
  return (r && r.geocodes && r.geocodes[0]) ? r.geocodes[0].location : null;
}

async function getTransportation(from, to) {
  if (!from || !to || from === to) return null;
  try {
    const [c1, c2] = await Promise.all([geocode(from), geocode(to)]);
    if (!c1 || !c2) return null;
    const path = '/v3/direction/driving?origin='+c1+'&destination='+c2+'&key='+AMAP_KEY;
    const r = await httpGet('restapi.amap.com', path, {});
    if (!r || r.status !== '1' || !r.route || !r.route.paths || r.route.paths.length === 0) return null;
    const route = r.route.paths[0];
    const distance = parseInt(route.distance) || 0;
    const duration = parseInt(route.duration) || 0;
    if (distance === 0) return null;
    const km = distance / 1000;
    const hours = duration / 3600;
    return {
      distance: Math.round(km), duration: Math.round(hours * 10) / 10,
      modes: [
        { type: '✈️ 飞机', icon: '✈️', price: Math.round(km * 0.7 + 120), time: Math.max(0.5, Math.round(hours * 0.12 * 10) / 10), note: '经济舱参考价' },
        { type: '🚄 高铁', icon: '🚄', price: Math.round(km * 0.45), time: Math.max(0.5, Math.round(hours * 0.25 * 10) / 10), note: '二等座参考价' },
        { type: '🚃 火车', icon: '🚃', price: Math.round(km * 0.12), time: Math.max(1, Math.round(hours * 0.5 * 10) / 10), note: '硬卧参考价' },
        { type: '🚌 大巴', icon: '🚌', price: Math.round(km * 0.2), time: Math.round(km / 80 * 10) / 10, note: '客运参考价' },
        { type: '🚗 自驾', icon: '🚗', price: Math.round(km * 0.55), time: Math.round(hours * 10) / 10, note: '油费+过路费估算' },
      ].filter(m => m.price > 0).sort((a, b) => a.price - b.price),
    };
  } catch(e) { return null; }
}

// 境外航班估算数据库（从国内主要城市出发）
const OVERSEAS_FLIGHTS = {
  '日本':{from:'上海',time:2.5,price:1500,note:'上海/北京直飞东京/大阪，廉航春秋航空更便宜'},
  '东京':{from:'上海',time:3,price:1800,note:'上海/北京直飞，成田/羽田机场'},
  '大阪':{from:'上海',time:2.5,price:1500,note:'上海直飞关西机场，廉航约¥800起'},
  '京都':{from:'上海',time:3,price:1800,note:'飞大阪关西机场，坐JR 1.5h到京都'},
  '泰国':{from:'昆明',time:2,price:900,note:'昆明/广州/上海直飞曼谷，亚航经常促'},
  '曼谷':{from:'广州',time:3,price:1200,note:'广深港直飞素万那普机场'},
  '普吉':{from:'上海',time:5,price:1800,note:'上海/成都直飞普吉岛'},
  '韩国':{from:'上海',time:2,price:1000,note:'上海/青岛直飞首尔仁川，济州航空便宜'},
  '首尔':{from:'上海',time:2,price:1100,note:'上海/北京直飞仁川，1.5-2.5h'},
  '新加坡':{from:'广州',time:4,price:1500,note:'广深港直飞樟宜机场，酷航促销常有¥500'},
  '马来西亚':{from:'广州',time:4,price:1200,note:'广州/深圳直飞吉隆坡，亚航低价'},
  '吉隆坡':{from:'广州',time:4,price:1200,note:'广深直飞KLIA'},
  '美国':{from:'北京',time:13,price:5000,note:'北京/上海直飞洛杉矶/纽约'},
  '纽约':{from:'北京',time:13,price:5500,note:'北京/上海直飞JFK/EWR'},
  '洛杉矶':{from:'上海',time:12,price:4500,note:'上海/北京直飞LAX'},
  '英国':{from:'北京',time:11,price:4500,note:'北京/上海直飞伦敦希思罗'},
  '伦敦':{from:'北京',time:11,price:4800,note:'北京/上海/广深直飞'},
  '法国':{from:'北京',time:11,price:4500,note:'北京/上海直飞巴黎戴高乐'},
  '巴黎':{from:'上海',time:12,price:4800,note:'上海/北京直飞CDG'},
  '意大利':{from:'北京',time:11,price:4200,note:'北京/上海直飞罗马FCO'},
  '罗马':{from:'北京',time:11,price:4200,note:'北京/上海直飞'},
  '西班牙':{from:'北京',time:12,price:4500,note:'北京/上海转机飞马德里/巴塞罗那'},
  '巴塞罗那':{from:'北京',time:13,price:4800,note:'需转机一次'},
  '澳大利亚':{from:'上海',time:10,price:4000,note:'上海/广州直飞悉尼'},
  '悉尼':{from:'上海',time:10,price:4200,note:'上海/广州直飞'},
  '新西兰':{from:'上海',time:12,price:5000,note:'上海/广州直飞奥克兰'},
  '加拿大':{from:'北京',time:12,price:5000,note:'北京/上海直飞温哥华/多伦多'},
  '埃及':{from:'北京',time:11,price:4500,note:'北京/广州直飞开罗'},
  '土耳其':{from:'北京',time:10,price:4000,note:'北京/上海直飞伊斯坦布尔'},
  '伊斯坦布尔':{from:'北京',time:10,price:4200,note:'北京/上海直飞IST，土航服务好'},
  '迪拜':{from:'北京',time:8,price:3500,note:'北京/上海/广深直飞DXB'},
  '马尔代夫':{from:'上海',time:8,price:4000,note:'上海/北京直飞马累，建议选水飞上岛'},
  '巴厘岛':{from:'上海',time:6,price:2500,note:'上海/广州直飞登巴萨'},
  '越南':{from:'南宁',time:1.5,price:600,note:'南宁/昆明/广州直飞河内/胡志明，超便宜'},
  '胡志明':{from:'广州',time:3,price:800,note:'广深直飞'},
  '柬埔寨':{from:'广州',time:2.5,price:1000,note:'广州直飞暹粒/金边'},
  '暹粒':{from:'广州',time:2.5,price:1000,note:'广州直飞暹粒'},
  '缅甸':{from:'昆明',time:2,price:1200,note:'昆明直飞仰光/曼德勒'},
  '仰光':{from:'昆明',time:2,price:1200,note:'昆明/广州直飞仰光'},
  '老挝':{from:'昆明',time:1.5,price:800,note:'昆明直飞万象/琅勃拉邦，中老铁路也可以'},
  '印度':{from:'北京',time:6,price:2500,note:'北京/上海直飞新德里'},
  '菲律宾':{from:'上海',time:3.5,price:1200,note:'上海/广州直飞马尼拉/宿务'},
  '印度尼西亚':{from:'上海',time:6,price:2500,note:'上海/广州直飞雅加达/巴厘岛'},
  '斯里兰卡':{from:'上海',time:7,price:2800,note:'上海/广州直飞科伦坡'},
  '俄罗斯':{from:'北京',time:8,price:3000,note:'北京直飞莫斯科谢列梅捷沃'},
  '巴西':{from:'北京',time:25,price:8000,note:'需转机1-2次，飞行时间很长'},
  '阿根廷':{from:'北京',time:28,price:9000,note:'需转机，地球另一端，做好心理准备'},
  '墨西哥':{from:'上海',time:14,price:5500,note:'上海/北京转机飞墨西哥城/坎昆'},
  '南非':{from:'北京',time:14,price:5000,note:'北京/上海转机飞约翰内斯堡/开普敦'},
  '肯尼亚':{from:'广州',time:11,price:4500,note:'广州直飞内罗毕'},
  '摩洛哥':{from:'北京',time:14,price:5000,note:'北京/上海转机飞卡萨布兰卡'},
  '希腊':{from:'北京',time:11,price:4200,note:'北京/上海转机飞雅典'},
  '葡萄牙':{from:'北京',time:13,price:4500,note:'北京/上海转机飞里斯本'},
  '捷克':{from:'北京',time:10,price:4000,note:'北京/上海直飞布拉格'},
  '奥地利':{from:'北京',time:10,price:4200,note:'飞维也纳，东航/国航'},
  '匈牙利':{from:'北京',time:10,price:3800,note:'北京/上海直飞布达佩斯'},
  '挪威':{from:'北京',time:10,price:4500,note:'北京/上海飞奥斯陆'},
  '瑞典':{from:'北京',time:9,price:4200,note:'北京直飞斯德哥尔摩'},
  '芬兰':{from:'北京',time:8,price:4000,note:'北京/上海直飞赫尔辛基'},
  '丹麦':{from:'北京',time:10,price:4200,note:'北京/上海直飞哥本哈根'},
  '尼泊尔':{from:'成都',time:3,price:2000,note:'成都/昆明直飞加德满都'},
  '冰岛':{from:'北京',time:11,price:5000,note:'需转机，北京/上海飞雷克雅未克'},
  '瑞士':{from:'北京',time:11,price:4500,note:'北京/上海直飞苏黎世/日内瓦'},
  '荷兰':{from:'北京',time:10,price:4200,note:'北京/上海直飞阿姆斯特丹'},
  '阿姆斯特丹':{from:'北京',time:10,price:4200,note:'北京/上海直飞史基浦'},
};

function getOverseasTransport(destination) {
  for (const [k, v] of Object.entries(OVERSEAS_FLIGHTS)) {
    if (destination.includes(k)) {
      return {
        distance: Math.round(v.time * 800),
        duration: v.time,
        modes: [
          { type: '✈️ 飞机', icon: '✈️', price: v.price, time: v.time, note: `经济舱参考价 · ${v.from}出发 · ${v.note||''}`.substring(0,60) },
        ],
      };
    }
  }
  // 未匹配的境外目的地，通用估算
  return {
    distance: 5000,
    duration: 8,
    modes: [
      { type: '✈️ 飞机', icon: '✈️', price: 3500, time: 8, note: '经济舱参考价（估算）' },
    ],
  };
}

function estimateHotelPrice(star, city) {
  const tier = CITY_TIER[city] || CITY_TIER[city.replace(/市|县$/,'')] || 1.0;
  const s = parseInt(star) || 3; const base = {2:150,3:280,4:500,5:900};
  return Math.round((base[s]||280)*tier/10)*10;
}

async function enrichWithDeepSeek(pois, destination, category) {
  if(!pois||pois.length===0)return[];
  const list=pois.map((p,i)=>`${i+1}. ${p.name}${p.address?' | '+p.address:''}${p.rating?' | 评分'+p.rating:''}`).join('\n');
  try{
    const content=await callDeepSeek(`为${destination}的真实${category}写推荐语(20-40字)和2-3个标签。\n${list}\n输出JSON:[{"desc":"推荐语","tags":["标签"]}]`);
    const enriched=parseAIJson(content);
    if(!Array.isArray(enriched))return pois;
    return pois.map((p,i)=>{const e=enriched[i]||{};return{...p,desc:e.desc||p.name,tags:e.tags||['推荐']};});
  }catch(e){return pois.map(p=>({...p,desc:p.name,tags:['推荐']}));}
}

// ========== 境外安全 ==========
const SAFETY_DB={
  '日本':{embassyPhone:'03-3403-3388',emergencyPhone:'110(报警) / 119(急救)',alerts:['注意地震和海啸预警','保管好护照'],tips:['购买包含地震保障的旅行保险']},
  '泰国':{embassyPhone:'02-245-7010',emergencyPhone:'191(报警) / 1669(急救)',alerts:['注意交通安全','警惕飞车抢劫'],tips:['购买涵盖摩托车事故的保险']},
  '韩国':{embassyPhone:'02-738-1038',emergencyPhone:'112(报警) / 119(急救)',alerts:['注意朝鲜半岛局势'],tips:['下载Emergency Ready APP']},
  '美国':{embassyPhone:'202-495-2266',emergencyPhone:'911',alerts:['注意枪支暴力风险'],tips:['购买高额医疗保险']},
  '英国':{embassyPhone:'020-7299-4049',emergencyPhone:'999',alerts:['注意恐怖主义威胁'],tips:['关注MI5发布威胁等级']},
  '法国':{embassyPhone:'01-5375-8907',emergencyPhone:'17(报警) / 15(急救)',alerts:['注意恐怖主义威胁'],tips:['下载SAIP APP']},
  '德国':{embassyPhone:'030-2758-8500',emergencyPhone:'110(报警) / 112(急救)',alerts:['注意火车站扒窃'],tips:['下载NINA APP']},
  '意大利':{embassyPhone:'06-9652-4266',emergencyPhone:'112',alerts:['旅游城市注意小偷'],tips:['不要随身携带大额现金']},
  '西班牙':{embassyPhone:'91-519-4242',emergencyPhone:'112',alerts:['巴塞罗那小偷猖獗'],tips:['背包背在前面防扒']},
  '澳大利亚':{embassyPhone:'02-6228-3999',emergencyPhone:'000',alerts:['注意毒蛇/蜘蛛','注意丛林火灾'],tips:['下载Fires Near Me APP']},
  '新加坡':{embassyPhone:'6471-2117',emergencyPhone:'999(报警) / 995(急救)',alerts:['法律极严：禁止进口口香糖'],tips:['严格遵守当地法律法规']},
  '马来西亚':{embassyPhone:'03-2163-6853',emergencyPhone:'999',alerts:['注意仙本那地区海盗风险'],tips:['避免前往沙巴东部沿海']},
  '越南':{embassyPhone:'024-3845-3736',emergencyPhone:'113(报警) / 115(急救)',alerts:['注意摩托车飞车抢劫'],tips:['贵重物品存放酒店保险箱']},
  '加拿大':{embassyPhone:'613-789-3434',emergencyPhone:'911',alerts:['冬季注意暴风雪'],tips:['下载Alert Ready APP']},
  '新西兰':{embassyPhone:'04-474-9631',emergencyPhone:'111',alerts:['注意地震风险','注意紫外线'],tips:['下载GeoNet APP']},
  '埃及':{embassyPhone:'02-2736-3544',emergencyPhone:'122(报警) / 123(急救)',alerts:['注意旅游陷阱','女性游客注意着装'],tips:['跟团出行更安全']},
  '土耳其':{embassyPhone:'0312-436-0628',emergencyPhone:'155(报警) / 112(急救)',alerts:['注意恐怖主义威胁','边境地区谨慎'],tips:['远离叙利亚边境']},
  '迪拜':{embassyPhone:'04-394-4733',emergencyPhone:'999',alerts:['遵守伊斯兰教习俗','禁止公共场合饮酒'],tips:['斋月期间白天禁食禁饮']},
  '柬埔寨':{embassyPhone:'023-215-318',emergencyPhone:'117(报警) / 119(急救)',alerts:['注意地雷区域','不要夜间独自出行'],tips:['选择正规交通工具']},
  '缅甸':{embassyPhone:'01-221-280',emergencyPhone:'199(报警) / 192(急救)',alerts:['注意部分地区安全局势','避免前往边境冲突区域'],tips:['只去仰光、蒲甘、曼德勒等旅游城市']},
  '老挝':{embassyPhone:'021-315-100',emergencyPhone:'1191(报警) / 1195(急救)',alerts:['注意交通安全','雨季避开山区'],tips:['琅勃拉邦和万象治安良好']},
  '印度':{embassyPhone:'011-2611-2345',emergencyPhone:'100(报警) / 102(急救)',alerts:['注意饮食卫生只喝瓶装水','女性避免夜间独行'],tips:['带足肠胃药','打tuktuk先谈价']},
  '菲律宾':{embassyPhone:'02-8848-2397',emergencyPhone:'911',alerts:['避免前往棉兰老岛','注意台风预警'],tips:['长滩、宿务等旅游岛安全']},
  '印度尼西亚':{embassyPhone:'021-5761-037',emergencyPhone:'110(报警) / 118(急救)',alerts:['注意火山和海啸预警','巴厘岛注意猴子抢夺'],tips:['下载SINA BNPB灾害预警APP']},
  '斯里兰卡':{embassyPhone:'011-2688-610',emergencyPhone:'119(报警) / 110(急救)',alerts:['注意经济危机后的治安','海边注意暗流'],tips:['高山火车买二等座体验最佳']},
  '俄罗斯':{embassyPhone:'495-956-1168',emergencyPhone:'102(报警) / 103(急救)',alerts:['注意极端天气','保管好护照签证'],tips:['莫斯科地铁本身就是景点']},
  '巴西':{embassyPhone:'61-2195-8200',emergencyPhone:'190(报警) / 192(急救)',alerts:['里约和圣保罗注意手机抢劫','不要佩戴显眼首饰'],tips:['海滩上不要带贵重物品']},
  '阿根廷':{embassyPhone:'011-4547-8100',emergencyPhone:'911',alerts:['布宜诺斯艾利斯注意扒窃'],tips:['换汇去蓝美元黑市更划算']},
  '墨西哥':{embassyPhone:'55-5616-0609',emergencyPhone:'911',alerts:['注意毒品犯罪','只喝瓶装水'],tips:['坎昆度假区非常安全']},
  '南非':{embassyPhone:'012-431-6500',emergencyPhone:'10111(报警) / 10177(急救)',alerts:['约翰内斯堡治安较差','不要夜间出行','车内不放任何物品'],tips:['开普敦相对安全','自驾游是最好方式']},
  '肯尼亚':{embassyPhone:'020-2722-559',emergencyPhone:'999(报警) / 991(急救)',alerts:['内罗毕注意飞车抢劫','国家公园内听从向导'],tips:['7-9月动物大迁徙最佳']},
  '摩洛哥':{embassyPhone:'0537-7540-92',emergencyPhone:'19(报警) / 15(急救)',alerts:['马拉喀什注意带路骗局','讲价是必备技能'],tips:['蓝色小镇舍夫沙万拍照绝美']},
  '希腊':{embassyPhone:'210-6723-282',emergencyPhone:'100(报警) / 166(急救)',alerts:['雅典地铁注意扒窃'],tips:['圣托里尼日落无敌但人多']},
  '葡萄牙':{embassyPhone:'21-3928-430',emergencyPhone:'112',alerts:['里斯本28路电车注意扒窃'],tips:['蛋挞一定要吃Pasteis de Belem']},
  '捷克':{embassyPhone:'233-028-898',emergencyPhone:'112',alerts:['布拉格注意换汇骗局'],tips:['CK小镇住一晚比一日游好10倍']},
  '奥地利':{embassyPhone:'01-7143-149',emergencyPhone:'112',alerts:['冬天滑雪注意安全'],tips:['哈尔施塔特早上去避开旅游团']},
  '匈牙利':{embassyPhone:'01-4135-600',emergencyPhone:'112',alerts:['布达佩斯火车站注意扒窃'],tips:['泡温泉是匈牙利必体验']},
  '挪威':{embassyPhone:'22-4920-52',emergencyPhone:'112',alerts:['冬天极夜注意保暖','峡湾自驾注意落石'],tips:['物价极高，带足预算']},
  '瑞典':{embassyPhone:'08-5793-6428',emergencyPhone:'112',alerts:['斯德哥尔摩注意扒窃'],tips:['地铁站是世界上最长的艺术长廊']},
  '芬兰':{embassyPhone:'09-2289-0129',emergencyPhone:'112',alerts:['冬天极寒注意保暖','冰上活动注意安全'],tips:['罗瓦涅米圣诞老人村必去']},
  '丹麦':{embassyPhone:'39-4608-95',emergencyPhone:'112',alerts:['哥本哈根治安良好','注意自行车道'],tips:['新港彩色房子是哥本哈根名片']},
};

function getSafetyInfo(destination) {
  for(const[k,v]of Object.entries(SAFETY_DB)){if(destination.includes(k))return{safetyInfo:{country:destination,level:'注意',levelColor:'warning',...v},localNews:[]};}
  return null;
}

// ========== 主API ==========
app.post('/api/travel/guide', guideLimiter, async (req, res) => {
  const { destination, startDate, days, budget, departure } = req.body;
  if(!destination||!days||!budget) return res.json({code:-1,message:'缺少必填参数'});
  if(typeof destination !== 'string' || destination.length > 50) return res.json({code:-1,message:'目的地名称过长'});
  const daysNum = parseInt(days), budgetNum = parseInt(budget);
  if(isNaN(daysNum) || daysNum < 1 || daysNum > 30) return res.json({code:-1,message:'天数需在1-30之间'});
  if(isNaN(budgetNum) || budgetNum < 100 || budgetNum > 100000) return res.json({code:-1,message:'预算需在100-100000之间'});

  const ov = isOverseas(destination);
  console.log(`[API] ${departure||'未知'} → ${destination} | ${days}天 | ¥${budget}`);

  try {
    let rawAttrs, rawSpots, rawHotels, rawFoods;
    
    if(ov) {
      // 境外用 AI 生成
      const [attrs, spots, hotels, foodsE] = await Promise.all([
        callDeepSeek(`推荐${destination}5个必去景点(含英文名)。JSON:[{"name":"名","enName":"English","desc":"简介","rating":4.5}]`),
        callDeepSeek(`推荐${destination}3个网红打卡点。JSON:[{"name":"名","enName":"English","desc":"简介","type":"自然/建筑/人文"}]`),
        callDeepSeek(`推荐${destination}3家酒店，价格以人民币(CNY)计价。JSON:[{"name":"名","enName":"English","desc":"简介","rating":4.5,"star":"星级","price":每晚人民币价格}]`),
        callDeepSeek(`推荐${destination}5家餐厅，价格以人民币(CNY)计价。JSON:[{"name":"名","enName":"English","desc":"推荐菜","price":人均人民币价格,"score":4.5}]`),
      ]);
      rawAttrs = (parseAIJson(attrs)||[]).map(a=>({...a,rating:a.rating||4.0,tags:['推荐']}));
      rawSpots = (parseAIJson(spots)||[]).map(s=>({...s,type:s.type||'自然',tags:['推荐']}));
      rawHotels = (parseAIJson(hotels)||[]).map(h=>({...h,rating:h.rating||4.0,star:h.star||'3',tags:['推荐']}));
      rawFoods = (parseAIJson(foodsE)||[]).map(f=>({...f,score:f.score||f.rating||4.0,price:f.price||80,tags:['推荐']}));
    } else {
      [rawAttrs, rawSpots, rawHotels, rawFoods] = await Promise.all([
        searchAmapPOIs(destination,'景点','110000|140000',5),
        searchAmapPOIs(destination,'网红打卡','110000|140000',4),
        searchAmapPOIs(destination,'酒店','100000',4),
        searchAmapPOIs(destination,'美食','050000',5),
      ]);
    }

    // 知识库匹配
    const kbMatch = matchKB(destination);
    let provinceGuide = null, xhsTips = null;
    if (kbMatch) {
      if (kbMatch.type === 'province') {
        provinceGuide = kbMatch.data;
      }
      xhsTips = kbMatch.data.xhsTips || null;
    }

    const [weather, transport, attractions, instagramSpots, hotels, foods] = await Promise.all([
      getRealWeather(destination, days),
      (async () => {
        if (ov) return getOverseasTransport(destination);
        return departure ? await getTransportation(departure, destination) : null;
      })(),
      enrichWithDeepSeek(rawAttrs, destination, '景点'),
      enrichWithDeepSeek(rawSpots, destination, '网红打卡点'),
      enrichWithDeepSeek(rawHotels, destination, '酒店'),
      enrichWithDeepSeek(rawFoods, destination, '美食'),
    ]);

    // 图片
    for(const arr of [attractions, instagramSpots, hotels, foods]) {
      for(const item of arr) {
        if(item.amapPhotos&&item.amapPhotos.length>0) {
          // 优先选大图
          const best = item.amapPhotos.find(p => p.endsWith('_960') || p.endsWith('_1280')) || item.amapPhotos[0];
          item.image = fixHttps(best);
        }
      }
      const need = arr.filter(it=>!it.image);
      if(need.length > 0) {
        // 为每个缺图的景点单独搜图
        for (const item of need) {
          const q = item.enName ? item.enName + ' ' + destination : getImageQuery(destination);
          const pool = await searchPexels(q, 3);
          item.image = pool[0] || '';
        }
      }
    }

    // 补充字段
    attractions.forEach(a=>{a.rating=a.rating||4.0;});
    instagramSpots.forEach(s=>{s.type=s.type||'人文';});
    foods.forEach(f=>{f.price=f.price||80;if(f.price>1000)f.price=Math.round(f.price/15);f.score=f.score||4.0;const pm=budget/days/3;f.budgetMatch=f.price<=pm?'✅ 预算友好':f.price<=pm*1.5?'💰 适中':'💎 稍贵但值得';});
    hotels.forEach(h=>{h.rating=h.rating||4.0;if(ov){h.price=h.price||Math.round(budget*0.35/days);if(h.price>5000)h.price=Math.round(h.price/15);}else{h.price=estimateHotelPrice(h.star,destination);}h.star=h.star||'';});

    const safetyData = ov ? getSafetyInfo(destination) : null;
    const defaultW = [{date:'7/5',weekday:'周六',high:26,low:18,condition:'☀️ 晴',humidity:'60%',wind:'2级',uv:'中',advice:'适宜出行'}];

    // 生成逐日行程规划
    let itinerary = null;
    try {
      const allAttrs = [...attractions, ...instagramSpots].slice(0, 8);
      const attrNames = allAttrs.map(a => a.name).join('、');
      const aiPrompt = `为${destination}规划${days}天旅行行程，预算约¥${budget}。景点：${attrNames}。
按天数输出JSON数组：[{"day":1,"title":"第1天：主题","spots":["景点1","景点2"],"meals":["午餐推荐","晚餐推荐"],"tips":"小贴士"}]。
要求：每天2-3个景点，路线合理不绕路，餐饮推荐匹配当地特色和预算。${ov?'注意是境外目的地。':''}`;
      const aiResult = await callDeepSeek(aiPrompt);
      itinerary = parseAIJson(aiResult);
      if (!Array.isArray(itinerary)) itinerary = null;
    } catch(e) { itinerary = null; }

    res.json({code:0, data:{
      destination, departure:departure||'', days, budget,
      budgetLevel: getBudgetLevel(budget),
      attractions, instagramSpots, hotels, foods,
      weather: weather||defaultW,
      transport: transport||null,
      // 知识库增强数据
      provinceGuide: provinceGuide,
      xhsTips: xhsTips,
      itinerary,
      isOverseas: ov,
      safetyInfo: safetyData?.safetyInfo||null,
      localNews: safetyData?.localNews||null,
      generatedAt: new Date().toISOString(),
    }});
  } catch(e) {
    console.error('[错误]', e.message);
    res.json({code:-1, message: e.message});
  }
});

app.get('/api/destinations', (req, res) => {
  const all = ['北京','上海','广州','深圳','成都','杭州','西安','重庆','武汉','长沙','青岛','大理','丽江','厦门','三亚','香港','澳门','南京','苏州','桂林','张家界','黄山','日本','泰国','韩国','新加坡','马来西亚','巴厘岛','马尔代夫','法国','意大利','英国','美国','澳大利亚'];
  const kw = req.query.keyword || '';
  res.json({code:0, data: kw ? all.filter(d=>d.includes(kw)) : all});
});

app.get('/api/health', (req, res) => {
  res.json({status:'ok', time: new Date().toISOString()});
});


// ========== 付费系统 ==========
const fs = require('fs');
const crypto = require('crypto');
const PAY_FILE = path.join(__dirname, 'payments.json');
const ORDER_FILE = path.join(__dirname, 'orders.json');

function loadJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf-8')); }
  catch(e) { return file.includes('orders') ? [] : {}; }
}
function saveJSON(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

// 用户付款确认 → 生成解锁 token
app.post('/api/pay/confirm', (req, res) => {
  const { orderId, destination } = req.body;
  if (!orderId) return res.json({ code: -1, message: '参数错误' });
  const token = crypto.randomBytes(24).toString('hex');
  const orders = loadJSON(ORDER_FILE);
  orders.push({
    orderId, destination: destination || '', token: token.substring(0, 12),
    ip: req.ip || req.connection?.remoteAddress || '', time: new Date().toISOString(),
    verified: false
  });
  saveJSON(ORDER_FILE, orders);
  console.log('[付费] 新订单', orderId, '| 目的地:', destination || '未知', '| IP:', req.ip);
  res.json({ code: 0, data: { token } });
});

// 检查付费状态
// 支付状态（打赏模式 - 无需付费）
app.get('/api/pay/status', (req, res) => {
  res.json({ code: 0, data: { paid: true } });
});

// 管理员查看订单列表（用于对账）
app.get('/api/pay/orders', (req, res) => {
  const { adminToken } = req.query;
  const data = loadJSON(PAY_FILE);
  if (!adminToken || adminToken !== (data.adminToken || '')) return res.json({ code: -1, message: '无权限' });
  const orders = loadJSON(ORDER_FILE);
  res.json({ code: 0, data: { total: orders.length, orders: orders.slice(-50).reverse() } });
});

// admin-token 端点已移除（安全加固）

app.listen(PORT, () => {
  console.log(`\n  🌐 AI妙游网页版已启动: http://localhost:${PORT}\n`);
});
