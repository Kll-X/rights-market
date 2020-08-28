<template>
    <div :class="{'guide-headline':true,'half':half}" :style="{paddingTop:info.name=='权益领取'?'0.3rem':'0.5rem'}">
        <div class="name">
            <div class="txt">{{info.name}}</div> 
            <img v-show="vip" class="vip_tip" src="@imgs/vip_tip.png" alt="">
            <img v-show="half" class="half_tip" src="@imgs/half_tip.png" alt="">
            <img v-show="limit" class="limit_tip" src="@imgs/limit_tip.png" alt="">
        </div>
        <router-link  v-if="info.id"  @click.native="blocklogHandler(info.blockName,info.blockId,info.positionId)" class="link" tag='div'  :to="info.path?info.path:{name: 'sort', params: {type:info.id}}">
            <span style="padding-right:0.1rem">{{info.moreDesc?info.moreDesc:'更多'}}></span>
        </router-link>

        <div v-if="+info.activityStatus === 1 && left_h " class="link">
            <span style="border-radius:0.04rem;margin-right:0.02rem;padding:0.02rem 0.05rem;background:#FD7028;color:#fff">{{left_h}}</span>:
            <span style="border-radius:0.04rem;margin-right:0.02rem;padding:0.02rem 0.05rem;background:#FD7028;color:#fff">{{left_mm}}</span>:
            <span style="border-radius:0.04rem;margin-right:0.10rem;padding:0.02rem 0.05rem;background:#FD7028;color:#fff">{{left_s}}</span>
            <span>后结束</span>
        </div>
        <div v-else-if="+info.activityStatus === 0 && start_m " class="link">
            <span style="padding:0.02rem 0.05rem;color:#FD7028;font-weight:bold">{{start_m+'月'+start_d+'日 '+start_h+':'+start_mm}}</span>
            <span>开始秒杀</span>
        </div>
        <div v-else-if="+info.activityStatus === 2 " class="link">
            <span>秒杀已结束</span>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import messageBus from "@/utils/messageBus";
    import { blocklogMixin } from "@/mixins/log"

    export default {
        name: "guide-headline",
        props:['info','vip','half','limit'],
        mixins:[blocklogMixin],
        computed:{
            ...mapState([ 
                "sysInfo"
            ])
        },
        data(){
            return{
                timer:null,
                left_h:'',
                left_mm:'',
                left_s:'',
                start_m:'',
                start_d:'',
                start_h:'',
                start_mm:'',
                start_s:''
            }
        },
        created(){
            this.getSecKillMoreDesc();
            this.timer =  setInterval(() => {
                this.getSecKillMoreDesc()
            }, 1000);



        },
        methods:{
            add0(m){return m<10?'0'+m:m+'' },
            getOweTime(){//获取距离活动开始时间
                let time = new Date(this.info.startTime);
                let m = time.getMonth()+1;
                let d = time.getDate();
                let h = time.getHours();
                let mm = time.getMinutes();
                let s = time.getSeconds();
                this.start_m=m;
                this.start_d=this.add0(d);
                this.start_h=this.add0(h);
                this.start_mm=this.add0(mm);
                this.start_s=this.add0(s);
            },
            getLeftTime(){

                let time=new Date(this.info.endTime).getTime()-(new Date().getTime() + this.sysInfo.interval);  //时间差的毫秒数


                //计算出相差天数
                let d=Math.floor(time/(24*3600*1000));

                //计算出小时数

                let leave1=time%(24*3600*1000);    //计算天数后剩余的毫秒数
                let h = d * 24 + Math.floor(leave1/(3600*1000));
                //计算相差分钟数
                let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
                let mm=Math.floor(leave2/(60*1000));


                //计算相差秒数
                let leave3=leave2%(60*1000) ;     //计算分钟数后剩余的毫秒数
                let s=Math.round(leave3/1000);

                this.left_s = this.add0(s);
                this.left_mm = this.add0(mm);
                this.left_h = this.add0(h);
            },
            getSecKillMoreDesc(){
                if(+this.info.activityStatus === 1 ){
                    if((new Date().getTime() + this.sysInfo.interval) > new Date(this.info.endTime).getTime()){//已结束
                        messageBus.$emit('msg_setSeckillActivityStatus',2);
                    }else{
                        this.getLeftTime()
                    }
                }else if(+this.info.activityStatus === 0 ){
                    if((new Date().getTime() + this.sysInfo.interval) < new Date(this.info.startTime).getTime()){//未开始
                        this.getOweTime()
                    }else{
                        messageBus.$emit('msg_setSeckillActivityStatus',1);
                    }
                }
            }
        },
        beforeDestroy(){
            clearInterval(this.timer);
            this.timer = null
        }
    }
</script>

<style lang="less" scoped>
    .guide-headline{
            padding:0.5rem 0 0.2rem;
            margin-bottom: 0.1rem;
            display: flex;
            display: -webkit-flex; 
            justify-content: space-between;
            -webkit-justify-content: space-between;
            align-items: center;
            .name{
                font-size: 0.32rem;
                font-weight: bold;
                color: #333;
                display:flex;
                display: -webkit-flex; 
                .txt{
                    color: #343434;
                    white-space: nowrap;  /*禁止换行*/
                }
                .vip_tip,.half_tip,.limit_tip{
                    display: block;
                    font-size: 0;
                    height:0.34rem;
                    margin-left:0.12rem;
                    margin-top:0.06rem;
                }
            }
            .link{
                font-size: 0.24rem;
                color: #9A9A9A;

            }
        }
        .half.guide-headline{
            padding-bottom: 0rem;
        }
</style>