/**
 * mock.js - 模拟数据层
 * 开发阶段使用模拟数据，上线后可替换为真实API调用
 */

// ========== 景点数据 ==========
const attractions = {
  '北京': [
    { name: '故宫博物院', desc: '世界上最大的古代宫殿建筑群，红墙黄瓦间感受六百年历史', rating: 4.9, image: 'https://picsum.photos/seed/gugong/400/300', tags: ['历史', '文化', '必去'] },
    { name: '八达岭长城', desc: '"不到长城非好汉"，雄伟壮观的万里长城精华段', rating: 4.8, image: 'https://picsum.photos/seed/changcheng/400/300', tags: ['历史', '户外', '壮丽'] },
    { name: '颐和园', desc: '中国古典园林的巅峰之作，昆明湖与万寿山的完美结合', rating: 4.7, image: 'https://picsum.photos/seed/yiheyuan/400/300', tags: ['园林', '休闲', '摄影'] },
    { name: '天坛公园', desc: '明清帝王祭天之所，祈年殿的蓝色琉璃瓦令人叹为观止', rating: 4.6, image: 'https://picsum.photos/seed/tiantan/400/300', tags: ['文化', '建筑', '历史'] },
    { name: '798艺术区', desc: '旧工厂改造的艺术街区，先锋艺术与工业遗存的碰撞', rating: 4.5, image: 'https://picsum.photos/seed/798/400/300', tags: ['艺术', '文艺', '网红'] },
  ],
  '上海': [
    { name: '外滩', desc: '浦西万国建筑群与浦东陆家嘴天际线交相辉映', rating: 4.8, image: 'https://picsum.photos/seed/waitan/400/300', tags: ['夜景', '建筑', '必去'] },
    { name: '迪士尼乐园', desc: '中国大陆首座迪士尼主题乐园，充满魔法与欢乐', rating: 4.7, image: 'https://picsum.photos/seed/disney/400/300', tags: ['亲子', '游乐', '童话'] },
    { name: '豫园', desc: '明代江南古典园林，九曲桥与湖心亭的经典江南意象', rating: 4.5, image: 'https://picsum.photos/seed/yuyuan/400/300', tags: ['园林', '文化', '美食'] },
    { name: '武康路', desc: '网红打卡圣地，武康大楼与梧桐树下的文艺街区', rating: 4.6, image: 'https://picsum.photos/seed/wukang/400/300', tags: ['网红', '文艺', '街拍'] },
    { name: '上海中心大厦', desc: '中国第一高楼，118层观光厅俯瞰魔都全景', rating: 4.6, image: 'https://picsum.photos/seed/shanghaicenter/400/300', tags: ['建筑', '地标', '夜景'] },
  ],
  '成都': [
    { name: '大熊猫繁育研究基地', desc: '近距离观察国宝大熊猫的呆萌日常，心都被融化了', rating: 4.9, image: 'https://picsum.photos/seed/panda/400/300', tags: ['亲子', '萌宠', '必去'] },
    { name: '宽窄巷子', desc: '成都慢生活的缩影，青砖黛瓦间的茶馆与川味小吃', rating: 4.6, image: 'https://picsum.photos/seed/kuanzhai/400/300', tags: ['美食', '文化', '休闲'] },
    { name: '都江堰', desc: '两千多年的水利工程奇迹，感受古人的智慧', rating: 4.7, image: 'https://picsum.photos/seed/dujiangyan/400/300', tags: ['历史', '智慧', '自然'] },
    { name: '锦里古街', desc: '三国文化主题仿古街，红灯笼下的巴蜀风情', rating: 4.5, image: 'https://picsum.photos/seed/jinli/400/300', tags: ['美食', '夜景', '网红'] },
    { name: '青城山', desc: '道教发源地之一，"青城天下幽"的宁静仙境', rating: 4.7, image: 'https://picsum.photos/seed/qingcheng/400/300', tags: ['道教', '自然', '清幽'] },
  ],
  '杭州': [
    { name: '西湖', desc: '"欲把西湖比西子，淡妆浓抹总相宜"的江南绝景', rating: 4.9, image: 'https://picsum.photos/seed/xihu/400/300', tags: ['自然', '文化', '必去'] },
    { name: '灵隐寺', desc: '千年古刹，禅意盎然，飞来峰的石刻令人震撼', rating: 4.7, image: 'https://picsum.photos/seed/lingyin/400/300', tags: ['佛教', '文化', '清幽'] },
    { name: '西溪湿地', desc: '城市中的天然湿地，泛舟芦苇荡中享受宁静', rating: 4.5, image: 'https://picsum.photos/seed/xixi/400/300', tags: ['自然', '休闲', '摄影'] },
    { name: '龙井村', desc: '漫山遍野的茶园，品一口正宗龙井茶', rating: 4.6, image: 'https://picsum.photos/seed/longjing/400/300', tags: ['茶园', '体验', '文艺'] },
    { name: '宋城', desc: '大型宋代文化主题公园，《宋城千古情》震撼演出', rating: 4.4, image: 'https://picsum.photos/seed/songcheng/400/300', tags: ['文化', '演出', '亲子'] },
  ],
  '西安': [
    { name: '兵马俑', desc: '世界第八大奇迹，规模宏大的秦代陶俑军阵', rating: 4.9, image: 'https://picsum.photos/seed/bingmayong/400/300', tags: ['历史', '必去', '文化'] },
    { name: '大雁塔', desc: '唐代高僧玄奘译经之地，西安的标志性建筑', rating: 4.6, image: 'https://picsum.photos/seed/dayanta/400/300', tags: ['佛教', '历史', '夜景'] },
    { name: '西安城墙', desc: '中国保存最完整的古城墙，骑行一圈俯瞰古城', rating: 4.7, image: 'https://picsum.photos/seed/citywall/400/300', tags: ['历史', '骑行', '地标'] },
    { name: '回民街', desc: '西安最热闹的美食街，牛羊肉泡馍与各种小吃', rating: 4.5, image: 'https://picsum.photos/seed/huimin/400/300', tags: ['美食', '热闹', '夜市'] },
  ],
  '广州': [
    { name: '广州塔', desc: '昵称"小蛮腰"，600米高的塔顶俯瞰珠江夜景', rating: 4.7, image: 'https://picsum.photos/seed/cantontower/400/300', tags: ['地标', '夜景', '必去'] },
    { name: '长隆野生动物世界', desc: '亚洲最大的野生动物主题公园，可以与动物零距离', rating: 4.7, image: 'https://picsum.photos/seed/chimelong/400/300', tags: ['亲子', '动物', '游乐'] },
    { name: '沙面岛', desc: '欧式风情建筑群，文艺拍照圣地', rating: 4.5, image: 'https://picsum.photos/seed/shamian/400/300', tags: ['文艺', '建筑', '网红'] },
    { name: '陈家祠', desc: '岭南建筑的瑰宝，精美的砖雕木雕令人叹服', rating: 4.5, image: 'https://picsum.photos/seed/chenjiaci/400/300', tags: ['文化', '建筑', '历史'] },
  ],
  '重庆': [
    { name: '洪崖洞', desc: '千与千寻同款吊脚楼建筑群，夜景堪比动漫世界', rating: 4.7, image: 'https://picsum.photos/seed/hongyadong/400/300', tags: ['夜景', '网红', '美食'] },
    { name: '解放碑', desc: '重庆地标性商圈，八一路好吃街吃货天堂', rating: 4.5, image: 'https://picsum.photos/seed/jiefangbei/400/300', tags: ['商圈', '美食', '地标'] },
    { name: '武隆天生三桥', desc: '《变形金刚4》取景地，壮观的天生石桥群', rating: 4.6, image: 'https://picsum.photos/seed/wulong/400/300', tags: ['自然', '奇观', '户外'] },
    { name: '长江索道', desc: '横跨长江的空中巴士，换个角度看重庆', rating: 4.4, image: 'https://picsum.photos/seed/suodao/400/300', tags: ['体验', '交通', '网红'] },
  ],
  '大理': [
    { name: '洱海', desc: '环洱海骑行，苍山脚下碧波万顷的诗意生活', rating: 4.8, image: 'https://picsum.photos/seed/erhai/400/300', tags: ['自然', '骑行', '文艺'] },
    { name: '大理古城', desc: '南诏国古都，洋人街与人民路的文艺慢生活', rating: 4.6, image: 'https://picsum.photos/seed/daliold/400/300', tags: ['文化', '文艺', '休闲'] },
    { name: '苍山', desc: '乘坐索道上山，俯瞰洱海全景的壮丽风光', rating: 4.7, image: 'https://picsum.photos/seed/cangshan/400/300', tags: ['自然', '登山', '摄影'] },
    { name: '双廊古镇', desc: '洱海边的白族渔村，海景咖啡馆与日落', rating: 4.5, image: 'https://picsum.photos/seed/shuanglang/400/300', tags: ['古镇', '海景', '网红'] },
  ],
  '三亚': [
    { name: '亚龙湾', desc: '"天下第一湾"，碧海白沙的度假天堂', rating: 4.8, image: 'https://picsum.photos/seed/yalong/400/300', tags: ['海滩', '度假', '必去'] },
    { name: '蜈支洲岛', desc: '中国的马尔代夫，潜水与水上项目绝佳去处', rating: 4.7, image: 'https://picsum.photos/seed/wuzhizhou/400/300', tags: ['海岛', '潜水', '水上运动'] },
    { name: '天涯海角', desc: '海南的标志性景点，椰风海韵中的浪漫寓意', rating: 4.4, image: 'https://picsum.photos/seed/tianyahaijiao/400/300', tags: ['文化', '地标', '浪漫'] },
    { name: '鹿回头风景区', desc: '登高俯瞰三亚全景，日落时分的绝美观景台', rating: 4.5, image: 'https://picsum.photos/seed/luhuitou/400/300', tags: ['自然', '夜景', '摄影'] },
  ],
  '厦门': [
    { name: '鼓浪屿', desc: '世界文化遗产，万国建筑与钢琴声声的浪漫小岛', rating: 4.7, image: 'https://picsum.photos/seed/gulangyu/400/300', tags: ['海岛', '文艺', '建筑'] },
    { name: '曾厝垵', desc: '闽南特色渔村改造的文创街区，美食与文艺集合', rating: 4.5, image: 'https://picsum.photos/seed/zengcuoan/400/300', tags: ['美食', '文艺', '网红'] },
    { name: '环岛路', desc: '厦门最美海岸线，骑行看海的惬意体验', rating: 4.6, image: 'https://picsum.photos/seed/huandao/400/300', tags: ['自然', '骑行', '浪漫'] },
    { name: '南普陀寺', desc: '闽南佛教胜地，背靠五老峰俯瞰厦门', rating: 4.5, image: 'https://picsum.photos/seed/nanputuo/400/300', tags: ['佛教', '文化', '清幽'] },
  ],
  '丽江': [
    { name: '丽江古城', desc: '世界文化遗产，小桥流水的纳西族高原古城', rating: 4.6, image: 'https://picsum.photos/seed/lijiangold/400/300', tags: ['古城', '文艺', '慢生活'] },
    { name: '玉龙雪山', desc: '纳西族神山，海拔4680米冰川公园的壮丽', rating: 4.8, image: 'https://picsum.photos/seed/yulong/400/300', tags: ['雪山', '自然', '壮丽'] },
    { name: '泸沽湖', desc: '东方女儿国，湛蓝湖水与摩梭文化的秘境', rating: 4.7, image: 'https://picsum.photos/seed/luguhu/400/300', tags: ['湖泊', '文化', '秘境'] },
  ],
  '日本': [
    { name: '浅草寺', desc: '东京最古老的寺庙，雷门与仲见世商业街', rating: 4.6, image: 'https://picsum.photos/seed/asakusa/400/300', tags: ['文化', '寺庙', '购物'] },
    { name: '富士山', desc: '日本象征，完美圆锥形的活火山绝景', rating: 4.9, image: 'https://picsum.photos/seed/fuji/400/300', tags: ['自然', '地标', '必去'] },
    { name: '清水寺', desc: '京都最古老寺院，悬空舞台与红叶绝景', rating: 4.7, image: 'https://picsum.photos/seed/kiyomizu/400/300', tags: ['历史', '寺庙', '红叶'] },
    { name: '伏见稻荷大社', desc: '千本朱红鸟居连成的梦幻隧道，网红拍照圣地', rating: 4.7, image: 'https://picsum.photos/seed/fushimi/400/300', tags: ['神社', '网红', '摄影'] },
  ],
  '泰国': [
    { name: '大皇宫', desc: '曼谷最辉煌的建筑群，金碧辉煌的泰式宫殿', rating: 4.7, image: 'https://picsum.photos/seed/grandpalace/400/300', tags: ['文化', '建筑', '必去'] },
    { name: '普吉岛海滩', desc: '安达曼海上的珍珠，碧海蓝天的度假天堂', rating: 4.7, image: 'https://picsum.photos/seed/phuket/400/300', tags: ['海岛', '沙滩', '度假'] },
    { name: '清迈古城', desc: '泰北玫瑰，古城寺庙与夜市的文化体验', rating: 4.6, image: 'https://picsum.photos/seed/chiangmai/400/300', tags: ['文化', '休闲', '美食'] },
    { name: '水上市场', desc: '独具特色的泰国水上集市，船上的美食与商品', rating: 4.5, image: 'https://picsum.photos/seed/floating/400/300', tags: ['体验', '美食', '特色'] },
  ],

  '深圳': [
    { name: '世界之窗', desc: '一日游遍全球名胜，微缩景观与精彩演出', rating: 4.3, image: 'https://picsum.photos/seed/szwin/400/300', tags: ['主题公园', '亲子', '地标'] },
    { name: '华侨城创意园', desc: '旧工业区改造的文艺街区，涂鸦与独立咖啡馆聚集', rating: 4.4, image: 'https://picsum.photos/seed/octloft/400/300', tags: ['文艺', '网红', '街拍'] },
    { name: '深圳湾公园', desc: '15公里海滨长廊，骑行看海与城市天际线', rating: 4.6, image: 'https://picsum.photos/seed/szbay/400/300', tags: ['海滨', '骑行', '自然'] },
    { name: '大鹏所城', desc: '600年历史的海防古城，深圳的鼓浪屿', rating: 4.3, image: 'https://picsum.photos/seed/dapeng/400/300', tags: ['历史', '海滨', '古建筑'] },
    { name: '仙湖植物园', desc: '弘法寺与沙漠植物区，城市里的禅意绿洲', rating: 4.4, image: 'https://picsum.photos/seed/xianhu/400/300', tags: ['自然', '佛教', '休闲'] },
  ],
  '武汉': [
    { name: '黄鹤楼', desc: '天下江山第一楼，登楼远眺长江大桥', rating: 4.5, image: 'https://picsum.photos/seed/huanghelou/400/300', tags: ['历史', '地标', '必去'] },
    { name: '东湖风景区', desc: '中国最大城中湖，骑行绿道与磨山樱花园', rating: 4.7, image: 'https://picsum.photos/seed/eastlake/400/300', tags: ['自然', '骑行', '赏花'] },
    { name: '户部巷', desc: '武汉小吃一条街，热干面与豆皮的朝圣地', rating: 4.3, image: 'https://picsum.photos/seed/hubuxiang/400/300', tags: ['美食', '小吃', '烟火气'] },
    { name: '湖北省博物馆', desc: '越王勾践剑与曾侯乙编钟，楚文化宝库', rating: 4.8, image: 'https://picsum.photos/seed/hubeimuseum/400/300', tags: ['历史', '文化', '必去'] },
    { name: '长江大桥', desc: '万里长江第一桥，徒步过桥看江景日落', rating: 4.5, image: 'https://picsum.photos/seed/wuhanbridge/400/300', tags: ['建筑', '日落', '地标'] },
  ],
  '长沙': [
    { name: '橘子洲头', desc: '湘江中的绿色长岛，毛主席青年雕像雄伟壮观', rating: 4.7, image: 'https://picsum.photos/seed/juzizhou/400/300', tags: ['地标', '自然', '必去'] },
    { name: '岳麓山', desc: '千年学府岳麓书院，爱晚亭的枫叶红透半山', rating: 4.6, image: 'https://picsum.photos/seed/yuelu/400/300', tags: ['历史', '自然', '赏枫'] },
    { name: '太平老街', desc: '长沙的烟火气中心，茶颜悦色与臭豆腐的天堂', rating: 4.4, image: 'https://picsum.photos/seed/taiping/400/300', tags: ['美食', '小吃', '网红'] },
    { name: '湖南省博物馆', desc: '马王堆汉墓出土的辛追夫人与素纱禅衣', rating: 4.7, image: 'https://picsum.photos/seed/hnmuseum/400/300', tags: ['历史', '文化', '必去'] },
    { name: 'IFS国金中心', desc: '长沙最高楼，KAWS玩偶打卡与云端下午茶', rating: 4.3, image: 'https://picsum.photos/seed/ifs/400/300', tags: ['网红', '购物', '地标'] },
  ],
  '青岛': [
    { name: '栈桥', desc: '青岛的城市名片，海鸥盘旋的回澜阁与碧海蓝天', rating: 4.5, image: 'https://picsum.photos/seed/zhanqiao/400/300', tags: ['海滨', '地标', '必去'] },
    { name: '八大关', desc: '万国建筑博览区，红瓦绿树碧海蓝天的极致浪漫', rating: 4.7, image: 'https://picsum.photos/seed/badaguan/400/300', tags: ['建筑', '文艺', '摄影'] },
    { name: '崂山', desc: '海上第一名山，道教仙山与清泉瀑布', rating: 4.6, image: 'https://picsum.photos/seed/laoshan/400/300', tags: ['自然', '道教', '登山'] },
    { name: '啤酒博物馆', desc: '登州路青岛啤酒发源地，喝一杯原浆鲜啤', rating: 4.4, image: 'https://picsum.photos/seed/tsingtao/400/300', tags: ['美食', '文化', '体验'] },
    { name: '金沙滩', desc: '亚洲第一滩，沙质细腻的海水浴场', rating: 4.3, image: 'https://picsum.photos/seed/jinshatan/400/300', tags: ['海滨', '沙滩', '休闲'] },
  ],
  '南京': [
    { name: '中山陵', desc: '孙中山先生陵寝，392级台阶步步登高', rating: 4.8, image: 'https://picsum.photos/seed/zhongshan/400/300', tags: ['历史', '建筑', '必去'] },
    { name: '夫子庙秦淮河', desc: '六朝金粉地，夜泊秦淮近酒家的江南意境', rating: 4.6, image: 'https://picsum.photos/seed/fuzimiao/400/300', tags: ['夜景', '美食', '历史'] },
    { name: '明孝陵', desc: '世界文化遗产，神道石像生与梅花山的绝美搭配', rating: 4.5, image: 'https://picsum.photos/seed/mingxiaoling/400/300', tags: ['历史', '文化', '赏花'] },
    { name: '南京博物院', desc: '中国三大博物馆之一，民国馆穿越百年时光', rating: 4.7, image: 'https://picsum.photos/seed/njmuseum/400/300', tags: ['历史', '文化', '免费'] },
    { name: '总统府', desc: '600年历史变迁的见证，从王府到民国总统府', rating: 4.5, image: 'https://picsum.photos/seed/zongtongfu/400/300', tags: ['历史', '建筑', '必去'] },
  ],
  '苏州': [
    { name: '拙政园', desc: '中国四大名园之首，江南园林的巅峰之作', rating: 4.8, image: 'https://picsum.photos/seed/zhuozhengyuan/400/300', tags: ['园林', '世界遗产', '必去'] },
    { name: '平江路', desc: '小桥流水人家的江南水乡画卷，评弹与苏式点心', rating: 4.6, image: 'https://picsum.photos/seed/pingjiang/400/300', tags: ['水乡', '文艺', '美食'] },
    { name: '虎丘', desc: '到苏州不游虎丘乃憾事也，千年斜塔与剑池', rating: 4.5, image: 'https://picsum.photos/seed/huqiu/400/300', tags: ['历史', '园林', '地标'] },
    { name: '山塘街', desc: '七里山塘，红灯笼映照下的千年古街', rating: 4.4, image: 'https://picsum.photos/seed/shantang/400/300', tags: ['水乡', '夜景', '美食'] },
    { name: '苏州博物馆', desc: '贝聿铭封笔之作，建筑本身就是一件艺术品', rating: 4.7, image: 'https://picsum.photos/seed/szmuseum/400/300', tags: ['建筑', '文化', '免费'] },
  ],
  '桂林': [
    { name: '漓江精华段', desc: '桂林山水甲天下，九马画山与黄布倒影', rating: 4.9, image: 'https://picsum.photos/seed/lijiang/400/300', tags: ['自然', '游船', '必去'] },
    { name: '阳朔西街', desc: '中国第一条洋人街，啤酒鱼与喀斯特山水相伴', rating: 4.5, image: 'https://picsum.photos/seed/xijie/400/300', tags: ['美食', '文艺', '夜生活'] },
    { name: '象鼻山', desc: '桂林城徽，酷似大象饮水的喀斯特奇观', rating: 4.6, image: 'https://picsum.photos/seed/xiangbi/400/300', tags: ['自然', '地标', '必去'] },
    { name: '龙脊梯田', desc: '世界梯田之冠，七星伴月与九龙五虎', rating: 4.7, image: 'https://picsum.photos/seed/longji/400/300', tags: ['自然', '摄影', '壮观'] },
    { name: '十里画廊', desc: '骑行阳朔最美公路，月亮山与遇龙河漂流', rating: 4.5, image: 'https://picsum.photos/seed/shilihualang/400/300', tags: ['骑行', '自然', '漂流'] },
  ],
  '张家界': [
    { name: '张家界国家森林公园', desc: '阿凡达取景地，三千奇峰拔地而起', rating: 4.9, image: 'https://picsum.photos/seed/zhangjiajie/400/300', tags: ['自然', '世界遗产', '必去'] },
    { name: '天门山', desc: '999级天梯与玻璃栈道，极限挑战的圣地', rating: 4.7, image: 'https://picsum.photos/seed/tianmen/400/300', tags: ['刺激', '缆车', '必去'] },
    { name: '大峡谷玻璃桥', desc: '世界最高最长的玻璃桥，漫步云端之上', rating: 4.5, image: 'https://picsum.photos/seed/glassbridge/400/300', tags: ['刺激', '网红', '壮丽'] },
    { name: '黄龙洞', desc: '中国最美溶洞，地下龙宫的石笋奇观', rating: 4.4, image: 'https://picsum.photos/seed/huanglong/400/300', tags: ['自然', '溶洞', '探秘'] },
    { name: '宝峰湖', desc: '高峡平湖，土家阿妹山歌飘荡的碧水仙境', rating: 4.3, image: 'https://picsum.photos/seed/baofeng/400/300', tags: ['自然', '游船', '休闲'] },
  ],
  '黄山': [
    { name: '黄山风景区', desc: '五岳归来不看山，黄山归来不看岳的天下第一奇山', rating: 4.9, image: 'https://picsum.photos/seed/huangshan/400/300', tags: ['自然', '世界遗产', '必去'] },
    { name: '宏村', desc: '画里乡村，月沼与南湖的水墨徽派建筑群', rating: 4.8, image: 'https://picsum.photos/seed/hongcun/400/300', tags: ['古村', '摄影', '世界遗产'] },
    { name: '西递', desc: '桃花源里人家，明清徽派民居的活化石', rating: 4.6, image: 'https://picsum.photos/seed/xidi/400/300', tags: ['古村', '文化', '历史'] },
    { name: '屯溪老街', desc: '流动的清明上河图，徽墨歙砚与毛豆腐', rating: 4.4, image: 'https://picsum.photos/seed/tunxi/400/300', tags: ['美食', '文化', '购物'] },
    { name: '翡翠谷', desc: '卧虎藏龙取景地，翡翠般的池水与竹林', rating: 4.5, image: 'https://picsum.photos/seed/feicui/400/300', tags: ['自然', '电影', '浪漫'] },
  ],
  '香港': [
    { name: '维多利亚港', desc: '世界三大夜景之一，灯光秀与天星小轮巡游', rating: 4.9, image: 'https://picsum.photos/seed/victoria/400/300', tags: ['夜景', '地标', '必去'] },
    { name: '太平山顶', desc: '搭乘山顶缆车俯瞰维港全景，凌霄阁的震撼视角', rating: 4.8, image: 'https://picsum.photos/seed/peak/400/300', tags: ['夜景', '缆车', '必去'] },
    { name: '迪士尼乐园', desc: '亚洲最小的迪士尼，魔法与欢乐的童话世界', rating: 4.7, image: 'https://picsum.photos/seed/hkdisney/400/300', tags: ['亲子', '游乐', '童话'] },
    { name: '旺角', desc: '港片同款街景，霓虹灯牌与地道茶餐厅', rating: 4.5, image: 'https://picsum.photos/seed/mongkok/400/300', tags: ['购物', '美食', '街拍'] },
    { name: '南丫岛', desc: '离岛慢生活，海鲜大排档与徒步径', rating: 4.4, image: 'https://picsum.photos/seed/lamma/400/300', tags: ['海岛', '徒步', '美食'] },
  ],
  '澳门': [
    { name: '大三巴牌坊', desc: '澳门地标，圣保禄教堂的巴洛克立面遗址', rating: 4.7, image: 'https://picsum.photos/seed/dasanba/400/300', tags: ['历史', '地标', '必去'] },
    { name: '威尼斯人', desc: '室内大运河与贡多拉船夫，意式浪漫购物天堂', rating: 4.5, image: 'https://picsum.photos/seed/venetian/400/300', tags: ['购物', '娱乐', '亲子'] },
    { name: '官也街', desc: '氹仔的美食步行街，葡挞与猪扒包的香气', rating: 4.4, image: 'https://picsum.photos/seed/guanye/400/300', tags: ['美食', '小吃', '必去'] },
    { name: '澳门塔', desc: '338米高空蹦极，挑战世界最高商业蹦极', rating: 4.3, image: 'https://picsum.photos/seed/macautower/400/300', tags: ['刺激', '地标', '夜景'] },
    { name: '路环岛', desc: '澳门最后的渔村，安德鲁蛋挞的发源地', rating: 4.3, image: 'https://picsum.photos/seed/colane/400/300', tags: ['海岛', '美食', '休闲'] },
  ],
  '台北': [
    { name: '台北101', desc: '曾经的全球最高摩天楼，跨年烟火的经典地标', rating: 4.7, image: 'https://picsum.photos/seed/taipei101/400/300', tags: ['地标', '夜景', '必去'] },
    { name: '故宫博物院', desc: '翠玉白菜与肉形石，中华文化瑰宝的殿堂', rating: 4.9, image: 'https://picsum.photos/seed/tpmuseum/400/300', tags: ['历史', '文化', '必去'] },
    { name: '九份老街', desc: '宫崎骏《千与千寻》灵感来源，山城灯笼与芋圆', rating: 4.6, image: 'https://picsum.photos/seed/jiufen/400/300', tags: ['文艺', '美食', '网红'] },
    { name: '西门町', desc: '台北年轻人潮流圣地，街头艺人表演不断', rating: 4.3, image: 'https://picsum.photos/seed/ximending/400/300', tags: ['购物', '潮流', '美食'] },
    { name: '北投温泉', desc: '台北最近的温泉乡，日式汤屋与地热谷奇景', rating: 4.4, image: 'https://picsum.photos/seed/beitou/400/300', tags: ['温泉', '休闲', '自然'] },
  ],
  'default': [
    { name: '城市地标广场', desc: '感受这座城市的脉搏与活力，拍摄标志性打卡照', rating: 4.5, image: 'https://picsum.photos/seed/landmark/400/300', tags: ['必去', '地标', '摄影'] },
    { name: '本地博物馆', desc: '了解这座城市的历史文化与艺术瑰宝', rating: 4.4, image: 'https://picsum.photos/seed/museum/400/300', tags: ['文化', '历史', '室内'] },
    { name: '老街步行区', desc: '漫步在充满烟火气的老街，感受当地市井生活', rating: 4.3, image: 'https://picsum.photos/seed/oldstreet/400/300', tags: ['美食', '人文', '休闲'] },
    { name: '城市公园', desc: '本地人最爱的休闲去处，绿意盎然的城市绿洲', rating: 4.2, image: 'https://picsum.photos/seed/park/400/300', tags: ['自然', '休闲', '亲子'] },
  ]
};

