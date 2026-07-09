/**
 * deepseek-travel v10 - 加交通性价比
 */

const https = require('https');
const DEEPSEEK_KEY = process.env.DEEPSEEKKEY || '';
const PEXELS_KEY = process.env.PEXELS_KEY || '';
const AMAP_KEY = process.env.AMAP_KEY || '';

const OVERSEAS=['日本','泰国','韩国','新加坡','马来西亚','美国','英国','法国','德国','意大利','西班牙','澳大利亚','新西兰','加拿大','埃及','土耳其','迪拜','马尔代夫','巴厘岛','越南','柬埔寨','尼泊尔','冰岛','瑞士','荷兰'];
function isOverseas(d){return OVERSEAS.some(c=>d.includes(c));}
function getBudgetLevel(b){const x=parseInt(b)||0;if(x<=500)return{label:'穷游',icon:'🎒',color:'#0d9f6e'};if(x<=1500)return{label:'经济',icon:'🚶',color:'#1a73e8'};if(x<=3000)return{label:'舒适',icon:'🌟',color:'#e3741a'};if(x<=5000)return{label:'品质',icon:'✨',color:'#9c27b0'};return{label:'奢华',icon:'👑',color:'#e31a1a'};}
const CITY_TIER={'北京':1.35,'上海':1.35,'深圳':1.35,'广州':1.3,'杭州':1.15,'成都':1.1,'南京':1.1,'苏州':1.1,'重庆':1.05,'武汉':1.05,'厦门':1.1,'三亚':1.2,'西安':1.0,'长沙':1.0,'青岛':1.05};

const WORLD_COORDS={/* same as before, truncated for brevity... actually let me keep it */
  '日本':[35.6828,139.7595],'东京':[35.6828,139.7595],'大阪':[34.6937,135.5022],'京都':[35.0116,135.7680],
  '泰国':[13.7563,100.5018],'曼谷':[13.7563,100.5018],'普吉':[7.8804,98.3923],'清迈':[18.7883,98.9853],
  '韩国':[37.5665,126.9780],'首尔':[37.5665,126.9780],'济州':[33.4996,126.5312],'釜山':[35.1796,129.0756],
  '新加坡':[1.3521,103.8198],'马来西亚':[3.1390,101.6869],'吉隆坡':[3.1390,101.6869],
  '越南':[21.0278,105.8342],'柬埔寨':[11.5564,104.9282],'尼泊尔':[27.7172,85.3240],
  '美国':[40.7128,-74.0060],'纽约':[40.7128,-74.0060],'洛杉矶':[34.0522,-118.2437],
  '英国':[51.5074,-0.1278],'伦敦':[51.5074,-0.1278],
  '法国':[48.8566,2.3522],'巴黎':[48.8566,2.3522],
  '德国':[52.5200,13.4050],'意大利':[41.9028,12.4964],'罗马':[41.9028,12.4964],'米兰':[45.4642,9.1900],
  '西班牙':[40.4168,-3.7038],'马德里':[40.4168,-3.7038],'巴塞罗那':[41.3874,2.1686],
  '澳大利亚':[-33.8688,151.2093],'悉尼':[-33.8688,151.2093],
  '新西兰':[-36.8485,174.7633],'加拿大':[43.6532,-79.3832],'多伦多':[43.6532,-79.3832],
  '埃及':[30.0444,31.2357],'土耳其':[41.0082,28.9784],'迪拜':[25.2048,55.2708],
  '马尔代夫':[4.1755,73.5093],'巴厘岛':[-8.3405,115.0920],'瑞士':[46.8182,8.2275],
  '荷兰':[52.3676,4.9041],'冰岛':[64.1466,-21.9426],
};

