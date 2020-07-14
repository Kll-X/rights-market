<template>
    <div class="appcard">
        <div class="icon">
            <img class="icon-img" :src="info.icon" alt="">
        </div>
        <div class="content">
            <div class="title">{{info.showname||info.name}}</div>
            <div class="price">
                <div class="price-origin line-through">原价:{{parseFloat(info.originprice/100)}}元</div>
                <div class="price-current">限时<br/>{{parseFloat(info.price/100)}}元</div>
            </div>
        </div>
        <div class="date">
            <div>活动限时</div>
            <div>{{info.date}}</div>
        </div>
        <div class="btn-order-wrapper">
            <div class="btn-order" :class="info.exist?'ordered':''" @click="order">
                
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "appcard4",
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
        position: relative;
        display: flex;
        flex-direction: column;
        width: 2.21rem;
        height: 2.88rem;
        background:url('../../assets/imgs/custompage/2/app_crazy.png') no-repeat center/100%;
        .icon {
            position: absolute;
            right: .13rem;
            top: .47rem;
            transform: rotate(30deg);
            .icon-img{
                width: .25rem;
                height: .25rem;
            }
        }
        .content{
            .title{
                padding-left: .08rem;
                padding-top: .17rem;
                font-size:.19rem;
                color:#ffe851;
                text-align: left;
            }
            .price{
                text-align: center;
                margin-top: .05rem;
                .price-current{
                    padding-top: .1rem;
                    font-size:.3rem;
                    color:white;
                    font-style: italic;
                    font-weight: bold;
                    line-height: .4rem;
                }
                .price-origin{
                    font-size:.15rem;
                    color:white;
                }
            }
        }
        .date{
            color: white;
            font-size: .16rem;
            margin-top: .17rem;
            line-height: .23rem;
            font-weight: bold;
        }
        .btn-order-wrapper{
            display: flex;
            justify-content: center;
            margin-top: .15rem;
            .btn-order{
                width: 1.7rem;      
                height: .4rem;
                background: url('../../assets/imgs/custompage/2/btn_order.png') no-repeat center/100%;
            }
            .btn-order.ordered{
                
            }
        }
    }
    .line-through{
        text-decoration:line-through;
    }
</style>