// ========== 网红打卡点 ==========
const instagramSpots = {
  '北京': [
    { name: '银河SOHO', desc: '扎哈·哈迪德的未来主义建筑，白色曲线极为出片', image: 'https://picsum.photos/seed/soho/400/300', type: '建筑' },
    { name: '红砖美术馆', desc: '红砖砌筑的美术馆，光影交错的艺术空间', image: 'https://picsum.photos/seed/hongzhuan/400/300', type: '艺术' },
    { name: '北京坊', desc: '前门大栅栏的现代商业街，中西合璧的时尚打卡地', image: 'https://picsum.photos/seed/beijingfang/400/300', type: '时尚' },
  ],
  '上海': [
    { name: '浦东美术馆镜厅', desc: '落地玻璃倒映外滩天际线，绝美拍照机位', image: 'https://picsum.photos/seed/museumhall/400/300', type: '艺术' },
    { name: '哥伦比亚公园', desc: '海军俱乐部泳池旁的摩洛哥风格打卡地', image: 'https://picsum.photos/seed/columbia/400/300', type: '网红' },
    { name: '1933老场坊', desc: '巴西利卡式建筑风格，光影交错的工业风大片', image: 'https://picsum.photos/seed/1933/400/300', type: '工业风' },
  ],
  '成都': [
    { name: '几何书店', desc: '洞穴风格书店，螺旋楼梯与暖黄灯光超有氛围感', image: 'https://picsum.photos/seed/jibe/400/300', type: '文艺' },
    { name: '鸳鸯楼', desc: '老成都的复古港风居民楼，赛博朋克感十足', image: 'https://picsum.photos/seed/yuanyang/400/300', type: '复古' },
    { name: '太古里', desc: '现代与古典交融的时尚街区，街拍达人聚集地', image: 'https://picsum.photos/seed/taikoo/400/300', type: '时尚' },
  ],
  '杭州': [
    { name: '象山艺术公社', desc: '白色几何建筑群，随手拍出高级感大片', image: 'https://picsum.photos/seed/xiangshan/400/300', type: '艺术' },
    { name: '满觉陇', desc: '满陇桂雨的石屋洞与汤屋，日系动漫感打卡地', image: 'https://picsum.photos/seed/manjuelong/400/300', type: '自然' },
    { name: '馒头山社区', desc: '老杭州的市井生活，复古胶片风拍照地', image: 'https://picsum.photos/seed/mantou/400/300', type: '复古' },
  ],
  '重庆': [
    { name: '磁器口古镇', desc: '嘉陵江边的千年古镇，石阶与吊脚楼的巴渝风情', image: 'https://picsum.photos/seed/ciqikou/400/300', type: '古镇' },
    { name: '鹅岭二厂', desc: '旧印刷厂改造的文创园，《少年的你》取景地', image: 'https://picsum.photos/seed/eling/400/300', type: '文艺' },
  ],
  '西安': [
    { name: '大唐不夜城', desc: '灯火辉煌的唐代主题步行街，仿佛穿越回盛唐', image: 'https://picsum.photos/seed/tang/400/300', type: '夜景' },
    { name: '西安美术馆', desc: '现代艺术与唐代文化结合的展馆，设计感十足', image: 'https://picsum.photos/seed/xianart/400/300', type: '艺术' },
  ],
  '大理': [
    { name: '理想邦', desc: '大理版圣托里尼，白色建筑与洱海的绝美搭配', image: 'https://picsum.photos/seed/lixiangbang/400/300', type: '建筑' },
    { name: '龙龛码头', desc: '洱海边的观日出台，红杉与海鸥的治愈画面', image: 'https://picsum.photos/seed/longkan/400/300', type: '自然' },
  ],
  '三亚': [
    { name: '太阳湾公路', desc: '最美沿海公路，一边山崖一边大海的驾驶体验', image: 'https://picsum.photos/seed/sunbay/400/300', type: '公路' },
    { name: '后海村', desc: '冲浪爱好者的天堂，渔村与浪花的结合', image: 'https://picsum.photos/seed/houhai/400/300', type: '冲浪' },
  ],
  '日本': [
    { name: '新宿御苑', desc: '东京的都市绿洲，四季皆有不同美景', image: 'https://picsum.photos/seed/shinjuku/400/300', type: '自然' },
    { name: '涩谷SKY', desc: '涩谷上空展望台，东京天际线绝美打卡点', image: 'https://picsum.photos/seed/shibuyasky/400/300', type: '地标' },
  ],
  '泰国': [
    { name: '暹罗广场', desc: '曼谷年轻人的潮流聚集地，网红甜品店林立', image: 'https://picsum.photos/seed/siam/400/300', type: '时尚' },
    { name: '真理寺', desc: '全木雕寺庙，面朝大海的艺术奇迹', image: 'https://picsum.photos/seed/sanctuary/400/300', type: '建筑' },
  ],

  '深圳': [
    { name: '海上世界', desc: '明华轮旁的喷泉广场，夜晚灯光秀与酒吧街', image: 'https://picsum.photos/seed/seaworld/400/300', type: '夜景·地标' },
    { name: '当代艺术馆', desc: '极具设计感的建筑本身即是打卡背景', image: 'https://picsum.photos/seed/mocape/400/300', type: '文艺·建筑' },
    { name: '较场尾', desc: '深圳的小鼓浪屿，彩色民宿与海边日落', image: 'https://picsum.photos/seed/jiaochangwei/400/300', type: '海滨·民宿' },
  ],
  '武汉': [
    { name: '昙华林', desc: '武汉的文艺心脏，梧桐树下的咖啡与文创', image: 'https://picsum.photos/seed/tanhualin/400/300', type: '文艺·街区' },
    { name: '光谷步行街', desc: '世界风情街，西班牙教堂与意大利广场', image: 'https://picsum.photos/seed/guanggu/400/300', type: '建筑·购物' },
    { name: '凌波门', desc: '东湖边上的水上栈桥，日出打卡圣地', image: 'https://picsum.photos/seed/lingbomen/400/300', type: '日出·湖畔' },
  ],
  '长沙': [
    { name: '超级文和友', desc: '6层楼的老长沙复刻，霓虹灯下的赛博朋克', image: 'https://picsum.photos/seed/wenheyou/400/300', type: '美食·复古' },
    { name: '梅溪湖文化艺术中心', desc: '扎哈·哈迪德遗作，芙蓉花瓣般的流动曲线', image: 'https://picsum.photos/seed/meixihu/400/300', type: '建筑·文艺' },
    { name: '谢子龙影像馆', desc: '极简清水混凝土建筑，随手一拍就是大片', image: 'https://picsum.photos/seed/xiezilong/400/300', type: '艺术·建筑' },
  ],
  '青岛': [
    { name: '大学路鱼山路', desc: '网红转角墙，红墙与文艺咖啡馆的浪漫', image: 'https://picsum.photos/seed/daxueyu/400/300', type: '网红·文艺' },
    { name: '小麦岛', desc: '青岛的小垦丁，草坪灯塔与海边日落', image: 'https://picsum.photos/seed/xiaomaidao/400/300', type: '海岛·日落' },
    { name: '信号山公园', desc: '俯瞰红瓦绿树碧海蓝天的最佳机位', image: 'https://picsum.photos/seed/xinhaoshan/400/300', type: '观景·摄影' },
  ],
  '南京': [
    { name: '颐和路', desc: '民国公馆区，梧桐树影下的黄墙老洋房', image: 'https://picsum.photos/seed/yiherd/400/300', type: '文艺·民国风' },
    { name: '牛首山佛顶宫', desc: '40亿打造的佛教圣地，地宫华美到窒息', image: 'https://picsum.photos/seed/niushoushan/400/300', type: '建筑·佛教' },
    { name: '老门东', desc: '青砖黛瓦的城南旧事，先锋书店的文艺角落', image: 'https://picsum.photos/seed/laomendong/400/300', type: '历史·文艺' },
  ],
  '苏州': [
    { name: '同里古镇', desc: '东方小威尼斯，穿心弄与退思园的江南韵味', image: 'https://picsum.photos/seed/tongli/400/300', type: '古镇·水乡' },
    { name: '诚品书店', desc: '大陆首家诚品，72级台阶的阅读殿堂', image: 'https://picsum.photos/seed/eslite/400/300', type: '文艺·书店' },
    { name: '金鸡湖', desc: '苏州的大裤衩，月光码头的现代夜景', image: 'https://picsum.photos/seed/jinjihu/400/300', type: '夜景·现代' },
  ],
  '桂林': [
    { name: '相公山', desc: '漓江第一湾日出，摄影师的朝圣之地', image: 'https://picsum.photos/seed/xianggong/400/300', type: '日出·摄影' },
    { name: '兴坪古镇', desc: '20元人民币背景取景地，渔翁与鸬鹚', image: 'https://picsum.photos/seed/xingping/400/300', type: '古镇·摄影' },
    { name: '富里桥', desc: '500年明代古桥，遇龙河上的水中倒影', image: 'https://picsum.photos/seed/fuliqiao/400/300', type: '古桥·仙境' },
  ],
  '张家界': [
    { name: '百龙天梯', desc: '326米垂直悬崖电梯，吉尼斯世界纪录', image: 'https://picsum.photos/seed/bailong/400/300', type: '刺激·网红' },
    { name: '袁家界', desc: '哈利路亚山的原型悬浮山，阿凡达取景地', image: 'https://picsum.photos/seed/yuanjiajie/400/300', type: '自然·电影' },
    { name: '溪布街', desc: '土家族风情街，依山傍水的吊脚楼夜景', image: 'https://picsum.photos/seed/xibujie/400/300', type: '民俗·夜景' },
  ],
  '黄山': [
    { name: '木坑竹海', desc: '卧虎藏龙竹林戏取景地，翡翠般的竹海世界', image: 'https://picsum.photos/seed/mukeng/400/300', type: '自然·电影' },
    { name: '塔川', desc: '中国三大赏秋胜地，层林尽染的徽派田园', image: 'https://picsum.photos/seed/tachuan/400/300', type: '赏秋·摄影' },
    { name: '呈坎', desc: '中国风水第一村，江南第一祠的徽派建筑群', image: 'https://picsum.photos/seed/chengkan/400/300', type: '古村·文化' },
  ],
  '香港': [
    { name: '彩虹邨', desc: '七彩公屋篮球场，Instagram爆款打卡地', image: 'https://picsum.photos/seed/rainbow/400/300', type: '建筑·网红' },
    { name: '中环半山扶梯', desc: '全世界最长的户外有盖扶梯，重庆森林同款', image: 'https://picsum.photos/seed/escalator/400/300', type: '电影·街拍' },
    { name: '西环泳棚', desc: '海上木栈道与日落，港风写真最佳机位', image: 'https://picsum.photos/seed/swimming/400/300', type: '日落·摄影' },
  ],
  '澳门': [
    { name: '恋爱巷', desc: '粉红与淡黄的葡式建筑，电影取景圣地', image: 'https://picsum.photos/seed/love/400/300', type: '浪漫·建筑' },
    { name: '龙环葡韵', desc: '5栋薄荷绿葡式住宅，氹仔的清新打卡点', image: 'https://picsum.photos/seed/taipa/400/300', type: '建筑·清新' },
    { name: '巴黎人铁塔', desc: '澳门版埃菲尔铁塔，夜幕下的灯光秀', image: 'https://picsum.photos/seed/parisian/400/300', type: '夜景·浪漫' },
  ],
  '台北': [
    { name: '十分老街', desc: '铁轨从街道中央穿过，天灯放飞心愿', image: 'https://picsum.photos/seed/shifen/400/300', type: '老街·天灯' },
    { name: '象山步道', desc: '20分钟徒步登顶，101大楼的最佳拍摄点', image: 'https://picsum.photos/seed/xiangshan/400/300', type: '登山·摄影' },
    { name: '猫空缆车', desc: '水晶车厢俯瞰台北盆地，山顶品茶观日落', image: 'https://picsum.photos/seed/maokong/400/300', type: '缆车·日落' },
  ],
  'default': [
    { name: '城市观景台', desc: '俯瞰城市天际线的绝佳机位，日落时分超美', image: 'https://picsum.photos/seed/viewpoint/400/300', type: '地标' },
    { name: '文艺书店', desc: '设计感满满的书店，找一个安静的角落拍出文艺照', image: 'https://picsum.photos/seed/bookstore/400/300', type: '文艺' },
  ]
};

