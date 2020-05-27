<template>
    <div class="active-region">
        <router-link tag='div' class="grab" :to="'sort?id='+12">
            <img class="grab-bg" :src="grabBg" alt="">
            <img class="grab-logo" :src="grabLogo" alt="">
            <div class="grab-desc">
                <span class="grab-time">
                    {{grabTime}}
                </span>
                <span class="grab-name">
                    {{grabName}}
                </span>
            </div>
            <img class="grab-btn" :src="grabBtn" alt="">
        </router-link>
        <advance-notice></advance-notice>
    </div>
</template>

<script>
    import AdvanceNotice from '@/components/home/AdvanceNotice.vue';
    export default {
        name: "active-region",
        data(){
            return{
                grabBg:require('@imgs/home/grabBg@2x.png'),
                grabLogo:require('@imgs/home/grabLogo@2x.png'),
                grabTime:'2月28日 中午12:00开抢',
                grabName:'0元爱奇艺7天会员',
                grabBtn:require('@imgs/home/grabBtn@2x.png')
            }
        },
        components:{
            AdvanceNotice
        }
    }
</script>

<style lang="less" scoped>
    .active-region{
        .grab{
            position: relative;
            width:100%;
            height:1.2rem;
            padding-top: 0.3rem;
            display: flex;
            justify-content: space-between;
            .grab-bg{
                position: absolute;
                left: 0;
                width:6.8rem;
                height:1.2rem;
            }
            .grab-logo{
                margin-left:0.24rem;
                margin-top:-0.25rem;
                width:1.2rem;
                height:1.2rem;
                position: relative;
                z-index: 1; 
            }
            .grab-desc{
                flex: 1;
                z-index: 1;
                margin-left:0.23rem; 
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                .grab-time{
                    margin-top: 0.16rem;
                    font-size: 0.31rem;
                    color: #6e6e64;
                    font-weight: bold;
                }
                .grab-name{
                    margin-top:0.08rem; 
                    font-size: 0.26rem;
                    color:#7a7a6c;
                }
            }
            .grab-btn{
                margin-top:-0.09rem; 
                width:1.39rem;
                height:1.39rem;
                z-index: 1;
            }
        }
    }
</style>