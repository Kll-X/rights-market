<template>
    <div class="vip">
        <div class="part-top">
            <NavTab></NavTab>
            <swiper ref="cardSwipe" :options="cardSwipe" :class="userInfo.newStarVipInfo && !userInfo.vipInfo?'vipCard-swiper':'swiper-no-swiping vipCard-swiper'" @slideChange="swiperChange">
                <swiper-slide v-if="userInfo.newStarVipInfo && !userInfo.vipInfo">
                    <div class="card-star">
                        <div class="star-top">
                            <div class="star-top-head"><img :src="userInfo.phone?userInfo.avatar:require('@imgs/vip/star_card_head.png')"></div>
                            <div class="star-top-text">
                                <div class="star-top-text1">你好，{{userInfo.phoneMask}}<img src="@imgs/vip/star_card_flag.png"></div>
                                <div class="star-top-text2">新星会员用户</div>
                            </div>
                        </div>  
                        <div class="star-middle">会员生效中</div>    
                        <div class="star-btn" @click="placeVipOrder"><img src="@imgs/vip/update_subscribe_now.png"></div>          
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="card-avatar" :class="userInfo.vipInfo?'vip':''">
                        <div class="part-isvip" v-if="userInfo.vipInfo" :class="userInfo.vipInfo?'vip':''">
                            <div class="avatar-top">
                                <img class="img-avatar" :src="userInfo.phone?userInfo.avatar:require('@imgs/avatar_st1@2x.png')" alt="">
                                <div class="phone-area">
                                    <div class="phone">
                                        {{userInfo.phoneMask?'你好，'+userInfo.phoneMask:'游客用户'}}
                                        <img v-if="userInfo.vipInfo" class="crown" src="@imgs/mine/crown.png">
                                    </div>
                                    <div class="phone-tips" v-if="userInfo.phoneMask">
                                        {{userInfo.vipInfo?userInfo.vipInfo.vipLevelTag[+userInfo.vipInfo.vipLevel-1]+'会员用户':'升级为黄金会员，享海量专属福利'}}
                                    </div>
                                </div>
                            </div>
                            <div v-if="userInfo.vipInfo&&+userInfo.vipInfo.cancelFlag" class="avatar-bottom">有效期至 {{userInfo.vipInfo.expireTime | timeFormat}}</div>
                            <div v-else class="avatar-bottom">连续包月中</div>
                        </div>
                        <div class="part-notvip" v-else>
                            <!-- <div class="name-vip">
                                黄金会员
                            </div>
                            <div class="cost-vip">￥<span class="price">5</span>元/月</div> -->
                            <div class="btn-buy-vip" @click="placeVipOrder"></div>
                        </div>               
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="rights">
            <MyOwnRights :type="userType" @placeVipOrder='placeVipOrder'></MyOwnRights>
        </div>
        <div class="zone" v-if="vipApps.length">
            <VipBuy :guide="{name:'会员优惠购',id:'1',blockId:'0011',positionId:'9999',blockName:'会员优惠购',moreDesc:'更多优惠',path:{name: 'vipPreferential'}}" :vipApps="vipApps.slice(0,3)"></VipBuy>
        </div>
        <div class="welfare">
            <VipWelfare :guide="vipWelfareGuide" @placeVipOrder='placeVipOrder'></VipWelfare>
        </div>
        <div class="zone halfPrcie" v-if="halfApps.length" :class="userType == 2 ?'':'setTop'">
            <HalfPrice :guide="halfPrcieGuide" :vipType="userType == 2 ?1:0" :halfApps="halfApps.slice(0,6)"></HalfPrice>
        </div>
        <div class="bottom-tip">———— 我是有底线的哦 ————</div>
        <SecondConfirmBuy :info="SecondConfirmInfo"></SecondConfirmBuy>
    </div>