// ========== 天气数据 ==========
const weatherData = {
  '北京': {
    '07': { high: 35, low: 24, condition: '☀️ 晴', humidity: 45, wind: '3级', uv: '强', advice: '高温炎热，注意防暑降温，建议随身携带防晒霜和矿泉水' },
    '08': { high: 32, low: 22, condition: '⛅ 多云', humidity: 50, wind: '2级', uv: '中等', advice: '天气较好，适合户外活动，但午后较热' },
    '09': { high: 26, low: 14, condition: '🌤️ 晴转多云', humidity: 45, wind: '2级', uv: '中等', advice: '秋高气爽，最适宜旅游的季节' },
    '10': { high: 18, low: 6, condition: '🍂 晴朗', humidity: 40, wind: '3级', uv: '中等', advice: '早晚温差大，建议带一件外套' },
    '11': { high: 10, low: 0, condition: '🌥️ 多云转阴', humidity: 35, wind: '3级', uv: '弱', advice: '气温较低，注意保暖' },
    '12': { high: 4, low: -6, condition: '❄️ 晴冷', humidity: 30, wind: '4级', uv: '弱', advice: '寒冷干燥，穿羽绒服并注意保湿' },
    '01': { high: 2, low: -8, condition: '☀️ 晴', humidity: 28, wind: '3级', uv: '弱', advice: '严寒天气，注意防寒保暖' },
    '02': { high: 6, low: -4, condition: '🌤️ 晴转多云', humidity: 32, wind: '2级', uv: '弱', advice: '初春乍暖还寒，仍需注意保暖' },
    '03': { high: 14, low: 2, condition: '🌱 晴', humidity: 35, wind: '3级', uv: '中等', advice: '春暖花开，非常适合出游' },
    '04': { high: 21, low: 10, condition: '🌸 晴', humidity: 38, wind: '3级', uv: '中等', advice: '春意盎然，旅游黄金季节' },
    '05': { high: 27, low: 16, condition: '🌤️ 多云', humidity: 42, wind: '2级', uv: '强', advice: '天气舒适，注意防晒' },
    '06': { high: 32, low: 21, condition: '☀️ 晴', humidity: 48, wind: '2级', uv: '强', advice: '夏季炎热，注意防暑' },
  },
  '上海': {
    '07': { high: 34, low: 26, condition: '🌦️ 阵雨', humidity: 70, wind: '3级', uv: '中等', advice: '梅雨季高温高湿，随身带伞' },
    '08': { high: 33, low: 25, condition: '🌧️ 雷阵雨', humidity: 72, wind: '3级', uv: '中等', advice: '夏季多雨，出门必带伞' },
    '09': { high: 28, low: 20, condition: '🌤️ 多云', humidity: 60, wind: '2级', uv: '中等', advice: '秋高气爽，非常舒适' },
    '10': { high: 22, low: 16, condition: '🍂 晴', humidity: 55, wind: '2级', uv: '中等', advice: '金秋时节，非常适合出行' },
    '11': { high: 17, low: 10, condition: '🌥️ 阴转多云', humidity: 55, wind: '3级', uv: '弱', advice: '秋冬交替，注意添衣' },
    '12': { high: 11, low: 4, condition: '☀️ 晴', humidity: 50, wind: '3级', uv: '弱', advice: '冬季湿冷，保暖防寒' },
  },
  '成都': {
    '07': { high: 30, low: 22, condition: '🌦️ 多云转阵雨', humidity: 75, wind: '2级', uv: '中等', advice: '夏季闷热潮湿，随身备伞' },
    '08': { high: 31, low: 23, condition: '⛅ 多云', humidity: 72, wind: '2级', uv: '中等', advice: '闷热天气，注意防暑' },
    '09': { high: 25, low: 18, condition: '🌤️ 多云间晴', humidity: 68, wind: '2级', uv: '中等', advice: '天气舒适，适合出游' },
    '10': { high: 20, low: 14, condition: '🍂 秋高气爽', humidity: 65, wind: '2级', uv: '中等', advice: '金秋成都，最适宜旅游' },
  },
  '杭州': {
    '07': { high: 33, low: 25, condition: '🌦️ 梅雨', humidity: 78, wind: '2级', uv: '中等', advice: '梅雨季节，高温高湿' },
    '08': { high: 34, low: 26, condition: '☀️ 晴热', humidity: 70, wind: '2级', uv: '强', advice: '晴热高温，注意防暑防晒' },
    '09': { high: 27, low: 19, condition: '🌤️ 秋爽', humidity: 65, wind: '2级', uv: '中等', advice: '秋高气爽，旅游好时节' },
    '10': { high: 22, low: 14, condition: '🍂 桂花飘香', humidity: 60, wind: '2级', uv: '中等', advice: '满城桂花香，绝美季节' },
  },
  '三亚': {
    '07': { high: 32, low: 26, condition: '☀️ 晴热', humidity: 78, wind: '3级', uv: '很强', advice: '烈日当空，务必做好防晒' },
    '08': { high: 32, low: 26, condition: '🌦️ 阵雨', humidity: 80, wind: '3级', uv: '强', advice: '夏季多阵雨，防晒防雨两手抓' },
    '09': { high: 31, low: 25, condition: '🌤️ 多云', humidity: 78, wind: '3级', uv: '强', advice: '天气不错，适合海边游玩' },
  },
  '日本': {
    '07': { high: 31, low: 23, condition: '🌦️ 梅雨', humidity: 75, wind: '3级', uv: '强', advice: '日本梅雨季，建议携带折叠伞' },
    '08': { high: 33, low: 25, condition: '☀️ 盛夏', humidity: 72, wind: '2级', uv: '很强', advice: '盛夏高温，注意防暑和补水' },
    '09': { high: 27, low: 19, condition: '🍁 初秋', humidity: 65, wind: '2级', uv: '中等', advice: '初秋凉爽，非常适合旅行' },
  },
  '泰国': {
    '07': { high: 33, low: 26, condition: '🌧️ 雨季', humidity: 82, wind: '3级', uv: '强', advice: '泰国雨季，午后常有阵雨' },
    '08': { high: 33, low: 25, condition: '🌧️ 雨季', humidity: 80, wind: '3级', uv: '强', advice: '高温多雨，注意防暑防蚊' },
    '09': { high: 32, low: 25, condition: '🌤️ 多云', humidity: 78, wind: '2级', uv: '强', advice: '降雨减少，适合出行' },
  },

  '深圳': {
    '01': { high: 20, low: 14, condition: '⛅ 多云', humidity: 78, wind: '3级', uv: '弱' },
    '02': { high: 18, low: 12, condition: '🌧️ 小雨', humidity: 85, wind: '4级', uv: '弱' },
    '03': { high: 22, low: 15, condition: '⛅ 多云', humidity: 75, wind: '3级', uv: '弱' },
    '04': { high: 25, low: 18, condition: '☀️ 晴天', humidity: 70, wind: '2级', uv: '强' },
    '05': { high: 27, low: 20, condition: '☀️ 晴天', humidity: 72, wind: '2级', uv: '强' },
    '06': { high: 30, low: 24, condition: '⛅ 多云', humidity: 75, wind: '2级', uv: '强' },
    '07': { high: 32, low: 26, condition: '☀️ 晴天', humidity: 78, wind: '2级', uv: '极强' },
    '08': { high: 33, low: 26, condition: '⛅ 多云', humidity: 80, wind: '3级', uv: '极强' },
    '09': { high: 31, low: 25, condition: '🌦️ 阵雨', humidity: 82, wind: '3级', uv: '强' },
    '10': { high: 27, low: 22, condition: '⛅ 多云', humidity: 75, wind: '3级', uv: '强' },
    '11': { high: 22, low: 17, condition: '⛅ 多云', humidity: 72, wind: '3级', uv: '弱' },
    '12': { high: 18, low: 13, condition: '☀️ 晴天', humidity: 68, wind: '3级', uv: '弱' },
  },
  '武汉': {
    '01': { high: 8, low: 1, condition: '⛅ 多云', humidity: 72, wind: '3级', uv: '弱' },
    '02': { high: 10, low: 3, condition: '🌧️ 小雨', humidity: 80, wind: '3级', uv: '弱' },
    '03': { high: 16, low: 8, condition: '🌦️ 阵雨', humidity: 78, wind: '3级', uv: '弱' },
    '04': { high: 22, low: 14, condition: '⛅ 多云', humidity: 75, wind: '2级', uv: '强' },
    '05': { high: 27, low: 20, condition: '☀️ 晴天', humidity: 73, wind: '2级', uv: '强' },
    '06': { high: 30, low: 24, condition: '🌦️ 阵雨', humidity: 78, wind: '2级', uv: '强' },
    '07': { high: 35, low: 28, condition: '☀️ 晴天', humidity: 75, wind: '2级', uv: '极强' },
    '08': { high: 36, low: 27, condition: '⛅ 多云', humidity: 77, wind: '2级', uv: '极强' },
    '09': { high: 29, low: 22, condition: '⛅ 多云', humidity: 73, wind: '3级', uv: '强' },
    '10': { high: 23, low: 16, condition: '☀️ 晴天', humidity: 70, wind: '3级', uv: '强' },
    '11': { high: 17, low: 10, condition: '⛅ 多云', humidity: 72, wind: '3级', uv: '弱' },
    '12': { high: 10, low: 4, condition: '☀️ 晴天', humidity: 68, wind: '3级', uv: '弱' },
  },
  '长沙': {
    '01': { high: 9, low: 3, condition: '🌧️ 小雨', humidity: 82, wind: '3级', uv: '弱' },
    '02': { high: 11, low: 5, condition: '🌦️ 阵雨', humidity: 80, wind: '3级', uv: '弱' },
    '03': { high: 17, low: 10, condition: '⛅ 多云', humidity: 78, wind: '2级', uv: '弱' },
    '04': { high: 23, low: 16, condition: '🌦️ 阵雨', humidity: 76, wind: '2级', uv: '强' },
    '05': { high: 28, low: 21, condition: '☀️ 晴天', humidity: 74, wind: '2级', uv: '强' },
    '06': { high: 32, low: 25, condition: '🌧️ 大雨', humidity: 80, wind: '2级', uv: '强' },
    '07': { high: 36, low: 28, condition: '☀️ 晴天', humidity: 72, wind: '2级', uv: '极强' },
    '08': { high: 37, low: 29, condition: '⛅ 多云', humidity: 75, wind: '2级', uv: '极强' },
    '09': { high: 30, low: 23, condition: '⛅ 多云', humidity: 73, wind: '3级', uv: '强' },
    '10': { high: 24, low: 17, condition: '☀️ 晴天', humidity: 70, wind: '3级', uv: '强' },
    '11': { high: 18, low: 12, condition: '🌦️ 阵雨', humidity: 76, wind: '3级', uv: '弱' },
    '12': { high: 12, low: 5, condition: '⛅ 多云', humidity: 72, wind: '3级', uv: '弱' },
  },
  '青岛': {
    '01': { high: 3, low: -3, condition: '⛅ 多云', humidity: 65, wind: '5级', uv: '弱' },
    '02': { high: 5, low: -1, condition: '☀️ 晴天', humidity: 62, wind: '5级', uv: '弱' },
    '03': { high: 10, low: 4, condition: '⛅ 多云', humidity: 68, wind: '4级', uv: '弱' },
    '04': { high: 15, low: 9, condition: '🌦️ 阵雨', humidity: 72, wind: '4级', uv: '弱' },
    '05': { high: 20, low: 14, condition: '☀️ 晴天', humidity: 70, wind: '3级', uv: '强' },
    '06': { high: 24, low: 19, condition: '⛅ 多云', humidity: 75, wind: '3级', uv: '强' },
    '07': { high: 28, low: 23, condition: '⛅ 多云', humidity: 78, wind: '3级', uv: '强' },
    '08': { high: 29, low: 24, condition: '☀️ 晴天', humidity: 80, wind: '3级', uv: '强' },
    '09': { high: 26, low: 20, condition: '☀️ 晴天', humidity: 72, wind: '4级', uv: '强' },
    '10': { high: 20, low: 14, condition: '⛅ 多云', humidity: 68, wind: '4级', uv: '弱' },
    '11': { high: 13, low: 7, condition: '🌦️ 阵雨', humidity: 70, wind: '5级', uv: '弱' },
    '12': { high: 6, low: 1, condition: '⛅ 多云', humidity: 65, wind: '5级', uv: '弱' },
  },
  '南京': {
    '01': { high: 8, low: 1, condition: '⛅ 多云', humidity: 70, wind: '3级', uv: '弱' },
    '02': { high: 10, low: 3, condition: '🌧️ 小雨', humidity: 78, wind: '3级', uv: '弱' },
    '03': { high: 16, low: 8, condition: '⛅ 多云', humidity: 73, wind: '3级', uv: '弱' },
    '04': { high: 22, low: 14, condition: '🌦️ 阵雨', humidity: 75, wind: '2级', uv: '强' },
    '05': { high: 27, low: 20, condition: '☀️ 晴天', humidity: 72, wind: '2级', uv: '强' },
    '06': { high: 30, low: 24, condition: '🌧️ 大雨', humidity: 80, wind: '2级', uv: '强' },
    '07': { high: 35, low: 28, condition: '☀️ 晴天', humidity: 75, wind: '2级', uv: '极强' },
    '08': { high: 35, low: 27, condition: '⛅ 多云', humidity: 78, wind: '3级', uv: '极强' },
    '09': { high: 29, low: 22, condition: '⛅ 多云', humidity: 73, wind: '3级', uv: '强' },
    '10': { high: 23, low: 16, condition: '☀️ 晴天', humidity: 70, wind: '3级', uv: '强' },
    '11': { high: 17, low: 10, condition: '⛅ 多云', humidity: 72, wind: '3级', uv: '弱' },
    '12': { high: 10, low: 3, condition: '☀️ 晴天', humidity: 68, wind: '3级', uv: '弱' },
  },
  '苏州': {
    '01': { high: 8, low: 2, condition: '🌧️ 小雨', humidity: 78, wind: '3级', uv: '弱' },
    '02': { high: 10, low: 3, condition: '⛅ 多云', humidity: 75, wind: '3级', uv: '弱' },
    '03': { high: 16, low: 8, condition: '🌦️ 阵雨', humidity: 76, wind: '3级', uv: '弱' },
    '04': { high: 22, low: 14, condition: '⛅ 多云', humidity: 73, wind: '2级', uv: '强' },
    '05': { high: 27, low: 20, condition: '☀️ 晴天', humidity: 72, wind: '2级', uv: '强' },
    '06': { high: 30, low: 24, condition: '🌧️ 大雨', humidity: 80, wind: '2级', uv: '强' },
    '07': { high: 35, low: 28, condition: '⛅ 多云', humidity: 78, wind: '2级', uv: '极强' },
    '08': { high: 35, low: 27, condition: '☀️ 晴天', humidity: 76, wind: '3级', uv: '极强' },
    '09': { high: 29, low: 22, condition: '🌦️ 阵雨', humidity: 74, wind: '3级', uv: '强' },
    '10': { high: 23, low: 16, condition: '⛅ 多云', humidity: 70, wind: '3级', uv: '强' },
    '11': { high: 17, low: 10, condition: '☀️ 晴天', humidity: 72, wind: '3级', uv: '弱' },
    '12': { high: 10, low: 4, condition: '⛅ 多云', humidity: 70, wind: '3级', uv: '弱' },
  },
  '桂林': {
    '01': { high: 12, low: 6, condition: '🌧️ 小雨', humidity: 85, wind: '3级', uv: '弱' },
    '02': { high: 14, low: 8, condition: '🌦️ 阵雨', humidity: 83, wind: '3级', uv: '弱' },
    '03': { high: 18, low: 12, condition: '🌧️ 大雨', humidity: 85, wind: '2级', uv: '弱' },
    '04': { high: 24, low: 18, condition: '🌦️ 阵雨', humidity: 82, wind: '2级', uv: '强' },
    '05': { high: 28, low: 22, condition: '🌧️ 大雨', humidity: 83, wind: '2级', uv: '强' },
    '06': { high: 32, low: 25, condition: '🌧️ 暴雨', humidity: 85, wind: '2级', uv: '强' },
    '07': { high: 34, low: 27, condition: '⛅ 多云', humidity: 80, wind: '2级', uv: '极强' },
    '08': { high: 34, low: 26, condition: '🌦️ 阵雨', humidity: 82, wind: '2级', uv: '极强' },
    '09': { high: 30, low: 23, condition: '☀️ 晴天', humidity: 78, wind: '2级', uv: '强' },
    '10': { high: 25, low: 18, condition: '⛅ 多云', humidity: 76, wind: '3级', uv: '强' },
    '11': { high: 20, low: 13, condition: '🌦️ 阵雨', humidity: 78, wind: '3级', uv: '弱' },
    '12': { high: 15, low: 8, condition: '⛅ 多云', humidity: 76, wind: '3级', uv: '弱' },
  },
  '张家界': {
    '01': { high: 9, low: 3, condition: '🌧️ 小雨', humidity: 85, wind: '3级', uv: '弱' },
    '02': { high: 11, low: 5, condition: '🌦️ 阵雨', humidity: 83, wind: '3级', uv: '弱' },
    '03': { high: 17, low: 10, condition: '🌧️ 大雨', humidity: 84, wind: '2级', uv: '弱' },
    '04': { high: 23, low: 16, condition: '🌦️ 阵雨', humidity: 82, wind: '2级', uv: '强' },
    '05': { high: 27, low: 21, condition: '🌧️ 大雨', humidity: 83, wind: '2级', uv: '强' },
    '06': { high: 31, low: 24, condition: '🌧️ 暴雨', humidity: 85, wind: '2级', uv: '强' },
    '07': { high: 33, low: 26, condition: '⛅ 多云', humidity: 80, wind: '2级', uv: '极强' },
    '08': { high: 33, low: 25, condition: '🌦️ 阵雨', humidity: 82, wind: '2级', uv: '极强' },
    '09': { high: 29, low: 22, condition: '☀️ 晴天', humidity: 77, wind: '2级', uv: '强' },
    '10': { high: 24, low: 17, condition: '⛅ 多云', humidity: 76, wind: '3级', uv: '强' },
    '11': { high: 18, low: 12, condition: '🌦️ 阵雨', humidity: 78, wind: '3级', uv: '弱' },
    '12': { high: 12, low: 6, condition: '⛅ 多云', humidity: 76, wind: '3级', uv: '弱' },
  },
  '黄山': {
    '01': { high: 8, low: 2, condition: '🌧️ 小雨', humidity: 82, wind: '4级', uv: '弱' },
    '02': { high: 10, low: 4, condition: '🌦️ 阵雨', humidity: 80, wind: '3级', uv: '弱' },
    '03': { high: 16, low: 9, condition: '⛅ 多云', humidity: 76, wind: '3级', uv: '弱' },
    '04': { high: 22, low: 15, condition: '🌦️ 阵雨', humidity: 78, wind: '2级', uv: '强' },
    '05': { high: 26, low: 20, condition: '☀️ 晴天', humidity: 75, wind: '2级', uv: '强' },
    '06': { high: 29, low: 23, condition: '🌧️ 大雨', humidity: 82, wind: '2级', uv: '强' },
    '07': { high: 33, low: 26, condition: '⛅ 多云', humidity: 78, wind: '2级', uv: '极强' },
    '08': { high: 33, low: 25, condition: '☀️ 晴天', humidity: 76, wind: '2级', uv: '极强' },
    '09': { high: 28, low: 22, condition: '🌦️ 阵雨', humidity: 77, wind: '3级', uv: '强' },
    '10': { high: 23, low: 16, condition: '⛅ 多云', humidity: 74, wind: '3级', uv: '强' },
    '11': { high: 17, low: 10, condition: '☀️ 晴天', humidity: 72, wind: '3级', uv: '弱' },
    '12': { high: 10, low: 4, condition: '⛅ 多云', humidity: 72, wind: '3级', uv: '弱' },
  },
  '香港': {
    '01': { high: 19, low: 15, condition: '⛅ 多云', humidity: 75, wind: '3级', uv: '弱' },
    '02': { high: 20, low: 16, condition: '🌧️ 小雨', humidity: 80, wind: '3级', uv: '弱' },
    '03': { high: 23, low: 19, condition: '🌦️ 阵雨', humidity: 82, wind: '3级', uv: '弱' },
    '04': { high: 26, low: 22, condition: '🌧️ 大雨', humidity: 83, wind: '3级', uv: '强' },
    '05': { high: 29, low: 25, condition: '🌦️ 阵雨', humidity: 82, wind: '2级', uv: '强' },
    '06': { high: 31, low: 27, condition: '🌧️ 暴雨', humidity: 85, wind: '3级', uv: '强' },
    '07': { high: 33, low: 28, condition: '🌦️ 阵雨', humidity: 83, wind: '3级', uv: '极强' },
    '08': { high: 33, low: 28, condition: '⛅ 多云', humidity: 82, wind: '3级', uv: '极强' },
    '09': { high: 31, low: 27, condition: '🌧️ 台风', humidity: 85, wind: '5级', uv: '强' },
    '10': { high: 28, low: 24, condition: '⛅ 多云', humidity: 78, wind: '3级', uv: '强' },
    '11': { high: 24, low: 20, condition: '☀️ 晴天', humidity: 73, wind: '3级', uv: '弱' },
    '12': { high: 21, low: 16, condition: '⛅ 多云', humidity: 70, wind: '3级', uv: '弱' },
  },
  '澳门': {
    '01': { high: 18, low: 13, condition: '⛅ 多云', humidity: 73, wind: '3级', uv: '弱' },
    '02': { high: 19, low: 14, condition: '🌧️ 小雨', humidity: 80, wind: '3级', uv: '弱' },
    '03': { high: 22, low: 18, condition: '🌦️ 阵雨', humidity: 82, wind: '3级', uv: '弱' },
    '04': { high: 25, low: 21, condition: '🌧️ 大雨', humidity: 83, wind: '3级', uv: '强' },
    '05': { high: 28, low: 24, condition: '🌦️ 阵雨', humidity: 82, wind: '2级', uv: '强' },
    '06': { high: 30, low: 26, condition: '🌧️ 暴雨', humidity: 85, wind: '3级', uv: '强' },
    '07': { high: 32, low: 27, condition: '🌦️ 阵雨', humidity: 83, wind: '3级', uv: '极强' },
    '08': { high: 32, low: 27, condition: '⛅ 多云', humidity: 82, wind: '3级', uv: '极强' },
    '09': { high: 30, low: 26, condition: '🌧️ 台风', humidity: 85, wind: '5级', uv: '强' },
    '10': { high: 27, low: 23, condition: '⛅ 多云', humidity: 78, wind: '3级', uv: '强' },
    '11': { high: 23, low: 19, condition: '☀️ 晴天', humidity: 73, wind: '3级', uv: '弱' },
    '12': { high: 20, low: 15, condition: '⛅ 多云', humidity: 70, wind: '3级', uv: '弱' },
  },
  '台北': {
    '01': { high: 18, low: 13, condition: '🌧️ 小雨', humidity: 82, wind: '4级', uv: '弱' },
    '02': { high: 19, low: 14, condition: '🌦️ 阵雨', humidity: 80, wind: '3级', uv: '弱' },
    '03': { high: 22, low: 17, condition: '⛅ 多云', humidity: 78, wind: '3级', uv: '弱' },
    '04': { high: 26, low: 21, condition: '🌦️ 阵雨', humidity: 80, wind: '3级', uv: '强' },
    '05': { high: 29, low: 24, condition: '🌧️ 大雨', humidity: 82, wind: '2级', uv: '强' },
    '06': { high: 32, low: 26, condition: '🌧️ 暴雨', humidity: 85, wind: '3级', uv: '强' },
    '07': { high: 35, low: 28, condition: '🌦️ 阵雨', humidity: 82, wind: '3级', uv: '极强' },
    '08': { high: 34, low: 27, condition: '🌧️ 台风', humidity: 85, wind: '5级', uv: '强' },
    '09': { high: 31, low: 26, condition: '🌧️ 台风', humidity: 85, wind: '5级', uv: '强' },
    '10': { high: 27, low: 22, condition: '🌦️ 阵雨', humidity: 80, wind: '3级', uv: '强' },
    '11': { high: 22, low: 18, condition: '⛅ 多云', humidity: 76, wind: '3级', uv: '弱' },
    '12': { high: 19, low: 14, condition: '🌧️ 小雨', humidity: 80, wind: '4级', uv: '弱' },
  },
  'default': {
    'summer': { high: 30, low: 22, condition: '🌤️ 晴间多云', humidity: 65, wind: '2级', uv: '强', advice: '适合出行，注意防晒补水' },
    'winter': { high: 12, low: 4, condition: '☀️ 晴', humidity: 55, wind: '2级', uv: '中等', advice: '天气不错，建议带件外套' },
    'transition': { high: 22, low: 14, condition: '🌤️ 多云', humidity: 60, wind: '2级', uv: '中等', advice: '天气宜人，非常适合旅行' },
  }
};

