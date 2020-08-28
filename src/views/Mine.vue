<template>
  <div class="mine-page">
    <NavTab></NavTab>
    <div class="top-wrap" :class="userInfo.vipInfo?'vip':userInfo.newStarVipInfo?'newStarVip':''">
      <div class="userInfoBox">
        <img class="img-avatar" :src="userInfo.phone?userInfo.avatar:require('@imgs/avatar_st1@2x.png')" alt="">
        <div class="phone-area">
          <div class="phone">
            {{userInfo.phoneMask?'你好，'+userInfo.phoneMask:'游客用户'}}
            <img v-if="userInfo.vipInfo || userInfo.newStarVipInfo" class="crown" src="@imgs/mine/crown.png">
          </div>
          <div class="phone-tips">
            <span v-if="userInfo.phone">{{userInfo.vipInfo?'黄金会员用户':userInfo.newStarVipInfo?'新星会员用户':'升级为黄金会员，享海量专属福利'}}</span>
            <span v-if="!userInfo.phoneMask" class="gotoLogin" @click="gotoLogin">点击登录购权益 <img class="gotoLogin-img" src="@imgs/mine/arrow_white.png" alt="" srcset="">
            </span>
          </div>
        </div>
      </div>

      <div class="card-area" :class="userInfo.vipInfo?'vip':''">
        <span v-if="userInfo.vipInfo&&!+userInfo.vipInfo.cancelFlag" class="vip-card-right">连续包月中</span>
        <span v-if="userInfo.vipInfo&&+userInfo.vipInfo.cancelFlag" class="vip-card-right" >有效期至 {{userInfo.vipInfo.expireTime | timeFormat}}</span>
        <span v-if="!userInfo.vipInfo&&!userInfo.newStarVipInfo" class="card-right" @click="placeVipOrder()">
          <img class="order-btn" src="@imgs/mine/new/btn_opennow.png" alt="" srcset="">
        </span>
        <span v-if="!userInfo.vipInfo&&userInfo.newStarVipInfo" class="vip-card-right-upgrade">连续包月中</span>
        <!-- <span v-if="!userInfo.vipInfo&&userInfo.newStarVipInfo&&+userInfo.newStarVipInfo.cancelFlag" class="vip-card-right" >有效期至 {{userInfo.newStarVipInfo.expireTime | timeFormat}}</span> -->
        <span v-if="!userInfo.vipInfo&&userInfo.newStarVipInfo" class="card-right-upgrade" @click="placeVipOrder()">
          <img class="order-btn" src="@imgs/mine/btn_upgrade.png" alt="" srcset="">
        </span>
      </div>
    </div>

    <div class="my-list">
      <div class="my-list-title">我的订单</div>
      <div class="my-list-item" v-for="item in myList" :key="item.id" @click="gotoMyOrder(item)">
        <div class="item-content">
          <div class="item-left">
            <img class="item-icon" :src="item.icon" alt="" srcset="">
            <span class="title">{{item.title}}</span>
          </div>
          <img class="item-right" src="@imgs/mine/new/arrow_grey.png" alt="" srcset="">
        </div>
        <van-divider />
      </div>
    </div>

    <div class="my-list" :class="userInfo.vipInfo?'vip':''">
      <div class="my-list-title">更多功能</div>
      <div class="my-list-item" v-for="item in moreList" :key="item.id" @click="gotoMore(item)">
        <div class="item-content">
          <div class="item-left">
            <img class="item-icon" :src="item.icon" alt="" srcset="">
            <span class="title">{{item.title}}</span>
          </div>
          <img class="item-right" src="@imgs/mine/new/arrow_grey.png" alt="" srcset="">
        </div>
        <van-divider />
      </div>
    </div>
    <div v-show="userInfo.phone && sysInfo.channel != 'st'" class="exitLogin" @click.stop="exitLogin">退出登录</div>
    <SecondConfirmBuy :info="SecondConfirmInfo"></SecondConfirmBuy>
  </div>
</template>

