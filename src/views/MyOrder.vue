<template>
    <div class="myOrder">
        <van-tabs v-model="type" @click="getOrderList" title-active-color="#6696FF" color="#6696FF" line-width=".6rem">
            <van-tab title="全部" name="all">
                <div class="panel">
                    <OrderItem style="margin-bottom: .24rem;" v-for="item in showList['all']" :info.sync="item" :key="item.orderId" @orderChange="orderChange"></OrderItem>
                    <van-loading v-show="loadingFlag" />
                    <div class="tips-noorder" v-if="showList['all'].length <= 0" >
                        <img class="img-tips-noorder" src="@imgs/tips_noorder.png" alt="">
                        <div class="txt-tips-noorder">暂无相关订单</div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="交易中" name="trading">
                <div class="panel">
                    <OrderItem style="margin-bottom: .24rem;" v-for="item in showList['trading']" :info.sync="item" :key="item.orderId" @orderChange="orderChange"></OrderItem>
                    <van-loading v-show="loadingFlag" />
                    <div class="tips-noorder" v-if="showList['trading'].length <= 0" >
                        <img class="img-tips-noorder" src="@imgs/tips_noorder.png" alt="">
                        <div class="txt-tips-noorder">暂无相关订单</div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="已成功" name="success">
                <div class="panel">
                    <OrderItem style="margin-bottom: .24rem;" v-for="item in showList['success']" :info.sync="item" :key="item.orderId" @orderChange="orderChange"></OrderItem>
                    <van-loading v-show="loadingFlag" />
                    <div class="tips-noorder" v-if="showList['success'].length <= 0" >
                        <img class="img-tips-noorder" src="@imgs/tips_noorder.png" alt="">
                        <div class="txt-tips-noorder">暂无相关订单</div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="已关闭" name="close">
                <div class="panel">
                    <OrderItem style="margin-bottom: .24rem;" v-for="item in showList['close']" :info.sync="item" :key="item.orderId" @orderChange="orderChange"></OrderItem>
                    <van-loading v-show="loadingFlag" />
                    <div class="tips-noorder" v-if="showList['close'].length <= 0" >
                        <img class="img-tips-noorder" src="@imgs/tips_noorder.png" alt="">
                        <div class="txt-tips-noorder">暂无相关订单</div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <back-home></back-home>
    </div>
</template>