// ========== 美食数据 ==========
const foods = {
  '北京': [
    { name: '四季民福烤鸭店', desc: '皮脆肉嫩的北京烤鸭，性价比超高的老字号', price: 120, score: 4.8, image: 'https://picsum.photos/seed/kaoya/400/300', tags: ['烤鸭', '老字号', '必吃'] },
    { name: '聚宝源铜锅涮肉', desc: '老北京铜锅涮羊肉，手切鲜羊肉是灵魂', price: 100, score: 4.7, image: 'https://picsum.photos/seed/shuanrou/400/300', tags: ['涮肉', '老北京', '传统'] },
    { name: 'TRB Hutong', desc: '胡同里的法式餐厅，环境与口感的双重享受', price: 300, score: 4.9, image: 'https://picsum.photos/seed/trb/400/300', tags: ['西餐', '胡同', '环境好'] },
    { name: '姚记炒肝', desc: '地道北京小吃，炒肝包子是经典早餐组合', price: 30, score: 4.5, image: 'https://picsum.photos/seed/chaogan/400/300', tags: ['小吃', '早餐', '地道'] },
  ],
  '上海': [
    { name: '南翔馒头店', desc: '正宗南翔小笼包，皮薄馅鲜汤汁饱满', price: 60, score: 4.6, image: 'https://picsum.photos/seed/xiaolong/400/300', tags: ['小笼包', '老字号', '必吃'] },
    { name: '老吉士酒家', desc: '本帮菜代表，红烧肉与蟹粉豆腐的经典味道', price: 120, score: 4.7, image: 'https://picsum.photos/seed/jishi/400/300', tags: ['本帮菜', '老上海', '精致'] },
    { name: 'FLORET CHILD', desc: '武康路边的法式甜品店，颜值与口感并存', price: 80, score: 4.5, image: 'https://picsum.photos/seed/floret/400/300', tags: ['甜品', '网红', '环境好'] },
    { name: '耳光馄饨', desc: '上海深夜食堂的传说，荠菜馄饨是招牌', price: 25, score: 4.4, image: 'https://picsum.photos/seed/hundun/400/300', tags: ['小吃', '深夜', '地道'] },
  ],
  '成都': [
    { name: '马路边边麻辣烫', desc: '正宗成都味，复古怀旧风的小店氛围', price: 60, score: 4.6, image: 'https://picsum.photos/seed/mala/400/300', tags: ['麻辣烫', '怀旧', '网红'] },
    { name: '陈麻婆豆腐', desc: '百年老店，麻婆豆腐的鼻祖，麻辣鲜香', price: 50, score: 4.7, image: 'https://picsum.photos/seed/mapo/400/300', tags: ['川菜', '老字号', '必吃'] },
    { name: '鹤鸣茶社', desc: '人民公园内的百年茶社，体验成都慢生活', price: 30, score: 4.6, image: 'https://picsum.photos/seed/team/400/300', tags: ['茶馆', '文化', '休闲'] },
    { name: '廊桥THE BRIDGE', desc: '锦江边的川菜fine dining，环境绝美的黑珍珠', price: 350, score: 4.8, image: 'https://picsum.photos/seed/langqiao/400/300', tags: ['精致川菜', '环境好', '黑珍珠'] },
  ],
  '杭州': [
    { name: '楼外楼', desc: '西湖边的百年名店，西湖醋鱼与东坡肉的经典', price: 150, score: 4.6, image: 'https://picsum.photos/seed/louwailou/400/300', tags: ['杭帮菜', '老字号', '西湖'] },
    { name: '知味观', desc: '杭州小吃的集大成者，猫耳朵与片儿川', price: 50, score: 4.5, image: 'https://picsum.photos/seed/zhiweiguan/400/300', tags: ['小吃', '老字号', '地道'] },
    { name: '桂语山房', desc: '满觉陇桂花树下的高端餐厅，意境与美味兼具', price: 280, score: 4.8, image: 'https://picsum.photos/seed/guiyu/400/300', tags: ['精致', '环境好', '黑珍珠'] },
  ],
  '西安': [
    { name: '老孙家泡馍', desc: '百年老字号的牛羊肉泡馍，西安味道的代表', price: 45, score: 4.6, image: 'https://picsum.photos/seed/paomo/400/300', tags: ['泡馍', '老字号', '必吃'] },
    { name: '长安大牌档', desc: '唐风主题餐厅，毛笔酥与葫芦鸡等创意陕菜', price: 80, score: 4.5, image: 'https://picsum.photos/seed/changan/400/300', tags: ['陕菜', '网红', '环境好'] },
    { name: '回民街小吃', desc: '西安最集中的美食街，烤肉串与甑糕不容错过', price: 30, score: 4.4, image: 'https://picsum.photos/seed/huimin2/400/300', tags: ['小吃', '夜市', '热闹'] },
  ],
  '广州': [
    { name: '点都德', desc: '广式早茶的金字招牌，虾饺与红米肠必点', price: 80, score: 4.7, image: 'https://picsum.photos/seed/diandude/400/300', tags: ['早茶', '老字号', '必吃'] },
    { name: '惠食佳', desc: '米其林推荐餐厅，啫啫煲系列堪称一绝', price: 120, score: 4.6, image: 'https://picsum.photos/seed/huishijia/400/300', tags: ['粤菜', '米其林', '啫啫煲'] },
    { name: '银记肠粉', desc: '广州最出名的肠粉店，滑嫩爽口的口感和酱油', price: 20, score: 4.5, image: 'https://picsum.photos/seed/changfen/400/300', tags: ['小吃', '早餐', '地道'] },
  ],
  '重庆': [
    { name: '珮姐老火锅', desc: '重庆火锅的标杆，麻辣鲜香的牛油锅底', price: 80, score: 4.7, image: 'https://picsum.photos/seed/huoguo/400/300', tags: ['火锅', '必吃', '网红'] },
    { name: '板凳面庄', desc: '重庆小面的灵魂味道，路边板凳上的市井美味', price: 15, score: 4.6, image: 'https://picsum.photos/seed/miantiao/400/300', tags: ['小面', '早餐', '地道'] },
    { name: '北索西餐', desc: '720度露台江景餐厅，重庆最美的夜景餐厅之一', price: 150, score: 4.5, image: 'https://picsum.photos/seed/beisuo/400/300', tags: ['西餐', '夜景', '环境好'] },
  ],
  '大理': [
    { name: '我在大理等你', desc: '洱海边的白族庭院餐厅，酸辣鱼与乳扇', price: 70, score: 4.5, image: 'https://picsum.photos/seed/dalieat/400/300', tags: ['白族菜', '洱海', '庭院'] },
    { name: '向月球飞去', desc: '古城里的法式简餐，二楼露台看苍山日落', price: 60, score: 4.4, image: 'https://picsum.photos/seed/moon/400/300', tags: ['西餐', '露台', '文艺'] },
  ],
  '三亚': [
    { name: '林姐香味海鲜', desc: '三亚人气海鲜加工店，新鲜平价又美味', price: 120, score: 4.6, image: 'https://picsum.photos/seed/haixian/400/300', tags: ['海鲜', '加工', '必吃'] },
    { name: '嗲嗲的椰子鸡', desc: '三个椰子一锅汤，清甜鲜嫩的海南味道', price: 80, score: 4.5, image: 'https://picsum.photos/seed/yeziji/400/300', tags: ['椰子鸡', '海南', '健康'] },
  ],
  '日本': [
    { name: '一兰拉面', desc: '日本豚骨拉面的代表，个人隔间的独特体验', price: 80, score: 4.5, image: 'https://picsum.photos/seed/ichiran/400/300', tags: ['拉面', '连锁', '必吃'] },
    { name: '築地市場', desc: '东京的厨房，最新鲜的寿司与海鲜丼', price: 100, score: 4.6, image: 'https://picsum.photos/seed/tsukiji/400/300', tags: ['海鲜', '市场', '新鲜'] },
    { name: '菊乃井', desc: '京都三星米其林怀石料理，日式美学的极致', price: 500, score: 4.9, image: 'https://picsum.photos/seed/kikunoi/400/300', tags: ['怀石', '米其林', '极致'] },
  ],
  '泰国': [
    { name: '建兴酒家', desc: '曼谷老牌泰菜馆，咖喱蟹是必点的招牌', price: 100, score: 4.6, image: 'https://picsum.photos/seed/somboon/400/300', tags: ['泰餐', '咖喱蟹', '老字号'] },
    { name: '芒果糯米饭', desc: '泰国街头的国民甜品，椰香芒果与糯米的完美组合', price: 20, score: 4.5, image: 'https://picsum.photos/seed/mango/400/300', tags: ['甜品', '街头', '必吃'] },
    { name: 'Blue Elephant', desc: '曼谷顶级泰国皇家料理餐厅，精致泰餐体验', price: 300, score: 4.7, image: 'https://picsum.photos/seed/blueelephant/400/300', tags: ['皇家泰餐', '米其林', '环境好'] },
  ],

  '深圳': [
    { name: '蘩楼', desc: '广式早茶老字号，虾饺皇与红米肠的极致享受', price: 80, score: 4.6, image: 'https://picsum.photos/seed/fanlou/400/300', tags: ['早茶', '粤菜', '老字号'] },
    { name: '润园四季', desc: '深圳椰子鸡鼻祖，竹笙与马蹄的清甜汤底', price: 100, score: 4.5, image: 'https://picsum.photos/seed/runyuan/400/300', tags: ['椰子鸡', '火锅', '养生'] },
    { name: '光明招待所', desc: '40年老店的光明乳鸽，皮脆肉嫩一咬爆汁', price: 70, score: 4.7, image: 'https://picsum.photos/seed/guangming/400/300', tags: ['乳鸽', '老字号', '农家菜'] },
    { name: '潮香四海', desc: '潮汕砂锅粥与卤水拼盘，深夜食堂的烟火气', price: 90, score: 4.4, image: 'https://picsum.photos/seed/chaoxiang/400/300', tags: ['潮汕菜', '砂锅粥', '夜宵'] },
    { name: '陈鹏鹏卤鹅', desc: '汕头澄海卤鹅深圳分号，鹅肝入口即化', price: 75, score: 4.5, image: 'https://picsum.photos/seed/lue/400/300', tags: ['卤鹅', '潮汕', '必吃'] },
  ],
  '武汉': [
    { name: '蔡林记', desc: '百年热干面老字号，芝麻酱香浓到骨子里', price: 15, score: 4.5, image: 'https://picsum.photos/seed/cailinji/400/300', tags: ['热干面', '早餐', '必吃'] },
    { name: '亢龙太子酒店', desc: '武汉宴请天花板，武昌鱼与莲藕排骨汤一绝', price: 120, score: 4.4, image: 'https://picsum.photos/seed/kanglong/400/300', tags: ['鄂菜', '宴请', '本地味'] },
    { name: '三镇民生甜食馆', desc: '老武汉过早圣地，豆皮糊汤粉面窝一网打尽', price: 20, score: 4.6, image: 'https://picsum.photos/seed/minsheng/400/300', tags: ['过早', '小吃', '老字号'] },
    { name: '巴厘龙虾', desc: '武汉小龙虾扛把子，油焖大虾配凉面绝了', price: 150, score: 4.7, image: 'https://picsum.photos/seed/bali/400/300', tags: ['小龙虾', '夜宵', '排队'] },
    { name: '老通城', desc: '毛主席点赞的三鲜豆皮，金黄酥脆内馅丰富', price: 20, score: 4.5, image: 'https://picsum.photos/seed/laotongcheng/400/300', tags: ['豆皮', '老字号', '小吃'] },
  ],
  '长沙': [
    { name: '超级文和友', desc: '老长沙缩影，小龙虾与猪油拌饭的市井味', price: 120, score: 4.5, image: 'https://picsum.photos/seed/wenheyou2/400/300', tags: ['小龙虾', '小吃', '网红'] },
    { name: '炊烟时代', desc: '走进联合国的湘菜代表，小炒黄牛肉封神', price: 80, score: 4.6, image: 'https://picsum.photos/seed/chuiyan/400/300', tags: ['湘菜', '必吃', '辣'] },
    { name: '茶颜悦色', desc: '长沙的城市名片，幽兰拿铁的奶油顶绝妙', price: 18, score: 4.8, image: 'https://picsum.photos/seed/chayan/400/300', tags: ['奶茶', '必喝', '排队'] },
    { name: '黑色经典', desc: '排队也要吃的臭豆腐，外脆里嫩灌汤爆汁', price: 15, score: 4.4, image: 'https://picsum.photos/seed/heise/400/300', tags: ['臭豆腐', '小吃', '必吃'] },
    { name: '费大厨', desc: '辣椒炒肉专门店，宁乡土猪肉配樟树港辣椒', price: 70, score: 4.4, image: 'https://picsum.photos/seed/feidachu/400/300', tags: ['湘菜', '辣椒炒肉', '排队'] },
  ],
  '青岛': [
    { name: '船歌鱼水饺', desc: '登上舌尖的青岛味道，墨鱼黄花鱼水饺鲜掉眉毛', price: 80, score: 4.6, image: 'https://picsum.photos/seed/chuange/400/300', tags: ['水饺', '海鲜', '必吃'] },
    { name: '九龙餐厅', desc: '30年老鲁菜馆子，香辣鱿鱼条和五花肉炒比管', price: 70, score: 4.5, image: 'https://picsum.photos/seed/jiulong/400/300', tags: ['鲁菜', '海鲜', '老店'] },
    { name: '王姐烧烤', desc: '青岛人的童年记忆，里脊肉串和大鱿鱼是王牌', price: 30, score: 4.3, image: 'https://picsum.photos/seed/wangjie/400/300', tags: ['烧烤', '小吃', '排队'] },
    { name: '前海沿', desc: '本地人扎堆的家庭菜馆，蛤蜊与青岛大包实惠美味', price: 50, score: 4.3, image: 'https://picsum.photos/seed/qianhai/400/300', tags: ['鲁菜', '家常', '实惠'] },
    { name: '青岛啤酒街', desc: '登州路整条街都是散啤，配辣炒蛤蜊就是青岛', price: 80, score: 4.5, image: 'https://picsum.photos/seed/pijiujie/400/300', tags: ['啤酒', '海鲜', '大排档'] },
  ],
  '南京': [
    { name: '南京大牌档', desc: '金陵风味集合，盐水鸭与美龄粥是必点', price: 80, score: 4.5, image: 'https://picsum.photos/seed/njdapaidang/400/300', tags: ['淮扬菜', '连锁', '特色'] },
    { name: '李记清真馆', desc: '七家湾百年锅贴，金黄酥脆的牛肉锅贴排队王', price: 30, score: 4.7, image: 'https://picsum.photos/seed/liji/400/300', tags: ['锅贴', '小吃', '排队'] },
    { name: '尹氏汤包', desc: '轻轻提慢慢移，先开窗后喝汤的鸡汁汤包', price: 35, score: 4.5, image: 'https://picsum.photos/seed/yinshi/400/300', tags: ['汤包', '小吃', '必吃'] },
    { name: '鸭得堡', desc: '南京鸭血粉丝汤天花板，汤白味浓料超足', price: 25, score: 4.4, image: 'https://picsum.photos/seed/yadebao/400/300', tags: ['鸭血粉丝', '小吃', '必吃'] },
    { name: '金陵饭店', desc: '南京顶级淮扬菜，蟹粉狮子头与松鼠鳜鱼', price: 300, score: 4.8, image: 'https://picsum.photos/seed/jinling/400/300', tags: ['淮扬菜', '高端', '宴请'] },
  ],
  '苏州': [
    { name: '得月楼', desc: '四百年苏帮菜老字号，松鼠鳜鱼和响油鳝糊经典', price: 150, score: 4.6, image: 'https://picsum.photos/seed/deyuelou/400/300', tags: ['苏帮菜', '老字号', '必吃'] },
    { name: '同得兴', desc: '苏州面馆头牌，枫镇大肉面与三虾面按季限量', price: 60, score: 4.7, image: 'https://picsum.photos/seed/tongdexing/400/300', tags: ['面馆', '时令', '排队'] },
    { name: '哑巴生煎', desc: '苏州人的早餐信仰，底部焦脆肉馅滚烫多汁', price: 20, score: 4.5, image: 'https://picsum.photos/seed/yaba/400/300', tags: ['生煎', '早餐', '必吃'] },
    { name: '松鹤楼', desc: '百年老店，虹桥赠珠与蜜汁火方的古法苏帮菜', price: 180, score: 4.5, image: 'https://picsum.photos/seed/songhelou/400/300', tags: ['苏帮菜', '老字号', '宴请'] },
    { name: '桃花源记', desc: '山塘街小吃集合，糖粥赤豆小圆子的苏式甜蜜', price: 40, score: 4.3, image: 'https://picsum.photos/seed/taohua/400/300', tags: ['甜品', '小吃', '网红'] },
  ],
  '桂林': [
    { name: '椿记烧鹅', desc: '桂林排队王，烧鹅皮脆肉嫩还会跳舞', price: 70, score: 4.6, image: 'https://picsum.photos/seed/chunji/400/300', tags: ['烧鹅', '粤桂菜', '排队'] },
    { name: '小南国', desc: '地道桂林菜馆，啤酒鱼与荔浦芋扣肉必点', price: 65, score: 4.4, image: 'https://picsum.photos/seed/xiaonanguo/400/300', tags: ['桂林菜', '啤酒鱼', '家常'] },
    { name: '崇善米粉', desc: '百年桂林米粉老店，锅烧牛肉配酸笋酸豆角', price: 12, score: 4.4, image: 'https://picsum.photos/seed/chongshan/400/300', tags: ['米粉', '小吃', '早餐'] },
    { name: '阿甘酒家', desc: '阳朔老字号，黄焖土鸡与漓江虾的农家味道', price: 60, score: 4.3, image: 'https://picsum.photos/seed/agan/400/300', tags: ['农家菜', '阳朔', '实惠'] },
    { name: '田螺酿', desc: '漓江畔的夜市传奇，螺蛳酿与炒粉利的地道宵夜', price: 40, score: 4.3, image: 'https://picsum.photos/seed/tianluo/400/300', tags: ['小吃', '夜市', '阳朔'] },
  ],
  '张家界': [
    { name: '胡师傅三下锅', desc: '张家界必吃头牌，腊肉肥肠猪肚一锅炖', price: 55, score: 4.5, image: 'https://picsum.photos/seed/hushifu/400/300', tags: ['三下锅', '湘西', '必吃'] },
    { name: '乐口福', desc: '40年土家菜馆，酸汤鱼与蕨粑腊肉的土家味', price: 60, score: 4.3, image: 'https://picsum.photos/seed/lekoufu/400/300', tags: ['土家菜', '老店', '本地'] },
    { name: '湘健土菜馆', desc: '武陵源人气餐馆，血粑鸭和炒野山菌地道', price: 55, score: 4.4, image: 'https://picsum.photos/seed/xiangjian/400/300', tags: ['土家菜', '实惠', '本地'] },
    { name: '玺山特色餐厅', desc: '天门山索道下的网红餐厅，岩耳炖土鸡绝了', price: 80, score: 4.3, image: 'https://picsum.photos/seed/xishan/400/300', tags: ['特色', '土鸡', '网红'] },
    { name: '秦大妈', desc: '张家界本地人口碑店，土家扣肉与合渣是招牌', price: 50, score: 4.4, image: 'https://picsum.photos/seed/qindama/400/300', tags: ['土家菜', '口碑', '本地'] },
  ],
  '黄山': [
    { name: '徽商故里', desc: '屯溪老街徽菜代表，臭鳜鱼与毛豆腐的徽派一绝', price: 120, score: 4.6, image: 'https://picsum.photos/seed/huishang/400/300', tags: ['徽菜', '必吃', '老字号'] },
    { name: '老街第一楼', desc: '占据老街黄金位，胡适一品锅与刀板香地道', price: 90, score: 4.4, image: 'https://picsum.photos/seed/diyilou/400/300', tags: ['徽菜', '屯溪', '排队'] },
    { name: '王记黄山烧饼', desc: '梅干菜扣肉馅的黄山烧饼，酥脆掉渣满口香', price: 15, score: 4.5, image: 'https://picsum.photos/seed/wangji/400/300', tags: ['烧饼', '小吃', '伴手礼'] },
    { name: '汪一挑馄饨', desc: '挑着担子走街串巷的非遗馄饨，皮薄如纸', price: 20, score: 4.4, image: 'https://picsum.photos/seed/wangyitiao/400/300', tags: ['馄饨', '非遗', '小吃'] },
    { name: '徽州味道', desc: '宏村景区旁农家乐，土鸡汤与笋干烧肉原汁原味', price: 70, score: 4.3, image: 'https://picsum.photos/seed/huizhou/400/300', tags: ['农家菜', '宏村', '土鸡'] },
  ],
  '香港': [
    { name: '添好運', desc: '全球最平价的米其林一星，酥皮叉烧包封神', price: 50, score: 4.7, image: 'https://picsum.photos/seed/timhowan/400/300', tags: ['米其林', '点心', '必吃'] },
    { name: '九记牛腩', desc: '中环排队传奇，清汤牛腩烂而不散汤鲜味浓', price: 80, score: 4.6, image: 'https://picsum.photos/seed/jiuji/400/300', tags: ['牛腩面', '排队', '老字号'] },
    { name: '镛记酒家', desc: '70年烧鹅世家，炭火烧鹅皮脆似玻璃纸', price: 200, score: 4.5, image: 'https://picsum.photos/seed/yungkee/400/300', tags: ['烧鹅', '老字号', '宴请'] },
    { name: '一兰拉面', desc: '铜锣湾必打卡，单人隔间的日式拉面体验', price: 100, score: 4.4, image: 'https://picsum.photos/seed/ichiran/400/300', tags: ['拉面', '日式', '网红'] },
    { name: '兰芳园', desc: '丝袜奶茶发源地，港式奶茶配菠萝油绝了', price: 40, score: 4.5, image: 'https://picsum.photos/seed/lanfong/400/300', tags: ['奶茶', '茶餐厅', '必喝'] },
  ],
  '澳门': [
    { name: '安德鲁饼店', desc: '葡挞发源地路环总店，刚出炉的挞皮酥得掉渣', price: 15, score: 4.8, image: 'https://picsum.photos/seed/andrew/400/300', tags: ['葡挞', '必吃', '老字号'] },
    { name: '陈光记', desc: '70年烧腊老字号，黑椒烧鹅饭澳门独一味', price: 50, score: 4.5, image: 'https://picsum.photos/seed/chenguang/400/300', tags: ['烧腊', '老字号', '必吃'] },
    { name: '盛记白粥', desc: '70年早餐食堂，白粥绵得如豆浆配萝卜糕', price: 20, score: 4.3, image: 'https://picsum.photos/seed/shengji/400/300', tags: ['早餐', '粥', '老字号'] },
    { name: '新益美食', desc: '创意葡国菜，咖喱牛尾与非洲鸡的fusion风味', price: 100, score: 4.4, image: 'https://picsum.photos/seed/xinyi/400/300', tags: ['葡国菜', 'fusion', '特色'] },
    { name: '义顺牛奶公司', desc: '百年双皮奶，温润如丝的双皮奶和姜汁撞奶', price: 30, score: 4.6, image: 'https://picsum.photos/seed/yishun/400/300', tags: ['甜品', '双皮奶', '必吃'] },
  ],
  '台北': [
    { name: '鼎泰丰', desc: '信义路总店，18折小笼包薄透如纸汤汁鲜美', price: 150, score: 4.8, image: 'https://picsum.photos/seed/dingtaifeng/400/300', tags: ['小笼包', '米其林', '必吃'] },
    { name: '永康牛肉面', desc: '50年老店，红烧半筋半肉面软烂入味汤头浓郁', price: 60, score: 4.6, image: 'https://picsum.photos/seed/yongkang/400/300', tags: ['牛肉面', '老字号', '必吃'] },
    { name: '林东芳牛肉面', desc: '台北三大牛肉面之一，花干与辣油是灵魂', price: 55, score: 4.5, image: 'https://picsum.photos/seed/lindongfang/400/300', tags: ['牛肉面', '排队', '老店'] },
    { name: '金峰卤肉饭', desc: '南门市场旁排队名店，卤肉肥而不腻入口即化', price: 25, score: 4.5, image: 'https://picsum.photos/seed/jinfeng/400/300', tags: ['卤肉饭', '小吃', '必吃'] },
    { name: 'Ice Monster', desc: '台湾芒果冰创始店，新鲜芒果雪花冰份量惊人', price: 60, score: 4.6, image: 'https://picsum.photos/seed/icemonster/400/300', tags: ['甜品', '芒果冰', '网红'] },
  ],
  'default': [
    { name: '本地特色餐厅', desc: '体验地道风味的首选，本地人常去的老店', price: 80, score: 4.5, image: 'https://picsum.photos/seed/local/400/300', tags: ['地道', '特色', '推荐'] },
    { name: '人气美食街', desc: '汇集各种小吃的烟火气美食街，好吃不贵', price: 40, score: 4.3, image: 'https://picsum.photos/seed/foodstreet/400/300', tags: ['小吃', '热闹', '性价比'] },
    { name: '观景餐厅', desc: '环境优美的高颜值餐厅，适合拍照约会', price: 150, score: 4.4, image: 'https://picsum.photos/seed/viewrest/400/300', tags: ['环境好', '观景', '情调'] },
  ]
};

