<template>
    <div class="quick-login" @touchmove="maskTouchmove">
        <div class="inner">
            <img class="logo" v-show="plan == 1 || plan == 2" :src="require('@imgs/loginLogo.png')" />
        <div class="center automatic-tel" v-show="plan == 1" @click.stop="automaticLogin">
            使用手机号码{{userInfo.phoneMaskShow}}登录
        </div>
        <div class="center change-tel" v-show="plan == 1" @click.stop="changeTel">
            换其他号码
        </div>
        <div class="center automatic-allow" v-show="plan == 1">
            <img @click.stop="allow('1')" class="allow1"  :src="allowChecked1?require('@imgs/login/checked.png'):require('@imgs/login/nocheck.png')" alt="">
            <label for="read1" class="read-desc"><span @click.stop="allow('1')">我已阅读并同意</span><span  style="color:#0085d0" @click.stop="readAgreement">《中国移动提供认证服务》</span></label>
        </div>



        <div class="manual-tel" v-show="plan == 2">
            <input class="center tel-num" type="tel" maxlength="11" placeholder="请输入您的移动号码" ref="telNum" @change="checkTel">
        </div>
        <div class="center manual-sms" v-show="plan == 2">
            <input class="sms-code" type="tel" maxlength="6" placeholder="请输入验证码" ref="smsCode" @change="checkSms">
            <input @click.stop="sendSms" :class="['send',seconds == '获取验证码'?'':'forbidClick']" v-model="seconds" readonly="readonly"/>
        </div>
        <div class="center manual-allow" v-show="plan == 2">
            <img @click.stop="allow('2')" class="allow2"  :src="allowChecked2?require('@imgs/login/checked.png'):require('@imgs/login/nocheck.png')" alt="">
            <label for="read2" class="read-desc"><span @click.stop="allow('2')">我已阅读并同意</span><span  style="color:#0085d0" @click.stop="readAgreement">《中国移动提供认证服务》</span></label>
        </div>
        <div class="center login-btn" v-show="plan == 2" @click.stop="manualLogin">
            登录
        </div>

        <img class="close" :src="require('@imgs/login/close.png')" @click.stop="closeSelf" />
        </div>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    import { znLogin,sendSmsCode, checkSmsCode } from "@/api/login";
    import { setCookie,delCookie } from "@/utils/cookie";
    import {Encrypt} from '@/utils/encrypt'
    import messageBus from "@/utils/messageBus";




    export default {
        name: "login",
        data(){
            return{
                seconds:'获取验证码',
                secondsBackup:60,
                timer:null,
                plan:3,
                allowChecked1:0,
                allowChecked2:0
            }
        },
        computed:{
            ...mapState([ 
                "userInfo" 
            ])
        },
        created(){
            this.updatePlan();
            messageBus.$on('msg_updatePlan',this.updatePlan);
        },
        methods:{
            updatePlan(){
                if(this.userInfo.phoneMaskShow){
                    this.plan = 1
                }else{
                    this.plan = 2
                }
            },
            ...mapMutations([
                'SET_USERINFO',
                'SET_SHOWQUICKLOGIN'
            ]),
            readAgreement(){
                delCookie('ql');
                location.href = 'https://wap.cmpassport.com/resources/html/contract.html'
            },
            maskTouchmove(e){
                e.preventDefault();
            },
            closeSelf(){
                this.SET_SHOWQUICKLOGIN(false)
            },
            allow(i){
                this['allowChecked'+i] = !this['allowChecked'+i] ;
            },
            automaticLogin(){
                let that = this;
                // 有选中已同意，才能登录
                if(that.allowChecked1){
                    that.$toast.loading({
                        forbidClick: true,
                        loadingType: 'spinner',
                        duration:0
                    });
                    znLogin({
                        phone:that.userInfo.phoneShow
                    }).then((res)=>{
                        that.$toast.clear();
                        if(res.data.resultCode == 0){
                            console.log('一键登录成功');
                            // 一键登录成功，更新用户信息
                            that.SET_USERINFO(res.data.data);
                            // cookie缓存登录状态
                            setCookie('p',encodeURIComponent(res.data.data.phone));
                            setCookie('pm',res.data.data.phoneMask);
                            setCookie('t',Date.parse(new Date()));
                            setCookie('pc',res.data.data.provinceCode);
                            setCookie('pnsign',res.data.data.pnsign);
                            messageBus.$emit('msg_countDown');
                            messageBus.$emit('msg_check_resetbannerData2');

                            // 关闭弹窗
                            that.SET_SHOWQUICKLOGIN(false)
                        }else{
                            if(res.data.msg){
                                this.$toast.fail(res.data.msg);
                            }else{
                                this.$toast.fail('网络繁忙，请稍后重试!');
                            }
                        }
                    }).catch(()=>{                   
                        this.$toast.fail('网络繁忙，请稍后重试');
                    })

                }else{
                    that.$toast.fail("请先勾选同意《中国移动提供认证服务》");
                }
            },
            changeTel(){
                this.plan = 2
            },
            trim(x){
                return x.replace(/^\s+|\s+$/gm,'');
            },
            isMobile: function(str) {
                return this.trim(str) !== '' && /^\d{11}$/.test(this.trim(str));
            },
            isCNMobile : function(str) {
                return this.trim(str) !== '' && /^((134)|(135)|(136)|(137)|(138)|(139)|(147)|(150)|(151)|(152)|(157)|(158)|(159)|(172)|(178)|(182)|(183)|(184)|(187)|(188)|(195)|(198))\d{8}$/.test(this.trim(str));
            },
            checkTel(){
                if(this.isMobile(this.$refs.telNum.value)){
                    // if(this.isCNMobile(this.$refs.telNum.value)){
                    //     console.log("号码符合规范");
                    //     return true
                    // }else{
                    //     this.$toast.fail("移动号码才行哦~");
                    //     return false
                    // }
                    return true
                }else{
                    this.$toast.fail("请输入正确的手机号哦~");
                    return false
                }
            },
            checkSmsCode(){
                let that = this;
                let str = that.$refs.smsCode.value;
                return this.trim(str) !== '' && /^\d{6}$/.test(this.trim(str));
            },
            checkSms(){
                // 短信书写规范检验
                if(!this.checkSmsCode()){
                    this.$toast.fail('请输入正确的6位验证码');
                    return false
                }
                return true
            },
            sendSms(){
                let that = this;
                // 检测是否60s内禁止点击状态
                if(that.seconds != '获取验证码'){
                    return
                }
                // 号码检测
                if(!that.checkTel()){
                    return
                }
                // 请求发送验证码
                sendSmsCode({
                    phone:Encrypt(that.$refs.telNum.value)  //aes加密
                }).then((res)=>{
                    if(res.data.resultCode == 0){
                        this.$toast.success('验证码下发成功');
                        // 开始倒计时
                        that.seconds = '重新获取60s';
                        that.timer = setInterval(() => {
                            if(that.secondsBackup == 0){
                                that.seconds = '获取验证码';
                                that.secondsBackup = 60;
                                clearInterval(that.timer);
                                that.timer = null;
                                return
                            } 
                            that.secondsBackup --;
                            that.seconds = '重新获取'+ that.secondsBackup +'s';
                        }, 1000);
                    }else if(res.data.resultCode == -517){
                        this.$toast.fail(res.data.msg);
                    }else{
                        if(res.data.data && res.data.data.resultdesc){
                            this.$toast.fail('验证码跑丢了，稍后再试哦！');
                        }else{
                            this.$toast.fail('验证码下发失败，请使用中国移动手机号码登录');
                        }
                    }
                }).catch(()=>{
                    this.$toast.fail('网络繁忙，请稍后重试');
                })

            },
            manualLogin(){
                let that = this;
                // 号码检测
                if(!that.checkTel()){
                    return
                }
                // 短信书写规范检验
                if(!that.checkSms()){
                    return
                }
                // 勾选同意检测
                if(!that.allowChecked2){
                    that.$toast.fail("请先勾选同意《中国移动提供认证服务》");
                    return
                }
                that.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                    duration:0
                });
                // 短信验证码校验
                checkSmsCode({
                    phone:Encrypt(that.$refs.telNum.value),  //aes加密
                    smscode:that.$refs.smsCode.value
                }).then((res)=>{
                    that.$toast.clear();
                    if(res.data.resultCode == 0){
                        // 短信校验成功（登录成功），更新用户信息
                        that.SET_USERINFO(res.data.data);
                        // cookie缓存登录状态
                        setCookie('p',encodeURIComponent(res.data.data.phone));
                        setCookie('pm',res.data.data.phoneMask);
                        setCookie('t',Date.parse(new Date()));                            
                        setCookie('pc',res.data.data.provinceCode);
                        setCookie('pnsign',res.data.data.pnsign);
                        messageBus.$emit('msg_countDown');
                        messageBus.$emit('msg_check_resetbannerData2');
                        // 关闭弹窗
                        that.SET_SHOWQUICKLOGIN(false)
                    }else{
                        if(res.data.data.msg){
                            this.$toast.fail('异常了，请稍后再试哦！');
                        }else{
                            this.$toast.fail('异常了，请稍后再试哦！');
                        }
                    }
                }).catch(()=>{                   
                    this.$toast.fail('异常了，请稍后再试哦！');
                })
            },
        },
        beforeDestroy: function () {
            messageBus.$off(['msg_updatePlan']);
        }
        
    }
