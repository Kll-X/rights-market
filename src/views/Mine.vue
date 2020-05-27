<template>
    <div class="mine">
        <div class="avatar" @click="gotoLogin">
            <img class="img-avatar" :src="userInfo.avatar" alt="">
            <span class="phone">{{userInfo.phoneMask?userInfo.phoneMask:'请点击登录'}}</span>
        </div>
        <div class="list">
            <BarListItem v-for="item in list" :info="item" :key="item.txt"></BarListItem>
            <!--<BarListItem class="item-service" :info="serviceInfo"></BarListItem>-->
        </div>
        <div v-show='userInfo.phone' class="exitLogin" @click.stop="exitLogin">退出登录</div>
        <van-swipe class="banner" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="banner in bannerList" :key="banner.id">
                <div class="img-banner" :style="{backgroundImage:'url('+Common.getImgUrl(banner.icon)+')'}"></div>
            </van-swipe-item>
        </van-swipe>
        <Menu/>
    </div>
</template>

<script>
    import Menu from '@/components/common/Menu.vue'
    import BarListItem from '@/components/mine/BarListItem'
    import {queryOrderCount,myManager} from '@/api/mine'
    import { mapState,mapMutations } from 'vuex';
    import messageBus from "@/utils/messageBus";


    export default {
        name: "mine",
        components: {
            Menu,
            BarListItem
        },
        data() {
            return {
                list: [
                    {icon: require('@imgs/icon_orders_all@2x.png'),txt: '全部订单',num:'0',path:'/myOrder/all',underline: true},
                    {icon: require('@imgs/icon_orders_trading@2x.png'),txt: '交易中订单',num:'0',path:'myOrder/trading',underline: true},
                    {icon: require('@imgs/icon_orders_success@2x.png'),txt: '已成功订单',num:'0',path:'myOrder/success', underline: true},
                    {icon: require('@imgs/icon_orders_close@2x.png'),txt: '已关闭订单',num:'0',path:'myOrder/close'}
                ],
                serviceInfo: {
                    icon: require('@imgs/icon_service@2x.png'),txt: '客服咨询',num:'',
                },
                bannerList: []
            }
        },
        created() {
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
            }
        }
    }
</script>

<style scoped lang="less">
.mine{
    background-color: #f4f5fb;
    min-height: 100vh;
}
.avatar{
    height: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url("../assets/imgs/bg_mine@2x.png") center/100%;
    .img-avatar{
        width: 1.12rem;
        height: 1.12rem;
        margin-top: 1rem;
        margin-bottom: .2rem;
    }
    .phone{
        color: #f7faff;
        font-size: .32rem;
    }
}
.list{
    background-color: #f4f5fb;
    .item-service{
        margin-top: .16rem;
    }
}
.exitLogin{
    height:1rem;
    line-height: 1rem;
    font-size: 0.32rem;
    color:#C07358;
    margin-top: .16rem;
    margin-bottom: 0.16rem;
    background: #fff;
}
.banner{
   margin-top: .16rem;
}
.img-banner{
    height: 1.78rem;
    background-size: cover;
}
</style>
