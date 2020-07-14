<template>
    <div>
        <div class="input-search">
            <div style="display:flex;">
                <img :src="require('@imgs/search/search-icon.png')" class="search-icon">
                <input placeholder="请输入商品名称" class="input-frame" v-model="value" @input="inputFunc">
                <img :src="require('@imgs/search/del.png')" class="input-del" v-if="value" @click="clearInput">
                <span class="cancel-input" @click="onCancel">取消</span>
            </div>           
        </div>
        <div class="hot-search">
            <div class="hot-search-title" v-if="havHotResult">热门搜索</div>
            <div>
                <ul class="hot-search-content">
                    <li v-for="val in searchContents" :key="val.id" @click="getValue(val.hotkeyword)">
                        {{val.hotkeyword}}
                    </li>
                </ul>
            </div>
            <div v-if="isShowHistory" class="show-history">
                <div class="hot-search-title">搜索历史<img :src="require('@imgs/search/del-history.png')" class="del-history" @click="delHistory"></div>
                <div>
                    <ul class="hot-search-content search-history">
                        <li v-for="val in historyList" :key="val.id" @click="getValue(val)">
                            {{val}}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="isShowReasultTitle">
                <div class="hot-search-title">搜索结果</div>
                <div v-if="isShowReasultList">
                    <div>
                        <img :src="require('@imgs/search/result.png')" class="no-result-icon">
                        <p class="no-result-tips">暂无你要找的产品哦</p> 
                    </div>
                </div>
                <div v-else>
                    <ul class="hot-search-result">
                        <li v-for="val in searchResult" :key="val.id">
                            <router-link :to="{name:'goodsDetail',params:{mid:val.mid}}" class="result-link" @click.native="saveWord(val.name)">
                                <img :src="val.iconUrl" class="result-icon">
                                <div class="search-result-detail">
                                    <span class="result-item">{{val.name}}</span>
                                    <span class="result-price">{{val.price}}元起/月</span>
                                </div>
                            </router-link>                         
                        </li>
                    </ul>
                </div>
            </div>            
        </div>
        <BackHome/>
    </div>
</template>

<script>
    import { getResult,getHot } from "@/api/search";// 接口调用
    import BackHome from '@/components/common/BackHome.vue';
    import { pagelogMixin,blocklogMixin } from "@/mixins/log"

    export default {
        name: "search",
        components: {
            BackHome
        },
        mixins: [pagelogMixin,blocklogMixin],
        data(){
            return{
                value :'',
                isShowReasultTitle: '',//默认为false,搜索结果外层
                isShowReasultList: false,//搜索结果是否show
                havHotResult:true,//是否显示热门搜索
                sensitiveWords:["法伦","天皇","发票代","卖血","买枪","敏感"],//test敏感词词库
                searchContents:[],
                searchResult:[],
                isShowHistory:'',//是否展示搜索历史
                historyList:[],//存放搜索历史    
                searchWord:'' //存放localstorage数据的名字                      
            }
        },
        created(){
            var storage = window.localStorage;
            if(storage.getItem("this.searchWord") !== null){//有历史记录
                this.historyList = JSON.parse(storage.getItem('this.searchWord'));      
                this.isShowHistory = true;         
            }else{//无历史记录
                this.isShowHistory = false;
            }
            this.blocklogHandler('搜索入口','0003','0001');
        },
        mounted(){
            var that = this;
            getHot().then(function(data){
               window.console.log(data.data.data.length)
                if(data.data.data.length){
                    that.searchContents = data.data.data;
                }else{//无热门搜索关键词，不展示“热门搜索”这四个字
                    that.havHotResult = false;
                }               
            })
        },
        watch:{
           value(newName){
               this.filterInput(newName)
           } 
        },
        methods:{
            onCancel(){                
                window.history.go(-1);
            },
            getValue(t){
                this.value = t;
                if(t == false){
                    return;
                }
                this.getResultMethod();
            },
            clearInput(){
                this.value = '';
                this.isShowReasultTitle = false;
                var storage = window.localStorage;
                if(storage.getItem('this.searchWord') == null){//无搜索记录
                    this.isShowHistory = false;
                }else{
                    this.isShowHistory = true;
                }
            },
            filterInput(obj){  
                //获取文本输入框中的内容  
                var val = obj;  
                //遍历敏感词数组  
                for(var i=0;i<this.sensitiveWords.length;i++){  
                    //全局替换  
                    var reg = new RegExp(this.sensitiveWords[i],"g");  
                    //判断内容中是否包括敏感词  
                    if(val.indexOf(this.sensitiveWords[i])!=-1){  
                        var result = val.replace(reg,"**");  
                        this.value = result;   
                    }  
                }  
            },
            inputFunc(){//input值改变就调用接口
                if(this.value.trim() == ""){
                    this.value = '';
                    this.isShowReasultTitle = false;
                    var storage = window.localStorage;
                    if(storage.getItem('this.searchWord') == null){//无搜索记录
                        this.isShowHistory = false;
                    }else{
                        this.isShowHistory = true;
                    }                  
                    return;
                }else{
                    this.getResultMethod();
                }
            },
            getResultMethod(){
                if(!navigator.onLine){
                    this.$toast('网络异常,请连接后重试！');
                    return;
                }
                var str = this.value; 
                var val = str.replace(/(^\s*)|(\s*$)/g, "");                            
               window.console.log(val)
                var that = this;
                getResult(val).then(function(data){
                    var dataResult = data.data;
                    if(dataResult.resultCode == 0){//查询成功
                        that.isShowReasultTitle = true;
                        that.isShowHistory = false;
                        if(!dataResult.data.length){//返回搜索结果为空
                            that.isShowReasultList = true;
                            that.isShowReasultTitle = true;
                        }else{
                            that.isShowReasultList = false;                           
                            that.searchResult = dataResult.data;
                            for(var i =0; i < that.searchResult.length; i++){
                                that.searchResult[i].price = (that.searchResult[i].price/100).toFixed(2);
                                that.searchResult[i].iconUrl = that.Common.getImgUrl(that.searchResult[i].iconUrl);
                            }
                        }                                              
                    }
                })
            },
            saveHistory(item){//保存搜索记录         
                var storage = window.localStorage;
                var itemWord = item;
                if(storage.getItem('this.searchWord') == null){//若无记录历史,直接将新的历史记录设置在localStorage中
                    this.historyList.unshift(itemWord);                  
                }else{
                    if(this.historyList.indexOf(itemWord) != -1){//历史记录里已有改搜索词，则删掉，并排到第一个位置
                        this.historyList.splice(this.historyList.indexOf(itemWord), 1);
                    }
                    this.historyList.unshift(itemWord);
                }
                 storage.setItem('this.searchWord',JSON.stringify(this.historyList));
               window.console.log(this.historyList)               
            },
            saveWord(name){
                this.saveHistory(name);
            },
            delHistory(){
                window.localStorage.removeItem('this.searchWord');
                this.historyList = [];
            }        
        }
        
    }
