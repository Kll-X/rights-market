<template>
    <div>
        <guide-headline :info="guide" :vip="true"></guide-headline>
        <div class="vip-list">
            <app-card1 v-for="(item,j) in vipApps" :key="j" :info="item" :css-type="1" @click.native="blocklogHandler('会员优惠购','0011',(j<9?'000'+(j+1):'00'+(j+1)),'',item.mid,item.name)"></app-card1>
            <!--<app-card1 v-for="(item,j) in vipApps" :key="j" :info="item" :index="j" :vip="true"  @click.native="blocklogHandler('会员优惠购','0011',(j<9?'000'+(j+1):'00'+(j+1)),'',item.mid,item.name)"></app-card1>-->
        </div>
    </div>
</template>

<script>
    import GuideHeadline from '@/components/home/GuideHeadline.vue'; 
    import AppCard1 from '@/components/common/AppCard.vue';
    import { blocklogMixin } from "@/mixins/log"

    export default {
        name: "vip-buy",
        props:["guide","vipApps"],
        mixins:[blocklogMixin],
        created(){
            // 曝光统计：会员优惠购
            this.blocklogHandler('会员优惠购','0011','');
        },
        components:{
            GuideHeadline,
            AppCard1
        },
        computed:{
            name(){
                if(this.info.name.length > 8){
                    return this.info.name.substring(0, 7) + '...'
                }else{
                    return this.info.name
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    .vip-list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap
    }
</style>