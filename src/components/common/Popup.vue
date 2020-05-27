<template>
    <div class="popup" :style="{'background-color':mask?'rgba(0,0,0,.6)':''}">
        <div class="content">
            <div class="title" :style="{fontSize: content?'.36rem':'.32rem'}">{{title}}</div>
            <div class="txt" v-if="content">{{content}}</div>
            <div :class="{'btns':true,'unique':btns.length == 1}">
                <div class="btn" :style="btn.style?btn.style:''" v-for="btn in btns" @click="btn.handler" :key="btn.title">{{btn.txt}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import messageBus from "@/utils/messageBus";
    export default {
        name: "popup",
        props: {
            mask: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: '提示'
            },
            content: {
                type: String,
                default: ''
            },
            btns: {
                type: Array,
                default: function () {
                    return [
                        {
                            txt: '取消',
                            handler: function () {
                                messageBus.$emit('msg_showPopup',false)
                            }
                        },{
                            txt: '确认',
                            handler: function () {
                                console.log('确认')
                            }
                        }
                    ]
                }
            }
        },
        data: function () {
            return {
            }
        },
        watch: {
            '$route' () {
                messageBus.$emit('msg_showPopup',false)
            }
        }
    }
</script>

<style scoped lang="less">
.popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    .content{
        position: absolute;
        top: 4.7rem;
        left: .85rem;
        background-color: white;
        width: 5.8rem;
        padding: .7rem .4rem .4rem .4rem;
        box-sizing: border-box;
        border-radius: .16rem;
        .title{
            font-size: .36rem;
        }
        .txt{
            padding: .4rem .2rem 0 .2rem;
            font-size: .32rem;
            font-weight:400;
            color:rgba(56,58,63,1);
        }
        .btns{
            display: flex;
            justify-content: space-between;
            margin-top: .6rem;
            .btn{
                width: 2.4rem;
                height: .7rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .32rem;
                box-sizing: border-box;
                border-radius: .35rem;
            }
            .btn:nth-child(1){
                color: #6696FF;
                border: 2px solid #6696FF;
            }
            .btn:nth-child(2){
                background-color: #6696FF;
                color: white;
            }
        }
        .btns.unique{
            justify-content: center;
            .btn{
                background-color: #6696FF;
                color: white;
            }
        }
    }
    /*.mask{*/
        /*background-color: #000000;*/
        /*opacity: .6;*/
        /*width: 100%;*/
        /*height: 100%;*/
    /*}*/
}
</style>