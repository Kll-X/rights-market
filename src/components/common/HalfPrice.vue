<template>
    <div>
        <guide-headline :info="guide" :half="true"></guide-headline>
        <div class="half-list">
            <app-card2 v-for="(item,j) in halfApps" :key="j" :info="item" :index="j" @click.native="blocklogHandler('精选5折购','0010',(j<9?'000'+(j+1):'00'+(j+1)),'',item.mid,item.name)"></app-card2>
        </div>
    </div>
</template>

<script>
    import GuideHeadline from '@/components/home/GuideHeadline.vue'; 
    import AppCard2 from '@/components/home/AppCard2.vue';    
    import { blocklogMixin } from "@/mixins/log"

    export default {
        name: "half-price",
        props:["guide","halfApps"],
        mixins:[blocklogMixin],
        created(){
            this.blocklogHandler('精选5折购','0010','');
        },
        components:{
            GuideHeadline,
            AppCard2
        }
    }
</script>

<style lang="less" scoped>
    .half-list{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
</style>