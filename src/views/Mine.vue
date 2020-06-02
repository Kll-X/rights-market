<template>
    <div class="mine">
        <div class="avatar" :class="userInfo.vipLevel?'vip':''">
            <img class="img-avatar" :src="userInfo.avatar" alt="">
            <div class="phone-area">
                <div class="phone">
                    {{userInfo.phoneMask?'你好，'+userInfo.phoneMask:'游客用户'}}
                    <img v-if="userInfo.vipLevel" class="crown" src="@imgs/mine/crown.png">
                </div>
                <div class="phone-tips" v-if="userInfo.phoneMask">
                    {{userInfo.vipLevel?userInfo.vipLevelTag[+userInfo.vipLevel-1]+'会员用户':'升级为黄金会员，享海量专属福利'}}
                    <span v-if="+userInfo.isVip&&+userInfo.cancelFlag">有效期至{{userInfo.expireTime | timeFormat}}</span>
                </div>
            </div>
            <div v-if="!userInfo.phoneMask" class="gotoLogin" @click="gotoLogin">登录购权益<img class="gotoLogin-img" src="@imgs/mine/arrow_white.png" alt="" srcset=""></div>
            <div v-if="userInfo.phoneMask&&!userInfo.vipLevel" class="btn-upgrade" @click="$router.push({name:'vipBenefit'})"></div>
        </div>
        <MyOwnRights class="bottomBoder"></MyOwnRights>
        <div class="zone">
            <GuideHeadline :info="{name:'我的订单'}"></GuideHeadline>
            <div class="list">
                <OrderListItem v-for="item in list" :info="item" :key="item.txt"></OrderListItem>
            </div>
        </div>
        <div class="zone" v-if="halfApps.length">
            <HalfPrice :guide="{name:'精选5折购',id:'1',moreDesc:'更多5折',path:{name: 'halfPrice'},}" :halfApps="halfApps.slice(0,3)"></HalfPrice>
        </div>
        <div class="zone" v-if="vipApps.length">
            <VipBuy :guide="{name:'会员优惠购',id:'1',moreDesc:'更多优惠',path:{name: 'vipPreferential'}}" :vipApps="vipApps.slice(0,3)"></VipBuy>
        </div>
        <van-swipe class="banner" :autoplay="3000" indicator-color="white"  v-if="bannerList.length>0">
            <van-swipe-item v-for="banner in bannerList" :key="banner.id">
                <div class="img-banner" :style="{backgroundImage:'url('+Common.getImgUrl(banner.icon)+')'}" @click="gotolink(banner.linkurl)"></div>
            </van-swipe-item>
        </van-swipe>
        <div v-show='userInfo.phone' class="exitLogin" @click.stop="exitLogin">退出登录</div>
        <Menu/>
    </div>
</template>