const SAFETY_DB={
  '日本':{embassyPhone:'03-3403-3388',emergencyPhone:'110(报警) / 119(急救/火警)',alerts:['注意地震和海啸预警','保管好护照'],tips:['购买包含地震保障的旅行保险','下载NHK World防灾APP']},
  '泰国':{embassyPhone:'02-245-7010',emergencyPhone:'191(报警) / 1669(急救)',alerts:['注意交通安全','警惕飞车抢劫'],tips:['购买涵盖摩托车事故的保险']},
  '韩国':{embassyPhone:'02-738-1038',emergencyPhone:'112(报警) / 119(急救)',alerts:['注意朝鲜半岛局势','冬季注意暴雪'],tips:['下载Emergency Ready APP']},
  '新加坡':{embassyPhone:'6471-2117',emergencyPhone:'999(报警) / 995(急救)',alerts:['法律极严：禁止进口口香糖','毒品犯罪可判死刑'],tips:['严格遵守当地法律法规']},
  '马来西亚':{embassyPhone:'03-2163-6853',emergencyPhone:'999',alerts:['注意仙本那地区海盗风险','雨季注意洪水'],tips:['避免前往沙巴东部沿海']},
  '美国':{embassyPhone:'202-495-2266',emergencyPhone:'911',alerts:['注意枪支暴力风险','注意飓风/龙卷风'],tips:['购买高额医疗保险']},
  '英国':{embassyPhone:'020-7299-4049',emergencyPhone:'999',alerts:['注意恐怖主义威胁','伦敦注意小偷'],tips:['关注MI5发布威胁等级']},
  '法国':{embassyPhone:'01-5375-8907',emergencyPhone:'17(报警) / 15(急救) / 18(火警)',alerts:['注意恐怖主义威胁','巴黎地铁注意扒手'],tips:['下载SAIP APP接收安全警报']},
  '德国':{embassyPhone:'030-2758-8500',emergencyPhone:'110(报警) / 112(急救)',alerts:['注意火车站扒窃','大型活动注意安全'],tips:['下载NINA APP']},
  '意大利':{embassyPhone:'06-9652-4266',emergencyPhone:'112',alerts:['旅游城市注意小偷','注意假警察诈骗'],tips:['不要随身携带大额现金']},
  '西班牙':{embassyPhone:'91-519-4242',emergencyPhone:'112',alerts:['巴塞罗那小偷猖獗','注意政治示威'],tips:['背包背在前面防扒']},
  '澳大利亚':{embassyPhone:'02-6228-3999',emergencyPhone:'000',alerts:['注意毒蛇/蜘蛛','注意丛林火灾'],tips:['下载Fires Near Me APP']},
  '新西兰':{embassyPhone:'04-474-9631',emergencyPhone:'111',alerts:['注意地震风险','注意紫外线强度'],tips:['下载GeoNet APP']},
  '加拿大':{embassyPhone:'613-789-3434',emergencyPhone:'911',alerts:['冬季注意极寒','注意野生动物'],tips:['下载WeatherCAN']},
  '埃及':{embassyPhone:'02-2736-3566',emergencyPhone:'122(报警) / 123(急救)',alerts:['注意恐怖主义风险','注意旅游诈骗'],tips:['仅参加正规旅行社团队']},
  '土耳其':{embassyPhone:'0312-436-0628',emergencyPhone:'155(报警) / 112(急救)',alerts:['注意恐怖主义风险','伊斯坦布尔注意小偷'],tips:['避免前往叙利亚边境']},
  '迪拜':{embassyPhone:'04-394-4733',emergencyPhone:'999(报警) / 998(急救)',alerts:['严格遵守伊斯兰教法规','严禁公共场合饮酒'],tips:['穿着得体尊重当地文化']},
  '马尔代夫':{embassyPhone:'+960-301-0645',emergencyPhone:'119',alerts:['注意水上活动安全','注意海洋生物'],tips:['仅在有资质潜店参加活动']},
  '巴厘岛':{embassyPhone:'+62-361-239-002',emergencyPhone:'110(报警) / 118(急救)',alerts:['注意摩托车事故','注意火山活动'],tips:['不建议租摩托车']},
  '越南':{embassyPhone:'024-3845-3736',emergencyPhone:'113(报警) / 115(急救)',alerts:['注意摩托车交通安全','注意飞车抢劫'],tips:['手机不要拿手上走路']},
  '柬埔寨':{embassyPhone:'023-217-094',emergencyPhone:'117(报警) / 119(急救)',alerts:['注意飞车抢劫','注意地雷'],tips:['不要在街头使用手机']},
  '尼泊尔':{embassyPhone:'01-444-0283',emergencyPhone:'100(报警) / 102(急救)',alerts:['徒步注意高原反应','注意地震风险'],tips:['购买含直升机救援保险']},
  '瑞士':{embassyPhone:'031-351-4593',emergencyPhone:'117(报警) / 144(急救)',alerts:['冬季滑雪注意雪崩','注意高山反应'],tips:['下载MeteoSwiss关注天气']},
  '荷兰':{embassyPhone:'070-306-5099',emergencyPhone:'112',alerts:['阿姆斯特丹注意自行车','注意火车站扒窃'],tips:['过马路注意自行车道']},
  '冰岛':{embassyPhone:'+354-527-6688',emergencyPhone:'112',alerts:['冬季自驾注意暴风雪','注意火山地震'],tips:['下载SafeTravel APP登记行程']},
};

