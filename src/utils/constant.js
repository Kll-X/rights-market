// 渠道code
const CHANNELCODE = {
    all: '',
    wx: 67055,
    st: 67054,
    group: 67057,
    sms: 67058,
    banner: 67059
}

// 统计key
const STATISTICS = process.env.VUE_APP_BUILD === 'production' ?{
    activityId: '9900045',
    // 全渠道
    all: [
        'e7a24cdc56d44c1c90b49c22eg07d7k1', //首页
        'e7a24cdc56d44c1c90b49c34fh18e7k2', //详情页
        'e7a24cdc56d44c1c90b49c34fh18e7k3'  //订单页
    ],
    // 微信
    wx: [
        'e7a24cdc76d44c1c90b49c22eg07d7k7', //首页
        'e7a24cdc76d44c1c90b49c34fh18e7k8', //详情页
        'e7a24cdc76d44c1c90b49c34fh18e7k9', //订单页
    ],
    // 手厅
    st: [
        'e7a24cdc66d44c1c90b49c22eg07d7k4', //分类页
        'e7a24cdc66d44c1c90b49c34fh18e7k5', //详情页
        'e7a24cdc66d44c1c90b49c34fh18e7k6'  //订单页
    ]
}:{
    activityId: '9900046',
    // 全渠道
    all: [
        'f7a24cdc56d44c1c90b59c22eg07d7l1', //首页
        'f7a24cdc56d44c1c90b59c34fh18e7l2', //详情页
        'f7a24cdc56d44c1c90b59c34fh18e7l3'  //订单页
    ],
    // 微信
    wx: [
        'f7a24cdc76d44c1c90b59c22eg07d7l7', //首页
        'f7a24cdc76d44c1c90b59c34fh18e7l8', //详情页
        'f7a24cdc76d44c1c90b59c34fh18e7l9', //订单页
    ],
    // 手厅
    st: [
        'f7a24cdc66d44c1c90b59c22eg07d7l4', //首页
        'f7a24cdc66d44c1c90b59c34fh18e7l5', //详情页
        'f7a24cdc66d44c1c90b59c34fh18e7l6'  //订单页
    ]
}

// 分省统计
const STATISTICS_PROVINCE = {
    activityId: '9900045',
    key: '4e7341683fdb466bb34b86ebc006385c'
}

// 517活动统计
const STATISTICS_ACTIVITY = {
    "517":{
        activityId: '200514002'
    },
    "618":{
        activityId: '200616000',
        key_new:'284c95172b4d4366a8fbfdbd19c4fd9f',
        key_sales:'cd4d6a59785a4493adadc824178481d5',
        key_btns:'249b8f8e683f460582908097396678ba'
    }
}

// 抄底购（优惠购）活动产品
const APPLIST_CHAODIGOU = [
    {
        title:'腾讯视频月会员',
        currentPrice:'1500',
        originPrice:'2500',
        icon: require("@/assets/imgs/custompage/1/icon_tx_video.png"),
        exist: true,
        salesid: '102877',
        proid: '6001581'
    },{
        title:'优酷视频月会员',
        currentPrice:'1400',
        originPrice:'2500',
        icon: require("@/assets/imgs/custompage/1/icon_youku.png"),
        exist: true,
        salesid: '102881',
        proid: '6001599'
    },{
        title:'酷我音乐豪华VIP月会员',
        currentPrice:'1100',
        originPrice:'1800',
        icon: require("@/assets/imgs/custompage/1/icon_kuwo.png"),
        exist: true,
        salesid: '102859',
        proid: '6001593'
    },{
        title:'虾米音乐SVIP月卡',
        currentPrice:'900',
        originPrice:'1200',
        icon: require("@/assets/imgs/custompage/1/icon_xiami.png"),
        exist: true,
        salesid: '102861',
        proid: '6001567'
    },{
        title:'QQ音乐-绿钻豪华版会员',
        currentPrice:'1200',
        originPrice:'1800',
        icon: require("@/assets/imgs/custompage/1/icon_qq_music.png"),
        exist: true,
        salesid: '102883',
        proid: '6001587'
    },{
        title:'饿了么超级会员月卡',
        currentPrice:'900',
        originPrice:'1500',
        icon: require("@/assets/imgs/custompage/1/icon_elm.png"),
        exist: true,
        salesid: '102869',
        proid: '6001573'
    },{
        title:'喜马拉雅月会员',
        currentPrice:'1200',
        originPrice:'2500',
        icon: require("@/assets/imgs/custompage/1/icon_xmly.png"),
        exist: true,
        salesid: '102865',
        proid: '6001569'
    },{
        title:'蜻蜓FM月会员',
        currentPrice:'1200',
        originPrice:'3000',
        icon: require("@/assets/imgs/custompage/1/icon_qtFM.png"),
        exist: true,
        salesid: '102867',
        proid: '6001571'
    },{
        title:'QQ阅读月卡',
        currentPrice:'1200',
        originPrice:'1800',
        icon: require("@/assets/imgs/custompage/1/icon_qq_read.png"),
        exist: true,
        salesid: '102873',
        proid: '6001577'
    },{
        title:'咪咕音乐月卡',
        currentPrice:'400',
        originPrice:'1200',
        icon: require("@/assets/imgs/custompage/1/icon_migu_music.png"),
        exist: true,
        salesid: '102863',
        proid: '6001597'
    },{
        title:'咪咕阅读月包',
        currentPrice:'500',
        originPrice:'1200',
        icon: require("@/assets/imgs/custompage/1/icon_migu_read.png"),
        exist: true,
        salesid: '102875',
        proid: '6001579'
    },{
        title:'咪咕视频月会员',
        currentPrice:'600',
        originPrice:'2500',
        icon: require("@/assets/imgs/custompage/1/icon_migu_video.png"),
        exist: true,
        salesid: '102879',
        proid: '6001583'
    },{
        title:'掌阅VIP月卡',
        currentPrice:'1200',
        originPrice:'1800',
        icon: require("@/assets/imgs/custompage/1/icon_zhangyue.png"),
        exist: true,
        salesid: '102871',
        proid: '6001575'
    }
]

