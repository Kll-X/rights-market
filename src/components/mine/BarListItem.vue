<template>
    <div class="bar-list-item" :class="info.underline?'underline':''" @click="gotoMyorder">
        <div class="icon" :style="bgImg"></div>
        <div class="txt">{{info.txt}}</div>
        <div class="num">{{info.num }}</div>
        <img src="@imgs/btn_more@2x.png" alt="" class="arrow">
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import messageBus from "@/utils/messageBus";

    export default {
        name: "bar-list-item",
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
            gotoMyorder(){
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
.bar-list-item{
    width: 100%;
    display: flex;
    align-items: center;
    height: 1rem;
    padding: 0 .4rem;
    box-sizing: border-box;
    position: relative;
    background-color: white;
    .icon{
        background: center/contain no-repeat;
        width: .37rem;
        height: .48rem;
        margin-right: .3rem;
    }
    .txt{
        flex-grow: 1;
        text-align: left;
        font-size: .32rem;
    }
    .num{
        color: #bdbfc2;
        font-size: .28rem;
    }
    .arrow{
        width: .1rem;
        height: .17rem;
        margin-left: .2rem;
    }
}
.underline:after{
    content: '';
    display: block;
    width: 90%;
    height: 1px;
    background-color: #e8e8e8;
    position: absolute;
    bottom: 0;
}
</style>