function fixHttps(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://')) {
    // Try HTTPS first - most CDNs support it
    return url.replace('http://', 'https://');
  }
  if (!url.startsWith('http')) return '';
  return url;
}

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

// ============ 交通计算 ============
async function geocode(city) {
  const r = await httpGet('restapi.amap.com', '/v3/geocode/geo?address='+encodeURIComponent(city)+'&key='+AMAP_KEY, {});
  return (r && r.geocodes && r.geocodes[0]) ? r.geocodes[0].location : null;
}

async function getTransportation(from, to) {
  if (!from || !to || from === to) return null;
  try {
    // 先地理编码获取坐标
    console.log("\[交通\] 地理编码: "+from+" → "+to);
    const [c1, c2] = await Promise.all([geocode(from), geocode(to)]);
    console.log("\[交通\] 坐标结果: "+from+"="+c1+" "+to+"="+c2);
    if (!c1 || !c2) { console.log("\[交通\] 地理编码失败 c1="+c1+" c2="+c2); return null; }
    // 用坐标调用驾车API
    const path = '/v3/direction/driving?origin='+c1+'&destination='+c2+'&key='+AMAP_KEY;
    console.log("\[交通\] 调用驾车API");
    const r = await httpGet("restapi.amap.com", path, {});
    console.log("\[交通\] 驾车API返回 status="+(r?r.status:"null"));
    if (!r || r.status !== '1' || !r.route || !r.route.paths || r.route.paths.length === 0) return null;
    const route = r.route.paths[0];
    const distance = parseInt(route.distance) || 0;
    const duration = parseInt(route.duration) || 0;
    if (distance === 0) return null;
    const km = distance / 1000;
    const hours = duration / 3600;
    console.log('[交通] '+from+'→'+to+' '+Math.round(km)+'km '+Math.round(hours)+'h');

    return {
      distance: Math.round(km),
      duration: Math.round(hours * 10) / 10,
      modes: [
        { type: '✈️ 飞机', icon: '✈️', price: Math.round(km * 0.7 + 120), time: Math.max(0.5, Math.round(hours * 0.12 * 10) / 10), note: '经济舱参考价' },
        { type: '🚄 高铁', icon: '🚄', price: Math.round(km * 0.45), time: Math.max(0.5, Math.round(hours * 0.25 * 10) / 10), note: '二等座参考价' },
        { type: '🚃 火车', icon: '🚃', price: Math.round(km * 0.12), time: Math.max(1, Math.round(hours * 0.5 * 10) / 10), note: '硬卧参考价' },
        { type: '🚌 大巴', icon: '🚌', price: Math.round(km * 0.2), time: Math.round(km / 80 * 10) / 10, note: '客运参考价' },
        { type: '🚗 自驾', icon: '🚗', price: Math.round(km * 0.55), time: Math.round(hours * 10) / 10, note: '油费+过路费估算' },
      ].filter(m => m.price > 0).sort((a, b) => a.price - b.price),
    };
  } catch(e) { console.error('[交通] 异常:', e.message); return null; }
}

