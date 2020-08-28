<template>
    <div>
        <guide-headline :info="guide" :limit="true"></guide-headline>
        <div class="vip-list">
            <!-- @click.native="blocklogHandler('会员优惠购','0011',(j<9?'000'+(j+1):'00'+(j+1)),'',item.mid,item.name)" -->
            <app-card3 @click.native="blocklogHandler('秒杀模块','0037',(j<9?'000'+(j+1):'00'+(j+1)),'',item.mid,item.name)" v-for="(item,j) in limitbuyApps" :key="j" :info="item" :index="j" :limit="true" :activityStatus="activityStatus" :startTime="startTime" :endTime="endTime"></app-card3>
        </div>
    </div>
</template>

<script>
    import GuideHeadline from '@/components/home/GuideHeadline.vue'; 
    import AppCard3 from '@/components/home/AppCard3.vue';    
    import { blocklogMixin } from "@/mixins/log"

    export default {
        name: "limit-buy",
        props:["guide","limitbuyApps","activityStatus","startTime","endTime"],
        mixins:[blocklogMixin],
        created(){
            // 曝光统计：会员优惠购
            // this.blocklogHandler('会员优惠购','0013','');
        },
        components:{
            GuideHeadline,
            AppCard3
        }
    }
</script>

<style lang="less" scoped>
    .vip-list{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap
    }
</style>