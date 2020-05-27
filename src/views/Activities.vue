<template>
    <div class="activities">
        <div class="activities-top">
            <span class="page-title">活动</span>
        </div>
        <activity-card v-for="(item,i) in activityList" :key="i" :info="item"></activity-card>
        <Menu/>
    </div>
</template>

<script>
    import Menu from '@/components/common/Menu.vue'
    import ActivityCard from '@/components/activity/ActivityCard.vue';
    // 接口调用
    import { getData } from "@/api/activities";

    export default {
        name: "activities",
        data(){
            return{
                activityList:[]
            }
            
        },              
        components: {
            Menu,
            ActivityCard
        },
        mounted() {
            var that = this;
            getData().then(function(res){               
                that.activityList = res.data.data[103];
            })
        }
    }
</script>

<style scoped>
    .activities{
        padding-bottom: 1.39rem;
    }
    .activities-top{
        display: flex;
        margin-top: .34rem;
    }
    .page-title{
        line-height: .34rem;
        font-size:.34rem;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:rgba(56,58,63,1);
        margin-left: .36rem;
        margin-bottom: 0.16rem;
    }
    .search-icon{
        width: .48rem;
        height: .5rem;
        margin-left: 5.56rem;
    }
</style>