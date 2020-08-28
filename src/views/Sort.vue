<template>
    <div id="sort" :class="sysInfo.channel == 'st'?'env-st':''">
        <!-- 标题 -->
        <div class="sort-title-wrap">
            <span class="sort-title-font">分类</span>
            <router-link to="/search" class="sort-title-icon">
                <img class="sort-search-btn" src="@imgs/sort/search-btn.png" alt="">
            </router-link>
        </div>
        <!-- tabs栏 -->
        <div class="sort-tabs-wrap">
            <div class="tabs-title">
                <div class="tabs-title-label"
                    v-for="item in tabsList" :key="item.value"
                    :class="{active: item.cid == tabsValue}"
                    @click="changeTabs(item.cid)">
                    {{item.cname}}
                </div>
            </div>
            <div class="tabs-content"
                v-for="item in tabsList" :key="item.value"
                v-show="item.cid == tabsValue">
                <div class="tabs-content-common" v-if="item.cid != '6'">
                    <!-- 商品卡片图标 -->
                    <router-link :to="{name: 'goodsDetail', params: {mid: content.mid}}" class="tabs-card" 
                        @click.native="blocklogHandler('分类','0016','00'+getActiveTabOrder()+(('00'+(idx+1)).slice(-3)),'',content.mid,content.name)"
                        v-for="(content,idx) in item.contentList" :key="content.index">
                        <img class="card-image" :src="content.icon" alt="">
                        <div class="card-fonts">{{content.name}}</div>
                        <div class="card-value">{{((content.price)/100).toFixed(2)}}元起</div>
                    </router-link>
                </div>
                <div class="tabs-content-common" v-if="item.cid == '6'">
                    <div class="tabs-card" @click.stop="itemClick('1','https://dev.coc.10086.cn/coc/web/coc2020/heartChoose/?channelId=C00004001116')">
                        <img class="card-image" src="@imgs/sort/heart_choose.png" alt="">
                        <div class="card-fonts">随心看会员</div>
                    </div>
                    <div class="tabs-card" @click.stop="itemClick('2','https://rwk.cmicrwx.cn/rwx/rwkvue/enjoyRight/?channelId=C10000032426&channelSeqId=C10000032404&pageType=ENJOYRIGHT')">
                        <img class="card-image" src="@imgs/sort/enjoy_right.png" alt="">
                        <div class="card-fonts">随心选会员</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <Menu/> -->
        <BackHome :stShow="true"></BackHome>
    </div>
</template>

