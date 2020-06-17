<template>
    <div class="home">
        <!-- 顶部背景 -->
        <img class="top-bg" src="@imgs/home/topBg.png" />
        <div v-for="(zone,i) in zonesOrder" :key="i">
            <div class="zone basic" v-if="zone == 'basic'" :style="{overflow:sysInfo.channel=='st'?'hidden':'visible'}">
                <!-- 登录状态栏 -->
                <div class="login-bar" v-if="sysInfo.channel!='st'">
                    <div class="check-login" @click.stop="checkLogin">
                        <img class="avatar" :src="userInfo.avatar" alt="">
                        <span class="nickname">{{userInfo.phoneMask ? userInfo.phoneMask:'未登录'}}</span>
                    </div>
                    <router-link tag='img' class="search" alt="" :src="require('@imgs/search@2x.png')" :to="'search'"></router-link>
                </div>
                <div class="login-bar-st" v-if="sysInfo.channel=='st'">
                    <div class="check-login"> <!-- @click.stop="checkLogin" -->
                        <img class="avatar" :src="userInfo.phone?require('@imgs/home/avatar_st2@2x.png'):require('@imgs/home/avatar_st1@2x.png')" alt="">
                        <span class="nickname">{{userInfo.phoneMask ? userInfo.phoneMask:'游客用户'}}</span>
                    </div>
                    <img class="jumb-btn" alt="" @click.stop="checkLogin" :src="userInfo.phone?require('@imgs/home/mine.png'):require('@imgs/home/login.png')" />
                </div>


                <!-- 轮播图 -->
                <van-swipe class="banner banner1" ref="banner1" :autoplay="3000" @change="onChange1">
                    <van-swipe-item v-for="(item, index) in banner1.arr" :key="index">
                        <div class="wrapper">
                            <img class="banner-img" alt="" v-lazy="Common.getImgUrl(item.icon)" @click.stop="jump(item.linkurl, item.needPnsign)" />
                        </div>
                    </van-swipe-item>
                    <div v-show="sysInfo.channel!='st'" class="custom-indicator" slot="indicator">
                        <span @click.stop="changeslide1(i)" v-for="(item, i) in banner1.arr" :key="i" :class="{'self-indicator':true,'active-indicator':i==banner1.current,'common-indicator':i!=banner1.current}"></span>
                    </div>
                </van-swipe>


                <!-- 分类区 -->
                <div v-show="sysInfo.channel!='st'" class="classification">
                    <classification-item1 v-for="(item,i) in classification" :key="i" :item="item"></classification-item1>
                </div>
                <!-- 权益领取 -->
                <guide-headline v-if="sysInfo.channel=='st'" :info="guide7"></guide-headline>
                <!-- 权益领取轮播图 -->

                <div class="banner3-wrapper" v-if="sysInfo.channel=='st'">
                    <div class="banner3" ref="banner3" @scroll="banner3_scroll">
                        <div class="content" ref="banner3_content" :style="{width:banner3.arr.length * 1.7 +'rem'}">
                            <classification-item2 v-for="(item,i) in banner3.arr" :key="i" :item="item"></classification-item2>
                        </div>
                    </div>
                    <div class="progress-bar" ref="progress_bar">
                        <div class="progress" ref="progress"></div>
                    </div>
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
                <half-price :guide="guide6" :halfApps="halfApps.slice(0,3)"></half-price>
            </div>
            <!-- 会员优惠购 -->
            <div class="zone vip" v-if="zone == 'vip'" v-show="vipApps.length">
                <!-- <guide-headline :info="guide5" :vip="true"></guide-headline>
                <div class="vip-list">
                    <app-card1 v-for="(item,j) in vipApps" :key="j" :info="item" :index="j" :vip="true"></app-card1>
                </div> -->
                <vip-buy :guide="guide5" :vipApps="vipApps.slice(0,3)"></vip-buy>
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
                <!-- 轮播图 -->
                <van-swipe class="banner banner2" ref="banner2" :autoplay="3000" @change="onChange2">
                    <van-swipe-item v-for="(item, index) in banner2.arr" :key="index">
                        <div class="wrapper">
                            <img class="banner-img" alt="" v-lazy="Common.getImgUrl(item.icon)" @click.stop="jump(item.linkurl, item.needPnsign)" />
                        </div>
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">
                        <span @click.stop="changeslide2(i)" v-for="(item, i) in banner2.arr" :key="i" :class="{'self-indicator':true,'active-indicator':i==banner2.current,'common-indicator':i!=banner2.current}"></span>
                    </div>
                </van-swipe>
            </div>
        </div>

        <!-- 底部菜单栏 -->
        <Menu></Menu>
    </div>
</template>