</script>

<style lang="less" scoped>
    .quick-login{
        background: rgba(0,0,0,0.4);
        height: 100vh;
        width: 100vw;
        position: fixed;
        left: 0;
        top:0;
        right:0;
        bottom: 0;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        .inner{
            position: relative;
            background: #fff;
            width:6.32rem;
            border-radius: 0.15rem;
            input{
                outline: 0;
                border: 0;
                margin: 0;
                padding: 0
            }
            input:checked{
                background: #6696ff;
                color: #6696ff
            }
            .logo{
                width: 1.4rem;
                height: 1.4rem;
                margin: 0.4rem auto 0.48rem;
            }
            .center{
                margin: 0 auto
            }
            .automatic-tel{
                width: 5.18rem;
                height: 0.9rem;
                text-align: center;
                line-height: 0.9rem;
                font-size: 0.3rem;
                color: #fff;
                background: #6696ff;
                border-radius: 0.9rem;
                margin-bottom: 0.26rem
            }
            .change-tel{
                font-size: 0.3rem;
                color:#6696ff;
                text-decoration: underline;
                margin-bottom: 0.65rem;
            }
            .automatic-allow{
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.21rem;
                margin-bottom: 0.56rem;
                .allow1{
                    width:0.25rem;
                    height: 0.25rem;
                    margin-right: 0.13rem
                }
            }
            .manual-tel{
                .tel-num{
                    display: block;
                    width: 4.71rem;
                    font-size: 0.3rem;
                    border-radius:0.9rem;
                    margin-bottom: 0.4rem;
                    background: #eee;
                    padding:0.3rem 0 0.3rem 0.47rem

                }
            }
            .manual-sms{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                width: 5.18rem;
                box-sizing: border-box;
                background: #eee;
                border-radius:0.9rem;
                overflow: hidden;
                margin-bottom: 0.35rem;
                .sms-code{
                    display: block;
                    width: 2.83rem;
                    font-size: 0.3rem;
                    background: #eee;
                    padding:0.3rem 0 0.3rem 0.47rem
                }
                .send{
                    font-size: 0.3rem;
                    display: block;
                    text-align: center;
                    width: 1.89rem;
                    color:rgba(255,255,255,0.8);
                    background: #6696FF;
                    padding:0.3rem 0;
                    -webkit-appearance : none; //解决ios上按钮的圆角问题
                    border-radius: 0; //解决ios上输入框圆角问题
                }
                .forbidClick{
                    opacity: 0.4;
                }
            }
            .manual-allow{
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.21rem;
                margin-bottom: 0.65rem;
                .allow2{
                    width:0.25rem;
                    height: 0.25rem;
                    margin-right: 0.13rem
                }
            }
            .login-btn{
                font-size: 0.33rem;
                width: 5.18rem;
                height: 0.9rem;
                line-height: 0.9rem;
                background: #6696FF;
                color:rgba(255,255,255,1);
                border-radius: 0.9rem;
                text-align: center;
                margin-bottom: 0.56rem;
            }
            .close{
                position: absolute;
                right: 0;
                top:0;
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>