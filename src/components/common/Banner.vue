<template>
    <van-swipe class="banner" ref="banner" :autoplay="3000" @change="onChange" :class="[bannerData.colorPlan]">
        <van-swipe-item v-for="(item, index) in bannerData.arr" :key="index">
            <div class="wrapper">
                <img class="banner-img" alt="" v-lazy="Common.getImgUrl(item.icon)" :style="{height:bannerData.height}" @click.stop="jump(item.linkurl, item.needPnsign)" />
            </div>
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
            <span @click.stop="changeslide(i)" v-for="(item, i) in bannerData.arr" :key="i" :class="{'self-indicator':true,'active-indicator':i==current,'common-indicator':i!=current}"></span>
        </div>
    </van-swipe>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "banner",
        props:[
            "bannerData"
        ],
        computed:{
            ...mapState([ 
                "userInfo" 
            ])
        },
        data(){
            return{
                current:0
            }
        },
        methods:{
            onChange(i){
                this.current = i;
            },
            changeslide(i){
                this.$refs.banner.swipeTo(i);
            },
            jump(link, needPnsign){
                if (link){
                    if (needPnsign) {
                        location.href = link + '?pnsign=' + this.userInfo.pnsign
                    } else {
                        location.href = link
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
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
.plan1 {
        .custom-indicator{
            .common-indicator{
                background-color: #e0f1ff;;
            }
            .active-indicator{
                background-color: #51afff;
            }
        }
    }
    .plan2 {
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
</style>