// ========== 境外安全数据 ==========
const overseasSafety = {
  '日本': {
    country: '日本',
    level: '一级（注意安全）',
    levelColor: 'warning',
    embassyPhone: '+81-3-3403-3388',
    emergencyPhone: '110（报警）/ 119（急救/火警）',
    alerts: [
      '日本近期进入梅雨季，部分地区可能有台风，请关注天气预报',
      '近期日本流感病例较多，建议佩戴口罩',
      '日本消费税已上调至10%，购物时注意含税/不含税价格',
    ],
    tips: [
      '随身携带护照复印件，原件存放在酒店保险箱',
      '日本街道垃圾桶较少，建议随身携带垃圾袋',
      '地铁内请勿打电话，手机调至静音模式'
    ]
  },
  '泰国': {
    country: '泰国',
    level: '二级（谨慎前往）',
    levelColor: 'warning',
    embassyPhone: '+66-2-245-7044',
    emergencyPhone: '191（报警）/ 1155（旅游警察）',
    alerts: [
      '泰国南部部分地区有安全形势波动，避免前往边境区域',
      '当前为泰国雨季，部分地区有洪水风险',
      '警惕"零团费"旅游陷阱和免税店购物骗局',
    ],
    tips: [
      '尊重泰国皇室，避免发表不当言论',
      '进入寺庙需衣着得体，脱鞋入内',
      '切勿触碰他人头部，脚底不要朝向佛像'
    ]
  },
  '韩国': {
    country: '韩国',
    level: '一级（注意安全）',
    levelColor: 'warning',
    embassyPhone: '+82-2-738-1038',
    emergencyPhone: '112（报警）/ 119（急救/火警）',
    alerts: [
      '韩国近期部分地区有集会活动，注意避开人群密集区域',
      '夏季高温预警，注意防暑',
    ],
    tips: [
      '韩国公共场所吸烟罚款较重，注意禁烟标识',
      '地铁和公交车上"老弱病残孕"专座即使空着也不要坐',
    ]
  },

  '香港': {
    country: '中国香港',
    level: '安全',
    levelColor: 'safe',
    embassyPhone: '外交部驻港公署 +852-2106 6303',
    emergencyPhone: '999（报警/火警/急救）',
    alerts: [
      '夏季为台风季，出行前注意查看天气预警',
      '香港公共场所禁烟严格，罚款较重',
    ],
    tips: [
      '香港地铁（MTR）覆盖全面，建议购买八达通卡',
      '港币为通用货币，部分商户支持支付宝/微信支付',
      '香港靠左行驶，过马路注意来车方向',
    ]
  },
  '澳门': {
    country: '中国澳门',
    level: '安全',
    levelColor: 'safe',
    embassyPhone: '外交部驻澳公署 +853-8791 5119',
    emergencyPhone: '999（报警/火警/急救）',
    alerts: [
      '澳门娱乐场所21岁以下禁止进入',
      '夏季注意台风天气预警',
    ],
    tips: [
      '澳门通用港币和澳门币，大部分商家接受人民币',
      '澳门各大酒店提供免费穿梭巴士（发财车）',
      '氹仔和澳门半岛之间有免费轻轨接驳',
    ]
  },
  '台北': {
    country: '中国台湾',
    level: '安全',
    levelColor: 'safe',
    embassyPhone: '海旅会台北办事处 +886-2-2707-2188',
    emergencyPhone: '110（报警）/ 119（急救/火警）',
    alerts: [
      '台湾地区通行证和入台证缺一不可，出行前务必确认',
      '夏季为台风多发季节，山区可能有地质灾害',
    ],
    tips: [
      '台湾公共交通发达，建议使用悠游卡搭乘捷运和公交',
      '夜市是台湾美食精华，记得带现金（部分摊位不支持刷卡）',
      '台湾靠右行驶，与大陆相同',
    ]
  },
  'default': {
    country: '目的地国家',
    level: '请查阅最新安全评级',
    levelColor: 'default',
    embassyPhone: '请查询中国外交部网站',
    emergencyPhone: '请查询当地紧急号码',
    alerts: [
      '建议出行前查阅中国外交部最新旅行安全提醒',
      '关注当地使领馆微信公众号获取最新信息',
      '建议购买覆盖医疗救援的旅行保险',
    ],
    tips: [
      '将行程告知家人或朋友，保持定期联系',
      '保存当地使领馆的紧急联系电话',
      '下载离线地图和翻译工具以备不时之需'
    ]
  }
};

