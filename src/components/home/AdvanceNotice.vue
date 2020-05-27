<template>
  <div class="advance-notice">
            <div class="left">
                <span class="advance-title">{{advance.title}}</span>
                <span class="advance-time">{{advance.arr[current].time}}</span>
            </div>
            <div class="right">
                <div class="wrapper">
                <router-link tag='img' :src="item.img" v-for="(item,i) in advance.arr" :key="i" :style="{transform:'translateX(' + (-0.9 * current) + 'rem)'}" :class="{'sport':sport,'advance-slide':true,'advance-first':i == current,'advance-other': i != current }" :to="'sort?id='+item.id"></router-link>
                </div>
            </div>
        </div>
</template>

<script>
  export default {
    name: 'advance-notice',
    data() {
      return {
        timer:null,
        current:0,
        sport:1,
        advance:{
            title:'下期预告',
            arr:[
                {id:'0',img:require('@imgs/home/advance0.png'),time:'3月1日 中午12点开抢'},
                {id:'1',img:require('@imgs/home/advance1.png'),time:'4月2日 中午12点开抢'},
                {id:'2',img:require('@imgs/home/advance2.png'),time:'5月3日 中午12点开抢'},
                {id:'0',img:require('@imgs/home/advance0.png'),time:'3月1日 中午12点开抢'},
                {id:'1',img:require('@imgs/home/advance1.png'),time:'4月2日 中午12点开抢'},
                {id:'2',img:require('@imgs/home/advance2.png'),time:'5月3日 中午12点开抢'}
            ]
        }
      }
    },
    mounted() {
        let self = this;
      self.timer = setInterval(()=>{
          self.sport=1;
          self.current ++;
          if(self.current == 3){
              setTimeout(()=>{
                self.sport=0;
                self.current  = 0;
              },500);
          }
      },3000)
    
    },
    beforeDestory(){
        let self = this;
        clearInterval(self.timer);
        this.timer = null
    },
  }
</script>
<style lang="less" scoped>
.advance-notice{
    height: 1rem;
    padding:0.44rem 0.35rem 0rem 0.29rem;
    display: flex;
    justify-content: space-between;
    .left{
        text-align: left ;
        display: flex;
        flex-direction: column;
        .advance-title{
            font-size: 0.28rem;font-weight: bold;color:#5e5c62;margin-top: 0.1rem
        }
        .advance-time{
            font-size: 0.25rem;color:#5e5c62;
            margin-top: 0.11rem;
        }
    }
    .right{
        width: 2.9rem;
        overflow: hidden;
        position: relative;
        .wrapper{
            width: 5.8rem;
            height: 1rem;
            display: flex;
            align-items: flex-end;
            .sport{
                transition: all 0.4s linear
            }
            .advance-slide{
                margin-left: 0.1rem;
            }
            .advance-first{
                width:1rem;
                height:1rem;
            }
            .advance-other{
                width:0.8rem;
                height:0.8rem;
            }
        }
    }
}
</style>