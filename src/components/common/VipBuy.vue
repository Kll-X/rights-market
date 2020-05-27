<template>
    <div>
        <guide-headline :info="guide" :vip="true"></guide-headline>
        <div class="vip-list">
            <app-card1 v-for="(item,j) in vipApps" :key="j" :info="item" :index="j" :vip="true"></app-card1>
        </div>
    </div>
</template>

<script>
    import GuideHeadline from '@/components/home/GuideHeadline.vue'; 
    import AppCard1 from '@/components/home/AppCard1.vue';    

    export default {
        name: "vip-buy",
        props:["guide","vipApps"],
        components:{
            GuideHeadline,
            AppCard1
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