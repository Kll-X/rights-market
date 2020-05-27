<template>
    <div class="home">
        <!-- 顶部背景 -->
        <img class="top-bg" src="@imgs/home/topBg.png" />
        <div v-for="(zone,i) in zonesOrder" :key="i">
            <div class="zone basic" v-if="zone == 'basic'">
                <!-- 登录状态栏 -->
                <div class="login-bar">
                    <div class="check-login" @click.stop="checkLogin">
                        <img class="avatar" :src="userInfo.avatar" alt="">
                        <span class="nickname">{{userInfo.phoneMask ? userInfo.phoneMask:'未登录'}}</span>
                    </div>
                    <router-link tag='img' class="search" alt="" :src="search" :to="'search'"></router-link>
                </div>



                <!-- 轮播图 -->
                <banner :bannerData="bannerData1"></banner>


                
                <!-- 分类区 -->
                <div class="classification">
                    <classification-item v-for="(item,i) in classification" :key="i" :item="item"></classification-item>
                </div>
                <!-- 活动区 -->
                <guide-headline v-show="activeRegionFlag" :info="guide0"></guide-headline>
                <active-region v-show="activeRegionFlag"></active-region>
            </div>
            <!-- 精选5折购 -->
            <div class="zone half" v-if="zone == 'half'" v-show="halfApps.length">
                <!-- <guide-headline :info="guide6" :half="true"></guide-headline>
                <div class="half-list">
                    <app-card2 v-for="(item,j) in halfApps" :key="j" :info="item" :index="j"></app-card2>
                </div> -->
                <half-price :guide="guide6" :halfApps="halfApps"></half-price>
            </div>
            <!-- 会员优惠购 -->
            <div class="zone vip" v-if="zone == 'vip'" v-show="vipApps.length">
                <!-- <guide-headline :info="guide5" :vip="true"></guide-headline>
                <div class="vip-list">
                    <app-card1 v-for="(item,j) in vipApps" :key="j" :info="item" :index="j" :vip="true"></app-card1>
                </div> -->
                <vip-buy :guide="guide5" :vipApps="vipApps"></vip-buy>
            </div>
            <!-- 商品上新 -->
            <div class="zone new" v-if="zone == 'new'" v-show="newApps.length">
                <guide-headline :info="guide1"></guide-headline>
                <div class="new-list">
                    <app-card1 v-for="(item,j) in newApps" :key="j" :info="item" :index="j"></app-card1>
                </div>
            </div>
            <!-- 热门推荐 -->
            <div class="zone hot" v-if="zone == 'hot'" v-show="hotApps.length">
                <guide-headline :info="guide2"></guide-headline>
                <div class="hot-list">
                    <app-card1 v-for="(item,k) in hotApps" :key="k" :info="item" :index="k"></app-card1>
                </div>
            </div>
            <!-- 特色权益 -->
            <div class="zone special" v-if="zone == 'special'" v-show="specialApps.length">
                <guide-headline :info="guide3"></guide-headline>
                <div class="special-list">
                    <special-card v-for="(item,l) in specialApps" :key="l" :info="item" :index="l"></special-card>
                </div>
            
            </div>
            <!-- 本地专享 -->
            <div class="zone local" v-if="zone == 'local' && userInfo.phone && localFlag">
                <guide-headline :info="guide4"></guide-headline>            
                <banner :bannerData="bannerData2"></banner>
            </div>
        </div>

        <!-- 底部菜单栏 -->
        <Menu></Menu>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Banner from '@/components/common/Banner.vue';
    import ClassificationItem from '@/components/home/ClassificationItem.vue';
    import GuideHeadline from '@/components/home/GuideHeadline.vue';
    import ActiveRegion from '@/components/home/ActiveRegion.vue';
    import AppCard1 from '@/components/home/AppCard1.vue';
    // import AppCard2 from '@/components/home/AppCard2.vue';
    import HalfPrice from '@/components/common/HalfPrice.vue';
    import VipBuy from '@/components/common/VipBuy.vue';
    import SpecialCard from '@/components/home/SpecialCard.vue';
    import Menu from '@/components/common/Menu.vue';
    import messageBus from "@/utils/messageBus";
    import {STATISTICS,STATISTICS_PROVINCE} from "@/utils/constant";
    // import store from '@/store'
    import { mapState } from 'vuex'
    import {getData,spec} from "@/api/home";
    import {customAnalysis} from "@/assets/js/analysis";


    export default {
        name: 'home',
        created(){
            getData().then((res)=>{
                this.halfApps = res.data.data['108']?res.data.data['108']:[];
                this.vipApps = res.data.data['109']?res.data.data['109']:[];
                this.newApps = res.data.data['100']?res.data.data['100']:[];
                this.hotApps = res.data.data['101']?res.data.data['101']:[];
                this.specialApps = res.data.data['102']?res.data.data['102']:[];
                this.bannerData1.arr = res.data.data['105']?res.data.data['105']:[];
                this.bannerData1.arr[0] && (this.bannerData1.arr[0].needPnsign = true);
                this.bannerData1.arr[1] && (this.bannerData1.arr[1].needPnsign = true);
                // if (process.env.NODE_ENV === 'production') {
                //     this.bannerData1.arr.unshift({
                //         id: 3,icon:require('@imgs/home/banner1_4.png'),linkurl:'https://rwk.cmicrwx.cn/rwx/rwkvue/RightMarket/',needPnsign:true
                //     })
                //     this.bannerData1.arr.unshift({
                //         id: 4,icon:require('@imgs/home/banner1_5.png'),linkurl:'https://shop.10086.cn/zhuanqu/anniversary/index.html#/equity/index',needPnsign:true
                //     })
                // } else {
                //     this.bannerData1.arr.unshift({
                //         id: 3,icon:require('@imgs/home/banner1_4.png'),linkurl:'https://rwk.cmicrwx.cn/rwx/rwkvue/RightMarket/',needPnsign:true
                //     })
                //     this.bannerData1.arr.unshift({
                //         id: 4,icon:require('@imgs/home/banner1_5.png'),linkurl:'https://shop.10086.cn/zhuanqu/test/anniversary/index.html#/equity/index',needPnsign:true
                //     })
                // }
            }).catch((e)=>{
                console.log(e)
                this.$toast.fail('加载失败了，刷新重试哦！');
            });

            this.check_resetbannerData2();

            messageBus.$on('msg_check_resetbannerData2',this.check_resetbannerData2);
            
            //全渠道、微信渠道、分省渠道统计
            if (this.sysInfo.channel == 'wx'){
                customAnalysis(STATISTICS.activityId, STATISTICS[this.sysInfo.channel][0])
            }
            customAnalysis(STATISTICS.activityId, STATISTICS.all[0]);
            if (this.sysInfo.locationCode && process.env.NODE_ENV == 'production') {
                customAnalysis(STATISTICS_PROVINCE.activityId,STATISTICS_PROVINCE.key);
                customAnalysis(STATISTICS_PROVINCE.activityId,STATISTICS_PROVINCE.key,this.sysInfo.locationCode);
            }

        },
        data(){
            return{
                zonesOrder:['basic','half','vip','new','hot','special','local'],
                search:require('@imgs/search@2x.png'),
                bannerData1:{
                    height:'2.4rem',
                    indicatorPosition:'outside',
                    indicatorSite:'center',
                    colorPlan:"plan1",
                    arr:[
                        {id:0,img:require('@imgs/home/banner1_1.png'),linkurl:'https://dev.coc.10086.cn/coc/web/coc2020/heartChoose/?channelId=C00004001115'},
                        {id:1,img:require('@imgs/home/banner1_2.png'),linkurl:'https://rwk.cmicrwx.cn/rwx/rwkvue/contractyoung/#/?channelType=newSpring&channelId=C10000034917'},
                        {id:2,img:require('@imgs/home/banner1_3.png'),linkurl:'https://10086.cn/d/yuYNJj'}
                    ]
                },
                classification:[
                    {
                        id:1,
                        title:'话费购',
                        img:require('@imgs/home/icon0@2x.png')
                    },
                    {
                        id:6,
                        title:'特色权益',
                        img:require('@imgs/home/icon1@2x.png')
                    },
                    {
                        id:2,
                        title:'领权益',
                        img:require('@imgs/home/icon2@2x.png'),
                        rights:'getRights'
                    },
                ],
                guide0:{
                    name:'免费福利',
                    id:'1'
                },
                guide1:{
                    name:'商品上新',
                    id:'1'
                },
                guide2:{
                    name:'热门推荐',
                    id:'1'
                },
                guide3:{
                    name:'特色权益'
                },
                guide4:{
                    name:'本地专享'
                },
                guide5:{
                    name:'会员优惠购',
                    id:'1',
                    moreDesc:'更多优惠',
                    path:{name: 'vipPreferential'},
                },
                guide6:{
                    name:'精选5折购'
                },
                halfApps:[],
                vipApps:[],
                newApps:[],
                hotApps:[],
                specialApps:[],
                activeRegionFlag:false,
                localFlag:false,
                bannerData2:{
                    height:'1.62rem',
                    indicatorPosition:'inside',
                    indicatorSite:'right',
                    colorPlan:"plan2",
                    arr:[
                    ],
                    checkProvince:true,
                    province:''
                }
            }
        },
        components: {
            Menu,
            Banner,
            ClassificationItem,
            ActiveRegion,
            GuideHeadline,
            AppCard1,
            // AppCard2,
            HalfPrice,
            VipBuy,
            SpecialCard
        },
        computed:{
            ...mapState([ 
                "userInfo" ,
                "sysInfo"
            ])
        },
        methods:{
            checkLogin(){
                if(this.userInfo.phone){
                    this.$router.push({name: 'mine'});
                }else{
                    this.$router.replace({name: 'login'});
                }
            },
            check_resetbannerData2(){
                let that = this;
                if(that.userInfo.phone){
                    spec({phone:that.userInfo.phone}).then((res)=>{
                        if(res.data.resultCode == 0){
                            if(res.data.data && res.data.data.length > 0){
                                that.localFlag = true;
                                res.data.data.forEach((item,i)=>{
                                    that.$set(that.bannerData2.arr,i,{id: res.data.data[i].id,img: that.Common.getImgUrl(res.data.data[i].icon),linkurl:res.data.data[i].linkurl});
                                });
                            }
                        }
                        //else{
                        //    that.$toast.fail('加载失败了，刷新重试哦！');
                        //}
                    })
                    //.catch(()=>{
                    //    that.$toast.fail('加载失败了，刷新重试哦！');
                    //});
                }else{
                    return null
                }
            }
        },
        beforeDestroy: function () {
            messageBus.$off(['msg_check_resetbannerData2']);
        }
    }
</script>
<style lang="less" scoped>
.home{
    position: relative;
    padding-bottom: 1.09rem;
    .top-bg{
        display: block;
        width:100vw;
        position: absolute;
        top: 0;
    }
    .zone{
        padding: 0 0.35rem 0.51rem 0.35rem;
        border-bottom:0.16rem solid#f4f5fb;
        background:white;
        .login-bar{
            height: 1.04rem;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 0;
            .check-login{
                display:flex;
                align-items:center;
                .avatar{
                    width: 0.64rem;
                    height: 0.64rem;
                    border-radius: 50%
                }
                .nickname{
                    font-size: 0.24rem;
                    color: #fff;
                    padding-left: 0.12rem;
                }
            }
            .search{
                width: 0.48rem;
                height: 0.5rem;
                margin-right: 0.1rem
            }
        }
        .classification{
            margin: 0.36rem 0 0.06rem;
            display: flex;
            justify-content: space-around;
            align-items: flex-start
        }
        .half-list{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
        .vip-list,.new-list,.hot-list,.special-list{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap
        }
    }
    .basic.zone{
        border-bottom:0;
        padding-bottom: 0;
    }
    .half.zone{
        padding-bottom: 0.18rem;
    }
}
    
</style>