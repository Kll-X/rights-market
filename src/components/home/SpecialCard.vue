<template>
    <div class="special-card" @click.stop="jump(info.linkurl)">
        <img class="img" :src="Common.getImgUrl(info.icon)" alt="">
    </div>
</template>

<script>
    export default {
        name: "special-card",
        props:["info"],
        methods:{
            jump(linkurl){
                window.location.href = linkurl
            }
        }
    }
</script>

<style lang="less" scoped>
    .special-card{
        position: relative;
        width: 3.3rem;
        height: 1.6rem;
        color: rgba(255,255,255,0.9);
        .img{
            position: absolute;
            left: 0;
            top:0;
            width: 3.3rem;
            height: 1.6rem
        }
        .pay-plan{
            font-size: 0.18rem;
            position: absolute;
            right:0.1rem;
            top:0.28rem;
        }
        .desc{
            font-size: 0.22rem;
            position: absolute;
            top:0.74rem;
            text-align: left;
            padding:0 0.22rem 0 0.28rem;
        }
    }
</style>