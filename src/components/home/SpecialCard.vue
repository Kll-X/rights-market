<template>
    <div :class="{'special-card':true,'marginRight':index%2 == 0}" @click.stop="jump(info.linkurl)">
        <img class="img" :src="Common.getImgUrl(info.icon)" alt="">
    </div>
</template>

<script>
    // import {getQuery} from '@/utils/func';
    import { mapState } from 'vuex'

    export default {
        name: "special-card",
        props:["info","index"],
        computed:{
            ...mapState([
                "sysInfo"
            ])
        },
        methods:{
            jump(linkurl){
                let that = this;
                if(linkurl){
                   window.console.log('s',this.$route.name);
                    // if(that.sysInfo.channel == 'st' && getQuery('zindex')=='basic' && that.$route.name == 'home'){
                    if(that.sysInfo.channel == 'st' && that.$route.name == 'home'){
                        window.leadeon.newWebview({
                            debug: false,
                            markID: '',                     //字符串类型，活动 ID （活动id，4.0之后允许不传，4.0之前必填）
                            type: '',           //字符串类型（分享类型，内部保留字段，允许不传）  4.0 新增
                            funCode: '',        //字符串类型（分享业务编码，内部保留字段，允许不传）  4.0 新增 详见“统一门户客户端V4.0_接口设计说明书”
                            bizCode: '', //功能编码，详见“客户端功能编码”(内部使用)
                            url: linkurl, //字符串类型，需要打开的 url，（1、URL中不能有空格；2、参数中如果有汉字，需要对汉字进行encodeURI()编码,最终的结果页面必须对这个参数decodeURI()解码，http://www.w3school.com.cn/jsref/jsref_encodeuri.asp）
                            success: function(res) {console.log(res)},
                            error: function(err) {console.log(err)}
                        });
                    }else{
                       window.location.href = linkurl 
                    }
                }
                
            }
        }
    }
</script>

<style lang="less" scoped>
    // .special-card{
    //     position: relative;
    //     width: 3.3rem;
    //     height: 1.6rem;
    //     color: rgba(255,255,255,0.9);
    //     .img{
    //         position: absolute;
    //         left: 0;
    //         top:0;
    //         width: 3.3rem;
    //         height: 1.6rem
    //     }
    //     .pay-plan{
    //         font-size: 0.18rem;
    //         position: absolute;
    //         right:0.1rem;
    //         top:0.28rem;
    //     }
    //     .desc{
    //         font-size: 0.22rem;
    //         position: absolute;
    //         top:0.74rem;
    //         text-align: left;
    //         padding:0 0.22rem 0 0.28rem;
    //     }
    // }
    .special-card{
        width: 3.3rem;
        height: 1.6rem;
        color: rgba(255,255,255,0.9);
        .img{
            width: 3.3rem;
            height: 1.6rem
        }
    }
    .marginRight{
        margin-right: 0.17rem;
    }
</style>