</script>

<style scoped>
    .input-search{
        flex-direction: column;
    }
    .input-frame{
        border: none;
        background-color: #F5F7FA;
        padding: 0;
        margin: .2rem .38rem .38rem .35rem;
        height: .64rem;
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
        width: 5.74rem;
        height: .64rem;
        text-indent: 0.6rem;
    }
    .input-del{
        width: .26rem;
        height: .26rem;
        position: absolute;
        right: 1.57rem;
        top: .38rem;
    }
    .search-icon{
        width: .26rem;
        height: .27rem;
        position: absolute;
        left: .51rem;
        top: .39rem;
    }
    input::-webkit-input-placeholder{
        font-size: .28rem;
        color: #BDBFC2;
    }
    .cancel-input{
        line-height: 1.04rem;
        font-size: .3rem;
        color: #383A3F;
        opacity:0.8;
    }
    .hot-search{
        display: flex;
        flex-direction: column;
    }
    .hot-search-title{
        margin-left: .36rem;
        color:  #383A3F;
        font-size: .28rem;
        line-height: .36rem;
        text-align: left;
        line-height: .28rem;
    }
    .hot-search-content{
        margin: .19rem .35rem auto .35rem;
    }
    .hot-search-content li{
        float: left;
        height: .6rem;
        font-size: .24rem;
        color: #383A3F;
        background:rgba(245,247,250,1);
        border-radius:.3rem;
        line-height: .6rem;
        margin-right: .2rem;
        padding-left: .21rem;
        padding-right: .21rem;
        margin-bottom: 0.42rem;
    }
    .del-history{
        width: .27rem;
        height: .28rem;
        float: right;
        margin-right: 0.5rem;
    }
    .show-history{
        height: 1.87rem;  
        overflow: hidden;
    }
    .search-history li{
        margin-bottom:0;
        margin-top: 0.1rem;
    }
    .result-icon{
        width: .72rem;
        height: .72rem;  
        margin-right: .14rem;     
    }
    .search-result-detail{
        display: flex;
        flex-direction: column;
        height: .61rem;
        font-size: 0;
    }
    .result-item{
        font-size: 0.26rem;
        color: #383A3F;
        font-weight: 400;
        line-height: 0.3rem;
        text-align: left;
    }
    .result-price{
        font-size: .24rem;
        color: #6696FF;
        text-align: left;
        line-height: 0.3rem;
        opacity: 0.8;
        margin-top: 0.11rem;
    }
    .hot-search-result li{
        display: flex;
        color: #383A3F;
        font-size: .26rem;
        align-items: center;
        height: 1.04rem;
        border-bottom: .01rem solid #E8E8E8;
        margin-top: 0.2rem;
    }
    .hot-search-result{
        margin: .14rem .35rem .36rem .36rem;
    }
    .no-result-icon{
        width: 2.63rem;
        height: 2.14rem;
        margin-top: 1.2rem;
        display: block;
        margin-left: 2.44rem;
    }
    .no-result-tips{
        margin: 0;
        margin-top: .6rem;
        font-size: .3rem;
        color: #383A3F;
        line-height: 0.36rem;

    }
    .result-link{
        display: flex;
    }

</style>