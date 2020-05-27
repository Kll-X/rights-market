<template>
        <router-link tag='div' :class="{'app-card':true,'wrap':index>2,'marginRight':index%3 != 2}" :to="{name: 'goodsDetail', params: {mid:info.mid,saleid:info.saleid,proid: info.proid }}">
            <img class="logo" :src="Common.getImgUrl(info.icon)" alt="">
            <div class="name">{{name}}</div>
            <div class="pay">{{info.remark}}</div>
        </router-link>
</template>

<script>
    export default {
        name: "app-card",
        props:["info","index"],
        computed:{
            name(){
                if(this.info.name.length > 8){
                    return this.info.name.substring(0, 7) + '...'
                }else{
                   return this.info.name
                }
                
            }
        }
    }
</script>

<style lang="less" scoped>
    .app-card{
        border-radius: 0.1rem;
        width:2.2rem;
        height: 3rem;
        background: #f5f7fa;
        .logo{
            width:1.4rem;
            height:1.4rem;
            margin: 0.36rem 0.4rem 0.24rem;
            display: block;
        }
        .name{
            width: 100%;
            font-size: 0.24rem;
            color:#68676d;
            font-weight: bold;
            margin-bottom: 0.12rem;
            // overflow: hidden;  /*超出部分隐藏*/
            // white-space: nowrap;  /*禁止换行*/
            // text-overflow: ellipsis; /*省略号*/
        }
        .pay{
            width: 100%;
            font-size: 0.21rem;
            color:#8aacfe;
            opacity: 0.8;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
        }
    }
    .wrap{
        margin-top: 0.1rem;
    }
    .marginRight{
        margin-right: 0.1rem;
    }
</style>