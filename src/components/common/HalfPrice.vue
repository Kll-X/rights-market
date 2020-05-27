<template>
    <div>
        <guide-headline :info="guide" :half="true"></guide-headline>
        <div class="half-list">
            <app-card2 v-for="(item,j) in halfApps" :key="j" :info="item" :index="j"></app-card2>
        </div>
    </div>
</template>

<script>
    import GuideHeadline from '@/components/home/GuideHeadline.vue'; 
    import AppCard2 from '@/components/home/AppCard2.vue';    

    export default {
        name: "half-price",
        props:["guide","halfApps"],
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