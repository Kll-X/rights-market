<template>
    <div id="vip-benefit">
        <div class="header0" v-show="type === 0">
            <div class="top">
                <span class="my-benefit">
                    {{userInfo.vipLevel && userInfo.vipLevel >= 2?userInfo.vipLevelTag[+userInfo.vipLevel - 1]:'黄金'}}会员权益
                </span>
                <span class="must-know"  @click.stop="showPopup(must_know)">会员须知</span>
            </div>
            <div class="info">
                <div class="wrap">
                    <span class="level">
                        <img class="diamond" alt="" src="@imgs/vipbenefit/diamond.png">
                        &nbsp;
                        <span class="title">{{userInfo.vipLevel && userInfo.vipLevel >= 2?userInfo.vipLevelTag[+userInfo.vipLevel - 1]:'黄金'}}会员</span>
                    </span>
                    <span class="status">
                        <span style="fontSize:0.22rem;fontWeight:bold">¥ </span>
                        <span style="fontSize:0.42rem;fontWeight:bold">5.0</span>
                        /月
                    </span>
                </div>
                <div class="nav0">
                    <div class="wrap" v-for="(item, index) in nav" :key="index">
                        <img :src="item.active" alt="" @click.stop="changeslide(index)">
                        <div class="title">{{item.title}}</div>
                    </div>
                </div>
                <div v-show="type === 0"  @click.stop="subscribe"  class="btn-img"></div>
            </div>
        </div>
        <div class="header1" v-show="type === 1 || type === 2">
            <div class="top">
                <span class="my-benefit">
                    我的会员权益
                </span>
                <span class="must-know"   @click.stop="showPopup(must_know)">会员须知</span>
            </div>
            <div class="info">
                <span class="level">
                    <img class="diamond" alt="" src="@imgs/vipbenefit/diamond.png">
                    &nbsp;
                    <span class="title">{{userInfo.vipLevel && userInfo.vipLevel >= 2?userInfo.vipLevelTag[+userInfo.vipLevel - 1]:'黄金'}}会员</span>
                </span>
                <span class="status">
                    {{type === 1?'连续包月中':type === 2 && userInfo.expireTime ?'有效期至' + userInfo.expireTime.substring(0,4)+'.'+ userInfo.expireTime.substring(4,6)+'.'+ userInfo.expireTime.substring(6,8):''}}
                </span>
            </div>
        </div>
        <div class="nav1" v-show="type === 1 || type === 2">
            <img v-for="(item, index) in nav" :key="index" :src="current == index ? item.active:item.normal" alt="" @click.stop="changeslide(index)">
        </div>
        <!-- 轮播图 -->
        <van-swipe v-if="type === 0 ||type === 1 || type === 2" :loop="false" ref="banner"  @change="onChange">
            <van-swipe-item
                v-for="(item, index) in bannerData" :key="index">
                <div class="banner-item">
                    <div class="banner-item-inner">
                        <img class="banner-img" :src="item.img" alt="">
                        <img v-if="item.btn"  class="btn-img" :src="item.btn.src" @click.stop="run(item.btn.method)" alt="">
                        <div class="txt-box" v-html="txtArr[index]"></div>
                    </div>
                    
                </div>
            </van-swipe-item>
            <div v-show="type === 0" class="custom-indicator" slot="indicator">
                <span @click.stop="changeslide(i)" v-for="(item, i) in bannerData" :key="i" :class="{'self-indicator':true,'active-indicator':i==current,'common-indicator':i!=current}"></span>
            </div>
        </van-swipe>
        <div v-show="type === 1 || type === 2" style="height:0.5rem"></div>
        <!-- v-show="type === 1 && userInfo.orderId !== '0'" -->
        <div v-if="false" class="unsubscribe" :class="userInfo.orderId === '0'?'underLine':''" @click.stop="unsubscribe">
            退订会员
        </div>
        <div v-show="type === 2" class="unsubscribed">
            <div class="txt1">已退订</div>
            <div class="txt2">会员有效期结束后，可继续续期</div>
        </div>
        <van-popup v-model="show" lock-scroll closeable :close-on-popstate="true" :close-on-click-overlay="false">
            <div class="white-board">
                <div class="title">
                    {{popupInfo.title}}
                </div>
                <div ref="content" class="content" v-html="popupInfo.content.txt" :style="popupInfo.content.style">
                </div>
            </div>
        </van-popup>
        <!-- 二次确认蒙版 -->
        <van-popup class="overlay-popup"
            v-model="subscribeShow"
            position="bottom">
            <img class="close-popup" @click="subscribeShow = false"
                src="@imgs/goodsdetail/close-popup.png" alt="">
            <div class="popup-title">黄金会员订购</div>
            <div class="popup-price">¥
                <span>{{'5.00'}}</span>/月
            </div>
            <div class="popup-input">
                <div class="popup-ipt">
                    <van-cell-group>
                        <van-field v-model="userInfo.phoneMask" readonly placeholder="请输入您的订购号码" />
                    </van-cell-group>
                </div>
                <div class="popup-ipt">
                    <van-field
                        v-model="subscribeSmsCode"
                        center
                        clearable
                        maxlength="6"
                        type="digit"
                        placeholder="请输入验证码" @change="smsInputCheck">
                        <van-button slot="button" size="small" type="default" :disabled="coutdownShow"
                            @click="getSms">
                            <span v-show="!coutdownShow">获取验证码</span>
                            <span v-show="coutdownShow">{{ coutdownTime }}s</span>
                        </van-button>
                    </van-field>
                </div>
            </div>
            <div class="automatic-allow">
                <img @click.stop="allow('1')" class="allow1"  :src="allowChecked1?require('@imgs/login/new_checked.png'):require('@imgs/login/new_nocheck.png')" alt="">
                <label for="read1" class="read-desc"><span @click.stop="allow('1')">我已阅读并同意</span><span  style="color:#FD7028" @click.stop="showPopup(must_know)">《权益超市黄金会员须知》</span></label>
            </div>
            <div class="popup-btn submit" @click="submitBtn">{{submitIndex == 1?'退订会员':'确认支付'}}</div>
        </van-popup>
        <BackHome/>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex';
    import messageBus from "@/utils/messageBus";
    import {delCookie} from "@/utils/cookie";
    import { sendSmsCode,placeOrder} from "@/api/goodsdetail";
    import BackHome from '@/components/common/BackHome.vue';
    import {VIPORDER,NEWVIPGIFT} from "@/utils/constant";





    export default {
        data() {
            return {
                txtArr:[
                    `<div>1、用户首次成为中国移动权益超市黄金会员，即可获得入会礼1GB通用流量日包一份。</div>
                    <div>2、领取次数有且只有一次，流量奖品24小时内直充到账，届时会有短信提示，还请注意查收。</div>
                    <div>3、1GB流量为日包产品，到账后24小时内有效。</div>`,
                    `<div>1、会员具有权益产品优惠购资格，以低于在售价的价格购买权益产品。</div>
                    <div>2、会员购买权益优惠购专区产品后将会收到订购短信提醒，还请实时关注。</div>`,
                    `<div>1、会员具有精品权益产品5折购资格，每月可选择专区内一款权益产品半价购买。</div>
                    <div>2、会员购买精选5折购专区权益产品后，会收到订购短信提醒，还请实时关注。</div>`,
                    `<div>1、专属客服功能仅对会员开放。</div>
                    <div>2、会员如有相关问题，可直接咨询在线客服解决，或直接拨打10086咨询。</div>`
                ],
                submitIndex:0,
                allowChecked1:0,
                subscribeShow:false,
                // 计时器参数
                coutdownShow: false,
                coutdownTime: 60,
                // 产品订购对象
                subscribeSmsCode: '',
                // --------
                popupInfo:{
                    title:'',
                    content:'',
                    btns:''
                },
                must_know:{
                    title:'权益超市黄金会员须知',
                    content:{
                        txt:`
                        <div>一、订购规则：</div>
                        <div>1、权益超市黄金会员（下文简称“会员”）当前仅支持移动用户办理，其中非个人客户（行业卡、物联网卡等）、欠费客户、余额不足的预付费客户、信用额度不足的后付费客户不能订购。</div>
                        <div>2、会员资费5元/月，订购费用将从会员登录手机号话费中自动扣除，订购成功即时生效，可享受相关会员权益；</div>
                        <div>3、 如无退订，默认次月自动续订会员，续订费用将从会员手机号话费中自动扣除；</div>
                        <div>4、会员退订后，会员有效期至当月月底，次月起不再扣费。</div>
                        <br />
                        <div>二、会员福利：
                        <div>1、入会有礼：用户首次成为中国移动权益超市黄金会员，即可获得入会礼1GB通用流量日包一份；领取次数有且只有一次，流量奖品24小时内直充到账，届时会有短信提示，还请注意查收；1GB流量为日包产品，到账后24小时内有效。</div>
                        <div>2、会员优惠购：会员用户可在“会员优惠购”专区订购权益产品。会员购买会员优惠购专区权益后将会收到订购短信提醒，还请实时关注。</div>
                        <div>3、精选5折购：会员用户可在“精选5折购”专区半价购买权益，每月限购一款。会员购买精选5折购专区权益后将会收到订购短信提醒，还请实时关注。</div>
                        <div>4、专属客服：会员用户可享受专属客服服务。</div>`
                    }
                },
                show: false,
                current:0,
                nav:[
                    {title:'入会有礼',normal:require('@imgs/vipbenefit/nav1_0_1.png'),active:require('@imgs/vipbenefit/nav1_1_1.png')},
                    {title:'会员优惠购',normal:require('@imgs/vipbenefit/nav1_0_2.png'),active:require('@imgs/vipbenefit/nav1_1_2.png')},
                    {title:'精选5折购',normal:require('@imgs/vipbenefit/nav1_0_3.png'),active:require('@imgs/vipbenefit/nav1_1_3.png')},
                    {title:'专属客服',normal:require('@imgs/vipbenefit/nav1_0_4.png'),active:require('@imgs/vipbenefit/nav1_1_4.png')},
                ],
                arrNormal:[
                        {id:0,img:require('@imgs/vipbenefit/novip_card1.png')},
                        {id:1,img:require('@imgs/vipbenefit/novip_card2.png')},
                        {id:2,img:require('@imgs/vipbenefit/novip_card3.png')},
                        {id:3,img:require('@imgs/vipbenefit/novip_card4.png')}
                ]
            };
        },
        created(){
            if(!this.userInfo.phone){
                this.quickLogin(true);
            }else{
                messageBus.$emit('msg_getVipInfo');
            }
        },
        components:{
            BackHome
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ]),
            type(){
                if(this.userInfo.phone && this.userInfo.isVip === 1 && this.userInfo.cancelFlag === "1"){// 登录了,是会员但已退订
                    return 2
                }else if(this.userInfo.phone && this.userInfo.isVip === 1 && this.userInfo.cancelFlag === "0"){// 登录了,是会员但未退订
                    return 1
                }else if(!this.userInfo.phone){// 非登录
                    return 0
                }else if(this.userInfo.phone && this.userInfo.isVip === 0){// 登录了，但非会员
                    return 0
                }else if(this.userInfo.phone && this.userInfo.isVip === ''){// 登录了，但会员信息还在查询途中
                    return 3
                }else{
                    return null
                }
            },
            bannerData(){
                return this.type === 0 ? this.arrNormal:this.arrVip
            },
            arrVip(){
                return [
                    {id:0,img:require('@imgs/vipbenefit/vip_card1.png'),btn:{src:this.userInfo.hasNewGift == 1?require('@imgs/vipbenefit/ever_get.png'):require('@imgs/vipbenefit/get_now.png'), method: this.userInfo.hasNewGift == 1?'':'get_now'}},
                    {id:1,img:require('@imgs/vipbenefit/vip_card2.png'),btn:{src:require('@imgs/vipbenefit/buy_now.png'),method:'buy_now'}},
                    {id:2,img:require('@imgs/vipbenefit/vip_card3.png'),btn:{src:require('@imgs/vipbenefit/rob_now.png'),method:'rob_now'}},
                    {id:3,img:require('@imgs/vipbenefit/vip_card4.png'),btn:{src:require('@imgs/vipbenefit/communicate_now.png'),method:'communicate_now'}}
                ] 
                
            }
        },
        watch:{
            'type'(n,o) {
                if(n != o){
                    setTimeout(()=>{ // 必须用setTimeout才有效
                        document.documentElement.scrollTop = 0;
                    },0)
                }
            },
            'show'(){
                setTimeout(()=>{ // 必须用setTimeout才有效
                    this.$refs.content.scrollTop = 0;
                },0)
            }
        },
        methods: {
            ...mapMutations([
                'SET_USERINFO'
            ]),
            allow(i){
                this['allowChecked'+i] = !this['allowChecked'+i] ;
            },
            // 获取验证码
            getSms() {
                let that = this;
                sendSmsCode({mobile: that.userInfo.phone}).then((response) => {
                    if (response.data.code == 0) {
                        // 倒计时逻辑
                        that.coutdownShow = true;
                        that.coutdownFunc();
                    } else {
                        that.$toast('验证码跑丢了，稍后再试哦！');
                    }
                })
            },
            // 倒计时方法
            coutdownFunc() {
                if (this.coutdownTime == 0) {
                    this.coutdownShow = false;
                    this.coutdownTime = 60;
                    return;
                }
                this.coutdownTime--;
                setTimeout(() => {
                    this.coutdownFunc();
                }, 1000);
            },
            get_now(){
                let that = this;
                // 如果手机号为空，则弹登录窗
                if (!that.userInfo.phone) {
                    that.quickLogin(true);
                    return false;
                }
                let headers = {'phone': that.userInfo.phone};
                let data = Object.assign({},NEWVIPGIFT);
                data.channelCode = that.sysInfo.channelCode;
                //window.console.log(data,'新人礼包');

                that.$toast({
                    message: '领取中,请稍等…',
                    forbidClick: true,
                    duration: 0,
                });
                placeOrder(data, headers).then((r) => {
                    that.$toast.clear();
                    if (r.data.resultCode == 0) {
                        // that.SET_USERINFO({hasNewGift:1});
                        messageBus.$emit('msg_getVipInfo');
                        messageBus.$emit('msg_showPopup',{
                            flag: true,
                            title: '恭喜您！',
                            content: '您已成功领取1G流量，到账后24小时内有效。还请留意到账短信！',
                            mask: true,
                            btns: [
                                {
                                    txt: '我知道了',
                                    style:{
                                        backgroundColor:'rgb(237, 174, 99)',
                                        border: '2px solid rgb(237, 174, 99)'
                                    },
                                    handler: () => {
                                        messageBus.$emit('msg_showPopup',false);
                                    }
                                }
                            ]
                        });
                    }
                    // else {
                    //     that.$toast({message: '领取失败，请稍后重试', duration: 4000});
                    // } 
                    else if(r.data.resultCode == -1 && r.data.data.code == -1) {
                        that.$toast({message: '请输入正确的验证码哦', duration: 4000});
                    } else if(r.data.resultCode == -102) {
                        that.$toast({message: '订购异常,请稍后重试!', duration: 4000});
                    } else if(r.data.resultCode == -117) {
                        that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                    } else if(r.data.resultCode == -116) {
                        that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                    } else if(r.data.resultCode == -113) {
                        that.$toast({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                    } else if(r.data.resultCode == -118) {
                        that.$toast({message: r.data.msg, duration: 4000});
                    } else if(r.data.resultCode == -112) {
                        that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                    } else if(r.data.resultCode == 4) {
                        that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                    } else {
                        that.$toast({message: r.data.msg, duration: 4000});
                    }
                }).catch(() => {
                    that.$toast.clear();
                })
            },
            buy_now(){
                //window.console.log('buy_now');
                this.$router.push({name:'vipPreferential'})
            },
            rob_now(){
                //window.console.log('rob_now')
                this.$router.push({name:'halfPrice'})

            },
            communicate_now(){
                //window.console.log('communicate_now')
                // if(this.sysInfo.channel == 'st'){
                //     this.$toast("敬请期待")
                // }else{
                    this.$router.push({name:'customerService'})
                // }
            },
            smsInputCheck(){
                // 短信码六位数校验
                if (this.subscribeSmsCode == '' || this.subscribeSmsCode.length != 6){
                    this.$toast('请输入正确的6位验证码');
                    return false;
                }
            },
            // 购买的方法
            submitBtn() {
                let that = this;
                // 短信码六位数校验
                if (that.subscribeSmsCode == '' || that.subscribeSmsCode.length != 6){
                    that.$toast('请输入正确的6位验证码');
                    return false;
                }
                // 如果手机号为空，则跳转到登录页
                if (!that.userInfo.phone) {
                    that.quickLogin(true);
                    return false;
                }
                 // 有选中已同意，才能登录
                if(!that.allowChecked1){
                    that.$toast("请先勾选同意《权益超市黄金会员须知》");
                    return false
                }
                let headers = {'phone': that.userInfo.phone};
                let data = Object.assign({},VIPORDER);
                data.channelCode = that.sysInfo.channelCode;
                data.smsCode = that.subscribeSmsCode;

                that.$toast({
                    message: '订购中,请稍等…',
                    forbidClick: true,
                    duration: 0,
                });
                //会员订购
                //window.console.log(data,'订购');
                placeOrder(data, headers).then((r) => {
                    that.$toast.clear();
                    if (r.data.resultCode == 0) {
                        //订购成功，关闭底部弹窗
                        that.subscribeShow = false;
                        messageBus.$emit('msg_getVipInfo');
                        that.$toast({message: '订单已受理，开通结果以短信为准', duration: 4000,onClose:()=>{
                            that.$router.push({name: 'myOrder', params: {type:'all'}});
                        }});
                    }
                    // else{
                    //     that.$toast({message: '订购失败', duration: 4000});
                    // }
                    else if(r.data.resultCode == -1 && r.data.data.code == -1) {
                        that.$toast({message: '请输入正确的验证码哦', duration: 4000});
                    } else if(r.data.resultCode == -102) {
                        that.$toast({message: '订购异常,请稍后重试!', duration: 4000});
                    } else if(r.data.resultCode == -117) {
                        that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                    } else if(r.data.resultCode == -116) {
                        that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                    } else if(r.data.resultCode == -113) {
                        that.$toast({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                    } else if(r.data.resultCode == -118) {
                        that.$toast({message: r.data.msg, duration: 4000});
                    } else if(r.data.resultCode == -112) {
                        that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                    } else if(r.data.resultCode == 4) {
                        that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                    } else {
                        that.$toast({message: r.data.msg, duration: 4000});
                    }
                }).catch(() => {
                    that.$toast.clear();
                })
            },
            subscribe(){
                this.$toast.clear();
                if(this.userInfo.phone){//已登录,则开通会员
                    this.submitIndex = 0;
                    this.allowChecked1 = 0;
                    this.subscribeSmsCode = '';
                    this.subscribeShow = true
                }else{//未登录，弹登录窗
                    this.quickLogin(true)
                }
            },
            showPopup(target) {
                this.$toast.clear();
                this.popupInfo = target;
                this.show = true;
            },
            changeslide(i){
                this.$refs.banner.swipeTo(i);
            },
            onChange(i){
                this.current = i;
            },
            run(method){
                if(method){
                    this[method]()
                }
            },
            quickLogin(noGetPhoneNum){
                delCookie('ql');
                messageBus.$emit('msg_checkLogin','quick',noGetPhoneNum);
            },
            unsubscribe(){
                this.$toast.clear();

                if(this.userInfo.orderId === '0'){return}//线下不给退订
                
                messageBus.$emit('msg_showPopup',{
                    flag: true,
                    title: '是否退订'+ this.userInfo.vipLevelTag[parseInt(this.userInfo.vipLevel) - 1] +'会员？',
                    content: '退订后次月起不再收费，相关会员权益享至本月底，请确认是否退订？',
                    mask: true,
                    btns: [
                        {
                            txt: '继续退订',
                            handler: () => {
                                let that = this;
                                // 如果手机号为空，则弹登录窗
                                if (!that.userInfo.phone) {
                                    that.quickLogin(true);
                                    return false;
                                }
                                let headers = {'phone': that.userInfo.phone};
                                let data = Object.assign({},VIPORDER);
                                data.channelCode = that.sysInfo.channelCode;
                                data.dealType = 1; //退订
                                data.custVipId = that.userInfo.id; //退订增传custVipId字段
                                that.$toast({
                                    message: '退订中,请稍等…',
                                    forbidClick: true,
                                    duration: 0,
                                });
                                //window.console.log(data,'退订');
                                placeOrder(data, headers).then((r) => {
                                    that.$toast.clear();
                                    if (r.data.resultCode == 0) {
                                        //退订成功，关闭页面弹窗
                                        messageBus.$emit('msg_showPopup',false);
                                        that.$toast({message: '订单已受理', duration: 4000});
                                        messageBus.$emit('msg_getVipInfo');
                                    }
                                    // else{
                                    //     that.$toast({message: '退订失败', duration: 4000});
                                    // }
                                    else if(r.data.resultCode == -1 && r.data.data.code == -1) {
                                        that.$toast({message: '请输入正确的验证码哦', duration: 4000});
                                    } else if(r.data.resultCode == -102) {
                                        that.$toast({message: '订购异常,请稍后重试!', duration: 4000});
                                    } else if(r.data.resultCode == -117) {
                                        that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                                    } else if(r.data.resultCode == -116) {
                                        that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                                    } else if(r.data.resultCode == -113) {
                                        that.$toast({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                                    } else if(r.data.resultCode == -118) {
                                        that.$toast({message: r.data.msg, duration: 4000});
                                    } else if(r.data.resultCode == -112) {
                                        that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                                    } else if(r.data.resultCode == 4) {
                                        that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                                    } else {
                                        that.$toast({message: r.data.msg, duration: 4000});
                                    }
                                }).catch(() => {
                                    that.$toast.clear();
                                })
                            }
                        },{
                            txt: '考虑一下',
                            handler: () => {
                                messageBus.$emit('msg_showPopup',false)
                            }
                        }
                    ]
                })
            }
        }
    }
</script>

<style lang="less">
    #vip-benefit{
        background: #FFF;
        width: 100%;
        overflow: hidden;
        .header0{
            height: 3.2rem;
            background: url("../assets/imgs/vipbenefit/header0_bg.png") left top/100% no-repeat;
            border-radius:0 0 0.16rem 0.16rem ;
            margin-bottom: 1.93rem;
            .top{
                height: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .my-benefit{
                    font-size: 0.33rem;
                    font-weight:bold;
                    color:rgba(56,58,63,1);
                    margin-left:0.36rem; 
                }
                .must-know{
                    margin-right: 0.52rem;
                    text-decoration: underline;
                    font-weight:400;
                    font-size: 0.28rem;
                    color:#3E3C3B;
                }
            }
            .info{
                width:6.7rem;
                height:3.2rem;
                margin:0 auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                background:linear-gradient(180deg,rgba(241,205,126,1),rgba(237,169,87,1));
                border-radius:0.16rem;
                position: relative;
                .wrap{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-top:0.3rem;
                    margin-bottom:0.37rem;
                    .level{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-left: 0.5rem;
                        .diamond{
                            width:0.41rem;height:0.36rem;
                        }
                        .title{
                            font-size: 0.31rem;
                            font-weight:bold;
                            color:rgba(62,60,59,1);
                        }
                    }
                    .status{
                        font-weight: 400;
                        margin-right: 0.5rem;
                    }
                }
                .nav0{
                    margin:0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .wrap{
                        margin:0 0.25rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        img{
                            display: block;
                            height: 1rem;
                            width: 1rem;
                        }
                        .title{
                            font-size: 0.2rem;
                            font-weight: 400;
                            color:#3e3c3b;
                            white-space:nowrap;
                        }
                    }
                }
                .btn-img{
                    width:3.39rem;
                    height: 1.03rem;
                    display: inline-block;
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translate(-50%,50%);
                    background:url('../assets/imgs/vipbenefit/subscribe_now.png') left top/100% no-repeat
                }
            }
            
        }
        .header1{
            height: 2.6rem;
            overflow: hidden;
            background: url("../assets/imgs/vipbenefit/header1_bg.png") left top/100% no-repeat;
            border-radius:0 0 0.16rem 0.16rem ;
            .top{
                height: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .my-benefit{
                    font-size: 0.33rem;
                    font-weight:bold;
                    color:rgba(56,58,63,1);
                    margin-left:0.36rem; 
                }
                .must-know{
                    margin-right: 0.52rem;
                    text-decoration: underline;
                    font-weight:400;
                    font-size: 0.28rem;
                    color:#3E3C3B;
                }
            }
            .info{
                width:6.7rem;
                height:1.6rem;
                margin:0 auto;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background:linear-gradient(180deg,rgba(241,205,126,1),rgba(237,169,87,1));
                border-radius:0.16rem 0.16rem 0 0;
                .level{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-left: 0.5rem;
                    .diamond{
                        width:0.41rem;height:0.36rem;
                    }
                    .title{
                        font-size: 0.31rem;
                        font-weight:bold;
                        color:rgba(62,60,59,1);
                    }
                }
                .status{
                    font-weight: 400;
                    margin-right: 0.5rem;
                }
            }
        }
        .nav1{
            height: 1.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                height: 0.8rem;
                width: 0.8rem;
                margin:0 0.25rem
            }
        }
        .van-swipe{
            margin: 0 0.6rem;
            height: auto;
            overflow: visible;
            .van-swipe__track{
                overflow: hidden;
                .banner-item{
                    width:6.0rem;
                    margin-left: 0.15rem;
                    position: relative;
                    .banner-item-inner{
                        position: relative;
                        width: 100%;
                        .banner-img{
                            display: block;
                            width:6.0rem;
                        }
                        .btn-img{
                            width:3.39rem;
                            height: 1.03rem;
                            position: absolute;
                            left:50%;
                            transform: translateX(-50%);
                            bottom: 0.56rem
                        }
                        .txt-box{
                            width:5.08rem;
                            height: 4.6rem;
                            overflow-y: auto;
                            position: absolute;
                            top:1.48rem;
                            left:50%;
                            transform: translateX(-50%);
                            font-size:0.28rem;
                            font-weight:400;
                            color:rgb(119,105,83);
                            line-height:0.48rem;
                            text-align: left;
                        }
                    }
                }
            }
            .custom-indicator{
                font-size: 0.12rem;
                padding-bottom: 1.37rem;
                .self-indicator{
                    display: inline-block;
                    padding: 0;
                    width: 0.16rem;
                    height: 0.16rem;
                    border-radius:50%; 
                    margin: 0.4rem 0.12rem 0;
                }
                .common-indicator{
                    background-color: rgb(245, 247, 250);;
                }
                .active-indicator{
                    background-color: rgb(39, 26, 5);
                }
            }
        }
        .unsubscribe{
            display: inline-block;
            position: relative;
            overflow: hidden;
            font-size:0.29rem;
            font-weight:bold;
            color:rgba(192,115,88,1);
            margin-bottom: 1.23rem;
        }
        .unsubscribe.underLine{
            color:rgba(189,191,194,1);
        }
        .unsubscribed{
            padding-bottom: 0.5rem;
            .txt1{
                font-size:0.3rem;
                font-weight:400;
                color:rgba(189,191,194,1);
            }
            .txt2{
                padding-top: 0.18rem;
                font-size:0.22rem;
                font-weight:400;
                color:rgba(189,191,194,1);
            }
        }
        .van-popup--center{
            border-radius:0.12rem;
        }
        .white-board{
            background:#fff;
            padding:0.6rem 0.38rem 0.83rem;
            box-sizing: border-box;
            width:5.8rem;
            .title{
                font-size:0.34rem;
                font-weight: bold;
                padding-bottom:0.47rem;
            }
            .content{
                overflow-y: auto;
                height: 5.28rem;
                text-align: left;
                font-size:0.24rem;
                font-weight:500;
                color:rgba(56,58,63,1);
                opacity:0.6;
            }
        }
        .van-popup__close-icon--top-right{
            top:0.25rem;
            right:0.25rem;
        }
        .overlay-popup{
            box-sizing: border-box;
            padding: .6rem .35rem .5rem .35rem;
            border-top-left-radius: .16rem;
            border-top-right-radius: .16rem;
            font-size: 0;
            .close-popup{
                position: absolute;
                top: .3rem;
                right: .3rem;
                width: .5rem;
                height: .5rem;
                z-index: 9999;
            }
            .popup-title{
                font-size: .36rem;
                text-align: center;
            }
            .popup-price{
                margin: .4rem 0 .3rem;
                font-size: .36rem;
                span{
                    font-size: .6rem;
                }
            }
            .popup-detail{
                margin-bottom: .6rem;
                .popup-detail-icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 1.2rem;
                    height: 1.2rem;
                    margin-right: .24rem;
                }
                .popup-detail-font{
                    display: inline-block;
                    width: calc(~"100% - 1.44rem");
                    vertical-align: top;
                    .popup-detail-font-con{
                        display: flex;
                        height: 1.2rem;
                        flex-flow: column;
                        align-items: center;
                        text-align: left;
                        color: #0F0B1A;
                        span{
                            flex: 1;
                            width: 100%;
                            display: flex;
                        }
                        .popup-detail-font-name{
                            font-size: .36rem;
                            opacity: .8;
                            align-items: flex-end;
                        }
                        .popup-detail-font-fee{
                            font-size: .3rem;
                            color: #6696FF;
                            opacity: .8;
                            align-items: flex-start;
                        }
                    }
                }
            }
            .popup-radio{
                margin-bottom: .57rem;
                .popup-order-radio{
                    // padding-bottom: .26rem;
                    border-bottom: .01rem solid #d7d9db;
                    margin-bottom: .2rem;
                }
            }
            .popup-input{
                margin-bottom: .5rem;
                .popup-ipt{
                    border-bottom: 1px solid #d7d9db;
                    .van-cell-group{
                        &:after{
                            border-width: 0;
                        }
                    }
                    .van-cell{
                        padding: .25rem 0;
                        font-size: .32rem;
                        .van-field__button{
                            .van-button{
                                padding: 0;
                                margin-right: 0.27rem;
                                border: 0;
                                font-size: .28rem;
                                color: #FD7028;
                            }
                        }
                    }
                }
            }
            .automatic-allow{
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.21rem;
                margin:0 auto 0.5rem;
                .allow1{
                    width:0.25rem;
                    height: 0.25rem;
                    margin-right: 0.13rem
                }
            }
            .popup-btn{
                width: 6rem;
                height: .88rem;
                line-height: .88rem;
                font-size: .36rem;
                color: #FFF;
                background: #FD7028;
                text-align: center;
                border-radius: 2rem;
                margin: 0 auto;
                transition: opacity .2s;
                &:active{
                    opacity: .8;
                }
            }
            .submit{
                background: #FD7028;
                color: #FFF;
            }
        }
    }
</style>