<script>
    import Menu from '@/components/common/Menu.vue'
    import OrderListItem from '@/components/mine/OrderListItem'
    import {queryOrderCount,myManager} from '@/api/mine'
    import {getData} from "@/api/home";
    import { mapState,mapMutations } from 'vuex';
    import messageBus from "@/utils/messageBus";
    import GuideHeadline from '@/components/home/GuideHeadline.vue';
    import VipBuy from '@/components/common/VipBuy.vue';
    import HalfPrice from '@/components/common/HalfPrice.vue';
    import MyOwnRights from '@/components/mine/MyOwnRights'


    export default {
        name: "mine",
        components: {
            Menu,
            OrderListItem,
            GuideHeadline,
            VipBuy,
            HalfPrice,
            MyOwnRights
        },
        data() {
            return {
                list: [
                    {icon: require('@imgs/mine/icon_orders_all@2x.png'),txt: '全部',num:'0',path:'/myOrder/all'},
                    {icon: require('@imgs/mine/icon_orders_trading@2x.png'),txt: '交易中',num:'0',path:'myOrder/trading'},
                    {icon: require('@imgs/mine/icon_orders_success@2x.png'),txt: '已成功',num:'0',path:'myOrder/success'},
                    {icon: require('@imgs/mine/icon_orders_close@2x.png'),txt: '已关闭',num:'0',path:'myOrder/close'}
                ],
                bannerList: [],
                halfApps:[],
                vipApps:[]
            }
        },
        created() {
            getData().then((res)=>{
                this.halfApps = res.data.data['108']?res.data.data['108']:[];
                this.vipApps = res.data.data['109']?res.data.data['109']:[];
            });
            if (this.userInfo.phone) {
                queryOrderCount({
                    channelCode: this.sysInfo.channelCode
                },{
                    phone: this.userInfo.phone,
                }).then( res =>{
                    try{
                        if (res.data.resultCode == 0) {
                            let data = res.data.data;
                            for(let item of data) {
                                switch(item.status) {
                                    case -99: this.list[0].num = item.count;break;
                                    case 0: this.list[1].num = item.count;break;
                                    case 1: this.list[2].num = item.count;break;
                                    case 2: this.list[3].num = item.count;break;
                                }
                            }
                        }
                    }
                    catch (err){
                        console.log(err)
                    }

                })
            }
            myManager().then(res => {
                if (res.data.resultCode == 0) {
                    this.bannerList = res.data.data;
                }
            })
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ])
        },
        methods:{
            ...mapMutations([
                'SET_USERINFO'
            ]),
            exitLogin(){
                messageBus.$emit('msg_showPopup',{
                    flag: true,
                    title: '您即将退出该账号，使用游客身份登录，是否继续?',
                    mask: true,
                    btns: [
                        {
                            txt: '取消',
                            handler: () => {
                                messageBus.$emit('msg_showPopup',{
                                    flag: false
                                })
                            }
                        },{
                            txt: '继续退出',
                            handler: () => {
                                messageBus.$emit('msg_showPopup',{
                                    flag: false
                                });
                                messageBus.$emit('msg_countDown',0);
                                this.$toast.success('您已退出登录')
                            }
                        }
                    ]
                })
                // messageBus.$emit('msg_countDown',0);
                // this.$toast.success('您已退出登录')
            },
            gotoLogin(){
                if (!this.userInfo.phone) {
                    this.$router.replace({name:'login'})
                }
            },
            gotolink(url){
                url&&(location.href = url);
            }
        },
        filters: {
            timeFormat: function (value) {
                value = value + '';
                let year = value.slice(0,4);
                let month = value.slice(4,6);
                let date = value.slice(6,8);
                return year + '-' + month + '-' + date;
            }
        }
    }
</script>

<style scoped lang="less">
.mine{
    background-color: #f4f5fb;
    min-height: cacl(~'100vh-1.29rem');
    padding-bottom: 1.29rem;
}
.avatar{
    height: 1.1rem;
    padding-top: .94rem;
    padding-bottom: .56rem;
    background: url("../assets/imgs/mine/bg_mine@2x.png") center/100%;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    display: flex;
    color: #f7faff; 
    align-items: center;
    .phone-area{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 3.22rem;
        padding: 0 .18rem 0 .2rem;
        text-align: left;
        .phone{
            font-size: .28rem;
            .crown{
                width: .38rem;
                margin-left: .1rem;
            }
        }
        .phone-tips{
            font-size: .2rem;
        }
    }
    .img-avatar{
        width: 1.1rem;
        height: 1.1rem;
        margin-left: .8rem;
    }
    .gotoLogin{
        display: flex;
        align-items: center;
        font-size: .26rem;
        margin-left: -.3rem;
        .gotoLogin-img{
            height: .15rem;
            margin-left: .1rem;
        }
    }
    .btn-upgrade{
        width: 1.4rem;
        height: .6rem;
        background: url('../assets/imgs/mine/btn_upgrade@2x.png') center/contain no-repeat;
    }
}
.avatar.vip{
    background-image: url('../assets/imgs/mine/bg_mine_vip@2x.png');
    color: #3E3C3B;
}
.bottomBoder{
    border-bottom: 0.16rem solid #f4f5fb;
}
.zone{
    background-color: white;
    // padding: 0 .3rem;
    // margin-top: .16rem;
    padding: 0 0.35rem 0.51rem 0.35rem;
    border-bottom: 0.16rem solid #f4f5fb;
}
.list{
    display: flex;
    .item-service{
        margin-top: .16rem;
    }
}
.exitLogin{
    height:1rem;
    line-height: 1rem;
    font-size: 0.32rem;
    color:#C07358;
    margin-bottom: 0.16rem;
    background: #fff;
}
.banner{
    margin-bottom: .16rem;
}
.img-banner{
    height: 1.78rem;
    background-size: cover;
}
</style>