// ========== 本地新闻 ==========
const localNews = {
  '日本': [
    { title: '日本多地迎来梅雨季，东京连续降雨', date: '2026-07-01', source: 'NHK' },
    { title: '日元汇率持续走低，赴日旅游购物正当时', date: '2026-06-30', source: '共同社' },
    { title: '大阪世博会筹备中，部分景点临时关闭', date: '2026-06-28', source: '朝日新闻' },
  ],
  '泰国': [
    { title: '泰国雨季来临，普吉岛等地发布暴雨预警', date: '2026-07-01', source: '曼谷邮报' },
    { title: '泰国对中国游客免签政策延长至2027年', date: '2026-06-25', source: '泰国旅游局' },
  ],
  '韩国': [
    { title: '韩国多地发布高温警报，建议减少户外活动', date: '2026-07-01', source: '韩联社' },
    { title: '韩国对中国团体游客签证简化政策实施', date: '2026-06-20', source: '韩国文化体育观光部' },
  ],

  '香港': [
    { title: '香港迪士尼乐园推出夏日限定活动', date: '2026-07-01', source: '香港01' },
    { title: '港铁东铁线过海段通车，新界到港岛15分钟', date: '2026-06-28', source: '明报' },
    { title: '香港国际机场三跑道系统全面运营', date: '2026-06-15', source: '南华早报' },
  ],
  '澳门': [
    { title: '澳门大赛车博物馆推出全新互动体验', date: '2026-07-01', source: '澳门日报' },
    { title: '澳门轻轨氹仔线延伸至妈阁站即将开通', date: '2026-06-20', source: '澳门力报' },
  ],
  '台北': [
    { title: '台北夏季旅展盛大开幕，推多项旅游优惠', date: '2026-07-01', source: '联合报' },
    { title: '台北捷运淡水信义线延伸工程持续推进', date: '2026-06-25', source: '自由时报' },
    { title: '猫空缆车水晶车厢暑期延长运营时间', date: '2026-06-18', source: '中时电子报' },
  ],
  'default': []
};

