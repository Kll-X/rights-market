<template>
    <!-- 蒙版 -->
    <div id="nav-tab">
        <div class="tab-wrap">
            <div class="tab-wrap-content">
                <div class="tab-wrap-item" v-for="(item,index) in tabList" :key="index">
                    <router-link :to="item.router" class="item">
                        <div class="icon" :class="item.value"></div>
                        {{item.name}}
                    </router-link>
                </div>
            </div>
        </div>
        <div class="btn-wrap">
            <router-link to="/search" class="btn-con btn-con-left">
                <img class="btn-con-icon" src="@imgs/home/tab_search.png" alt="">
                搜索
            </router-link >
            <router-link to="/sort" class="btn-con">
                <img class="btn-con-icon" src="@imgs/home/tab_sort.png" alt="">
                分类
            </router-link >
        </div>
    </div>
</template>

<script>
    import { blocklogMixin } from "@/mixins/log"
    export default {
        mixins: [blocklogMixin],
        props: {
        },
        data() {
            return {
                tabList: [{
                    name: '首页',
                    router: '/home',
                    value: 'home',
                }, {
                    name: '会员',
                    router: '/vip',
                    value: 'vip',
                }, {
                    name: '我的',
                    router: '/mine',
                    value: 'mine',
                }]
            };
        },
        mounted() {
            
        },
        methods: {
        },
    }
</script>

<style lang="less">
    #nav-tab{
        position: fixed;
        top: 0;
        z-index: 2;
        width: 100%;
        height: 1.3rem;
        line-height: 1.3rem;
        padding: 0 .35rem;
        box-sizing: border-box;
        // background:linear-gradient(-30deg,rgba(255,199,101,1),rgba(253,132,123,1));
        background: url("../../assets/imgs/home/tab_bg.png") no-repeat center/100% 100%;
        font-size: 0;
        .tab-wrap{
            width: calc(~"100% - 2.82rem");
            display: inline-block;
            vertical-align: top;
            .tab-wrap-content{
                display: flex;
                height: 1.3rem;
                .tab-wrap-item{
                    flex: 1;
                    text-align: left;
                    .item{
                        display: inline-block;
                        font-size: .34rem;
                        font-weight: 500;
                        color: #FFF;
                    }
                    .router-link-active{
                        position: relative;
                        font-size: .4rem;
                        &::after{
                            content: '';
                            position: absolute;
                            width: .36rem;
                            height: .06rem;
                            left: 50%;
                            margin-left: -.18rem;
                            bottom: .33rem;
                            background: #FFF;
                            border-radius: .03rem;
                        }
                    }
                }
            }
        }
        
        .btn-wrap{
            display: inline-block;
            vertical-align: top;
            width: 2.82rem;
            height: 1.3rem;
            line-height: 1.3rem;
            font-size: 0;
            .btn-con{
                display: inline-block;
                vertical-align: middle;
                width: 1.28rem;
                height: .64rem;
                line-height: .64rem;
                background: rgba(255,255,255,.3);
                border-radius: .32rem;
                font-size: .28rem;
                color: #FFF;
                .btn-con-icon{
                    vertical-align: top;
                    margin-top: .19rem;
                    width: .26rem;
                    height: .26rem;
                }
            }
            .btn-con-left{
                margin-right: .26rem;
            }
        }
    }
</style>