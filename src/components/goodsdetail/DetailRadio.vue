<template>
    <!-- 单选框 -->
    <div id="detail-radio">
        <div class="radio-title">{{radioObj.title}}</div>
        <van-radio-group class="radio-select" v-model="radio" @change="changeRadio()">
            <van-radio :disabled="item.disable" v-show="!item.hidden"
                v-for="item in radioObj.list" :key="item.index"
                :name="item.value">
                <div class="radio-font" v-for="label in item.label" :key="label.index">{{label}}</div>
            </van-radio>
        </van-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'detailradio',
        props: {
            radioObj: Object,
        },
        data() {
            return {
                radio: this.radioObj.value
            };
        },
        mounted() {
            
        },
        methods: {
            changeRadio() {
                this.radioObj.value = this.radio;
                this.$emit('change', this.radio, this.radioObj);
            }
        },
    }
</script>

<style lang="less">
    #detail-radio{
        .radio-title{
            text-align: left;
            font-size: .28rem;
        }
        .radio-font{
            padding: 0 .48rem;
        }
        // radio样式重写
        .radio-select{
            margin-top: .2rem;
            text-align: left;
            font-size: 0;
            .van-radio{
                display: inline-block;
                min-width: 2.16rem;
                font-size: .24rem;
                text-align: center;
                position: relative;
                margin-right: .16rem;
                margin-bottom: .26rem;
            }
            // .van-radio:nth-child(3n){
            //     margin-right: 0;
            // }
            .van-radio:last-child{
                margin-right: 0;
            }
            .van-radio__icon{
                opacity: 0;
                position: absolute;
                top: 0;
            }
            .van-radio__label{
                display: inline-block;
                min-width: 2.16rem;
                margin-left: 0;
                padding: .19rem 0;
                background: #F5F7FA;
                border-radius: .1rem;
                line-height: .3rem;
            }
            .van-radio__icon--checked+.van-radio__label{
                background: #E6EEFF;
                // color: #FFF;
            }
        }
    }
</style>