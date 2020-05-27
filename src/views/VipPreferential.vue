<template>
    <div id="vip-preferential">
        <!-- 标题 -->
        <div class="title-wrap">
            <span class="title-font">会员优惠购</span>
        </div>
        <van-list class="vip-list"
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10">
            <app-card1 class="vip-wrap" v-for="item in itemList" :key="item.id" :info="item" :vip="true"/>
        </van-list>
    </div>
</template>

<script>
    import AppCard1 from '@/components/home/AppCard1.vue'
    import { getData } from "@/api/vippreferential";
    export default {
        name: "vippreferential",
        components: {
            AppCard1,
        },
        data() {
            return {
                loading: false,
                finished: false,
                page: 1,//请求第几页
                pageSize: 30,//每页请求的数量
                total: 0,//总共的数据条数
                itemList: [],
            };
        },
        mounted() {
            //创建组件时，加载第1页数据
            this.getList();
        },
        methods: {
            getList() {
                this.loading = true;
                getData().then((response) => {
                    this.loading = false;
                    this.finished = true;
                    if (response.data.resultCode == 0) {
                        this.itemList = this.itemList.concat(response.data.data);
                    }
                })
            },
            onLoad() {
                this.page++;
                // this.getList();
            }
        },
        computed:{
        },
    }
</script>

<style scoped lang="less">
    #vip-preferential{
        height: 100vh;
        .title-wrap{
            height: 1rem;
            line-height: 1rem;
            padding: 0 .45rem 0 .36rem;
            .title-font{
                float: left;
                font-size: .34rem;
                color: #0f0b1a;
                font-weight: bold;
            }
        }
        .vip-list{
            padding: 0 .35rem;
            text-align: left;
            .vip-wrap{
                display: inline-block;
                text-align: center;
                vertical-align: top;
                width: 2.2rem;
                margin-right: .1rem;
                margin-bottom: .1rem;
                &:nth-child(3n){
                    margin-right: 0;
                }
            }
        }
    }
</style>