// ========== 判断是否为境外 ==========
const overseasCities = ['日本', '泰国', '韩国', '新加坡', '马来西亚', '美国', '英国', '法国', '德国', '意大利', '西班牙', '澳大利亚', '新西兰', '加拿大', '埃及', '土耳其', '迪拜', '马尔代夫', '巴厘岛', '越南', '柬埔寨', '尼泊尔', '香港', '澳门', '台北'];

function isOverseas(destination) {
  return overseasCities.some(city => destination.includes(city));
}

// ========== 获取天气 ==========
function getWeather(destination, startDate, days) {
  const cityWeather = weatherData[destination] || weatherData['default'];
  const result = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateStr = `${month}/${String(date.getDate()).padStart(2, '0')}`;
    
    let dayWeather;
    if (cityWeather[month]) {
      dayWeather = { ...cityWeather[month] };
    } else {
      const m = date.getMonth() + 1;
      const season = (m >= 5 && m <= 8) ? 'summer' :
                     (m >= 11 || m <= 2) ? 'winter' : 'transition';
      dayWeather = { ...weatherData['default'][season] };
    }
    
    result.push({
      date: dateStr,
      weekday: ['周日','周一','周二','周三','周四','周五','周六'][date.getDay()],
      ...dayWeather
    });
  }
  return result;
}

