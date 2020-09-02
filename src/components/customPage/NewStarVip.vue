<template>
    <div class="main-wrapper">
        <div class="goVip" @click="goVip">
            <div class="go">去领取 GO</div>
            <!--<div class="tip" v-show="this.leftDownTip">自动跳转： <span>{{this.leftTime}}</span>s</div> -->
        </div>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex';
    import messageBus from "@/utils/messageBus";
    import { pagelogMixin } from "@/mixins/log"
    import { myPlaceNewStarVip } from "@/api/common";
    import { znLogin } from "@/api/login";
    import { setCookie } from "@/utils/cookie";

    export default {
        name: "newStarVip",
        data(){
            return{
                leftTime:3,
                leftDownTip:false
            }
            
        },              
        mixins: [pagelogMixin],
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ])
        },
        created() {    
            this.isLogin();      
        },
        mounted(){

        },
        methods:{
            ...mapMutations([
                'SET_USERINFO',
                'SET_SHOWQUICKLOGIN',
            ]),
            isLogin(){
                if(this.userInfo.phone){
                    this.registerNewStar();
                    this.leftDownTip = true;
                    this.countDown();
                    // setTimeout(() => {
                    //     this.$router.push({name:'vip'})
                    // }, 3000);   
                }else{
                    // if (that.$route.query.sign || that.$route.query.actSign || that.sysInfo.channel == 'st') {
                    //     messageBus.$on('msg_loginCheck', () => {
                    //     })
                    //     messageBus.$on('msg_loginFail', () => {
                    //         if(that.sysInfo.channel == 'st'){
                    //             messageBus.$emit('msg_checkLogin','init');
                    //         }else{
                    //             that.$router.replace({name:'login'})
                    //         }
                    //     })
                    // }
                    messageBus.$on('getPhoneNumDone',()=>{
                        let that = this;
                        if(!this.userInfo.phoneShow){
                            this.SET_SHOWQUICKLOGIN(true);
                        }else{
                            this.leftDownTip = true;
                            this.countDown();
                            let sourceSymbol = ((location.href.search('source=true')>-1)&&(process.env.NODE_ENV!='production'))?'0000':'2008';
                            myPlaceNewStarVip({
                                phone: this.userInfo.phoneShow
                            },{
                                sourceSymbol:sourceSymbol,
                                sourceChannelCode:this.sysInfo.selfChannelCode
                            }).then((res)=>{
                                if(res.resultCode == 0){
                                    if(res.data.data){
                                        console.log("注册成功")                                              
                                    }
                                }
                            })

                            znLogin({
                                phone:that.userInfo.phoneShow
                            }).then((res)=>{
                                that.$toast.clear();
                                if(res.data.resultCode == 0){
                                    window.console.log('一键登录成功');
                                    // 一键登录成功，更新用户信息
                                    that.SET_USERINFO(res.data.data);
                                    // cookie缓存登录状态
                                    setCookie('p',encodeURIComponent(res.data.data.phone));
                                    setCookie('pm',res.data.data.phoneMask);
                                    setCookie('t',Date.parse(new Date()));
                                    setCookie('pc',res.data.data.provinceCode);
                                    setCookie('pnsign',res.data.data.pnsign);
                                    setCookie('iswhite',res.data.data.iswhite);
                                    messageBus.$emit('msg_countDown');
                                }else{
                                    if(res.data.msg){
                                        this.$toast(res.data.msg);
                                    }else{
                                        this.$toast('网络繁忙，请稍后重试!');
                                    }
                                }
                            }).catch(()=>{
                                this.$toast('网络繁忙，请稍后重试');
                            })

                            // setTimeout(() => {
                            //     this.$router.push({name:'vip'})
                            // }, 3000);  
                        }
                    });

       
                }
                
            },
            registerNewStar(){
                let sourceSymbol = ((location.href.search('source=true')>-1)&&(process.env.NODE_ENV!='production'))?'0000':'2008';
                myPlaceNewStarVip({
                    phone: this.userInfo.phone
                },{
                    sourceSymbol:sourceSymbol,
                    sourceChannelCode:this.sysInfo.selfChannelCode
                }).then((res)=>{
                    if(res.resultCode == 0){
                        if(res.data.data){
                            console.log("注册成功")                                                
                        }
                    }
                })
            },
            countDown(){               
                // var interval = setInterval(() => {
                //     this.leftTime-- ;
                //     if(this.leftTime == 1){
                //         clearInterval(interval);
                //         //调用接口

                //     }
                // },1000)
            },
            goVip(){
                if(!this.userInfo.phone && !this.userInfo.phoneShow){
                    this.SET_SHOWQUICKLOGIN(true);
                }else{
                    this.$router.push({name:'vip'})
                }               
            }
        },
        watch:{
            '$store.state.userInfo.phone'(){
                this.registerNewStar();
                this.leftDownTip = true;
                this.countDown();
            },
        }
    }
</script>

<style scoped lang='less'>
.main-wrapper{
    background-image: url("../../assets/imgs/register_vip.png");
    width: 7.5rem;
    height: 16.26rem;
    background-size: contain;
    .goVip{
        width: 6.58rem;
        height: 1.38rem;
        background-color: #a5f8fc;
        text-align: center;
        color: #4784ef;
        border-radius: 1.38rem;
        position: absolute;
        top: 12.37rem;
        left: 6.13%;
        box-shadow: 0 0.07rem 0 #2fa3ed;
        display: flex;
        justify-content: center;
        align-items: center;
        .go{
            font-size: 0.6rem;
        }
        .tip{
            font-size: 0.24rem;
        }
    }
}

</style>