<template>
    <!-- 单选框 -->
    <div id="back-home" :style="{display:sysInfo.channel=='st'?'none':'flex'}">
        <router-link to="/home" class="back-home-icon">
            <img class="back-home-img" src="@imgs/back_home.png" alt="">
        </router-link>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'backhome',
        computed:{
            ...mapState([
                "sysInfo"
            ])
        }
    }
</script>

<style scoped lang="less">
    #back-home{
        position: fixed;
        left: 0;
        bottom: 2.18rem;
        font-size: 0;
        .back-home-icon{
            display: inline-block;
            vertical-align: top;
            .back-home-img{
                width: 1.2rem;
                height: .6rem;
            }
        }
    }
</style>