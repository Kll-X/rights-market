<template>
    <div class="my-own-rights">
        <GuideHeadline :info="name"></GuideHeadline>
        <div class="rights">
            <div class="item" v-for="(item,index) in list" :key="index" @click="$router.push(item.path)">
                <img :src="item.icon" alt="">
                <span class="title">{{item.title}}</span>
                <span class="tips">{{item.tips}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import GuideHeadline from '@/components/home/GuideHeadline.vue';
    export default {
        name: "my-own-rights",
        props:{
            isVip: Boolean
        },
        data(){
            return{
            }
        },
        computed:{
            ...mapState([
                "userInfo"
            ]),
            list(){
                let tips = this.userInfo.vipLevel?this.userInfo.hasNewGift?'已领取':'立即领取':'开通立享';
                return this.userInfo.vipLevel?[
                    {
                        icon: require('@imgs/mine/icon_gift_vip.png'),
                        title: '入会有礼',
                        tips: tips,
                        path: {name: 'newGuest'}
                    },{
                        icon: require('@imgs/mine/icon_shopping_vip.png'),
                        title: '会员优惠购',
                        tips: '立即选购',
                        path: {name: 'vipPreferential'}
                    },{
                        icon: require('@imgs/mine/icon_discount_vip.png'),
                        title: '精选5折购',
                        tips: '立即抢购',
                        path: {name: 'halfPrice'}
                    },{
                        icon: require('@imgs/mine/icon_service_vip.png'),
                        title: '专属客服',
                        tips: '点击沟通',
                        path: {name:'customerService'}
                    }
                ]:[
                    {
                        icon: require('@imgs/mine/icon_gift.png'),
                        title: '入会有礼',
                        tips: tips,
                        path: {name:'vipBenefit'}
                    },{
                        icon: require('@imgs/mine/icon_shopping.png'),
                        title: '会员优惠购',
                        tips: '开通立享',
                        path: {name:'vipBenefit'}
                    },{
                        icon: require('@imgs/mine/icon_discount.png'),
                        title: '精选5折购',
                        tips: '开通立享',
                        path: {name:'vipBenefit'}
                    },{
                        icon: require('@imgs/mine/icon_service.png'),
                        title: '专属客服',
                        tips: '开通立享',
                        path: {name:'vipBenefit'}
                    }
                ]
            },
            name(){
                return this.userInfo.vipLevel?{name:'我的专属权益',id:'1',moreDesc:'查看详情',path:{name: 'vipBenefit'}}:{name:'会员专属权益',id:'1',moreDesc:'查看详情',path:{name: 'vipBenefit'}}
            }
        },
        components:{
            GuideHeadline
        }
    }
</script>
<style scoped lang='less'>
.my-own-rights{
    background-color: white;
    padding: 0 .42rem;
    .rights{
        display: flex;
        justify-content: space-between;
        padding-bottom: .6rem;
        .item{
            display: flex;
            flex-direction: column;
            img{
                width: 1.33rem;
                height: 1.33rem;
            }
            .title{
                font-size: .26rem;
                color: #0F0B1A;
                margin-top: .2rem;
            }
            .tips{
                font-size: .24rem;
                color: #EDAE63;
            }
        }
    }
}
</style>