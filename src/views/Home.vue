<template>
    <div class="home">
        <!-- 顶部背景 -->
        <img class="top-bg" src="@imgs/home/topBg1.png" />
        <NavTab></NavTab>
        <div class="zone-wrap" v-for="(zone,i) in zonesOrder" :key="i">
            <div class="zone basic" v-if="zone == 'basic'" :style="{overflow:sysInfo.channel=='st'?'hidden':'visible'}">
                <!-- 登录状态栏 -->
                <!-- <div class="login-bar" v-if="sysInfo.channel!='st'">
                    <div class="check-login" @click.stop="loginBtnHandler('首页个人信息1','0005')">
                        <img class="avatar" :src="userInfo.phone?userInfo.avatar:require('@imgs/avatar_st1@2x.png')" alt="">
                        <span class="nickname">{{userInfo.phoneMask ? userInfo.phoneMask:'未登录'}}</span>
                    </div>
                    <router-link tag='img' class="search" alt="" :src="require('@imgs/search@2x.png')" @click="blocklogHandler('搜索入口','0003','0001')" :to="'search'"></router-link>
                </div>
                <div class="login-bar-st" v-if="sysInfo.channel=='st'">
                    <div class="check-login">
                        <img class="avatar" :src="userInfo.phone?require('@imgs/home/avatar_st2@2x.png'):require('@imgs/home/avatar_st1@2x.png')" alt="">
                        <span class="nickname">{{userInfo.phoneMask ? userInfo.phoneMask:'游客用户'}}</span>
                    </div>
                    <img class="jumb-btn" alt="" @click.stop="loginBtnHandler('首页个人信息2','0006')" :src="userInfo.phone?require('@imgs/home/mine.png'):require('@imgs/home/login.png')" />
                </div> -->


                <!-- 轮播图 -->
                <van-swipe class="banner banner1" ref="banner1" :autoplay="3000" @change="onChange1">
                    <van-swipe-item v-for="(item, index) in banner1.arr" :key="index">
                        <div class="wrapper">
                            <img class="banner-img" alt="" v-lazy="Common.getImgUrl(item.icon)" @click.stop="bannerHandler(item.linkurl, item.needPnsign, '首页banner','0007',index)" />
                        </div>
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">
                        <span @click.stop="changeslide1(i)" v-for="(item, i) in banner1.arr" :key="i" :class="{'self-indicator':true,'active-indicator':i==banner1.current,'common-indicator':i!=banner1.current}"></span>
                    </div>
                </van-swipe>

                <!-- 文字广播 -->
                <div class="text" v-if="textApps.length">
                    <div class="text-wrap">
                        <div class="text-title"></div>
                        <div class="text-split"></div> 
                        <div class="text-swipe" v-if="textApps.length != 1">
                            <swiper class="text-swipe-wrap" ref="textSwiper" :options="textSwiper">
                                <swiper-slide v-for="(item, index) in textApps" :key="index">
                                    <!-- <router-link tag="div" :to="item.linkurl" class="text-font">{{item.name}}</router-link> -->
                                    <div class="text-font">{{item.name}}</div>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div class="text-swipe" v-if="textApps.length == 1">
                            <div class="text-font" @click.stop="jump(textApps[0].linkurl)">{{textApps[0].name}}</div>
                        </div>
                    </div> 
                </div>

                <!-- 分类区 -->
                <!-- <div v-show="sysInfo.channel!='st'" class="classification">
                    <classification-item1 v-for="(item,i) in classification" :key="i" :item="item"></classification-item1>
                </div> -->
                <!-- 权益领取 -->
                <guide-headline style="padding-top:.3rem" :info="guide7" v-if="sysInfo.channel=='st' && rightsApps.length"></guide-headline>
                <!-- 权益领取轮播图 -->

                 <!--<div class="banner3-wrapper" v-if="sysInfo.channel=='st' && banner3_arr.length">-->
                <div class="banner3-wrapper" v-if="sysInfo.channel=='st' && rightsApps.length">
                    <!-- <div class="banner3" ref="banner3" @scroll="banner3_scroll"> -->
                    <div class="banner3" ref="banner3">
                        <swiper class="content" ref="rightSwiper" :options="rightSwiper">
                            <swiper-slide v-for="(item, index) in rightsApps" :key="index">
                                <classification-item2 :item="item" @click.native="blocklogHandler('分类区tap2','0009',('000'+(index+1)).slice(-4),item.linkurl)"></classification-item2>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-scrollbar" slot="scrollbar"></div>
                    </div>
                </div>

                <!-- 活动区 -->
                <guide-headline v-show="activeRegionFlag" :info="guide0"></guide-headline>
                <active-region v-show="activeRegionFlag"></active-region>

                <!-- VIP限时秒杀 -->
                <div class="limitbuy" v-if="limitbuyApps.length">
                    <limit-buy :guide="guide8" :limitbuyApps="limitbuyApps.slice(0,3)" :activityStatus="guide8.activityStatus" :endTime="guide8.endTime" :startTime="guide8.startTime"></limit-buy>
                </div>
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
            <div class="zone vip handpick" v-if="zone == 'vip'" 
            v-show="halfApps.length && (userInfo.phone && (userInfo.vipInfo !== '' || userInfo.newStarVipInfo !== '') || !userInfo.phone)">
                <div class="handpick-title">
                    <!-- 非会员 -->
                    <img v-show="!userInfo.vipInfo && !userInfo.newStarVipInfo" class="handpick-icon" src="@imgs/home/handpick1.png">
                    <!-- 会员 -->
                    <img v-show="userInfo.vipInfo || userInfo.newStarVipInfo" class="handpick-icon-vip" src="@imgs/home/handpick2.png">
                    
                    <!-- 新星会员、非黄金会员 -->
                    <span @click.stop="subscribePopup" v-if="!userInfo.vipInfo && userInfo.newStarVipInfo">
                        <img class="handpick-btn" src="@imgs/home/handpick_btn1.png">
                    </span>
                    <!-- 黄金会员 -->
                    <!-- <router-link tag="span" to="/vipBenefit" v-show="userInfo.vipInfo">
                        <span class="handpick-font">我的权益</span>
                    </router-link> -->
                    <router-link tag="span" to="/vipBenefit" v-else-if="userInfo.vipInfo">
                        <img class="handpick-btn1" src="@imgs/home/handpick_btn2.png">
                    </router-link>
                    <!-- 非会员 -->
                    <span @click.stop="subscribePopup" v-else>
                        <img class="handpick-btn" src="@imgs/home/handpick_btn.png">
                    </span>
                </div>
                <!-- <guide-headline :info="guide5" :vip="true"></guide-headline>
                <div class="vip-list">
                    <app-card1 v-for="(item,j) in vipApps" :key="j" :info="item" :index="j" :vip="true"></app-card1>
                </div> -->
                <!-- <vip-buy :guide="guide5" :vipApps="vipApps.slice(0,3)"></vip-buy> -->
                <App-card-vip :vipApps="halfApps.slice(0,3)"></App-card-vip>
            </div>
            <!-- 商品上新 -->
            <div class="zone new" v-if="zone == 'new'" v-show="newApps.length">
                <guide-headline :info="guide1"></guide-headline>
                <div class="new-list">
                    <app-card4 v-for="(item,j) in newApps.slice(0,8)" :key="j" :info="item" :index="j"  @click.native="blocklogHandler('商品上新','0012',(j<9?'000'+(j+1):'00'+(j+1)),'',item.mid,item.name)"></app-card4>
                </div>
            </div>
            <!-- 热门推荐 -->
            <div class="zone hot" v-if="zone == 'hot'" v-show="hotApps.length">
                <guide-headline :info="guide2"></guide-headline>
                <div class="hot-list">
                    <app-card1 v-for="(item,k) in hotApps" :key="k" :info="item" :index="k"   @click.native="blocklogHandler('热门推荐','0013',(k<9?'000'+(k+1):'00'+(k+1)),'',item.mid,item.name)"></app-card1>
                </div>
            </div>
            <!-- 特色权益 -->
            <div class="zone special" v-if="zone == 'special'" v-show="specialApps.length">
                <guide-headline :info="guide3"></guide-headline>
                <div class="special-list">
                    <special-card v-for="(item,l) in specialApps" :key="l" :info="item" :index="l"   @click.native="blocklogHandler('特色权益','0014',(l<9?'000'+(l+1):'00'+(l+1)),item.linkurl)"></special-card>
                </div>
            </div>
            <!-- 热门活动 -->
            <div class="zone hotBanner" v-if="zone == 'hotBanner'" v-show="bannerHot.arr.length">
                <guide-headline :info="guide9"></guide-headline>
                <van-swipe class="banner banner1" ref="bannerHot" :autoplay="3000" @change="onChangeHot">
                    <van-swipe-item v-for="(item, index) in bannerHot.arr" :key="index">
                        <div class="wrapper">
                            <img class="banner-img" alt="" v-lazy="Common.getImgUrl(item.icon)" @click.stop="bannerHandler(item.linkurl, item.needPnsign, '热门活动','0049',index)" />
                        </div>
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">
                        <span @click.stop="changeslideHot(i)" v-for="(item, i) in bannerHot.arr" :key="i" :class="{'self-indicator':true,'active-indicator':i==bannerHot.current,'common-indicator':i!=bannerHot.current}"></span>
                    </div>
                </van-swipe>
            </div>
            <!-- 热卖权益 -->
            <div class="zone hotSell" v-if="zone == 'hotSell'">
                <guide-headline :info="guide10"></guide-headline>
                 <div class="hot-sell">
                    <hot-card v-for="(item,n) in hotSaleApps" :key="n" :info="item" :index="n" :saleId="hotAndNewSaleId" :hotCount="hotCount"></hot-card>
                </div>
                <div class="bottom-tip" v-if="loadding" :style="{height:(loaddingMessage === '上拉加载更多')?'1.01rem':''}">{{loaddingMessage}}</div>
            </div>
            <!-- 本地专享 -->
            <div class="zone local" v-if="zone == 'local' && userInfo.phone && localFlag">
                <guide-headline :info="guide4"></guide-headline>
                <!-- 轮播图 -->
                <van-swipe class="banner banner2" ref="banner2" :autoplay="3000" @change="onChange2">
                    <van-swipe-item v-for="(item, index) in banner2.arr" :key="index">
                        <div class="wrapper">
                            <img class="banner-img" alt="" v-lazy="Common.getImgUrl(item.icon)" @click.stop="bannerHandler(item.linkurl, item.needPnsign,'本地专享','0015',index)" />
                        </div>
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">
                        <span @click.stop="changeslide2(i)" v-for="(item, i) in banner2.arr" :key="i" :class="{'self-indicator':true,'active-indicator':i==banner2.current,'common-indicator':i!=banner2.current}"></span>
                    </div>
                </van-swipe>
            </div>
        </div>

        <!-- 底部菜单栏 -->
        <!-- <Menu></Menu> -->
        <!-- 底部登录栏 -->
        <div class="bottom-login" v-show="!userInfo.phone">
            登录畅购权益
            <span class="bottom-login-btn" @click.stop="bottomLogin">立即登录</span>
        </div> 
        <!-- 侧边悬浮栏 -->
        <div class="add-float" v-show="addShow">
            <router-link tag="div" to="/vipBenefit" class="add-img">
                <img src="@imgs/home/adbg.png">
            </router-link>
            <div @click="addShow=false" class="add-close"></div>
        </div>
        <!-- 弹框广告 -->
        <div class="add-popup" v-show="addPopupShow && sysInfo.channel!='st'">
            <!-- <div class="add-popup-con" @click.stop="jump('http://www.baidu.com')">
                <img class="add-popup-img" src="@imgs/home/addPopup.png" alt="">
            </div> -->
            <div class='ad-wrapper'>
                <router-link tag="div" to="/vipBenefit" class="add-popup-con">
                    <img class="add-popup-img" src="@imgs/home/addPopup.png" alt="">
                </router-link>
                <div @click="addPopupShow=false" class="add-popup-close"></div>
            </div>
        </div>
        <!-- 订购会员二次确认弹窗 -->
        <SecondConfirmBuy :info="SecondConfirmInfo"></SecondConfirmBuy>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import ClassificationItem1 from '@/components/home/ClassificationItem1.vue';
    import ClassificationItem2 from '@/components/home/ClassificationItem2.vue';
    import GuideHeadline from '@/components/home/GuideHeadline.vue';
    import ActiveRegion from '@/components/home/ActiveRegion.vue';
    import AppCard1 from '@/components/home/AppCard1.vue';
    import AppCard4 from '@/components/home/AppCard4.vue';
    import AppCardVip from '@/components/home/AppCardVip.vue';
    import NavTab from '@/components/home/navTab.vue';
    // import AppCard2 from '@/components/home/AppCard2.vue';
    import HalfPrice from '@/components/common/HalfPrice.vue';
    // import VipBuy from '@/components/common/VipBuy.vue';
    import LimitBuy from '@/components/common/LimitBuy.vue';
    import SpecialCard from '@/components/home/SpecialCard.vue';
    import HotCard from '@/components/home/HotCard.vue';
    // import Menu from '@/components/common/Menu.vue';
    import messageBus from "@/utils/messageBus";
    import {STATISTICS,STATISTICS_PROVINCE,AID_SECKILL,VIPORDER} from "@/utils/constant";
    // import store from '@/store'
    import { mapState } from 'vuex'
    import {getData,spec,findSecKill,hotSales} from "@/api/home";
    import { pagelogMixin,blocklogMixin } from "@/mixins/log"
    import {customAnalysis} from "@/assets/js/analysis";
    // import {getBanner,getQuery,delQuery} from '@/utils/func';
    import SecondConfirmBuy from '@/components/common/SecondConfirmBuy'
    import {getBanner,delQuery} from '@/utils/func';
    import {setCookie,getCookie, delCookie} from "@/utils/cookie";

    let vm = null;
    export default {
        name: 'home',
        mixins: [pagelogMixin,blocklogMixin],
        created(){
            vm = this;
            
            // // 微信环境下不展示
            // let userAgent = navigator.userAgent.toLowerCase();
            // if (userAgent.match(/MicroMessenger/i)=="micromessenger") {
            //     this.banner3Show = false;
            // }
            // let that = this;
            // let headers = {'phone': this.userInfo.phone};
            // this.banner1.arr = getBanner(this.banner1.arr, this.sysInfo.channelCode);// 静态取banner
            // getData(headers).then((res)=>{
            //     this.halfApps = res.data.data['108']?res.data.data['108']:[];
            //     this.newApps = res.data.data['100']?res.data.data['100']:[];
            //     this.hotApps = res.data.data['101']?res.data.data['101']:[];
            //     this.textApps = res.data.data['112']?res.data.data['112']:[];
            //     this.specialApps = res.data.data['102']?res.data.data['102']:[];
            //     if (res.data.data['111'] && res.data.data['111'].length!=0) {
            //         for (let index = 0; index < res.data.data['111'].length; index++) {
            //             const item = res.data.data['111'][index];
            //             if (item.icon && item.icon!=='') {
            //                 this.bannerHot.arr.push(item);
            //             }
            //         }
            //     }
            //     this.rightsApps = [];
            //     res.data.data['113'] && res.data.data['113'].forEach(item => {
            //         item.img = process.env.VUE_APP_IMG_PRE+item.icon;
            //         item.title = item.name;
            //         item.icon && this.rightsApps.push(item)
            //     });

            //     if (this.banner1.arr.length === 0) {
            //         let resultArr = [];
            //         for (let item of res.data.data['105']) {
            //             if(item.icon){
            //                 resultArr.push(item);
            //             }
            //         }
            //          this.banner1.arr = resultArr;
            //     // this.banner1.arr[0] && (this.banner1.arr[0].needPnsign = true);
            //     }


            //     //曝光统计：商品上新
            //     if(this.newApps.length > 0){
            //         this.blocklogHandler("商品新上",'0012','')
            //         this.newApps.forEach(item => {
            //             this.hotAndNewSaleId.push(item.saleid)
            //         })
            //         if(this.hotAndNewSaleId >8){
            //             this.hotAndNewSaleId = this.hotAndNewSaleId.slice(0,8)
            //         }
            //     }
            //     //曝光统计：热门推荐
            //     if(this.hotApps.length > 0){
            //         this.blocklogHandler("热门推荐",'0013','')
            //         if(this.hotApps.length > 6){
            //             this.hotApps.forEach((item,index) => {     
            //                 if(index <6){
            //                     this.hotAndNewSaleId.unshift(item.saleid)//如果多于6个，只取前6个
            //                 }                                             
            //             })
            //             this.hotCount = 6
            //         }else{
            //             this.hotApps.forEach(item => {                       
            //                 this.hotAndNewSaleId.unshift(item.saleid)
            //             })
            //             this.hotCount = this.hotApps.length;
            //         }
            //     }
            //     //曝光统计：特色权益
            //     if(this.specialApps.length > 0){
            //         this.blocklogHandler("特色权益",'0014','')
            //     }
            //     if (this.textApps.length !== 0) {
            //         let href = window.location.href.split('#')[0];
            //         for (let index = 0; index < this.textApps.length; index++) {
            //             const item = this.textApps[index];
            //             if (item.linkurl && (item.linkurl.indexOf(window.location.host) != -1)) {
            //                 item.linkurl = href + '#' + item.linkurl.split('#')[1];
            //             }
            //         }
            //     }
            // }).catch((e)=>{
            //    window.console.log(e)
            //     this.$toast('加载失败了，刷新重试哦！');
            // });
            // findSecKill({aid:AID_SECKILL}).then((res)=>{
            //     if(res.data.resultCode == 0){
            //         that.guide8.activityStatus = + res.data.data.activityStatus;
            //         that.guide8.startTime = res.data.data.startTime?res.data.data.startTime.replace(/-/g,'/'):'';
            //         that.guide8.endTime = res.data.data.endTime?res.data.data.endTime.replace(/-/g,'/'):'';
            //         // that.guide8.activityStatus = res.data.data.activityStatus = 0;
            //         // that.guide8.startTime = '2020-07-24 12:55:00';
            //         // that.guide8.endTime = '2020-07-24 12:56:00';
            //         if(res.data.data && res.data.data.list.length > 0){
            //             that.limitbuyApps = res.data.data.list;
            //         }
            //     }
            // })
            // .catch((e)=>{
            //     window.console.log(e)
            //     that.$toast('加载失败了，刷新重试哦！');
            // });
            // hotSales({
            //     current:1 
            // }).then((res)=>{
            //     if(res.data.resultCode == 0){
            //         this.hotSaleApps = res.data.data?res.data.data:[];
            //     }
            // })
            // .catch((e)=>{
            //     window.console.log(e)
            //     that.$toast('加载失败了，刷新重试哦！');
            // });
            // this.resetBanner2();
            // // 登录页不弹框
            // setCookie('ql','true',30);
            // messageBus.$on('msg_resetBanner2',this.resetBanner2);
            // messageBus.$on('msg_setSeckillActivityStatus',(num)=>{
            //     this.setSeckillActivityStatus(num);
            // });
            // // 集团渠道插码
            // if(this.sysInfo.channelCode == 67057){
            //     (function(){
            //         let sdcjs = document.getElementById("sdcjs");
            //         if (sdcjs){
            //             sdcjs.parentNode.removeChild(sdcjs);
            //         }
            //         var s=document.createElement("script"); s.async=true;s.id='sdcjs'; s.src="./js/jt_sdc_load.js";    
            //         var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
            //     }());
            // }
            // //全渠道、微信渠道、手厅渠道、分省渠道统计
            // if (this.sysInfo.channel == 'wx' || this.sysInfo.channel == 'st'){
            //     customAnalysis(STATISTICS.activityId, STATISTICS[this.sysInfo.channel][0])
            // }
            // customAnalysis(STATISTICS.activityId, STATISTICS.all[0]);
            // if (this.sysInfo.locationCode && process.env.VUE_APP_BUILD == 'production') {
            //     customAnalysis(STATISTICS_PROVINCE.activityId,STATISTICS_PROVINCE.key);
            //     customAnalysis(STATISTICS_PROVINCE.activityId,STATISTICS_PROVINCE.key,this.sysInfo.locationCode);
            // }
            // //曝光统计：搜索
            // this.blocklogHandler("搜索入口,首页banner",'0003,0007','')
            // if (this.sysInfo.channel == 'st') {
            //     this.blocklogHandler("首页个人信息2,分类区tap2",'0006,0009','')
            // }else{
            //     this.blocklogHandler("首页个人信息1",'0005','')
            // }

            // //会员订购二次确认窗显隐 
            // messageBus.$on('msg_subscribePopup',(flag)=>{
            //     this.subscribePopup(flag)
            // });

            // // 广告弹框新建cookie
            // if (getCookie('ql') && !getCookie('ad') && this.sysInfo.channel!='st') {
            //     setCookie('ad','true', 720);
            //     this.addPopupShow = true;
            // }

            //绑定刷新或关闭页面事件 
            // window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
        },
        data(){
            return{
                // zonesOrder:['basic','half','vip','new','hot','special','hotBanner','hotSell','local'],
                zonesOrder:['basic','vip','new','special','hotBanner','hotSell'],
                loadding:true,
                loaddingMessage:"",
                hotAndNewSaleId:[],//存储热门和上新产品的saleid，用于热门权益打标签
                hotAxiosCount:1,//记录热门权益下拉请求的次数
                hotCount:0,//记录热门推荐产品的数量，主要是记录《=8的情况数量
                banner1:{
                    current:0,
                    indicatorPosition:'outside',
                    indicatorSite:'center',
                    arr:[
                        //静态设置列表
                        // {
                        //     icon: 'banner1_618_2.png',
                        //     startDate: '2020/06/17 00:00:00',
                        //     endDate: '2020/06/22 00:00:00',
                        // },
                        // {
                        //     icon: 'banner1_618_6.jpg',
                        //     startDate: '2020/06/17 00:00:00',
                        //     endDate: '2021/06/18 00:00:00',
                        //     linkurl: 'https://ykhjx.cmicvip.cn/2016tyjf/ykhjx/res/wap/groupbuy.html?sspId=73541',
                        // },
                        // {
                        //     icon: 'home_banner_lingquanyi.jpg',
                        //     startDate: '2020/06/17 00:00:00',
                        //     endDate: '2021/06/18 00:00:00',
                        //     linkurl: 'https://10086.cn/d/yuYNJj',
                        // },
                        // {
                        //     icon: 'home_banner_youhuigou.png',
                        //     startDate: '2020/06/17 00:00:00',
                        //     endDate: '2021/06/18 00:00:00',
                        //     linkurl: 'https://shop.10086.cn/zhuanqu/anniversary/index.html#/equity/index',
                        //     needPnsign: true
                        // }
                    ]
                },
                textSwiper: {
                    direction : 'vertical',
                    autoHeight: true,
                    loop: true,
                    on: {
                        click: function() {
                            vm.jump(vm.textApps[this.realIndex].linkurl);
                        }
                    },
                    autoplay: {// 自动滑动
                        delay: 5000,
                        disableOnInteraction: false
                    },
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
                    id:'1',
                    blockId:'',
                    positionId:'9999',
                    blockName:'免费福利'
                },
                guide1:{
                    name:'权益上新',
                    id:'1',
                    blockId:'0012',
                    positionId:'9999',
                    blockName:'权益上新'
                },
                guide2:{
                    name:'热门推荐',
                    id:'1',
                    blockId:'0013',
                    positionId:'9999',
                    blockName:'热门推荐'
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
                    blockId:'0011',
                    positionId:'9999',
                    blockName:'会员优惠购',
                    moreDesc:'更多优惠',
                    path:{name: 'vipPreferential'},
                },
                guide6:{
                    name:'精选5折购',
                    id:'1',
                    blockId:'0010',
                    positionId:'9999',
                    blockName:'精选5折购',
                    moreDesc:'更多5折',
                    path:{name: 'halfPrice'},
                },
                guide7:{
                    name:'权益领取'
                },
                rightSwiper: {
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                    },
                    slidesPerView : 4,
                    slidesPerGroup: 4,
                },
                banner3Show: true,
                guide8:{
                    name:'VIP限时秒杀',
                    activityStatus:'',
                    startTime:'',
                    endTime:''
                },
                guide9:{
                    name: '热门活动'
                },
                guide10:{
                    name: '热卖权益',
                    id: '1',
                    moreDesc:'全部权益',
                },
                limitbuyApps:[],
                halfApps:[],
                vipApps:[],
                newApps:[],
                hotApps:[],
                hotSaleApps:[],//热卖权益
                hotSaleAddApps:[],//下拉刷新时新增的热卖权益
                specialApps:[],
                textApps:[], // 文字链
                rightsApps: [], //权益领取
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
                    indicatorSite:'center'
                },
                bannerHot: {
                    current:0,
                    indicatorPosition:'outside',
                    indicatorSite:'center',
                    arr:[],
                },
                SecondConfirmInfo: {
                    payShow: false,
                    paydetailList: {
                        price: '0',
                    },
                    orderObject: {
                        phone: '',
                        phoneMask: ''
                    },
                    callback:''
                },
                addShow: true, // 右侧广告栏展示参数
                addPopupShow: false, // 弹层广告
            }
        },
        components: {
            // Menu,
            // ClassificationItem1,
            ClassificationItem2,
            ActiveRegion,
            GuideHeadline,
            AppCard1,
            AppCard4,
            AppCardVip,
            LimitBuy,
            HalfPrice,
            // VipBuy,
            SpecialCard,
            HotCard,
            NavTab,
            SecondConfirmBuy
        },
        computed:{
            ...mapState([ 
                "userInfo",
                "sysInfo"
            ]),
            banner3_arr(){
                if(new Date("2020/06/28 00:00:00").getTime() <= new Date().getTime()){//期间
                    return [
                        {id:0,title:'5G套内权益',h:'0.76rem',img:require('@imgs/home/banner3_1.png'),linkurl:'https://apiserv.cmicrwx.cn/cmcc/rights/5g/#/?channelId=C10000037360&from=GR.F000000024'},
                        {id:1,title:'宝藏卡权益',h:'0.67rem',img:require('@imgs/home/banner3_2.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?channelId=C10000018067&from=GR.F000000016'},
                        {id:2,title:'芝麻卡权益',h:'0.70rem',img:require('@imgs/home/banner3_3.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?cardType=2&channelId=C10000018066'},
                        {id:3,title:'明星卡权益',h:'0.70rem',img:require('@imgs/home/banner3_9.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?channelId=C10000013149&cardType=5'},
                        {id:4,title:'哆啦锦鲤卡',h:'0.70rem',img:require('@imgs/home/banner3_10.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?cardType=1&channelId=C10000029343&from=GR.F000000031'},
                        {id:5,title:'5Gplus会员',h:'0.78rem',img:require('@imgs/home/banner3_5.png'),linkurl:'https://5g.cmicvip.cn/2016tyjf/5gqytc/res/wap/index.html?sspId=67769'},
                        {id:6,title:'5G直通车',h:'0.52rem',img:require('@imgs/home/banner3_6.png'),linkurl:'https://dev.coc.10086.cn/coc/web/coc2020/pretty_5g/?channelId=C00004003741&pageId=1264892575881678848&type=hot'},
                        {id:7,title:'全球通会员',h:'0.66rem',img:require('@imgs/home/banner3_7.png'),linkurl:'https://qqt.cmicrwx.cn/2016tyjf/xhmqqthy/res/wap/activity.html?sspId=66025'},
                        {id:8,title:'随心系权益',h:'0.76rem',img:require('@imgs/home/banner3_8.png'),linkurl:'https://apiserv.cmicrwx.cn/cmcc/rights/scene/rightsbaw/index.html#?from=GR.F000000001'},
                        {id:9,title:'5G家庭会员',h:'0.72rem',img:require('@imgs/home/banner3_4.png'),linkurl:'https://hy.10086.cn/cmccplus/UniAuth.html?WT.ac_id=20191029HYJTQYLQ_MO_O_Z000STKHDICON_WD'}
                    ]
                }else{//未到期
                    return [
                        {id:0,title:'5G套内权益',h:'0.76rem',img:require('@imgs/home/banner3_1.png'),linkurl:'https://apiserv.cmicrwx.cn/cmcc/rights/5g/#/?channelId=C10000037360&from=GR.F000000024'},
                        {id:1,title:'宝藏卡权益',h:'0.67rem',img:require('@imgs/home/banner3_2.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?channelId=C10000018067&from=GR.F000000016'},
                        {id:2,title:'芝麻卡权益',h:'0.70rem',img:require('@imgs/home/banner3_3.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?cardType=2&channelId=C10000018066'},
                        {id:3,title:'5G家庭会员',h:'0.72rem',img:require('@imgs/home/banner3_4.png'),linkurl:'https://hy.10086.cn/cmccplus/UniAuth.html?WT.ac_id=20191029HYJTQYLQ_MO_O_Z000STKHDICON_WD'},
                        {id:4,title:'哆啦锦鲤卡',h:'0.70rem',img:require('@imgs/home/banner3_10.png'),linkurl:'https://apiserv.cmicrwx.cn/fcyr4/index.html#/?cardType=1&channelId=C10000029343&from=GR.F000000031'},
                        {id:5,title:'5Gplus会员',h:'0.78rem',img:require('@imgs/home/banner3_5.png'),linkurl:'https://5g.cmicvip.cn/2016tyjf/5gqytc/res/wap/index.html?sspId=67769'},
                        {id:6,title:'5G直通车',h:'0.52rem',img:require('@imgs/home/banner3_6.png'),linkurl:'https://dev.coc.10086.cn/coc/web/coc2020/pretty_5g/?channelId=C00004003741&pageId=1264892575881678848&type=hot'},
                        {id:7,title:'全球通会员',h:'0.66rem',img:require('@imgs/home/banner3_7.png'),linkurl:'https://qqt.cmicrwx.cn/2016tyjf/xhmqqthy/res/wap/activity.html?sspId=66025'},
                        {id:8,title:'随心系权益',h:'0.76rem',img:require('@imgs/home/banner3_8.png'),linkurl:'https://apiserv.cmicrwx.cn/cmcc/rights/scene/rightsbaw/index.html#?from=GR.F000000001'},
                    ]
                }
            }
        },
        mounted(){
            window.addEventListener('scroll', this.lazyLoading);//滑动到底部，加载更多热门权益
        },
        methods:{
            // beforeunloadFn(e) {
            //     console.log(e,'刷新或关闭');
            //     // 记录首页滚动高度
            //     setCookie('homeScroll',document.documentElement.scrollTop);
            // },
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
            onChangeHot(i){
                this.bannerHot.current = i
            },
            changeslideHot(i){
                this.$refs.bannerHot[0].swipeTo(i);
            },
            bannerHandler(link, needPnsign, blockname,blockid,index){
                this.blocklogHandler(blockname,blockid,index<9?'000'+(index+1):'00'+(index+1),link);                
                this.jump(link, needPnsign);
            },
            jump(link, needPnsign){
                let that = this;
                if (link){
                    // window.console.info(getQuery);
                    // if(that.sysInfo.channel == 'st' && getQuery('zindex')=='basic' && that.$route.name == 'home'){
                    if(that.sysInfo.channel == 'st' && that.$route.name == 'home'){
                        window.leadeon.newWebview({
                            debug: false,
                            markID: '',                     //字符串类型，活动 ID （活动id，4.0之后允许不传，4.0之前必填）
                            type: '',           //字符串类型（分享类型，内部保留字段，允许不传）  4.0 新增
                            funCode: '',        //字符串类型（分享业务编码，内部保留字段，允许不传）  4.0 新增 详见“统一门户客户端V4.0_接口设计说明书”
                            bizCode: '', //功能编码，详见“客户端功能编码”(内部使用)
                            url: needPnsign?link + '?pnsign=' + that.userInfo.pnsign:link, //字符串类型，需要打开的 url，（1、URL中不能有空格；2、参数中如果有汉字，需要对汉字进行encodeURI()编码,最终的结果页面必须对这个参数decodeURI()解码，http://www.w3school.com.cn/jsref/jsref_encodeuri.asp）
                            success: function(res) {console.log(res)},
                            error: function(err) {console.log(err)}
                        });
                    }else{
                        //window.console.log(needPnsign ? link + '?pnsign=' + that.userInfo.pnsign:link)
                        location.href = needPnsign ? link + '?pnsign=' + that.userInfo.pnsign:link
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
            lazyLoading () { // 滚动到底部，再加载的处理事件
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let clientHeight = document.documentElement.clientHeight;
                let scrollHeight = document.documentElement.scrollHeight;
                if (scrollHeight-10 <(scrollTop + clientHeight) && (scrollTop + clientHeight) < scrollHeight+10) { // 如果滚动到接近底部，自动加载下一页
                    //事件处理
                    window.removeEventListener('scroll', this.lazyLoading);
                    this.loadding = true;
                    this.loaddingMessage = "上拉加载更多"
                    this.hotAxiosCount = this.hotAxiosCount+1
                    //请求接口
                    hotSales({
                        current:this.hotAxiosCount
                    }).then((res)=>{
                        if(res.data.resultCode == 0){    
                            this.hotSaleAddApps = res.data.data?res.data.data:[];
                             if(this.hotAxiosCount == 2){//返回10条数据                 
                                this.hotSaleApps = this.hotSaleApps.concat(this.hotSaleAddApps)
                                this.loaddingMessage = ""
                                window.addEventListener('scroll', this.lazyLoading); 
                            }else{//少于10条数据，说明是最后的数据了   
                                this.hotSaleApps = this.hotSaleApps.concat(this.hotSaleAddApps)
                                this.loaddingMessage = "———— 我是有底线的哦 ————"
                                window.removeEventListener('scroll', this.lazyLoading);
                            }
                            
                        }
                    })                                    
                }
            },
            loginBtnHandler(blockname,blockid) {
                if (this.userInfo.phone) {
                    this.blocklogHandler(blockname,blockid,'0002')
                } else {
                    this.blocklogHandler(blockname,blockid,'0001')
                }
                this.checkLogin();
            },
            bottomLogin() {
                delCookie('ql');
                messageBus.$emit('msg_checkLogin','quick',true);
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
                                    that.$set(that.banner2.arr,i,{id: res.data.data[i].id,icon: res.data.data[i].icon,linkurl:res.data.data[i].linkurl});
                                });
                                //曝光统计：本地专享
                                that.blocklogHandler("本地专享",'0015','')
                            }
                        }
                        //else{
                        //    that.$toast('加载失败了，刷新重试哦！');
                        //}
                    })
                    //.catch(()=>{
                    //    that.$toast('加载失败了，刷新重试哦！');
                    //});
                }else{
                    return null
                }
            },
            subscribePopup(flag=true){
                let that = this;
                if(flag){
                    let data = Object.assign({},VIPORDER);
                    data.channelCode = that.sysInfo.channelCode;
                    data.smsCode = that.subscribeSmsCode;
                    data.selfChannelCode = that.sysInfo.selfChannelCode?that.sysInfo.selfChannelCode:''; //订购、退订增传selfChannelCode子段
                    data.isVipOrder = true;
                    let secondConfirmType = this.sysInfo.selfChannelCode == '00010017'? 1 : 0;
                    that.SecondConfirmInfo = {
                        payShow: true,
                        paydetailList: data,
                        type: secondConfirmType,
                        orderObject: {
                            phone: that.userInfo.phone,
                            phoneMask: that.userInfo.phoneMask
                        },
                        callback:res =>{
                            if (res.resultCode == 0) {
                                //订购成功，关闭底部弹窗
                                messageBus.$emit('msg_subscribePopup',false);
                                for(let i=1;i<25;i++){
                                    setTimeout(()=>{
                                        console.log(i*5000,new Date());
                                        if (!that.userInfo.vipInfo || that.userInfo.newStarVipInfo) {
                                            messageBus.$emit('msg_getVipInfo');
                                        }
                                    },i*5000)
                                }
                                that.$toast({message: '订单已受理，开通结果以短信为准', duration: 4000,onClose:()=>{
                                    that.$router.push({name: 'myOrder', params: {type:'all'}});
                                }});
                            }
                            // else{
                            //     that.$toast({message: '订购失败', duration: 4000});
                            // }
                            else if(res.resultCode == -1 && res.data.code == -1) {
                                that.$toast({message: '请输入正确的验证码哦', duration: 4000});
                            } else if(res.resultCode == -102) {
                                that.$toast({message: '订购异常,请稍后重试!', duration: 4000});
                            } else if(res.resultCode == -117) {
                                that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                            } else if(res.resultCode == -116) {
                                that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                            } else if(res.resultCode == -113) {
                                that.$toast({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                            } else if(res.resultCode == -118) {
                                that.$toast({message: res.msg, duration: 4000});
                            } else if(res.resultCode == -112) {
                                that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                            } else if(res.resultCode == 4) {
                                that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                            } else {
                                that.$toast({message: res.msg, duration: 4000});
                            }
                        }
                    };
                }else{
                    that.SecondConfirmInfo = {
                        payShow: false,
                        paydetailList: {
                            price: '0',
                        },
                        orderObject: {
                            phone: '',
                            phoneMask: ''
                        },
                        callback:''
                    }
                }
            },
            setSeckillActivityStatus(num){
                this.$set(this.guide8,'activityStatus',+num);

            }
        },
        //使用keep-alive，进入路由即触发 created、mounted只触发一次
        activated (){
            let that = this;
            setTimeout(()=>{
                this.$nextTick(() => {
                    window.scrollTo({ 
                        top:  that.$homeScroll,
                        behavior: "instant" 
                    })
                })
            });

            // created部分
            // 微信环境下不展示
            let userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.match(/MicroMessenger/i)=="micromessenger") {
                this.banner3Show = false;
            }
            let headers = {'phone': this.userInfo.phone};
            this.banner1.arr = getBanner(this.banner1.arr, this.sysInfo.channelCode);// 静态取banner
            getData(headers).then((res)=>{
                this.halfApps = res.data.data['108']?res.data.data['108']:[];
                this.newApps = res.data.data['100']?res.data.data['100']:[];
                this.hotApps = res.data.data['101']?res.data.data['101']:[];
                this.textApps = res.data.data['112']?res.data.data['112']:[];
                this.specialApps = res.data.data['102']?res.data.data['102']:[];
                if (res.data.data['111'] && res.data.data['111'].length!=0) {
                    for (let index = 0; index < res.data.data['111'].length; index++) {
                        const item = res.data.data['111'][index];
                        if (item.icon && item.icon!=='') {
                            this.bannerHot.arr.push(item);
                        }
                    }
                }
                this.rightsApps = [];
                res.data.data['113'] && res.data.data['113'].forEach(item => {
                    item.img = process.env.VUE_APP_IMG_PRE+item.icon;
                    item.title = item.name;
                    item.icon && this.rightsApps.push(item)
                });
                //曝光统计：权益领取
                if(this.rightsApps.length > 0){
                    this.blocklogHandler('分类区tap2','0009','');
                }

                if (this.banner1.arr.length === 0) {
                    let resultArr = [];
                    for (let item of res.data.data['105']) {
                        if(item.icon){
                            resultArr.push(item);
                        }
                    }
                     this.banner1.arr = resultArr;
                // this.banner1.arr[0] && (this.banner1.arr[0].needPnsign = true);
                }


                //曝光统计：会员优惠购
                if(this.halfApps.length > 0){
                    this.blocklogHandler('会员优惠购','0011','');
                }

                //曝光统计：商品上新
                if(this.newApps.length > 0){
                    this.blocklogHandler("商品新上",'0012','')
                    this.newApps.forEach(item => {
                        this.hotAndNewSaleId.push(item.saleid)
                    })
                    if(this.hotAndNewSaleId >8){
                        this.hotAndNewSaleId = this.hotAndNewSaleId.slice(0,8)
                    }
                }
                //曝光统计：热门推荐
                if(this.hotApps.length > 0){
                    this.blocklogHandler("热门推荐",'0013','')
                    if(this.hotApps.length > 6){
                        this.hotApps.forEach((item,index) => {     
                            if(index <6){
                                this.hotAndNewSaleId.unshift(item.saleid)//如果多于6个，只取前6个
                            }                                             
                        })
                        this.hotCount = 6
                    }else{
                        this.hotApps.forEach(item => {                       
                            this.hotAndNewSaleId.unshift(item.saleid)
                        })
                        this.hotCount = this.hotApps.length;
                    }
                }
                //曝光统计：特色权益
                if(this.specialApps.length > 0){
                    this.blocklogHandler("特色权益",'0014','')
                }
                if (this.textApps.length !== 0) {
                    let href = window.location.href.split('#')[0];
                    for (let index = 0; index < this.textApps.length; index++) {
                        const item = this.textApps[index];
                        if (item.linkurl && (item.linkurl.indexOf(window.location.host) != -1)) {
                            item.linkurl = href + '#' + item.linkurl.split('#')[1];
                        }
                    }
                }
            }).catch((e)=>{
               window.console.log(e)
                this.$toast('加载失败了，刷新重试哦！');
            });
            findSecKill({aid:AID_SECKILL}).then((res)=>{
                if(res.data.resultCode == 0){
                    that.guide8.activityStatus = + res.data.data.activityStatus;
                    that.guide8.startTime = res.data.data.startTime?res.data.data.startTime.replace(/-/g,'/'):'';
                    that.guide8.endTime = res.data.data.endTime?res.data.data.endTime.replace(/-/g,'/'):'';
                    // that.guide8.activityStatus = res.data.data.activityStatus = 0;
                    // that.guide8.startTime = '2020-07-24 12:55:00';
                    // that.guide8.endTime = '2020-07-24 12:56:00';
                    if(res.data.data && res.data.data.list.length > 0){
                        that.limitbuyApps = res.data.data.list;
                    }
                }
            })
            .catch((e)=>{
                window.console.log(e)
                that.$toast('加载失败了，刷新重试哦！');
            });
            hotSales({
                current:1 
            }).then((res)=>{
                if(res.data.resultCode == 0){
                    this.hotSaleApps = res.data.data?res.data.data:[];
                }
            })
            .catch((e)=>{
                window.console.log(e)
                that.$toast('加载失败了，刷新重试哦！');
            });
            this.resetBanner2();
            // 登录页不弹框
            setCookie('ql','true',30);
            messageBus.$on('msg_resetBanner2',this.resetBanner2);
            messageBus.$on('msg_setSeckillActivityStatus',(num)=>{
                this.setSeckillActivityStatus(num);
            });
            // 集团渠道插码
            if(this.sysInfo.channelCode == 67057){
                (function(){
                    let sdcjs = document.getElementById("sdcjs");
                    if (sdcjs){
                        sdcjs.parentNode.removeChild(sdcjs);
                    }
                    var s=document.createElement("script"); s.async=true;s.id='sdcjs'; s.src="./js/jt_sdc_load.js";    
                    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
                }());
            }
            //全渠道、微信渠道、手厅渠道、分省渠道统计
            if (this.sysInfo.channel == 'wx' || this.sysInfo.channel == 'st'){
                customAnalysis(STATISTICS.activityId, STATISTICS[this.sysInfo.channel][0])
            }
            customAnalysis(STATISTICS.activityId, STATISTICS.all[0]);
            if (this.sysInfo.locationCode && process.env.VUE_APP_BUILD == 'production') {
                customAnalysis(STATISTICS_PROVINCE.activityId,STATISTICS_PROVINCE.key);
                customAnalysis(STATISTICS_PROVINCE.activityId,STATISTICS_PROVINCE.key,this.sysInfo.locationCode);
            }
            //曝光统计：搜索
            this.blocklogHandler("搜索入口,首页banner",'0003,0007','')
            if (this.sysInfo.channel == 'st') {
                this.blocklogHandler("首页个人信息2,分类区tap2",'0006,0009','')
            }else{
                this.blocklogHandler("首页个人信息1",'0005','')
            }

            //会员订购二次确认窗显隐 
            messageBus.$on('msg_subscribePopup',(flag)=>{
                this.subscribePopup(flag)
            });

            // 广告弹框新建cookie
            if (getCookie('ql') && !getCookie('ad') && this.sysInfo.channel!='st') {
                setCookie('ad','true', 720);
                this.addPopupShow = true;
            }

            //mounted部分
            window.addEventListener('scroll', this.lazyLoading);//滑动到底部，加载更多热门权益

        },
        beforeRouteLeave(to,from,next){
            //全局变量homeScroll默认为0 离开页面时 记录当前的页面滚动值
            this.$homeScroll= document.documentElement.scrollTop || document.body.scrollTop;
            // 若使用keep-alive，beforeDestory不执行，所以里面逻辑搬移到这里
            window.removeEventListener('scroll', this.lazyLoading); 
            messageBus.$off(['msg_resetBanner2','msg_subscribePopup','setSeckillActivityStatus']);


            // 记录首页滚动高度
            // setCookie('homeScroll',document.documentElement.scrollTop);


            // if(from.name == 'home' && this.sysInfo.channel == 'st' && getQuery('zindex')=='basic'){
            if(from.name == 'home' && this.sysInfo.channel == 'st'){
               window.console.log(location.origin+'/'+delQuery(location.search,'zindex')+'#'+ to.fullPath)
                window.leadeon.newWebview({
                    debug: false,
                    markID: '',                     //字符串类型，活动 ID （活动id，4.0之后允许不传，4.0之前必填）
                    type: '',           //字符串类型（分享类型，内部保留字段，允许不传）  4.0 新增
                    funCode: '',        //字符串类型（分享业务编码，内部保留字段，允许不传）  4.0 新增 详见“统一门户客户端V4.0_接口设计说明书”
                    bizCode: '', //功能编码，详见“客户端功能编码”(内部使用)
                    // url: location.origin+'/'+delQuery(location.search,'zindex')+'#'+ to.fullPath, //字符串类型，需要打开的 url，（1、URL中不能有空格；2、参数中如果有汉字，需要对汉字进行encodeURI()编码,最终的结果页面必须对这个参数decodeURI()解码，http://www.w3school.com.cn/jsref/jsref_encodeuri.asp）
                    url: location.origin+'/'+location.search+'#'+ to.fullPath, //字符串类型，需要打开的 url，（1、URL中不能有空格；2、参数中如果有汉字，需要对汉字进行encodeURI()编码,最终的结果页面必须对这个参数decodeURI()解码，http://www.w3school.com.cn/jsref/jsref_encodeuri.asp）
                    success: function() {},
                    error: function() {}
                });
                next(false)
            }else{
                next();
            }
        },
        // beforeRouteEnter(to,from,next){
        //     next(vm=>{
        //         if(vm.sysInfo.channel != 'st' &&  getCookie('homeScroll')){//非手厅
        //             setTimeout(() => {
        //                 window.scrollTo(0,getCookie('homeScroll'))
        //             }, 1000);
        //         }
        //     })
        // },
        beforeDestroy: function () {
            messageBus.$off(['msg_resetBanner2','msg_subscribePopup','setSeckillActivityStatus']);
            window.removeEventListener('scroll', this.lazyLoading); 
            // window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
        }
    }
</script>
<style lang="less" scoped>
.home{
    position: relative;
    padding-top: 1.3rem;
    .top-bg{
        display: block;
        width:100vw;
        position: absolute;
        top: 0;
    }
    .zone{
        padding: 0 0.35rem 0rem 0.35rem;
        // border-bottom:0.16rem solid#f4f5fb;
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
                // font-size: 0.12rem;
                // height:0.1rem;
                // line-height:0.1rem;
                // margin-top:0.12rem;
                .self-indicator{
                    display: inline-block;
                    // vertical-align:top;
                    padding: 0;
                    margin: 0;
                    width: 0.1rem;
                    height: 0.1rem;
                    border-radius: 50%; 
                    margin: 0 0.05rem;
                }
                .common-indicator{
                    background-color: #FFCCB2;
                    opacity: .6;
                }
                .active-indicator{
                    background-color: #FD7028;
                }
            }
        }
        .banner1 {
            .banner-img{
                height:2.4rem;
            }
            .custom-indicator{
                // height:0.1rem;
                // margin-top:2.52rem;
                .common-indicator{
                    background-color: #FFCCB2;
                    opacity: .6;
                }
                .active-indicator{
                    background-color: #FD7028;
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
        .text{
            margin-top: .3rem;
            .text-wrap{
                box-sizing: border-box;
                width: 100%;
                height: .64rem;
                line-height: .64rem;
                padding: 0 .17rem;
                // background: rgba(247,247,247,1);
                border-radius: .12rem;
                font-size: 0;
                text-align: left;
                background: url('../assets/imgs/home/textBg.png') no-repeat center/100% 100%;
                .text-title{
                    width: 1.4rem;
                    display: inline-block;
                    vertical-align: top;
                    font-size: .32rem;
                    font-weight: 400;
                    color: #FD7028;
                }
                .text-split{
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: .13rem;
                    width: .02rem;
                    height: .26rem;
                    background: transparent;
                }
                .text-swipe{
                    display: inline-block;
                    vertical-align: top;
                    width: calc(~"100% - 1.55rem");
                    padding: .04rem 0;
                    font-size: .26rem;
                    color: #666;
                    .text-swipe-wrap{
                        height: .58rem;
                        line-height: .58rem;
                        .text-font{
                            overflow: hidden;  /*超出部分隐藏*/
                            white-space: nowrap;  /*禁止换行*/
                            text-overflow: ellipsis; /*省略号*/
                        }
                    }
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
                .swiper-scrollbar{
                    width: .76rem;
                    height: .08rem;
                    left: 50%;
                    margin-left: -.38rem;
                    margin-top: .21rem;
                    background: rgba(253,112,40,.3);
                    /deep/.swiper-scrollbar-drag{
                        background: #FD7028;
                    }
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
    .handpick{
        box-sizing: border-box;
        padding-right: 0;
        padding-left: .24rem;
        margin-left: .35rem;
        height: 4rem;
        margin-top: .5rem;
        background: url('../assets/imgs/home/handpick_bg.png') no-repeat center/100% 100%;
        .handpick-title{
            width: 100%;
            height: .9rem;
            line-height: .9rem;
            text-align: left;
            img{
                display: inline-block;
                vertical-align: middle;
            }
            .handpick-icon{
                width: 1.62rem;
                height: .33rem;
            }
            .handpick-icon-vip{
                width: 2.41rem;
                height: .33rem;
            }
            .handpick-btn{
                float: right;
                width: 1.32rem;
                height: .46rem;
                margin: .24rem .35rem 0 0;
            }
            .handpick-btn1{
                float: right;
                width: 1.14rem;
                height: .23rem;
                margin: .4rem .35rem 0 0;
            }
            .handpick-font{
                float: right;
                font-size: .24rem;
                color: #999;
                margin-right: .56rem;
                position: relative;
                &::after{
                    content: "";
                    top: 48%;
                    position: absolute;
                    border-right: .02rem solid #999;
                    border-bottom: .02rem solid #999;
                    width: .1rem;
                    height: .1rem;
                    margin-top: -.05rem;
                    margin-left: .05rem;
                    transform: rotate(-45deg);
                }
            }
        }
    }
    .bottom-tip{
        // height: 2.3rem;
        text-align: center;
        font-size: 0.24rem;
        color: #999999;
        margin-top: 0.6rem;
        margin-bottom: 0.6rem;
    }
    .bottom-login{
        box-sizing: border-box;
        position: fixed;
        z-index: 2;
        padding: 0 .15rem 0 .37rem;
        width: 6.8rem;
        height: .86rem;
        line-height: .86rem;
        left: 50%;
        bottom: .7rem;
        margin-left: -3.4rem;
        background: rgba(0,0,0,.6);
        border-radius: .43rem;
        font-size: .32rem;
        color: #FFF;
        text-align: left;
        .bottom-login-btn{
            display: block;
            float: right;
            width: 1.6rem;
            height: .56rem;
            line-height: .56rem;
            background: #FD7028;
            border-radius: .28rem;
            margin-top: .15rem;
            text-align: center;
            font-size: .28rem;
        }
    }
    .add-float{
        position: fixed;
        z-index: 2;
        right: 0;
        bottom: 30%;
        .add-img{
            width: 1.44rem;
            height: 1.44rem;
            img{
                width: 1.44rem;
                height: 1.44rem;
            }
        }
        .add-close{
            margin: 0.07rem auto 0;
            width: .36rem;
            height: .36rem;
            background: url('../assets/imgs/home/close_btn.png') no-repeat center/100% 100%;
        }
    }
    .add-popup{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        background-color: rgba(0, 0, 0, .6);
        display: flex;
        align-items: center;
        justify-content: center;
        .ad-wrapper{
            .add-popup-con{
                width: 6.8rem;
                height: 9.14rem;
                margin: 0 auto .54rem;
                .add-popup-img{
                    width: 6.8rem;
                    height: 9.14rem;
                }
            }
            .add-popup-close{
                width: .6rem;
                height: .6rem;
                margin: 0 auto;
                background: url('../assets/imgs/home/close_btn.png') no-repeat center/100% 100%;
            }
        }
        
    }
}
    
</style>