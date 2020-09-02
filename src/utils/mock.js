var Mock = require('mockjs');
var config = {
    vipFlag:0
}
const mockingAPI = [
    // 'api/order/placeOrder',
    // 'api/vip/myVip',
    // 'api/channel/verfy',
    // 'api/cmpp/checkSmsCode',
    // 'api/order/queryOrderList.do',
    // 'api/sales/hotSales'
]

function mock(api,method,data,callback,dataIndexName){
    if(mockingAPI.indexOf(api)<=-1) return;
    window.console.log(api,data)
    api = new RegExp(api.replace(/\//g,'\\/'));
    Mock.mock(api,method,()=>{
        if(callback){
            callback();
        }
        return data instanceof Array ? data[config[dataIndexName]]: data;
    })
}

mock('api/order/placeOrder','post', {
        data: null,
        msg: "订购成功",
        resultCode: 0
    }
    ,()=>{
        config.vipFlag = 1
    }
);

mock('api/channel/verfy','post', {
    data: {fullCode: "00010017", pageVersion: 0},
    msg: "success",
    resultCode: 0
}
);

mock('api/order/queryOrderList','post', 
    {
        data: [{
            custVipId: "",
            effect: "",
            expireTime: "",
            iconUrl: 'icon_vip.png',
            istx: 0,
            mainStatus: 5,
            mid: 0,
            name: '权益超市黄金会的大幅度哈的',
            orderId: "0q1nZx/ClSZLwYCh9MM6opigiX+ae1EoK9rfW+SUPUc=",
            orderWay: "",
            payType: 1,
            price: 1000,
            prodId: 6000742,
            qyPayType: "-1",
            renewId: "",
            salesId: 102065,
            status: 1,
            td: "",
            updateTime: "2020-03-15 10:36:10",
            salesType: 0
        }],
        msg: "success",
        resultCode: 0
    }
    );

mock('api/home/findSecKill','post',
    {
    data: {
        activityStatus: 1,
        endTime: "2020-08-01 23:00:00",
        list: [{
        aid: "20200806001",
        availableNum: "8",
        cid: "10",
        icon: "102505&6001211.png",
        mid: "42",
        name: "美团外卖",
        num: "10",
        originprice: 1000,
        price: "100",
        proid: "6001965",
        remark: "无",
        saleid: "103253"},{
        aid: "20200806001",
        availableNum: "9",
        cid: "10",
        icon: "102183&6000859.png",
        mid: "43",
        name: "腾讯视频",
        num: "10",
        originprice: 2500,
        price: "100",
        proid: "6001967",
        remark: "无",
        saleid: "103255"},{
        aid: "20200806001",
        availableNum: "9",
        cid: "10",
        icon: "102171&6000847.png",
        mid: "44",
        name: "喜马拉雅",
        num: "10",
        originprice: 2500,
        price: "100",
        proid: "6001969",
        remark: "无",
        saleid: "103257"}],
        startTime: "2020-07-30 00:00:00"},
    msg: "success",
    resultCode: 0
    }
)

mock('api/vip/myVip','post', [
    // {
    //     data: [],
    //     msg: "success",
    //     resultCode: 0
    // },
    // {
    //     data: [
    //         {
    //         cancelFlag: "1",
    //         effectDaysBefore: 54,
    //         effectTime: "20200617234550",
    //         expireTime: "20200820000000",
    //         hasNewGift: "1",
    //         id: "722960366632947712",
    //         orderId: "722960070972301312",
    //         vipLevel: "4",
    //         vipType: "1"
    //     }
    // ],
    //     msg: "success",
    //     resultCode: 0
    // },
    {
        data: [
            {
            cancelFlag: "0",
            effectDaysBefore: 54,
            effectTime: "20200617234550",
            expireTime: "20200710000000",
            hasNewGift: "1",
            id: "722960366632947712",
            orderId: "722960070972301312",
            vipLevel: "2",
            vipType: "1"
        },
        {
            effectDaysBefore: 54,
            effectTime: "20200617234550",
            expireTime: "20200820000000",
            hasNewGift: "1",
            id: "722960366632947712",
            orderId: "722960070972301312",
            vipLevel: "4",
            vipType: "1"
        }
    ],
        msg: "success",
        resultCode: 0
    }
]
,null,'vipFlag');

mock('api/cmpp/checkSmsCode','post',{
    data: {
        iswhite: "0",
        medalType: null,
        phone: "ByuIProiGoJqc5gJceAd0ZVX7+j3gYgJZNWs0EufxOxSjtgcxFIeIaVdJcHtliE6EyGhRNauVQ4l7iozrkafkiz4pKZ0E8/9kLjInS04EPNqJB+ZZbyyqgILwMxG67lxPAIkqeM336uiV5HBNYLZDbA0R7MJyPDSRjPStqW8vF0=",
        phoneMask: "138****5443",
        pnsign: "CeNBdugxvHDQ6Q4/Rxe/obNh4LH/dGlB72jbScpEG2TvNXNCpmB18l9QAEZqFeujafjxnQq5W24fKTNw6in4rTTVs3zkglye/6EraWlWqksDbd/xZYNHSJXDwDSOzkFdSlcMrY61iiVPmUSSKmEpNBf2crqPXmXc6gn3QGEfmw0=",
        provinceCode: "200"
    },
    msg: "success",
    resultCode: 0
    }
)

mock('api/order/queryOrderList.do','post', {
    data: [{
        custVipId: "123123123121",
        effect: "0",
        expireTime: "20200931235958",
        iconUrl: "icon_vip.png",
        istx: 2,
        mainStatus: 5,
        mid: 0,
        name: "权益超市黄金会员",
        orderId: "HjGTnOVtyM3W5VXg+sKDIfK+lq6crjYAjTo4c09eDck=",
        orderWay: "2",
        payType: 2,
        price: 500,
        prodId: 6001727,
        qyPayType: "10",
        renewId: "",
        salesId: 102160,
        salesType: 0,
        status: 1,
        td: "",
        updateTime: "2020-05-29 12:01:37"
    }],
    msg: "success",
    resultCode: 0
    })

mock('api/sales/hotSales','post',{
    data:[{
        countdate: "2020-09-01",
        icon: "102175&6000851.png",
        id: 102041,
        mid: 16,
        name: "饿了么会员",
        originprice: null,
        paytype: 2,
        price: 1000,
        proid: 6000883,
        remark: null,
        saleid: 102207,
        tc: 1,
        tcremark: "月卡"
    }],
    msg:"success",
    resultCode: 0
})