//618会员开幕活动aid
const AID_VIPOPENING = '20200618001';

// 618会员开幕活动年卡产品
const APPLIST_VIPOPENING = [
    {
        name:'爱奇艺黄金VIP会员年卡',
        showname: '爱奇艺黄金会员年卡',
        price:'9900',
        originprice:'19800',
        date:'6月18日-6月20日',
        startdate: '2020/6/10',
        expiredate: '2020/6/21',
        icon: require("@/assets/imgs/custompage/2/icon_iqy.png"),
        saleid: '103017',
        proid: '6001729'
    },{
        name:'芒果TVVIP会员年卡',
        showname:'芒果TV会员年卡',
        price:'9900',
        originprice:'19800',
        date:'6月18日-6月21日',
        startdate: '2020/6/10',
        expiredate: '2020/6/22',
        icon: require("@/assets/imgs/custompage/2/icon_mtv.png"),
        saleid: '103021',
        proid: '6001733'
    },{
        name:'优酷视频VIP会员年卡',
        showname:'优酷会员年卡',
        price:'9900',
        originprice:'19800',
        date:'6月18日-6月22日',
        startdate: '2020/6/10',
        expiredate: '2020/6/23',
        icon: require("@/assets/imgs/custompage/2/icon_youku.png"),
        saleid: '103019',
        proid: '6001731'
    }
]
// 618会员开幕活动产品9元购
const APPLIST_VIPOPENING_NINE = [
    {
        name:'喜马拉雅会员月卡',
        price:'900',
        originprice:'2500',
        icon: require("@/assets/imgs/custompage/2/icon_xmly.png"),
        saleid: '103031',
        proid: '6001743'
    },{
        name:'咪咕视频钻石会员月卡',
        price:'900',
        originprice:'2500',
        icon: require("@/assets/imgs/custompage/2/icon_migu.png"),
        saleid: '103023',
        proid: '6001735'
    },{
        name:'酷我音乐豪华VIP会员月卡',
        price:'900',
        originprice:'1800',
        icon: require("@/assets/imgs/custompage/2/icon_kuwo.png"),
        saleid: '103025',
        proid: '6001737'
    },{
        name:'饿了么超级会员月卡',
        price:'900',
        originprice:'1500',
        icon: require("@/assets/imgs/custompage/2/icon_elm.png"),
        saleid: '102869',
        proid: '6001573'
    },{
        name:'掌阅VIP会员包月卡',
        price:'900',
        originprice:'1800',
        icon: require("@/assets/imgs/custompage/2/icon_zhangyue.png"),
        saleid: '103029',
        proid: '6001741'
    },{
        name:'QQ阅读会员月卡',
        price:'900',
        originprice:'1800',
        icon: require("@/assets/imgs/custompage/2/icon_qqread.png"),
        saleid: '103027',
        proid: '6001739'
    },{
        name:'蜻蜓FM超级会员月卡',
        price:'900',
        originprice:'3000',
        icon: require("@/assets/imgs/custompage/2/icon_qingting.png"),
        saleid: '103033',
        proid: '6001745'
    },{
        name:'书旗小说会员月卡',
        price:'900',
        originprice:'1500',
        icon: require("@/assets/imgs/custompage/2/icon_shuqi.png"),
        saleid: '103037',
        proid: '6001749'
    }
]


// 订购会员、退订会员订单参数信息
const VIPORDER = {
    proId:process.env.VUE_APP_BUILD === 'production' ?'6001727':'6000784',
    salesId:process.env.VUE_APP_BUILD === 'production' ?'103015':'102160',
    name:process.env.VUE_APP_BUILD === 'production' ?'权益超市黄金会员（权益超市-话费支付）':'用户会员销售品',
    dealType: 0,
    isPay: 1,
    payType: 10,
    amount: process.env.VUE_APP_BUILD === 'production' ? 500 : 1,
    orderWay: 1,
    renewId:'1',
    smsCode: '',
};

// 领取新人礼包订单参数信息
const NEWVIPGIFT = {
    proId:process.env.VUE_APP_BUILD === 'production' ?'6001725':'6000692',
    salesId:process.env.VUE_APP_BUILD === 'production' ?'103011':'102125',
    name:process.env.VUE_APP_BUILD === 'production' ?'1GB通用流量日包（权益超市会员专属）':'新人礼包销售品',
    dealType: 0,
    isPay: 1,
    payType: 10,
    amount: 0,
    orderWay: 0,
    smsCode: '',
}

export {STATISTICS,CHANNELCODE,APPLIST_CHAODIGOU,STATISTICS_PROVINCE,STATISTICS_ACTIVITY,VIPORDER,NEWVIPGIFT,APPLIST_VIPOPENING,APPLIST_VIPOPENING_NINE,AID_VIPOPENING}