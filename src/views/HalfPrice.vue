<template>
    <div id="half-price">
        <!-- 标题 -->
        <div class="title-wrap">
            <span class="title-font">
                精选5折购
            </span>
            <img class="half_tip" src="@imgs/half_tip.png" alt="">
        </div>
        <van-list class="half-list"
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10">
            <app-card2 :class="{'half-wrap':true,'noPaddingTop':j == 0}" v-for="(item,j) in itemList" :key="j" :info="item" :index="j" />
        </van-list>
        <BackHome/>
    </div>
</template>

<script>
    import AppCard2 from '@/components/home/AppCard2.vue'
    import { getData } from "@/api/halfprice";
    import BackHome from '@/components/common/BackHome.vue';

    export default {
        name: "halfprice",
        components: {
            AppCard2,
            BackHome
        },
        data() {
            return {
                // ----
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
                        // let testData = {
                        //     cid: "2",
                        //     icon: "102173&6000849.png",
                        //     mid: "25",
                        //     name: "5折蜻蜓FM会员",
                        //     originprice: 2500,
                        //     price: "1250",
                        //     remark: "蜻蜓FM月会员，话费支付-单次点播，25元/月"}
                        // this.itemList = [testData].concat([testData]).concat([testData])
                    }
                })
            },
            onLoad() {
                this.page++;
                // this.getList();
            }
        }
    }
</script>

<style scoped lang="less">
    #half-price{
        height: 100vh;
        .title-wrap{
            height: 1.04rem;
            padding: 0 .45rem 0 .36rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title-font{
                font-size: .34rem;
                color: #0f0b1a;
                font-weight: bold;
            }
            .half_tip{
                height:0.36rem;
                margin-left: 0.12rem;
            }
        }
        .half-list{
            padding: 0 .35rem;
            text-align: left;
            .half-wrap{
                padding-top: 0.18rem;
                padding-bottom: 0.18rem;
            }
            .noPaddingTop{
                padding-top: 0;
            }
        }
    }
</style>