// ============ 高德POI ============
async function searchAmapPOIs(city, keywords, type, count) {
  const all = [];
  for (let page = 1; all.length < count; page++) {
    const path = '/v3/place/text?keywords='+encodeURIComponent(keywords)+'&city='+encodeURIComponent(city)+'&citylimit=true&types='+type+'&offset=25&page='+page+'&extensions=all&key='+AMAP_KEY+'&output=JSON';
    
    const r = await httpGet("restapi.amap.com", path, {});
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

// ============ Pexels ============
async function searchPexels(query, count) {
  const path='/v1/search?query='+encodeURIComponent(query)+'&per_page='+count+'&orientation=landscape';
  const r=await httpGet('api.pexels.com',path,{'Authorization':PEXELS_KEY});
  return(r&&r.photos)?r.photos.map(p=>fixHttps(p.src.medium||p.src.small||p.src.tiny)):[];
}
async function assignPhotosDomestic(items, destination) {
  if(!items||items.length===0)return;
  items.forEach(item=>{ if(item.amapPhotos&&item.amapPhotos.length>0) item.image=fixHttps(item.amapPhotos[0]); });
  const need=items.filter(it=>!it.image);
  if(need.length===0){console.log('[照片] 全部高德真实照片');return;}
  const pool=await searchPexels(destination+' travel scenery',need.length+3);
  need.forEach((item,i)=>{item.image=fixHttps(pool[i])||'';});
}
async function assignPhotosOverseas(items, destination) {
  if(!items||items.length===0)return;
  const pool=await searchPexels(destination+' travel landmark photography',items.length+5);
  const results=await Promise.all(items.map(async(item)=>{
    const ek=item.enName||item.name;
    let p=await searchPexels(ek+' '+destination,1);
    if(p.length>0)return fixHttps(p[0]);
    p=await searchPexels(ek,1);
    if(p.length>0)return fixHttps(p[0]);
    return fixHttps(pool[items.indexOf(item)%pool.length])||'';
  }));
  items.forEach((item,i)=>{item.image=fixHttps(results[i])||'';});
}

// ============ DeepSeek ============
function callDeepSeek(prompt){
  return new Promise((resolve,reject)=>{
    const body=JSON.stringify({model:'deepseek-chat',messages:[{role:'system',content:'纯JSON输出'},{role:'user',content:prompt}],temperature:0.7,max_tokens:4000});
    const req=https.request({hostname:'api.deepseek.com',path:'/chat/completions',method:'POST',headers:{'Authorization':'Bearer '+DEEPSEEK_KEY,'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)},timeout:30000},res=>{
      let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);if(j.choices?.[0]?.message?.content)resolve(j.choices[0].message.content);else reject(new Error(j.error?.message||'API异常'));}catch(e){reject(new Error('解析失败'));}});
    });
    req.on('timeout',()=>{req.destroy();reject(new Error('超时'));});
    req.on('error',reject);req.write(body);req.end();
  });
}
function parseAIJson(content){
  let js=content.trim().replace(/^```(?:json)?\n?/i,'').replace(/\n?```$/i,'');
  const m=js.match(/\[[\s\S]*\]/)||js.match(/\{[\s\S]*\}/);
  return m?JSON.parse(m[0]):null;
}
async function enrichWithDeepSeek(pois,destination,category){
  if(!pois||pois.length===0)return[];
  const list=pois.map((p,i)=>`${i+1}. ${p.name}${p.address?' | '+p.address:''}${p.rating?' | 评分'+p.rating:''}`).join('\n');
  try{
    const content=await callDeepSeek(`为${destination}的真实${category}写推荐语(20-40字)和2-3个标签。\n${list}\n输出JSON:[{"desc":"推荐语","tags":["标签"]}]`);
    const enriched=parseAIJson(content);
    if(!Array.isArray(enriched))return pois;
    return pois.map((p,i)=>{const e=enriched[i]||{};return{...p,desc:e.desc||p.name,tags:e.tags||['推荐']};});
  }catch(e){return pois.map(p=>({...p,desc:p.name,tags:['推荐']}));}
}

// ============ 境外 ============
function getSafetyInfo(destination){
  for(const[k,v]of Object.entries(SAFETY_DB)){if(destination.includes(k))return{safetyInfo:{country:destination,level:'注意',levelColor:'warning',...v},localNews:[{title:'出行前请查阅中国领事服务网 cs.mfa.gov.cn',date:new Date().toISOString().slice(0,10),source:'中国领事服务网'}]};}
  return null;
}
async function getOverseasInfo(destination){
  const hc=getSafetyInfo(destination);if(hc)return hc;
  try{
    const c=await callDeepSeek(`提供${destination}旅行安全信息。输出JSON:{"safetyInfo":{"country":"${destination}","level":"注意","levelColor":"warning","embassyPhone":"电话","emergencyPhone":"电话","alerts":["提醒"],"tips":["建议"]},"localNews":[]}`);
    return parseAIJson(c);
  }catch(e){return{safetyInfo:{country:destination,level:'注意',levelColor:'warning',embassyPhone:'cs.mfa.gov.cn',emergencyPhone:'请查询当地警方',alerts:['保管好护照'],tips:['购买旅行保险']},localNews:[]};}
}
function getWorldCoord(destination){
  for(const[k,v]of Object.entries(WORLD_COORDS)){if(destination.includes(k))return{latitude:v[0],longitude:v[1]};}
  return null;
}
function applyOverseasLocations(items,destination){
  const cityCoord=getWorldCoord(destination);
  if(!cityCoord)return;
  ['attractions','instagramSpots','foods','hotels'].forEach(k=>{
    if(items[k])items[k].forEach((item,i)=>{if(!item.location){item.location={longitude:cityCoord.longitude+(i+1)*0.003,latitude:cityCoord.latitude+(i+1)*0.0015};}});
  });
}