</template>
<script>
    import NavTab from '@/components/home/navTab.vue';
    import MyOwnRights from '@/components/vip/MyOwnRightsNew.vue';
    import VipWelfare from '@/components/vip/VipWelfare.vue';
    import VipBuy from '@/components/common/VipBuy.vue';
    import HalfPrice from '@/components/common/HalfPrice.vue';
    import SecondConfirmBuy from '@/components/common/SecondConfirmBuy';
    import {VIPORDER} from '@/utils/constant';
    import { getData } from "@/api/home";
    import { Toast } from 'vant';
    import { mapState,mapMutations } from 'vuex';
    import messageBus from "@/utils/messageBus";
    import { pagelogMixin, blocklogMixin } from "@/mixins/log";
    export default {
        name: "vip",
        components:{
            NavTab,
            MyOwnRights,
            HalfPrice,
            VipBuy,
            SecondConfirmBuy,
            VipWelfare
        },
        mixins: [pagelogMixin, blocklogMixin],
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ]),
            userType(){
                if(this.userInfo.vipInfo){
                    // 黄金会员只会展示黄金会员卡片
                    return 1;
                } else if (!this.userInfo.newStarVipInfo) {
                    // 不是会员只会展示非会员卡片
                    return 0;
                } else {
                    // 展示对应会员的卡片
                    if (this.activeIndex == 0) {
                        // 新星会员
                        return 2;
                    } else {
                        return 0;
                    }
                }
            }
           
        },
        mixins: [pagelogMixin, blocklogMixin],
        data(){
            return{
                halfApps:[],
                vipApps:[],
                halfPrcieGuide: {
                    name:'精选5折购',
                    id:'1',
                    blockId:'0010',
                    positionId:'9999',
                    blockName:'精选5折购',
                    moreDesc:'更多5折',
                    path:{name: 'halfPrice'},
                },
                vipWelfareGuide:{
                    name:'会员福利社',
                    icon: require('@imgs/vip/welfare.png'),
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
                cardSwipe: {
                    slidesPerView : 1.08,    
                    slidesOffsetAfter : 35,
                },
                activeIndex:0
            }
        },
        created(){
            let that = this;
             getData().then((res)=>{
                this.halfApps = res.data.data['108']?res.data.data['108']:[];
                if(this.halfApps.length<=6) {
                    //商品个数小于6时，不显示更多
                    this.halfPrcieGuide.id = '';
                }
                this.vipApps=res.data.data['109']?res.data.data['109']:[];
            });
        },
        filters: {
            timeFormat: function (value) {
                value = value + '';
                let year = value.slice(0,4);
                let month = value.slice(4,6);
                let date = value.slice(6,8);
                return year + '-' + month + '-' + date;
            }
        },
        methods:{
            placeVipOrder(){
                if (!this.userInfo.phone) {
                    Toast('请先登录');
                    this.$router.push({name:'login'})
                } else {
                    let that = this;
                    let data = Object.assign({},VIPORDER);
                    data.channelCode = that.sysInfo.channelCode;
                    data.smsCode = that.subscribeSmsCode;
                    data.selfChannelCode = that.sysInfo.selfChannelCode?that.sysInfo.selfChannelCode:''; //订购、退订增传selfChannelCode子段
                    data.isVipOrder = true;
                    let secondConfirmType = this.sysInfo.selfChannelCode == '00010017'? 1 : 0;
                    this.SecondConfirmInfo = {
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
                                that.SecondConfirmInfo.payShow = false;
                                for(let i=1;i<25;i++){
                                    setTimeout(()=>{
                                        if (!that.userInfo.vipInfo) {
                                            messageBus.$emit('msg_getVipInfo');
                                        }
                                    },i*5000)
                                }
                                Toast({message: '订单已受理，开通结果以短信为准', duration: 4000,onClose:()=>{
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
                }
            },
            swiperChange(){
                this.activeIndex = this.$refs.cardSwipe.$swiper.activeIndex;
            }
        }
    }
</script>
<style scoped lang='less'>
    .vip{
        display: flex;
        flex-direction: column;
    }
    .bottom-tip{
        text-align: center;
        font-size: 0.24rem;
        color: #999999;
        // margin-top: 0.6rem;
        margin-bottom: 0.6rem;
    }
    .part-top{
        width: 100%;
        height: 3.24rem;
        background: url("./../assets/imgs/common/bg_oval.png") no-repeat center/100%;
        order:-2;
        .vipCard-swiper{
            top: 1.3rem; 
            .card-star{
                width: 6.8rem;
                height: 3.2rem;
                background: url("./../assets/imgs/vip/bg_star_avatar.png") no-repeat center/100%;
                position: relative;
                left: .35rem;
                .star-top{
                    height: 1.07rem;
                    margin-left: 0.4rem;   
                    padding-top: 0.4rem; 
                    display: flex;
                    align-items: center;               
                    .star-top-head{
                        width: 1.06rem;
                        height: 1.07rem;
                        img{
                            width: 100%;
                            height: 100%;
                           
                        }
                    }
                    .star-top-text{
                        margin-left: .19rem;
                        color: #ffffff;
                        text-align: left;
                        .star-top-text1{
                            font-size: .32rem;
                            line-height: .32rem;
                            font-weight: 500;
                            img{
                                width: .38rem;
                                height: .26rem;
                                margin-left: .11rem;
                            }
                        }
                        .star-top-text2{
                            font-size: .26rem;
                            line-height: .26rem;
                            margin-top: .18rem;
                        }
                    }
                }
                .star-middle{
                    color: #ffffff;
                    font-weight: 500;
                    font-size: .32rem;
                    text-align: left;
                    margin-left: .4rem;
                    margin-top: .24rem;
                    margin-bottom: .05rem;
                    line-height: 0.32rem;
                }
                .star-btn{
                    width: 2.79rem;
                    height: 1.03rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                
            }     
            .card-avatar{
                width: 6.8rem;
                height: 3.2rem;
                background: url("./../assets/imgs/vip/bg_vip_avatar.png") no-repeat center/100%;
                position: relative;
                left: .35rem;
                .btn-buy-vip{
                    background: url("./../assets/imgs/vip/subscribe_now.png") no-repeat center/100%;
                    width: 2.14rem;
                    height: .96rem;
                }
                .part-isvip{
                    .avatar-top{
                        height: 1.1rem;
                        padding:.4rem 0;
                        border-bottom-left-radius: .2rem;
                        border-bottom-right-radius: .2rem;
                        display: flex;
                        color: #f7faff; 
                        align-items: center;
                        .phone-area{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            width: 4.22rem;
                            padding: 0 .18rem 0 .2rem;
                            text-align: left;
                            .phone{
                                font-size: .32rem;
                                line-height: .32rem;
                                .crown{
                                    width: .38rem;
                                    margin-left: .1rem;
                                }
                            }
                            .phone-tips{
                                font-size: .26rem;
                                line-height: .26rem;
                                margin-top: .18rem;
                            }
                        }
                        .img-avatar{
                            width: 1.06rem;
                            height: 1.07rem;
                            margin-left: .4rem;
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
                        .avatar.vip{
                            background-image: url('../assets/imgs/mine/bg_mine_vip@2x.png');
                            color: #3E3C3B;
                        }
                    }
                    .avatar-bottom{
                        // text-align: left;
                        // color: white;
                        // padding-left: .4rem;
                        // font-size: .36rem;
                        // line-height: .36rem;
                        text-align: left;
                        color: #fff;
                        padding-left: .4rem;
                    }
                }
                .part-notvip{
                    text-align: left;
                    padding-top: 2rem;
                    padding-left: .4rem;
                    .name-vip{
                        color:white;
                        font-size: .46rem;
                        line-height: .46rem;
                    }
                    .cost-vip{
                        color: white;
                        font-size: .42rem;
                        line-height: .9rem;
                        .price{
                            font-size: .72rem;
                        }
                    }
                }
            }
            .card-avatar.vip{
                background: url("./../assets/imgs/vip/bg_vip_avatar_pure.png") no-repeat center/100%;
            }
        }
    }
    .rights{
        margin-top: 1.6rem;
        order:-2
    }
    .zone{
        background-color: white;
        padding: 0 .35rem .51rem .35rem;
        // border-bottom: .16rem solid #f4f5fb;
    }
    .setTop{
        order:-1;
    }
    .halfPrcie{
        padding-bottom:0;

    }

</style>