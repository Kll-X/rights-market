<template>
    <div class="welfare">
        <guide-headline :info="guide" ></guide-headline>
        <img :src="guide.icon" class="welfare-img" @click="getCoupon">
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { Toast } from 'vant';
    import GuideHeadline from '@/components/home/GuideHeadline.vue';
    import { VIPORDER } from '@/utils/constant';

    export default {
        name: "vip-welfare",        
        props:["guide"],       
        data(){
            return{
            }
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ]),
            
        },
        methods:{
            getCoupon(){
                if(this.userInfo.newStarVipInfo || this.userInfo.vipInfo){//是会员，集运开发领取页
                    if(process.env.VUE_APP_BUILD == 'production'){//生产环境
                        let url = "https://apiserv.cmicrwx.cn/fcyr4/index.html#/vipClub"+"?selfChannelCode="+this.sysInfo.selfChannelCode+"&pnsign="+encodeURIComponent(this.userInfo.pnsign)
                        window.location.href = url
                    }else{
                        let url = "http://rwktst.aspire-tech.com:19088/frcm/fcyr4/index.html#/vipClub"+"?selfChannelCode="+this.sysInfo.selfChannelCode+"&pnsign="+encodeURIComponent(this.userInfo.pnsign)
                        window.location.href = url
                    }
                }else{
                    this.$emit('placeVipOrder');
                }
            },
        },
        components:{
            GuideHeadline
        }
    }
</script>
<style scoped lang='less'>
    .welfare{
        margin-left: 0.35rem;
        margin-right: 0.35rem;
        .welfare-img{
            width: 6.8rem;
            height: 2.1rem; 
            margin-bottom: 0.52rem;
        }
    }
</style>