// ============ 天气 ============
async function getRealWeather(destination,days){
  try{
    const w=await httpGet('wttr.in','/'+encodeURIComponent(destination)+'?format=j1',{'User-Agent':'curl'});
    if(!w||!w.weather)return null;
    const wm=['周日','周一','周二','周三','周四','周五','周六'];
    const wi={
      'Sunny':'☀️ 晴','Clear':'☀️ 晴','Partly cloudy':'⛅ 多云','Partly Cloudy':'⛅ 多云',
      'Cloudy':'☁️ 阴','Overcast':'☁️ 阴',
      'Mist':'🌫️ 雾','Fog':'🌫️ 雾','Freezing fog':'🌫️ 冻雾',
      'Smoky haze':'🌫️ 雾霾',
      'Light rain':'🌦️ 小雨','Light rain shower':'🌦️ 阵雨','Light drizzle':'🌦️ 毛毛雨',
      'Patchy rain nearby':'🌦️ 零星雨','Patchy rain possible':'🌦️ 零星雨','Patchy light rain':'🌦️ 零星雨',
      'Moderate rain':'🌧️ 中雨','Moderate rain at times':'🌧️ 中雨',
      'Heavy rain':'🌧️ 大雨','Heavy rain at times':'🌧️ 大雨','Torrential rain':'🌧️ 暴雨',
      'Moderate or heavy rain shower':'🌧️ 大雨',
      'Thunderstorm':'⛈️ 雷雨','Thundery outbreaks possible':'⛈️ 雷雨',
      'Snow':'❄️ 雪','Light snow':'🌨️ 小雪','Moderate snow':'🌨️ 中雪','Heavy snow':'❄️ 大雪',
      'Blizzard':'❄️ 暴雪','Blowing snow':'🌨️ 吹雪',
      'Light sleet':'🌨️ 雨夹雪','Moderate or heavy sleet':'🌨️ 雨夹雪',
      'Ice pellets':'🌨️ 冰粒','Freezing drizzle':'🌧️ 冻雨','Hail':'🧊 冰雹'
    };
    return w.weather.slice(0,days).map(d=>{
      const dt=new Date(d.date),h=d.hourly[4]||d.hourly[0],desc=(h.weatherDesc[0].value||"").trim();
      const hi=parseInt(d.maxtempC),lo=parseInt(d.mintempC),ws=parseInt(h.windspeedKmph||0);
      let wl='微风';if(ws<=5)wl='1级';else if(ws<=11)wl='2级';else if(ws<=19)wl='3级';else wl='4+级';
      let adv='';if(/雨|rain|shower/i.test(desc))adv='建议携带雨具';else if(hi>=35)adv='注意防暑';else adv='适宜出行';
      let condition=wi[desc];if(!condition){for(const[k,v]of Object.entries(wi)){if(desc.toLowerCase().includes(k.toLowerCase())){condition=v;break;}}}if(!condition)condition='🌤️ '+desc;return{date:`${dt.getMonth()+1}/${dt.getDate()}`,weekday:wm[dt.getDay()],high:hi,low:lo,condition,humidity:h.humidity?h.humidity+'%':'--',wind:(h.winddir16Point||'')+' '+wl,uv:parseInt(h.uvIndex||0)>=7?'强':parseInt(h.uvIndex||0)>=4?'中':'弱',advice:adv};
    });
  }catch(e){return null;}
}

function estimateHotelPrice(star,city){
  const tier=CITY_TIER[city]||CITY_TIER[city.replace(/市|县$/,'')]||1.0;
  const s=parseInt(star)||3;const base={2:150,3:280,4:500,5:900};
  return Math.round((base[s]||280)*tier/10)*10;
}

