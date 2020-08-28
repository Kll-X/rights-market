<template>
    <div class="get-rights">
        <div class="card" v-for="(right,i) in rights" :key=i @click.stop="jump(right.link, i)">
            <img class="card-img" :src="right.img" alt="">
        </div>
        <!-- 底部菜单栏 -->
        <Menu></Menu>
    </div>
</template>

<script>
    import Menu from '@/components/common/Menu.vue'
    import { pagelogMixin,blocklogMixin } from "@/mixins/log"

    export default {
        name: "get-rights",
        mixins: [pagelogMixin,blocklogMixin],
        data(){
            return {
                rights:[
                    {
                        img:require('@imgs/getrights/getrights0.png'),
                        link:'https://rwk.cmicrwx.cn/rwx/rwkvue/contractyoung/#/?channelType=newSpring&channelId=C10000034918'
                    }
                ]
            }
        },
        components:{
            Menu
        },
        methods:{
            jump(link, index){
                let str = '0000' + (index + 1);
                str = str.substring(str.length - 4);
                this.blocklogHandler("领权益",'0019',str)
                window.location.href = link
            }
        }
    }
</script>

<style lang="less" scoped>
    .get-rights{
        position: relative;
        padding-bottom: 1.09rem;
        background:rgba(245,247,250,1);
        box-sizing: border-box;
        min-height: 100vh;
        .card{
            margin: 0 auto;
            .card-img{
                width: 7.03rem;
                height:4.63rem;
            }   
        }
    }
</style>