<script>
    import OrderItem from '@/components/myOrder/OrderItem'
    import BackHome from '@/components/common/BackHome.vue';
    import {queryOrderList,queryOrderStatus} from '@/api/myOrder'
    import { mapState } from 'vuex'
    import {customAnalysis} from "@/assets/js/analysis";
    import {STATISTICS,APPLIST_CHAODIGOU} from "@/utils/constant";
    import messageBus from "../utils/messageBus";

    export default {
        name: "my-order",
        components: {
            OrderItem,
            BackHome
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ])
        },
        data(){
            return {
                type: 'success',
                loadingFlag: false,
                currentPage: 0,
                intervalList: {},
                list:{
                    all: [
                        {
                            orderId: 0,
                            name: '爱奇艺会员月卡img',
                            iconUrl: process.env.VUE_APP_IMG_PRE+ '102045&6000731.png',
                            payType: 1,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 2
                        },
                        {
                            orderId: 3,
                            name: 'qq音乐会员',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 2,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 1
                        },
                        {
                            orderId: 4,
                            name: '腾讯视频会员',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 3,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 1
                        },
                        {
                            orderId: 5,
                            name: '天猫10元券',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 2
                        },
                        {
                            orderId: 1,
                            name: '天猫10元券',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 2,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 0,
                            istx: 2
                        },
                        {
                            orderId: 2,
                            name: '腾讯视频会员',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 3,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 2,
                            istx: 1
                        },
                        {
                            orderId: 6,
                            name: 'qq音乐会员',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 1
                        },
                        {
                            orderId: 7,
                            name: '天猫10元券',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 2
                        },
                        {
                            orderId: 8,
                            name: '天猫10元券',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 0,
                            istx: 2
                        },
                        {
                            orderId: 9,
                            name: 'qq音乐会员',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 2,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 2,
                            istx: 1
                        }
                    ],
                    trading: [
                        {
                            orderId: 0,
                            name: '爱奇艺会员月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 3,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 0,
                            istx: 2
                        },
                        {
                            orderId: 1,
                            name: '天猫10元券',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 0,
                            istx: 2
                        },
                        {
                            orderId: 2,
                            name: 'QQ阅读月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 3,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 0,
                            istx: 1
                        }
                    ],
                    success: [
                        {
                            orderId: 6,
                            name: '爱奇艺会员月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 2,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 0,
                            istx: 2
                        },
                        {
                            orderId: 7,
                            name: '天猫10元券',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 0,
                            istx: 2
                        },
                        {
                            orderId: 2,
                            name: 'QQ阅读月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 3,//0话费，1第三方支付
                            times: 1,//0单次，1包月，
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 1
                        },
                        {
                            orderId: 0,
                            name: '爱奇艺会员月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 2
                        },
                        {
                            orderId: 3,
                            name: 'QQ阅读月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 2,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 1
                        },
                        {
                            orderId: 4,
                            name: 'QQ阅读月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 3,//0话费，1第三方支付
                            times: 1,//0单次，1包月，
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 1
                        },
                        {
                            orderId: 5,
                            name: '天猫10元券',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 2,//0话费，1第三方支付
                            times: 1,//0单次，1包月，
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 1,
                            istx: 2
                        }
                    ],
                    close: [
                        {
                            orderId: 0,
                            name: '爱奇艺会员月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '20.00',
                            updateTime: 1583133120224,
                            status: 2,
                            istx: 2
                        },
                        {
                            orderId: 1,
                            name: '天猫10元券',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 1,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 2,
                            istx: 2
                        },
                        {
                            orderId: 2,
                            name: 'QQ阅读月卡',
                            iconUrl: require('@imgs/aiqiyi@2x.png'),
                            payType: 2,//0话费，1第三方支付
                            price: '30.00',
                            updateTime: 1583133120224,
                            status: 2,
                            istx: 1
                        }
                    ]
                },
                showList: {
                    all: [],
                    trading: [],
                    success: [],
                    close: []
                },
                allList1: [
                    {
                        orderId: 10,
                        name: '爱奇艺会员月卡',
                        iconUrl: require('@imgs/aiqiyi@2x.png'),
                        payType: 3,//0话费，1第三方支付
                        price: '20.00',
                        updateTime: 1583133120224,
                        status: 1,
                        istx: 2
                    },
                    {
                        orderId: 11,
                        name: '天猫10元券',
                        iconUrl: require('@imgs/aiqiyi@2x.png'),
                        payType: 1,//0话费，1第三方支付
                        price: '30.00',
                        updateTime: 1583133120224,
                        status: 0,
                        istx: 2
                    },
                    {
                        orderId: 12,
                        name: 'QQ阅读月卡',
                        iconUrl: require('@imgs/aiqiyi@2x.png'),
                        payType: 2,//0话费，1第三方支付
                        price: '30.00',
                        updateTime: 1583133120224,
                        status: 2,
                        istx: 1
                    },
                ],
            }
        },
        created() {
            let that = this;
            this.type = this.$route.params.type;
            if (this.userInfo.phone) {
                this.getOrderList(this.type)
            } else {
                // 有单点登录的情况下，等待单点登录结果再刷新订单列表
                if (that.$route.query.sign) {
                    messageBus.$on('msg_loginCheck', () => {
                        that.getOrderList(that.type)
                    })
                    messageBus.$on('msg_loginFail', () => {
                        that.$router.replace({name: 'login'})
                    })
                } else {
                    // nexttick才执行，防止van-table报错
                    that.$nextTick(() => {
                        that.$router.replace({name: 'login'})
                    })
                }
            }
            this.scroll();
            if (this.sysInfo.channel == 'st' || this.sysInfo.channel == 'wx'){
                customAnalysis(STATISTICS.activityId, STATISTICS[this.sysInfo.channel][2])
            }
            customAnalysis(STATISTICS.activityId, STATISTICS.all[2])

            // let obj = {
            //     mid: 40,
            //     name: "新订单",
            //     orderId: "690144901049556992",
            //     orderItemId: "690144901049556994",
            //     payType: 1,
            //     istx: 2,
            //     price: 1,
            //     iconUrl: "102068&6000745.png",
            //     td: "",
            //     mainStatus: 3,
            //     salesId: 102068,
            //     prodId: 6000745,
            //     updateTime: "2020-03-19 10:31:11",
            //     status: 0,
            //     orderWay: "2",
            //     qyPayType: "10",
            // }
            // setTimeout(()=>{
            //     that.orderChange(obj,true)
            // },5000)
        },
        beforeDestroy: function () {
            Object.values(this.intervalList).forEach(interval => {
                clearInterval(interval);
            })
            messageBus.$off(['msg_loginCheck', 'msg_loginFail']);
        },
        methods: {
            getOrderList(name){
                let that = this;
                // this.showList[name] = this.list[name].slice(0,10);
                // return;
                // 清除轮询
                Object.values(this.intervalList).forEach(interval => {
                    clearInterval(interval);
                })

                if (this.showList[name].length === 0) {
                    queryOrderList({
                        status:this.getTypeNum(name),
                        channelCode: this.sysInfo.channelCode
                    },{
                        phone:this.userInfo.phone
                    }).then(res=>{
                        if (res.data.resultCode === 0) {
                            this.list[name] = res.data.data;
                            this.showList[name] = this.list[name].slice(0,10);
                            // 包含交易中订单需要轮询
                            checkOrderStatus();
                        }
                    })
                } else {
                    checkOrderStatus();
                }
                function checkOrderStatus() {
                    let checkList=[];
                    if (name == 'all' || name == 'trading' || name == 'success') {
                        // checkList = name=='all'?filterOrderList(that.list[name]):that.list[name];
                        checkList = filterOrderList(that.list[name]);
                        checkList.forEach(item => {
                            that.intervalList[item.orderId] = setInterval( () => {
                                queryOrderStatus({
                                    orderId: item.orderId,
                                    channelCode: that.sysInfo.channelCode
                                },{
                                    phone: that.userInfo.phone
                                }).then(res => {
                                    if (res.data.resultCode === 0) {
                                        let orderData = res.data.data;
                                        if (orderData.status !== item.status || orderData.td !== item.td) {
                                            //状态改变会导致列表改变，位置也会改变
                                            that.orderChange(orderData,true);
                                            clearInterval(that.intervalList[orderData.orderId])
                                        }
                                    }
                                })
                            }, 5000)
                        })
                    }
                }
                function filterOrderList(list){
                    // 返回交易中或者退订中的订单
                    return list.filter(item => {
                        return item.status === 0 || item.td == 5;
                    })
                }
            },
            loadMore(){
                if (this.loadingFlag) return;
                let that = this;
                let currentLength = this.showList[this.type].length;
                if (this.list[this.type].length > currentLength) {
                    that.loadingFlag = true;
                    setTimeout(() => {
                        that.showList[that.type] = that.list[that.type].slice(0,currentLength+10);
                        that.loadingFlag = false;
                    }, 500)
                }
            },
            getTypeNum(name){
                let num = -99;
                switch (name) {
                    case 'all': num = -99;break;
                    case 'trading': num = 0;break;
                    case 'success': num = 1;break;
                    case 'close': num = 2;break;
                }
                return num;
            },
            getTypeName(num) {
                let name = 'all';
                switch (num) {
                    case -99: name = 'all';break;
                    case 0: name = 'trading';break;
                    case 1: name = 'success';break;
                    case 2: name = 'close';break;
                }
                return name;
            },
            orderChange(order,changePosFlag) {
                // 针对517活动订单的fix
                for (let item of APPLIST_CHAODIGOU) {
                    if(+item.salesid == +order.salesId) {
                        order.price = item.currentPrice;
                        order.iconUrl = item.icon;
                        order.name = item.title;
                        order.payType = 1;
                        break;
                    }
                }
                // order新的订单信息，changePosFlag是否需要改变位置（置顶）
                if (changePosFlag) {
                    let oldOrderIndex = this.findOrderIndexById(this.list['all'],order.orderId);
                    let oldShowOrderIndex = this.findOrderIndexById(this.showList['all'],order.orderId);
                    this.list['all'].splice(oldOrderIndex,1);
                    this.list['all'].unshift(order);
                    this.showList['all'].splice(oldShowOrderIndex,1);
                    this.showList['all'].unshift(order);
                } else {
                    let oldOrder = this.findOrderById(this.list['all'],order.orderId);
                    Object.assign(oldOrder,order);
                }
                for (let key of ['success','trading','close']) {
                    if (this.showList[key].length > 0) {
                        let oldOrderIndex = this.findOrderIndexById(this.list[key],order.orderId);
                        let oldShowOrderIndex = this.findOrderIndexById(this.showList[key],order.orderId);
                        // 新订单属于当前列表
                        if (key === this.getTypeName(order.status)) {
                            if (oldOrderIndex>-1) {
                                //列表找到旧订单
                                let oldOrder = this.findOrderById(this.list[key],order.orderId);
                                Object.assign(oldOrder,order);
                            } else {
                                //列表没有该旧订单
                                this.list[key].unshift(order);
                                this.showList[key].unshift(order);
                            }
                        } else {
                            // 新订单不属于当前列表，但当前列表找到旧订单
                            oldOrderIndex>-1 && this.list[key].splice(oldOrderIndex,1);
                            oldShowOrderIndex>-1 && this.showList[key].splice(oldShowOrderIndex,1);
                        }
                    }
                }
            },
            findOrderById(list, orderId){
                return list.find(order => {
                    return order.orderId === orderId
                })
            },
            findOrderIndexById(list, orderId){
                return list.findIndex(order => {
                    return order.orderId === orderId
                })
            },
            scroll(){
                let that = this;
                //获取滚动条当前的位置
                function getScrollTop() {
                    var scrollTop = 0;
                    if(document.documentElement && document.documentElement.scrollTop) {
                        scrollTop = document.documentElement.scrollTop;
                    } else if(document.body) {
                        scrollTop = document.body.scrollTop;
                    }
                    return scrollTop;
                }
                //获取当前可视范围的高度
                function getClientHeight() {
                    var clientHeight = 0;
                    if(document.body.clientHeight && document.documentElement.clientHeight) {
                        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                    } else {
                        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                    }
                    return clientHeight;
                }
                //获取文档完整的高度
                function getScrollHeight(){
                    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
                    if(document.body){
                        bodyScrollHeight = document.body.scrollHeight;
                    }
                    if(document.documentElement){
                        documentScrollHeight = document.documentElement.scrollHeight;
                    }
                    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                    return scrollHeight;
                }

                //滚动事件触发
                window.onscroll = function() {
                    //加1的原因是移动端有1像素的偏差（这是在设置了容器不显示横向滚动条的情况下overflow-x: hidden,否则可能不止1像素、可能是4像素）
                    if(getScrollHeight() - 10 < getScrollTop() + getClientHeight() +1 && getScrollTop() + getClientHeight() +1 < getScrollHeight() + 10) {
                        that.loadMore();
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
.myOrder{
    background-color: #f5f7fa;
    min-height: 100vh;
}
.panel{
    padding: .3rem .35rem .24rem .35rem;
}
.tab{
    font-size: .3rem;
}
.tips-noorder{
    .img-tips-noorder{
        width: 2.62rem;
        margin-top: 1.6rem;
    }
    .txt-tips-noorder{
        font-size: .3rem;
    }
}
</style>
<style>
    .van-tab{
        font-size: .3rem;
    }
</style>
