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
    import { mapState } from 'vuex'
    import { getData } from "@/api/activities";
    import { getBanner } from '@/utils/func';
    import { pagelogMixin } from "@/mixins/log"


    export default {
        name: "activities",
        data(){
            return{
                activityList:[
                    //静态设置列表
                    // {
                    //     icon: 'activities_618_1.jpg',
                    //     startDate: '2020/06/17 00:00:00',
                    //     endDate: '2020/07/3 00:00:00',
                    //     name: '权益超市',
                    //     activitystarttime: '2020/06/17',
                    //     activityendtime: '2020/06/30',
                    // },
                    // {
                    //     icon: 'activities_618_2.jpg',
                    //     startDate: '2020/06/17 00:00:00',
                    //     endDate: '2021/06/18 00:00:00',
                    //     linkurl: 'https://ykhjx.cmicvip.cn/2016tyjf/ykhjx/res/wap/groupbuy.html?sspId=73541',
                    //     name: '优酷拼拼团',
                    //     activitystarttime: '2020/06/17',
                    //     activityendtime: '待定',
                    // },
                    // {
                    //     icon: 'activity_for_1.png',
                    //     startDate: '2020/05/01 00:00:00',
                    //     endDate: '2021/08/02 00:00:00',
                    //     linkurl: 'https://dev.coc.10086.cn/coc/web/coc2020/heartChoose/?channelId=C00004001116',
                    //     name: '随心会员',
                    //     activitystarttime: '2020/05/01',
                    //     activityendtime: '2020/08/01',
                    // },
                ],
            }
            
        },              
        mixins: [pagelogMixin],
        components: {
            Menu,
            ActivityCard
        },
        computed:{
            ...mapState([ 
                "userInfo" ,
                "sysInfo"
            ])
        },
        mounted() {
            var that = this;
            this.activityList = getBanner(this.activityList, this.sysInfo.channelCode);
            if (this.activityList.length == 0) {
                getData().then(function(res){               
                    that.activityList = res.data.data[103];
                })
            }
        },
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