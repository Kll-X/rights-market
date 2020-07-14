<template>
    <div class="activity-card" @click.stop="jump(info.linkurl)" :style="{backgroundImage:'url('+Common.getImgUrl(info.icon)+')'}">
         <div class="activities-tag-icon" :style={background:subscriptBgColor}>{{info.subscript?info.subscript.split("#")[0]:''}}</div>
         <div class="activities-num2-bottom">
            <div class="act-name">{{info.name}}</div>
            <div class="act-date"><span class="act-date-space">活动日期</span>{{info.activitystarttime + '-' + info.activityendtime }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "activity-card",
        props:["info"],
        methods:{
            jump(link){
                if(!navigator.onLine){
                    this.$toast('网络异常,请连接后重试！');
                    return;
                }
                window.location.href = link;
            }
        },
        computed:{
            subscriptBgColor() {
                return this.info.subscript?"#" + this.info.subscript.split("#")[1]:'';
            }
        }
    }
</script>

<style lang="less" scoped>
    .activity-card{
        width: 6.8rem;
        height: 4.4rem;
        margin-left: .35rem;
        background-size: contain;
        margin-top: .24rem;
        position: relative;
        border-radius: .16rem;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .activities-tag-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        width: .86rem;
        height: .56rem;
        margin-top: .3rem;
        margin-right: -0.06rem;
        float: right;
        border-top-left-radius: 0.4rem;
        border-bottom-left-radius: 0.4rem;
        font-size: .2rem;
        color:white;
    }
    .activities-num2-bottom{
        display: flex;
        text-align: left;
        flex-direction: column;
        background: url("../../assets/imgs/activity/pic-shadow.png") center/100% no-repeat;
        width: 6.8rem;
        height: 1rem;
        position: absolute;
        bottom: 0;
        color: #ffffff;
        border-bottom-left-radius: .16rem;
        border-bottom-right-radius: .16rem;
    }
    .act-name{
        float: left;
        margin-left: .24rem;
        margin-bottom: .12rem;
        margin-top: .2rem;
        font-size: .28rem;
        line-height: 100%;
    }
    .act-date{
        height: .23rem;
        font-size: .24rem;
        float: left;
        line-height: 100%;
        margin-bottom: .18rem;
    }
    .act-date-space{
        margin-right: .1rem;
        margin-left: .25rem;
    }

</style>


