<template>
    <div class="toast" :class="'type'+toast.type" v-if="toast.show">
        <div class="content" :style="toast.contentStyle">
            <div v-if="toast.type == 4" class="btn-close-gray" @click="toast.show=false"></div>
            <div>
                <img v-if="toast.icon" :src="toast.icon" alt="">
            </div>
            <div v-html="toast.tips" class="toast-tips" :style="toast.tipsStyle">
            </div>
            <div v-if="toast.type == 1" class="btn-gotolink" @click="gotolink(toast.link)">
                {{toast.linkTxt}}
            </div>
            <div v-if="toast.type == 2" class="btns-confirm">
                <div class="cancel" @click="toast.show=false">{{toast.cancel||'取消'}}</div>
                <div class="confirm" @click="toast.handlerConfirm()">{{toast.confirm ||'确定'}}</div>
            </div>
            <div v-if="toast.type == 3" class="btns-confirm" style="margin-top:.3rem;">
                <span class="btn-primary" :style="toast.closeTxtStyle" @click="toast.show=false">{{toast.closeTxt||'取消'}}</span>
            </div>
        </div>
        <div v-if="toast.type == 0" class="btn-close" @click="toast.show=false"></div>
    </div>
</template>
<script>
    export default {
        name: "toast",
        props: {
            toast: {
                default(){
                    return {
                        tips: '提示',
                        show: false,
                        type: 0,
                        link: '',
                        linkTxt: '确认',
                        handlerConfirm: '',
                        contentStyle:null,
                        tipsStyle:null,
                        closeTxtStyle: null
                    }
                }
            }
        },
        data(){
            return{
            }
        }
    }
</script>
<style scoped lang='less'>
    .toast{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background-color: rgba(0,0,0,.6);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .content{
            background-color: white;
            width: 3.96rem;
            padding: .6rem .4rem;
            border-radius: .2rem;
            position: relative;
            .toast-tips{
                text-align: left;
                line-height: .46rem;
            }
            .btn-close-gray{
                width: 0.2rem;
                height: 0.2rem;
                background: url('../../assets/imgs/icon_close.png') center/100% no-repeat;
                position: absolute;
                top: .2rem;
                right: .2rem;
            }
            .btn-gotolink{
                display: inline-block;
                padding: .12rem .28rem;
                background-color: #f97637;
                font-size:.36rem;
                font-weight:400;
                line-height:.46rem;
                color: white;
                margin-top: .6rem;
            }
            .btns-confirm{
                .confirm{
                    display: inline-block;
                    margin-left: .25rem;
                    width: 1.98rem;
                    height: .59rem;
                    line-height: .59rem;
                    color: white;
                    background-color: #fc7074;
                }
                .cancel{
                    display: inline-block;
                    width: 1.98rem;
                    height: .59rem;
                    line-height: .59rem;
                    color: white;
                    background-color: #dadada;
                }
            }
            .btn-primary{
                color: white;
                background: #fc7074;
                padding: .1rem .3rem;
            }
        }
        .btn-close{
            width: .83rem;
            height: .83rem;
            background: url('../../assets/imgs/custompage/1/btn_close.png') center/100% no-repeat;
            margin-top: .34rem;
        }
    }
    .toast.type2 .content{
        width: 4.21rem;
        padding: .6rem .29rem;
    }
</style>