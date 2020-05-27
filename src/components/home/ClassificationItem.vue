<template>
    <div class="classification-item" @click.stop="jump">
        <div class="img-wrapper">
            <img :src="item.img" alt="">
        </div>
        <div class="title">{{item.title}}</div>
    </div>
</template>

<script>
    import messageBus from "@/utils/messageBus";
    import { mapState } from 'vuex';


    export default {
        name: "classification-item",
        props:['item'],
        computed:{
            ...mapState([
                "userInfo" 
            ])
        },
        methods:{
            jump(){
                if(this.item.rights == 'getRights'){
                    // 先判断是否登录
                    if(this.userInfo.phone){
                        this.$router.push({name:'getRights'})
                    }else{
                        messageBus.$emit('msg_checkLogin','init')
                    }
                }else{
                    this.$router.push({name: 'sort', params: {type:this.item.id}})
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .classification-item{
        .img-wrapper{
            text-align: center;
            display: block;
            width:1.07rem;
            height: 1rem;
            img{
                max-width:100%;
                max-height:100%;
            }
        }
        .title{
            font-size: 0.27rem;
            padding-top: 0.3rem
        }
    }
</style>