<script>
    // import Menu from '@/components/common/Menu.vue';
    import { mapState } from 'vuex';
    // 接口调用
    import { getCategory } from "@/api/sort";
    import { getFindMembers } from "@/api/sort";
    import { pagelogMixin,blocklogMixin } from "@/mixins/log";
    import BackHome from '@/components/common/BackHome.vue';

    export default {
        name: "sort",
        mixins: [pagelogMixin,blocklogMixin],
        components: {
            // Menu
            BackHome
        },
        data() {
            return {
                // 标签栏数组
                tabsList: [],
                // tabs栏名称与tabs栏id
                tabs: 'video',
                tabsValue: '1',
                // 排序数组
                sortList: ['视频会员','音乐会员','阅读学习','生活服务','移动会员'],
                listObj:[],
                activeTabCid:'0'
            };
        },
        created() {
            //曝光统计：搜索
            this.blocklogHandler("搜索入口",'0003','');
            //曝光统计：分类
            this.blocklogHandler("分类",'0016','');
        },
        mounted() {
            // 获取列表
            this.getList();
        },
        methods: {
            itemClick(i,url){
                this.blocklogHandler('分类','0016','00'+ this.getActiveTabOrder()+'00'+i,url);
                window.location.href=url
            },
            // 获取tabs内容
            getSort(value) {
                let that = this;
                let data = {
                    'cid': value,
                };
                getFindMembers(data).then(function(response) {
                    const data = response.data.data;
                    for (let index = 0; index < data.length; index++) {
                        const item = data[index];
                        item.icon = that.Common.getImgUrl(item.icon);
                        // data名字修正
                        if (item.name.length > 7) {
                            item.name = item.name.substring(0, 6) + '...';
                        }
                    }
                    // 将数据存放到对应的列表里面
                    for (let index = 0; index < that.tabsList.length; index++) {
                        let item = that.tabsList[index];
                        if (item.cid == value) {
                            item.contentList = item.contentList.concat(data);
                        }
                    }
                })
            },
            // 切换tab栏
            changeTabs(value, isFirst) {
                this.activeTabCid = value;
                //操作统计：分类>分类标签
                this.blocklogHandler("分类",'0016','00'+ this.getActiveTabOrder());

                this.tabsValue = value;
                // 判断当前的tab是否已经请求过接口
                for (let index = 0; index < this.tabsList.length; index++) {
                    const item = this.tabsList[index];
                    if (item.cid == value && item.fristLoad) {
                        this.getSort(value);
                        item.fristLoad = false;
                        break;
                    }
                }
                if (!isFirst) {
                    if(this.$route.params.type != value){
                        this.$router.replace({name: 'sort', params: {type: value}});
                    }
                }
            },
            // 获取分类数据
            getList() {
                let that = this;
                const type = this.$route.params.type;
                getCategory().then((response) => {
                    // 根据返回的tab创建list
                    const listObj = response.data.data;
                    if(response.data.data.length > 0){
                        that.listObj = JSON.parse(JSON.stringify(response.data.data));
                    }
                    for (let index = 0; index < listObj.length; index++) {
                        const item = listObj[index];
                        item.fristLoad = true;
                        item.contentList = [];
                    }
                    this.tabsList = listObj;
                    // for (let index = 0; index < that.sortList.length; index++) {
                    //     const sort = that.sortList[index];
                    //     for (const key in listObj) {
                    //         if (listObj.hasOwnProperty(key)) {
                    //             const item = listObj[key];
                    //             if (sort == item) {
                    //                     that.tabsList.push({
                    //                     cid: key,
                    //                     name: item,
                    //                     contentList: [],
                    //                     fristLoad: true,
                    //                 });
                    //                 continue;
                    //             }
                    //         }
                    //     }
                    // }that.listObj = Object.assign({},response.data.data);
                    // 根据路由获取对应列表内容
                    if (type) {
                        that.changeTabs(type, true);
                    } else { // 默认选中第一个
                        that.changeTabs(that.tabsList[0].cid, true);
                    }
                })
            },
            getActiveTabOrder(){
                for (let idx = 0; idx < this.listObj.length; idx++) {
                    if(this.listObj[idx].cid == this.activeTabCid){
                        return ++idx
                    }
                }
            }
        },
        computed:{
            ...mapState([
                "sysInfo",
                "userInfo"
            ])
        },
    }
</script>

<style scoped lang="less">
    #sort{
        a{
            text-decoration:none;
        }
        height: 100vh;
        .sort-title-wrap{
            height: 1rem;
            line-height: 1rem;
            padding: 0 .45rem 0 .36rem;
            .sort-title-font{
                float: left;
                font-size: .34rem;
                color: #0f0b1a;
                font-weight: bold;
            }
            .sort-title-icon{
                float: right;
                display: flex;
                align-items: center;
                vertical-align: middle;
                height: 100%;
                .sort-search-btn{
                    width: .48rem;
                    height: .5rem;
                }
            }
        }
        // tabs默认样式修改
        .sort-tabs-wrap{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            font-size: 0;
            .tabs-title, .tabs-content{
                // height: calc(~"100vh - 2.29rem");
                height: calc(~"100vh - 1rem");
                overflow-y: auto;
                display: inline-block;
                vertical-align: top;
            }
            .tabs-title{
                width: 1.8rem;
                background: #F5F7FA;
                .tabs-title-label{
                    height: 1.4rem;
                    line-height: 1.4rem;
                    font-size: .28rem;
                    text-align: center;
                    color: #383A3F;
                }
                .active{
                    background: #FFF;
                    color: #FD7028;
                    position: relative;
                }
                .active:after{
                    content: '';
                    position: absolute;
                    left: 0;
                    height: 1.4rem;
                    width: .06rem;
                    background: #FD7028;
                }
            }
            .tabs-content{
                width: calc(~"100% - 1.8rem");
                font-size: .24rem;
                .tabs-content-common{
                    padding: .2rem 0 0;
                    font-size: 0;
                    text-align: left;
                    .tabs-card{
                        display: inline-block;
                        width: calc(~"100%/3");
                        text-align: center;
                        margin-bottom: .35rem;
                        .card-image{
                            display: inline-block;
                            width: 1.12rem;
                            height: 1.12rem;
                        }
                        .card-fonts{
                            font-size: .24rem;
                            color: #0F0B1A;
                            margin-top: .1rem;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            word-break: break-all;
                        }
                        .card-value{
                            font-size: .22rem;
                            color: #FD7028;
                            margin-top: .1rem;
                        }
                    }
                }
            }
        }
    }
    .env-st .tabs-title, .env-st .tabs-content{
        height: calc(~"100vh - 1rem")!important;
    }
</style>
