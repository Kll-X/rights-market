<template>
    <div class="menu" :style="{display:sysInfo.channel=='st'?'none':'flex'}">
        <div class="item-wrapper" v-for="(item,index) in list" :key="item.txt">
            <router-link :to="item.router" class="item">
                <div class="icon" :class="item.className" @click="blocklogHandler('底栏','0002','000'+(index+1))"></div>
                {{item.txt}}
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { blocklogMixin } from "@/mixins/log"
    export default {
        name: "menubar",
        mixins: [blocklogMixin],
        created(){
            //曝光统计
            this.blocklogHandler('底栏','0002','');
        },
        data: function () {
            return {
                list: [
                    {
                        txt: '首页',
                        router: '/home',
                        className: 'home'
                    },
                    {
                        txt: '分类',
                        router: '/sort',
                        className: 'sort'
                    },
                    {
                        txt: '活动',
                        router: '/activities',
                        className: 'activities'
                    },
                    {
                        txt: '我的',
                        router: '/mine',
                        className: 'mine'
                    }
                ]
            }
        },
        computed:{
            ...mapState([
                "sysInfo"
            ])
        }
    }
</script>

<style scoped lang="less">
    .menu {
        position: fixed;
        bottom: 0;
        display: flex;
        width: 100%;
        height: 1.29rem;
        justify-content: space-around;
        align-items: center;
        background: #fff;
        z-index: 2;
        border-top: 1px solid #ccc;
        .item{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: .2rem;
            text-decoration: none;
            .icon{
                width: .44rem;
                height: .44rem;
                -webkit-background-size: contain;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
    }
    .home{
        background-image: url("../../assets/imgs/icon_home@2x.png");
    }
    .router-link-active .home{
        background-image: url("../../assets/imgs/icon_home_active@2x.png");
    }
    .activities{
        background-image: url("../../assets/imgs/icon_activities@2x.png");
    }
    .router-link-active .activities{
        background-image: url("../../assets/imgs/icon_activities_active@2x.png");
    }
    .sort{
        background-image: url("../../assets/imgs/icon_sort@2x.png");
    }
    .router-link-active .sort{
        background-image: url("../../assets/imgs/icon_sort_active@2x.png");
    }
    .mine{
        background-image: url("../../assets/imgs/icon_mine@2x.png");
    }

    .router-link-active .mine{
        background-image: url("../../assets/imgs/icon_mine_active@2x.png");
    }
    a:link {
        color: #0F0B1A;
        text-decoration: none;
    }
    a:visited {
        color: #0F0B1A;
        text-decoration: none;
    }
    .router-link-exact-active.router-link-active{
        color:#6696ff
    }
</style>
