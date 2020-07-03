<template>
    <div class="appcard">
        <div class="icon">
            <img class="icon-img" :src="info.icon" alt="">
        </div>
        <div class="content">
            <div class="title">{{info.title}}</div>
            <div class="price">
                <span class="price-current">抄底价:{{parseFloat(info.currentPrice/100)}}元</span>
                <span class="price-origin">（<span class="line-through">原价:{{parseFloat(info.originPrice/100)}}元</span>）</span>
            </div>
        </div>
        <div class="btn-order-wrapper">
            <div class="btn-order" :class="info.exist?'ordered':''" @click="order">
                订购
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "appcard3",
        props: ['info'],
        data(){
            return{
            }
        },
        methods: {
            order() {
                if (this.info.exist) {
                    this.$emit('showToast',{
                        tips: '&nbsp;&nbsp;&nbsp;&nbsp;活动期间，同款权益只能购买一次，您可选择其他权益购买，详情参考活动说明。',
                        type: 0
                    })
                } else {
                    this.$emit('order',this.info)
                }
            }
        }
    }
</script>
<style scoped lang='less'>
    .appcard{
        display: flex;
        padding: .25rem;
        margin-bottom: .22rem;
        border-radius: .1rem;
        width: 5.75rem;
        height: .84rem;
        background-color: white;
        .icon {
            .icon-img{
                width: .89rem;
                height: .89rem;
            }
        }
        .content{
            padding-left: .2rem;
            width: 3.76rem;
            .title{
                font-size:.3rem;
                font-family:'FZZDHJW--GB1-0';
                font-weight:bold;
                color:rgb(53,53,53);
                text-align: left;
            }
            .price{
                text-align: left;
                margin-top: .08rem;
                .price-current{
                    font-size:.24rem;
                    font-family:'FZZDHJW--GB1-0';
                    font-weight:bold;
                    color:rgba(255,138,0,1);
                }
                .price-origin{
                    font-size:.24rem;
                    font-family:'FZHTJW--GB1-0';                            
                    font-weight:400;
                    color:rgb(53,53,53);
                }
            }
        }
        .btn-order-wrapper{
            display: flex;
            align-items: center;
            .btn-order{
                border: 1px solid #FF8A00;
                color: #FF8A00;
                border-radius: .1rem;
                font-size: .24rem;
                width: .92rem;      
                height: .38rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .btn-order.ordered{
                color:#999999;
                border: 1px solid #999999;
            }
        }
    }
    .line-through{
        text-decoration:line-through;
    }
</style>