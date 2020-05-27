<template>
    <!-- 蒙版 -->
    <div id="overlay-box">
        <div class="overlay-wrap"></div>
        <div class="overlay-con">
            <div class="overlay-title">{{OverlayObj.title}}</div>
            <slot></slot>
            <div class="overlay-btn-wrap">
                <div class="overlay-btn"
                    v-for="item in OverlayObj.btnList" :key="item.index"
                    @click="item.func"
                    :class="[item.type == 'submit' ? 'overlay-btn-submit' : 'overlay-btn-cancel']">
                    {{item.label}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            OverlayObj: Object,
        }
    }
</script>

<style scoped lang="less">
    #overlay-box{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100vh;
        .overlay-wrap{
            position: fixed;
            top: 0;
            width: 100%;
            height: 100vh;
            background: #000;
            opacity: .3;
            z-index: 9999;
        }
        .overlay-con{
            position: fixed;
            top: 1.14rem;
            left: 50%;
            margin-left: -3.4rem;
            width: 6.8rem;
            background: #FFF;
            z-index: 10000;
            border-radius: .1rem;
            padding: .4rem 0 .6rem;
            .overlay-title{
                font-size: .36rem;
            }
            .overlay-btn-wrap{
                width: 100%;
                text-align: center;
                .overlay-btn{
                    display: inline-block;
                    vertical-align: top;
                    width: 2.8rem;
                    height: .7rem;
                    line-height: .7rem;
                    border-radius: 1rem;
                    border: 1px solid #6696FF;
                    transition: opacity .2s;
                    &:active{
                        opacity: .8;
                    }
                }
                .overlay-btn-cancel{
                    color: #6696FF;
                }
                .overlay-btn-submit{
                    background: #6696FF;
                    color: #FFF;
                }
                .overlay-btn:nth-child(even){
                    margin-left: .2rem;
                }
            }
        }
    }
</style>