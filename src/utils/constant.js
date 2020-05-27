// 渠道code
const CHANNELCODE = {
    all: '',
    wx: 67055,
    st: 67054
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
        'f7a24cdc66d44c1c90b59c22eg07d7l4', //分类页
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

export {STATISTICS,CHANNELCODE,APPLIST_CHAODIGOU,STATISTICS_PROVINCE,STATISTICS_ACTIVITY}