// ============ 主流程 ============
exports.main=async(event,context)=>{
  const{destination,startDate,days,budget,departure}=event;
  if(!destination||!days||!budget)return{code:-1,message:'缺少必填参数'};
  if(!DEEPSEEK_KEY)return{code:-1,message:'未配置 DEEPSEEKKEY'};
  const ov=isOverseas(destination);
  console.log(`[v10] ${departure||'未知'} → ${destination} | ${days}天 | ¥${budget} | ${ov?'境外':'国内'}`);

  try{
    let rawAttrs,rawSpots,rawHotels,rawFoods;
    if(ov){
      const hb=Math.round(budget*0.35/days);
      const[attrs,spots,hotels,foodsE]=await Promise.all([
        callDeepSeek(`推荐${destination}5个必去景点(含英文名)。JSON:[{"name":"名","enName":"English","desc":"简介","rating":4.5}]`),
        callDeepSeek(`推荐${destination}3个网红打卡点(含英文名)。JSON:[{"name":"名","enName":"English","desc":"简介","type":"自然/建筑/人文"}]`),
        callDeepSeek(`推荐${destination}3家酒店约¥${hb}/晚(含英文名)。JSON:[{"name":"名","enName":"English","desc":"简介","rating":4.5,"star":"星级"}]`),
        callDeepSeek(`推荐${destination}5家餐厅(含英文名)。JSON:[{"name":"名","enName":"English","desc":"推荐菜","price":人均,"score":4.5}]`),
      ]);
      rawAttrs=(parseAIJson(attrs)||[]).map(a=>({...a,rating:a.rating||4.0,tags:['推荐']}));
      rawSpots=(parseAIJson(spots)||[]).map(s=>({...s,type:s.type||'自然',tags:['推荐']}));
      rawHotels=(parseAIJson(hotels)||[]).map(h=>({...h,rating:h.rating||4.0,star:h.star||'3',tags:['推荐']}));
      rawFoods=(parseAIJson(foodsE)||[]).map(f=>({...f,score:f.score||f.rating||4.0,price:f.price||80,tags:['推荐']}));
    }else{
      [rawAttrs,rawSpots,rawHotels,rawFoods]=await Promise.all([
        searchAmapPOIs(destination,'景点','110000|140000',5),
        searchAmapPOIs(destination,'网红打卡','110000|140000',4),
        searchAmapPOIs(destination,'酒店','100000',4),
        searchAmapPOIs(destination,'美食','050000',5),
      ]);
    }
    console.log(`[数据] 景点${rawAttrs.length} 打卡${rawSpots.length} 酒店${rawHotels.length} 美食${rawFoods.length}`);

    const[weather,transport,attractions,instagramSpots,hotels,foods,overseaInfo]=await Promise.all([
      getRealWeather(destination,days),
      departure ? getTransportation(departure, destination) : Promise.resolve(null),
      enrichWithDeepSeek(rawAttrs,destination,'景点'),
      enrichWithDeepSeek(rawSpots,destination,'网红打卡点'),
      enrichWithDeepSeek(rawHotels,destination,'酒店'),
      enrichWithDeepSeek(rawFoods,destination,'美食'),
      ov?getOverseasInfo(destination):Promise.resolve(null),
    ]);

    if(ov){applyOverseasLocations({attractions,instagramSpots,hotels,foods},destination);}
    if(ov){
      await Promise.all([assignPhotosOverseas(attractions,destination),assignPhotosOverseas(instagramSpots,destination),assignPhotosOverseas(hotels,destination),assignPhotosOverseas(foods,destination)]);
    }else{
      await Promise.all([assignPhotosDomestic(attractions,destination),assignPhotosDomestic(instagramSpots,destination),assignPhotosDomestic(hotels,destination),assignPhotosDomestic(foods,destination)]);
    }

    attractions.forEach(a=>{a.rating=a.rating||4.0;});
    instagramSpots.forEach(s=>{s.type=s.type||'人文';});
    foods.forEach(f=>{f.price=f.price||80;f.score=f.score||4.0;const pm=budget/days/3;f.budgetMatch=f.price<=pm?'✅ 预算友好':f.price<=pm*1.5?'💰 适中':'💎 稍贵但值得';});
    hotels.forEach(h=>{h.rating=h.rating||4.0;h.price=ov?(h.price||Math.round(budget*0.35/days)):estimateHotelPrice(h.star,destination);h.star=h.star||'';});

    const defaultW=[{date:'7/2',weekday:'周四',high:26,low:18,condition:'☀️ 晴',humidity:'60%',wind:'2级',uv:'中',advice:'适宜出行'}];
    return{code:0,data:{
      destination,departure:departure||'',days,budget,budgetLevel:getBudgetLevel(budget),
      attractions,instagramSpots,hotels,foods,weather:weather||defaultW,
      transport: transport || null,
      isOverseas:ov,
      safetyInfo:overseaInfo?.safetyInfo||null,
      localNews:overseaInfo?.localNews||null,
      generatedAt:new Date().toISOString(),
    }};
  }catch(e){console.error('[错误]',e.message);return{code:-1,message:e.message};}
};
