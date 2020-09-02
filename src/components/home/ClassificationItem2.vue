<template>
    <div class="classification-item2" @click.stop="jump">
        <div class="inner">
            <div class="img-wrapper">
                <img :src="item.img" @error="defalutImg" alt="" :style="{height:item.h?item.h:'auto'}">
            </div>
            <div class="title">{{item.title}}</div>
            <!-- <img :src="Common.getImgUrl(item.icon)" alt="" :style="{height:item.h?item.h:'auto'}">
            </div>
            <div class="title">{{item.name}}</div> -->
        </div>
    </div>
</template>

<script>
    import messageBus from "@/utils/messageBus";
    // import {getQuery} from '@/utils/func';
    import { mapState } from 'vuex';

    export default {
        name: "classification-item2",
        props:['item'],
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ])
        },
        methods:{
            jump(){
                let that = this;
                if(that.item.rights == 'getRights'){
                    // 先判断是否登录
                    if(that.userInfo.phone){
                        that.$router.push({name:'getRights'})
                    }else{
                        messageBus.$emit('msg_checkLogin','init')
                    }
                }else{
                    // if(that.sysInfo.channel == 'st' && getQuery('zindex')=='basic' && that.$route.name == 'home'){
                    if(that.sysInfo.channel == 'st' && that.$route.name == 'home'){
                        window.leadeon.newWebview({
                            debug: false,
                            markID: '',                     //字符串类型，活动 ID （活动id，4.0之后允许不传，4.0之前必填）
                            type: '',           //字符串类型（分享类型，内部保留字段，允许不传）  4.0 新增
                            funCode: '',        //字符串类型（分享业务编码，内部保留字段，允许不传）  4.0 新增 详见“统一门户客户端V4.0_接口设计说明书”
                            bizCode: '', //功能编码，详见“客户端功能编码”(内部使用)
                            url: that.item.linkurl, //字符串类型，需要打开的 url，（1、URL中不能有空格；2、参数中如果有汉字，需要对汉字进行encodeURI()编码,最终的结果页面必须对这个参数decodeURI()解码，http://www.w3school.com.cn/jsref/jsref_encodeuri.asp）
                            success: function(res) {console.log(res)},
                            error: function(err) {console.log(err)}
                        });
                    }else{
                        window.location.href = that.item.linkurl
                    }
                }
            },
            defalutImg() {
                let img = event.srcElement;
                img.src = require('@imgs/default.png');
                img.onerror = null;
            },
        }
    }
</script>

<style lang="less" scoped>
    .classification-item2{
        width:1.7rem;
        background: rgba(0.0.0,2);
        float: left;
        display: flex;
        justify-content: center;
        .img-wrapper{
            text-align: center;
            display: block;
            height:0.78rem;
            img{
                max-width:100%;
                max-height:100%;
            }
        }
        .title{
            font-size: 0.27rem;
            padding-top: 0.09rem;
            white-space: nowrap;  /*禁止换行*/
        }
    }
</style>