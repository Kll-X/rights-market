<template>
    <div class="my-own-rights">
        <div class="part-vip" v-if="type == 1">
            <GuideHeadline :info="name"></GuideHeadline>
            <div class="rights-vip">
                <div class="item" v-for="(item,index) in vipList" :key="index" @click="clickHandler(index,item)">
                    <img :src="item.icon" alt="">
                    <span class="title">{{item.title}}</span>
                    <span class="tips">{{item.tips}}</span>
                </div>
            </div>
        </div>
        <div class="part-vip" v-if="type == 2">
            <GuideHeadline :info="name"></GuideHeadline>
            <div class="rights-vip">
                <div class="item" v-for="(item,index) in newStarVipList" :key="index" @click="clickHandler(index,item)">
                    <img :src="item.icon" alt="">
                    <span class="title">{{item.title}}</span>
                    <span class="tips">{{item.tips}}</span>
                </div>
            </div>
        </div>
        <div class="part-notvip" v-if="type == 0 ">
            <div class="rights-tips" @click="gotoLink({name:'vipBenefit'})">
                黄金会员权益
                <div class="rights-tips-icon"></div>
            </div>
            <div class="rights-notvip">
                <div class="item" v-for="(item,index) in notVipList" :key="index" @click="clickHandler(index,item)">
                    <img :src="item.icon" alt="">
                    <span class="title">{{item.title}}</span>
                    <span class="tips">{{item.tips}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import GuideHeadline from '@/components/home/GuideHeadline.vue';
    import { blocklogMixin } from "@/mixins/log"

    export default {
        name: "my-own-rights",
        mixins:[blocklogMixin],
        data(){
            return{
                newStarVipList:[
                    {
                        icon: require('@imgs/vip/icon_shopping_vip.png'),
                        title: '优惠购',
                        tips: '点击选购',
                        path: {name: 'vipPreferential'}
                    },
                    {
                        icon: require('@imgs/vip/icon_welfare_vip.png'),
                        title: '福利社',
                        tips: '点击领取',
                        path: process.env.VUE_APP_BUILD !== 'production' ?'http://rwktst.aspire-tech.com:19088/frcm/fcyr4/index.html#/vipClub':'https://apiserv.cmicrwx.cn/fcyr4/index.html#/vipClub',
                        needParams:['pnsign','selfChannelCode']
                    },
                    {
                        icon: require('@imgs/vip/icon_service_vip.png'),
                        title: '专属客服',
                        tips: '点击咨询',
                        path: {name:'customerService'}
                    },
                    {
                        icon: require('@imgs/vip/icon_discount_vip_lock.png'),
                        title: '5折购',
                        tips: '升级解锁',
                        locked: true
                        // path: {name: 'halfPrice'}
                    },
                    {
                        icon: require('@imgs/vip/icon_gift_vip_lock.png'),
                        title: '流量礼包',
                        tips: '升级解锁',
                        locked: true
                        // path: {name: 'newGuest'}
                    }
                ],
                notVipList:[
                    {
                        icon: require('@imgs/vip/icon_gift.png'),
                        title: '流量礼包',
                        path: {name:'vipBenefit'}
                    },{
                        icon: require('@imgs/vip/icon_shopping.png'),
                        title: '优惠购',
                        path: {name:'vipBenefit'}
                    },{
                        icon: require('@imgs/vip/icon_discount.png'),
                        title: '5折购',
                        path: {name:'vipBenefit'}
                    },{
                        icon: require('@imgs/vip/icon_welfare.png'),
                        title: '福利社',
                        path: {name:'vipBenefit'}
                    },{
                        icon: require('@imgs/vip/icon_service.png'),
                        title: '专属客服',
                        path: {name:'vipBenefit'}
                    }
                ]
            }
        },
        props:[
            'type',
        ],
        computed:{
            ...mapState([
                "userInfo"
            ]),
            vipList(){
                let tips = +this.info.hasNewGift?'已领取':'点击领取';
                let res,vipWelfareUrl ;
                if (process.env.VUE_APP_BUILD  !== 'production') {
                    vipWelfareUrl = 'http://rwktst.aspire-tech.com:19088/frcm/fcyr4/index.html#/vipClub';
                } else {
                    vipWelfareUrl = 'https://apiserv.cmicrwx.cn/fcyr4/index.html#/vipClub';
                }
                res = [
                    {
                        icon: require('@imgs/vip/icon_gift_vip.png'),
                        title: '流量礼包',
                        tips: tips,
                        path: {name: 'newGuest'}
                    },{
                        icon: require('@imgs/vip/icon_shopping_vip.png'),
                        title: '优惠购',
                        tips: '点击选购',
                        path: {name: 'vipPreferential'}
                    },{
                        icon: require('@imgs/vip/icon_discount_vip.png'),
                        title: '5折购',
                        tips: '点击抢购',
                        path: {name: 'halfPrice'}
                    },
                    {
                        icon: require('@imgs/vip/icon_welfare_vip.png'),
                        title: '福利社',
                        tips: '点击领取',
                        path: vipWelfareUrl,
                        needParams:['pnsign','selfChannelCode']
                    },
                    {
                        icon: require('@imgs/vip/icon_service_vip.png'),
                        title: '专属客服',
                        tips: '点击沟通',
                        path: {name:'customerService'}
                    }
                ]
                return res;
            },
            name(){
                return +this.type==2?{name:'我的权益',id:'1',moreDesc:'权益详情',path:{name: 'vipBenefit',params:{isNewStarVip:true}},blockId:'0026',positionId:'9999',blockName:'专属权益入口'}:{name:'我的权益',id:'1',moreDesc:'权益详情',path:{name: 'vipBenefit'},blockId:'0026',positionId:'9999',blockName:'专属权益入口'}
            },
            info(){
                if(this.type == 2 ){
                    return this.userInfo.newStarVipInfo || {};
                }else if (this.type == 1){
                    return this.userInfo.vipInfo || {};
                }else {
                    return {};
                }
            }
        },
        methods:{
            gotoLink(route){
                this.$router.push(route)
            },
            clickHandler(index,item){
                this.blocklogHandler('专属权益入口','0026','000'+(index+1));
                if (item.needParams) {
                    // 暂时只针对path为字符串的情况
                    item.needParams.forEach(params=>{
                        switch (params) {
                            case 'pnsign': item.path += '?pnsign=' + encodeURIComponent(this.userInfo.pnsign);break;
                            case 'selfChannelCode': item.path += '&selfChannelCode=' + this.sysInfo.selfChannelCode;break;
                        }
                    })
                }
                if(item.path){
                    typeof item.path == 'string'?(location.href = item.path) :  this.$router.push(item.path);
                }
                // item.path&&this.$router.push(item.path);
                item.locked&&this.$emit('placeVipOrder');
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
    .part-notvip{
        .rights-tips{
            color: #edae63;
            font-size: .28rem;
            margin-bottom: .24rem;
            .rights-tips-icon{
                background: url("../../assets/imgs/vip/icon_arrow_right.png") no-repeat center/100%;
                width: .19rem;
                height: .19rem;
                display:inline-block;
            }
        }
        .rights-notvip{
            display: flex;
            justify-content: space-between;
            .item{
                display: flex;
                flex-direction: column;
                align-items: center;
                img{
                    height: .7rem;
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
    .part-vip{
        .rights-vip{
            display: flex;
            justify-content: space-between;
            padding-bottom: .2rem;
            overflow-x: scroll;
            margin-left: -.07rem;
            width: 7.08rem;
            .item{
                background-color: #f7f7f7;
                display: flex;
                flex-direction: column;
                width: 1.46rem;
                padding-bottom: .4rem;
                border-radius: .15rem;
                margin: 0 .07rem;
                flex-shrink: 0;
                align-items: center;
                position: relative;
                padding-top: .665rem;
                margin-top: .665rem;
                img{
                    width: 1.33rem;
                    height: 1.33rem;
                    position: absolute;
                    top: -.665rem;
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
}
</style>