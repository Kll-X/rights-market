<template>
    <div :class="{'guide-headline':true,'half':half}">
        <div class="name">
            <div class="txt">{{info.name}}</div> 
            <img v-show="vip" class="vip_tip" src="@imgs/vip_tip.png" alt="">
            <img v-show="half" class="half_tip" src="@imgs/half_tip.png" alt="">
        </div>
        <router-link v-show="info.id" class="link" tag='div'  :to="info.path?info.path:{name: 'sort', params: {type:info.id}}"><span style="padding-right:0.1rem">{{info.moreDesc?info.moreDesc:'更多'}}</span>></router-link>
    </div>
</template>

<script>
    export default {
        name: "guide-headline",
        props:['info','vip','half'],
    }
</script>

<style lang="less" scoped>
    .guide-headline{
            padding:0.47rem 0 0.2rem;
            margin-bottom: 0.1rem;
            display: flex;
            display: -webkit-flex; 
            justify-content: space-between;
            -webkit-justify-content: space-between;
            .name{
                font-size: 0.32rem;
                font-weight: bold;
                color: #0f0b1a;
                display:flex;
                display: -webkit-flex; 
                .txt{
                    white-space: nowrap;  /*禁止换行*/
                }
                .vip_tip,.half_tip{
                    display: block;
                    font-size: 0;
                    height:0.34rem;
                    margin-left:0.12rem;
                }
            }
            .link{
                font-size: 0.22rem;
                color: #1F1F1F;

            }
        }
        .half.guide-headline{
            padding-bottom: 0rem;
        }
</style>