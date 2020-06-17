<template>
    <div class="classification-item2" @click.stop="jump">
        <div class="inner">
            <div class="img-wrapper">
            <img :src="item.img" alt="" :style="{height:item.h?item.h:'auto'}">
            </div>
            <div class="title">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
    import messageBus from "@/utils/messageBus";
    import { mapState } from 'vuex';


    export default {
        name: "classification-item2",
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
                    // this.$router.push({name: 'sort', params: {type:this.item.id}})
                    window.location.href = this.item.linkurl
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .classification-item2{
        width:1.7rem;
        background: rgba(0.0.0,2);
        float: left;
        display: flex;
        justify-content: center;
        .img-wrapper{
            text-align: center;
            display: block;
            height:0.78rem;
            img{
                max-width:100%;
                max-height:100%;
            }
        }
        .title{
            font-size: 0.27rem;
            padding-top: 0.09rem;
            white-space: nowrap;  /*禁止换行*/
        }
    }
</style>