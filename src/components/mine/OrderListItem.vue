<template>
    <div class="order-list-item" @click="gotoMyorder(info.idx)">
        <div class="icon" :style="bgImg"></div>
        <div class="txt">{{info.txt}}</div>
        <div class="num">{{info.num }}</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { blocklogMixin } from "@/mixins/log"
    import messageBus from "@/utils/messageBus";

    export default {
        name: "order-list-item",
        mixins:[blocklogMixin],
        data(){
            return {
                bgImg: 'background-image: url("'+ this.info.icon+'")'
            }
        },
        props: {
            info: {
                type: Object,
                required: true
            }
        },
        computed:{
            ...mapState([
                "userInfo"
            ])
        },
        methods:{
            gotoMyorder(idx){
                this.blocklogHandler('我的订单','0027','000'+(idx+1));
                if(this.userInfo.phone){
                    this.$router.push({path: this.info.path})
                }else{
                    messageBus.$emit('msg_checkLogin','init');
                }
            }
        }
    }
</script>

<style scoped lang="less">
.order-list-item{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 .4rem;
    background-color: white;
    .icon{
        background: center/100% no-repeat;
        width: .68rem;
        height: .87rem;
    }
    .txt{
        text-align: center;
        font-size: .26rem;
        color:#383A3F;
        margin-top: .2rem;
    }
    .num{
        color: #bdbfc2;
        font-size: .28rem;
    }
}
</style>