<script>
    // @ is an alias to /src
    import ClassificationItem1 from '@/components/home/ClassificationItem1.vue';
    import ClassificationItem2 from '@/components/home/ClassificationItem2.vue';
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
                this.banner1.arr = res.data.data['105']?res.data.data['105']:[];
                this.banner1.arr[0] && (this.banner1.arr[0].needPnsign = true);
                this.banner1.arr[1] && (this.banner1.arr[1].needPnsign = true);
                if (process.env.NODE_ENV  !== 'production') {
                    this.banner1.arr.push({
                        id: 4,icon:require('@imgs/home/banner1_4.png'),linkurl:location.origin+'/'+location.search+'#/custompage/2'
                    })
                }
                // if (process.env.VUE_APP_BUILD === 'production') {
                //     this.banner1.arr.unshift({
                //         id: 3,icon:require('@imgs/home/banner1_4.png'),linkurl:'https://rwk.cmicrwx.cn/rwx/rwkvue/RightMarket/',needPnsign:true
                //     })
                //     this.banner1.arr.unshift({
                //         id: 4,icon:require('@imgs/home/banner1_5.png'),linkurl:'https://shop.10086.cn/zhuanqu/anniversary/index.html#/equity/index',needPnsign:true
                //     })
                // } else {
                //     this.banner1.arr.unshift({
                //         id: 3,icon:require('@imgs/home/banner1_4.png'),linkurl:'https://rwk.cmicrwx.cn/rwx/rwkvue/RightMarket/',needPnsign:true
                //     })
                //     this.banner1.arr.unshift({
                //         id: 4,icon:require('@imgs/home/banner1_5.png'),linkurl:'https://shop.10086.cn/zhuanqu/test/anniversary/index.html#/equity/index',needPnsign:true
                //     })
                // }
            }).catch((e)=>{
                console.log(e)
                this.$toast.fail('加载失败了，刷新重试哦！');
            });

            this.resetBanner2();

            messageBus.$on('msg_resetBanner2',this.resetBanner2);
            
            //全渠道、微信渠道、分省渠道统计
            if (this.sysInfo.channel == 'wx'){
                customAnalysis(STATISTICS.activityId, STATISTICS[this.sysInfo.channel][0])
            }
            customAnalysis(STATISTICS.activityId, STATISTICS.all[0]);
            if (this.sysInfo.locationCode && process.env.VUE_APP_BUILD == 'production') {
                customAnalysis(STATISTICS_PROVINCE.activityId,STATISTICS_PROVINCE.key);
                customAnalysis(STATISTICS_PROVINCE.activityId,STATISTICS_PROVINCE.key,this.sysInfo.locationCode);
            }

        },
        data(){
            return{
                zonesOrder:['basic','half','vip','new','hot','special','local'],
                banner1:{
                    current:0,
                    indicatorPosition:'outside',
                    indicatorSite:'center',
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
                    name:'精选5折购',
                    id:'1',
                    moreDesc:'更多5折',
                    path:{name: 'halfPrice'},
                },
                guide7:{
                    name:'权益领取'
                },
                halfApps:[],
                vipApps:[],
                newApps:[],
                hotApps:[],
                specialApps:[],
                activeRegionFlag:false,
                localFlag:false,
                banner2:{
                    current:0,
                    indicatorPosition:'inside',
                    indicatorSite:'right',
                    arr:[
                    ],
                    checkProvince:true,
                    province:''
                },
                banner3:{
                    current:0,
                    indicatorPosition:'outside',
                    indicatorSite:'center',
                    arr:[
                        {id:0,title:'5G套内权益',h:'0.76rem',img:require('@imgs/home/banner3_1.png'),linkurl:'https://apiserv.cmicrwx.cn/cmcc/rights/5g/#/?channelId=C10000037360&version=101'},
                        {id:1,title:'宝藏卡权益',h:'0.67rem',img:require('@imgs/home/banner3_2.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?channelId=C10000018067&from=singlemessage'},
                        {id:2,title:'芝麻卡权益',h:'0.70rem',img:require('@imgs/home/banner3_3.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?cardType=2&channelId=C10000018066'},
                        {id:3,title:'5G家庭会员',h:'0.72rem',img:require('@imgs/home/banner3_4.png'),linkurl:'https://hy.10086.cn/cmccplus/UniAuth.html?WT.ac_id=20191029HYJTQYLQ_MO_O_Z000STKHDICON_WD'},
                        {id:4,title:'5Gplus会员',h:'0.78rem',img:require('@imgs/home/banner3_5.png'),linkurl:'https://5g.cmicvip.cn/2016tyjf/5gqytc/res/wap/index.html?sspId=67769'},
                        {id:5,title:'5G直通车',h:'0.52rem',img:require('@imgs/home/banner3_6.png'),linkurl:'https://5g.cmicvip.cn/2016tyjf/5gztc/res/wap/index.html?sspld=70420'},
                        {id:6,title:'全球通会员',h:'0.66rem',img:require('@imgs/home/banner3_7.png'),linkurl:'https://qqt.cmicrwx.cn/2016tyjf/xhmqqthy/res/wap/activity.html?sspId=66025'},
                        {id:7,title:'随心系权益',h:'0.76rem',img:require('@imgs/home/banner3_8.png'),linkurl:'https://apiserv.cmicrwx.cn/cmcc/rights/scene/rightsbaw/index.html#/'},
                        {id:8,title:'联名卡权益',h:'0.70rem',img:require('@imgs/home/banner3_9.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?channelId=C10000013149&cardType=5'}
                    ]
                },
            }
        },
        components: {
            Menu,
            ClassificationItem1,
            ClassificationItem2,
            ActiveRegion,
            GuideHeadline,
            AppCard1,
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
            onChange1(i){
                this.banner1.current = i
            },
            changeslide1(i){
                this.$refs.banner1[0].swipeTo(i);
            },
            onChange2(i){
                this.banner2.current = i
            },
            changeslide2(i){
                this.$refs.banner2[0].swipeTo(i);
            },
            jump(link, needPnsign){
                if (link){
                    if (needPnsign) {
                        location.href = link + '?pnsign=' + this.userInfo.pnsign
                    } else {
                        location.href = link
                    }
                }
            },
            banner3_scroll(){
                let a=parseFloat(window.getComputedStyle(this.$refs.banner3_content[0], null).width);
                let b=parseFloat(window.getComputedStyle(this.$refs.banner3[0], null).width);
                let c=parseFloat(window.getComputedStyle(this.$refs.progress_bar[0], null).width);
                let d=parseFloat(window.getComputedStyle(this.$refs.progress[0], null).width);
                let percent = this.$refs.banner3[0].scrollLeft/(a-b);
                this.$refs.progress[0].style.left = percent*(c-d) + 'px'
            },
            checkLogin(){
                if(this.userInfo.phone){
                    this.$router.push({name: 'mine'});
                }else{
                    if(this.sysInfo.channel == 'st'){
                        messageBus.$emit('msg_checkLogin','init');
                    }else{
                        this.$router.replace({name:'login'})
                    }
                }
            },
            resetBanner2(){
                let that = this;
                if(that.userInfo.phone){
                    spec({phone:that.userInfo.phone}).then((res)=>{
                        if(res.data.resultCode == 0){
                            if(res.data.data && res.data.data.length > 0){
                                that.localFlag = true;
                                res.data.data.forEach((item,i)=>{
                                    that.$set(that.banner2.arr,i,{id: res.data.data[i].id,img: that.Common.getImgUrl(res.data.data[i].icon),linkurl:res.data.data[i].linkurl});
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
            messageBus.$off(['msg_resetBanner2']);
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
        .login-bar-st{
            height: 0.68rem;
            border-radius: 0.34rem;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 0;
            background: rgb(143, 204, 255);
            margin:0.28rem 0 0.3rem;
            box-sizing: border-box;
            .check-login{
                display:flex;
                align-items:center;
                .avatar{
                    width: 0.72rem;
                    height: 0.72rem;
                    border-radius: 50%;
                    position: relative;
                    bottom: 0.1rem;
                    left:0.2rem
                }
                .nickname{
                    font-size: 0.27rem;
                    color: #fff;
                    padding-left: 0.29rem;
                }
            }
            .jumb-btn{
                width: 1.41rem;
                height: 0.54rem;
                margin-right: 0.08rem
            }
        }
        .banner{
            width: 100vw;
            margin-left: -.35rem;
            .wrapper{
                display: block;
                width: 90.66%;
                height:100%;
                border-radius: 0.25rem;
                overflow:hidden;
                background: rgba(0,0,0,.3);
                margin: 0 4.68%;
            }
            .banner-img{
                display: block;
                width: 100%
            }
            .custom-indicator{
                font-size: 0.12rem;
                .self-indicator{
                    display: inline-block;
                    padding: 0;
                    margin: 0;
                    width: 0.1rem;
                    height: 0.1rem;
                    border-radius:0.1rem; 
                    margin: 0 0.05rem;
                }
                .common-indicator{
                    background-color: #e0f1ff;;
                }
                .active-indicator{
                    background-color: #51afff;
                }
            }
        }
        .banner1 {
            .banner-img{
                height:2.4rem
            }
            .custom-indicator{
                .common-indicator{
                    background-color: #e0f1ff;;
                }
                .active-indicator{
                    background-color: #51afff;
                }
            }
        }
        .banner2 {
            .banner-img{
                height:1.62rem
            }
            .custom-indicator{
                position: absolute;
                right:0.61rem;
                bottom:0.16rem;
                .common-indicator{
                    background-color: rgba(255,255,255,0.3);
                }
                .active-indicator{
                    background-color: #fff
                }
            }
        }
        .classification{
            margin: 0.36rem 0 0.06rem;
            display: flex;
            justify-content: space-around;
            align-items: flex-start
        }
        .banner3-wrapper{
            height: 1.5rem;
            overflow: hidden;
            position: relative;
            .banner3{
                position: relative;
                overflow-x: auto;
                cursor: grab;
                user-select: none;
                width: 100%;
                height:1.7rem;
                .content{
                    height:1.2rem;
                }
            }
            .progress-bar{
                position: absolute;
                left:50%;
                transform: translateX(-50%);
                bottom: 0;
                margin-top: 0.21rem;
                height: 0.08rem;
                border-radius: 0.08rem;
                width:0.76rem;
                background: #EAEEF4;
                .progress{
                    position: relative;
                    width:0.32rem;
                    height: 0.08rem;
                    border-radius: 0.08rem;
                    background: #4FB0FF;
                }
            }
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