<script>
import { queryOrderCount, myManager } from '@/api/mine'
import { getData } from "@/api/home"
import { mapState, mapMutations } from 'vuex'
import messageBus from "@/utils/messageBus"
import { VIPORDER } from '@/utils/constant';
import { getBanner } from '@/utils/func'
import { pagelogMixin, blocklogMixin } from "@/mixins/log"
import NavTab from '@/components/home/navTab.vue'
import SecondConfirmBuy from '@/components/common/SecondConfirmBuy'

export default {
  name: "mine",
  mixins: [pagelogMixin, blocklogMixin],
  components: {
    NavTab,
    SecondConfirmBuy
  },
  data() {
    return {
      bannerList: [
      ],
      halfApps: [],
      vipApps: [],
      loading: false,
      finished: true,
      myList: [
        {
          id: 0,
          title: '全部订单',
          icon: require('@imgs/mine/new/icon0.png'),
          path:'/myOrder/all'
        },
        {
          id: 1,
          title: '交易中订单',
          icon: require('@imgs/mine/new/icon1.png'),
          path:'myOrder/trading'
        },
        {
          id: 2,
          title: '已成功订单',
          icon: require('@imgs/mine/new/icon2.png'),
          path:'myOrder/success'
        },
        {
          id: 3,
          title: '已关闭订单',
          icon: require('@imgs/mine/new/icon3.png'),
          path:'myOrder/close'
        }
      ],
       SecondConfirmInfo: {
          payShow: false,
          paydetailList: {
              price: '0',
          },
          orderObject: {
              phone: '',
              phoneMask: ''
          },
          callback:''
      },
      moreList: [
        {
          id: 0,
          title: '常见问题',
          icon: require('@imgs/mine/new/icon4.png'),
        },
        {
          id: 1,
          title: '找我合作',
          icon: require('@imgs/mine/new/icon5.png')
        }
      ]
    }
  },
  created() {
    //曝光统计：
    this.blocklogHandler('用户中心个人信息', '0025', '')
    this.blocklogHandler('专属权益入口', '0026', '')
    this.blocklogHandler('我的订单', '0027', '')
    this.blocklogHandler('常见问题入口', '0028', '')
    this.blocklogHandler('退出', '0029', '')
    this.blocklogHandler('用户中心广告位', '0030', '')
    this.bannerList = getBanner(this.bannerList, this.sysInfo.channelCode)
    getData().then((res) => {
      this.halfApps = res.data.data['108'] ? res.data.data['108'] : []
      this.vipApps = res.data.data['109'] ? res.data.data['109'] : []
    })
    if (this.bannerList.length == 0) {
      myManager().then(res => {
        if (res.data.resultCode == 0) {
          this.bannerList = res.data.data
        }
      })
    }
    if (this.userInfo.phone) {
      // queryOrderCount({
      //   channelCode: this.sysInfo.channelCode
      // }, {
      //   phone: this.userInfo.phone,
      // }).then(res => {
      //   try {
      //     if (res.data.resultCode == 0) {
      //       let data = res.data.data
      //       for (let item of data) {
      //         switch (item.status) {
      //           case -99: this.list[0].num = item.count; break
      //           case 0: this.list[1].num = item.count; break
      //           case 1: this.list[2].num = item.count; break
      //           case 2: this.list[3].num = item.count; break
      //         }
      //       }
      //     }
      //   }
      //   catch (err) {
      //     window.console.log(err)
      //   }
      // })
      messageBus.$emit('msg_getVipInfo')
    }
  },
  mounted() {
    let that = this
    messageBus.$on('msg_loginCheck', () => {
      queryOrderCount({
        channelCode: that.sysInfo.channelCode
      }, {
        phone: that.userInfo.phone,
      }).then(res => {
        try {
          if (res.data.resultCode == 0) {
            let data = res.data.data
            for (let item of data) {
              switch (item.status) {
                case -99: that.list[0].num = item.count; break
                case 0: that.list[1].num = item.count; break
                case 1: that.list[2].num = item.count; break
                case 2: that.list[3].num = item.count; break
              }
            }
          }
        }
        catch (err) {
          window.console.log(err)
        }
      })
    })
  },
  computed: {
    ...mapState([
      "userInfo",
      "sysInfo"
    ])
  },
  filters: {
      timeFormat: function (value) {
          value = value + '';
          let year = value.slice(0,4);
          let month = value.slice(4,6);
          let date = value.slice(6,8);
          return year + '-' + month + '-' + date;
      }
  },
  methods: {
    ...mapMutations([
      'SET_USERINFO'
    ]),
    exitLogin() {
      this.blocklogHandler('退出', '0029', '0001')
      messageBus.$emit('msg_showPopup', {
        flag: true,
        title: '您即将退出该账号，使用游客身份登录，是否继续?',
        mask: true,
        btns: [
          {
            txt: '取消',
            handler: () => {
              messageBus.$emit('msg_showPopup', {
                flag: false
              })
            }
          }, {
            txt: '继续退出',
            handler: () => {
              messageBus.$emit('msg_showPopup', {
                flag: false
              })
              messageBus.$emit('msg_countDown', 0)
              this.$toast('您已退出登录')
            }
          }
        ]
      })
    },
    gotoLogin() {
      this.blocklogHandler('用户中心个人信息', '0025', '0001')
      if (!this.userInfo.phone) {
        if (this.sysInfo.channel == 'st') {
          messageBus.$emit('msg_checkLogin', 'init')
        } else {
          this.$router.replace({ name: 'login' })
        }
      }
    },
    placeVipOrder() {
      // 游客--登录
      if(this.userInfo && !this.userInfo.phoneMask) {
        this.gotoLogin()
      } else {
        // 已登录--开通会员
        this.blocklogHandler('用户中心个人信息','0025','0002')
        // this.$router.push({name:'vipBenefit'})
        let that = this;
        let data = Object.assign({},VIPORDER);
        data.channelCode = that.sysInfo.channelCode;
        data.smsCode = that.subscribeSmsCode;
        data.selfChannelCode = that.sysInfo.selfChannelCode?that.sysInfo.selfChannelCode:''; //订购、退订增传selfChannelCode子段
        data.isVipOrder = true;
        let secondConfirmType = this.sysInfo.selfChannelCode == '00010017'? 1 : 0;
        this.SecondConfirmInfo = {
            payShow: true,
            paydetailList: data,
            type: secondConfirmType,
            orderObject: {
                phone: that.userInfo.phone,
                phoneMask: that.userInfo.phoneMask
            },
            callback:res =>{
                if (res.resultCode == 0) {
                    //订购成功，关闭底部弹窗
                    that.SecondConfirmInfo.payShow = false;
                    for(let i=1;i<25;i++){
                        setTimeout(()=>{
                            if (!that.userInfo.vipInfo) {
                                messageBus.$emit('msg_getVipInfo');
                            }
                        },i*5000)
                    }
                    that.$toast({message: '订单已受理，开通结果以短信为准', duration: 4000,onClose:()=>{
                        that.$router.push({name: 'myOrder', params: {type:'all'}});
                    }});
                }
                // else{
                //     that.$toast({message: '订购失败', duration: 4000});
                // }
                else if(res.resultCode == -1 && res.data.code == -1) {
                    that.$toast({message: '请输入正确的验证码哦', duration: 4000});
                } else if(res.resultCode == -102) {
                    that.$toast({message: '订购异常,请稍后重试!', duration: 4000});
                } else if(res.resultCode == -117) {
                    that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                } else if(res.resultCode == -116) {
                    that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                } else if(res.resultCode == -113) {
                    that.$toast({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                } else if(res.resultCode == -118) {
                    that.$toast({message: res.msg, duration: 4000});
                } else if(res.resultCode == -112) {
                    that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                } else if(res.resultCode == 4) {
                    that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                } else {
                    that.$toast({message: res.msg, duration: 4000});
                }
            }
        };
      }
    },
    upgradeVip(){
      console.log('upgrade')
    },
    gotoMyOrder(item) {
      this.blocklogHandler('我的订单','0027','000'+(item.id+1))
      if(this.userInfo.phone){
          this.$router.push({path: item.path})
      }else{
          messageBus.$emit('msg_checkLogin','init')
      }
    },
    gotoMore(item) {
      if (item.id == 0) {
         this.blocklogHandler('常见问题入口','0028','0001')
         this.$router.push({name: 'faq'})
      } else if (item.id == 1) {
        let url = 'http://rmt.cmicrwx.cn/notice/mobile.html?sid='
        this.gotolink(0, url)
      }
    },
    gotolink(idx, url) {
      this.blocklogHandler('用户中心广告位', '0030', '000' + (idx + 1))
      url && (location.href = url)
    }
  }
}
</script>

<style scoped lang="less">
.mine-page{
  background-color: #fff;
  height: calc(100vh-1.6rem);
}

.top-wrap {
  background: url("../assets/imgs/mine/new/bg_notvip.png") no-repeat center/100% 100%;
  width:100vw;
  height: 4.3rem;
  display: flex;
  flex-direction: column;
  
  .userInfoBox {
    display: flex;
    padding-top: 1.42rem;
    // padding-left: 0.5rem;
    height: 1.06rem;
    align-items: center;
    .img-avatar {
      width: 1.06rem;
      height: 1.06rem;
      margin-left: 0.5rem;
    }
    .phone-area {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 4.0rem;
      height: 0.9rem;
      padding: 0 0.18rem 0 0.2rem;
      text-align: left;
      color: #fff;
      .phone {
        font-size: 0.32rem;
        line-height: 0.36rem;
        font-weight: 500;
        .crown {
          width: 0.38rem;
          margin-left: 0.1rem;
        }
      }
      .phone-tips {
        font-size: 0.26rem;
        line-height: 0.36rem;
        font-weight: 400;
        height: .25rem;
      }
      .gotoLogin {
        display: flex;
        align-items: center;
        font-size: 0.26rem;
        .gotoLogin-img {
          height: 0.15rem;
          margin-left: 0.1rem;
        }
      }
    }
  }
  .card-area {
    height: 1.6rem;
    width: 6.7rem;
    margin-top: .38rem;
    margin-left: .4rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .card-right {
      margin-right: .1rem;
      .order-btn {
        width: 2.1rem;
        margin-top: .15rem;
      }
    }
    .card-right-upgrade{
      margin-right: .2rem;
      .order-btn {
        width: 1.8rem;
        margin-top: .15rem;
      }
    }
    .vip-card-right {
      margin-right: .3rem;
      font-size: .26rem;
      height: .25rem;
      font-weight: 400;
    }
    .vip-card-right-upgrade {
      margin-right: 1.2rem;
      font-size: .26rem;
      height: .25rem;
      font-weight: 400;
    }
  }
}
.top-wrap.vip{
  background: url("../assets/imgs/mine/new/bg_vip2.png") no-repeat center/100% 100%;
  height: 3.8rem;
}
.top-wrap.newStarVip{
  background: url("../assets/imgs/mine/new/bg_newStarVip2.png") no-repeat center/100% 100%;
    height: 3.8rem;
}
.card-area.vip {
  height: 0.96rem;
}
.my-list {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0.45rem 0 0.35rem;
  .my-list-title {
    font-size: 0.34rem;
    line-height: 0.36rem;
    color: #383a3f;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.16rem;
  }
  .item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .9rem;
    .item-left {
      margin-left: 0.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-icon {
        width: 0.46rem;
        margin-right: 0.21rem;
      }
    }
    .item-right {
      width: .14rem;
      height: .24rem;
    }
  }
}
.my-list.vip {
  margin-top: 0rem;
}
.exitLogin{
    height:1rem;
    line-height: 1rem;
    font-size: 0.32rem;
    color:#FD2828;
    margin-bottom: 0.16rem;
    background: #fff;
}
/deep/.van-divider {
  line-height: 0.04rem;
  margin: 0.08rem 0;
}
</style>