// ========== 获取景点 ==========
function getAttractions(destination) {
  // 模糊匹配
  for (const [key, value] of Object.entries(attractions)) {
    if (destination.includes(key) || key.includes(destination)) {
      return value;
    }
  }
  return attractions['default'];
}

// ========== 获取网红打卡点 ==========
function getInstagramSpots(destination) {
  for (const [key, value] of Object.entries(instagramSpots)) {
    if (destination.includes(key) || key.includes(destination)) {
      return value;
    }
  }
  return instagramSpots['default'];
}

// ========== 获取美食 ==========
function getFoods(destination, budget) {
  let list;
  for (const [key, value] of Object.entries(foods)) {
    if (destination.includes(key) || key.includes(destination)) {
      list = value;
      break;
    }
  }
  if (!list) list = foods['default'];
  
  return list.map(f => ({
    ...f,
    budgetMatch: f.price <= budget / 5 ? '✅ 预算友好' : (f.price <= budget / 2 ? '💰 适中' : '💎 稍贵但值得')
  }));
}

// ========== 获取境外安全信息 ==========
function getSafetyInfo(destination) {
  for (const [key, value] of Object.entries(overseasSafety)) {
    if (destination.includes(key)) return value;
  }
  return overseasSafety['default'];
}

function getLocalNews(destination) {
  for (const [key, value] of Object.entries(localNews)) {
    if (destination.includes(key)) return value;
  }
  return localNews['default'];
}

module.exports = {
  isOverseas,
  getWeather,
  getAttractions,
  getInstagramSpots,
  getFoods,
  getSafetyInfo,
  getLocalNews
};
