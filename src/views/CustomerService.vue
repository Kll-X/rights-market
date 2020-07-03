<template>
  <div class="wrap" v-show="showFlag">
    <!-- 标题 -->
    <div class="title-wrap">
      <div class="title">{{title}}</div>
    </div>
    <!-- 标题 -->
    <div class="realcontent">
      <!-- one-->
      <div>
        <div class="part-wrap">
          <div class="circle"></div>
          <div class="partText">{{partOne}}</div>
        </div>
        <div class="content-wrap">
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="anhui"
                v-bind:class="{ active: provinceCode == 551}"
              >安徽</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="beijing"
                v-bind:class="{ active: provinceCode == 100}"
              >北京</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="chongqing"
                v-bind:class="{ active: provinceCode == 230}"
              >重庆</div>
            </div>
          </div>
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="fujian"
                v-bind:class="{ active: provinceCode == 591}"
              >福建</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="gansu"
                v-bind:class="{ active: provinceCode == 931}"
              >甘肃</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="guangdong"
                v-bind:class="{ active: provinceCode == 200}"
              >广东</div>
            </div>
          </div>
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="guangxi"
                v-bind:class="{ active: provinceCode == 771}"
              >广西</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="guizhou"
                v-bind:class="{ active: provinceCode == 851}"
              >贵州</div>
            </div>
          </div>
        </div>
      </div>
      <!-- one-->
      <!-- two-->
      <div>
        <div class="part-wrap partTwo-wrap">
          <div class="circle"></div>
          <div class="partText">{{partTwo}}</div>
        </div>
        <div class="content-wrap">
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="hainan"
                v-bind:class="{ active: provinceCode == 898}"
              >海南</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="heilongjiang"
                v-bind:class="{ active: provinceCode == 451}"
              >黑龙江</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="hebei"
                v-bind:class="{ active: provinceCode == 311}"
              >河北</div>
            </div>
          </div>
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="henan"
                v-bind:class="{ active: provinceCode == 371}"
              >河南</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="hubei"
                v-bind:class="{ active: provinceCode == 270}"
              >湖北</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="hunan"
                v-bind:class="{ active: provinceCode == 731}"
              >湖南</div>
            </div>
          </div>
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="jilin"
                v-bind:class="{ active: provinceCode == 431}"
              >吉林</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="jiangsu"
                v-bind:class="{ active: provinceCode == 250}"
              >江苏</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="jiangxi"
                v-bind:class="{ active: provinceCode == 791}"
              >江西</div>
            </div>
          </div>
        </div>
      </div>
      <!-- two-->
      <!-- three-->
      <div>
        <div class="part-wrap partTwo-wrap">
          <div class="circle"></div>
          <div class="partText">{{partThree}}</div>
        </div>
        <div class="content-wrap">
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="liaoning"
                v-bind:class="{ active: provinceCode == 240}"
              >辽宁</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="neimenggu"
                v-bind:class="{ active: provinceCode == 471}"
              >内蒙古</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="ningxia"
                v-bind:class="{ active: provinceCode == 951}"
              >宁夏</div>
            </div>
          </div>
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="qinghai"
                v-bind:class="{ active: provinceCode == 971}"
              >青海</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="shandong"
                v-bind:class="{ active: provinceCode == 531}"
              >山东</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="shangxi"
                v-bind:class="{ active: provinceCode == 351}"
              >山西</div>
            </div>
          </div>
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="shanxi"
                v-bind:class="{ active: provinceCode == 290}"
              >陕西</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="shanghai"
                v-bind:class="{ active: provinceCode == 210}"
              >上海</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="sichuan"
                v-bind:class="{ active: provinceCode == 280}"
              >四川</div>
            </div>
          </div>
        </div>
      </div>
      <!-- three-->
      <!-- four-->
      <div>
        <div class="part-wrap partTwo-wrap">
          <div class="circle"></div>
          <div class="partText">{{partFour}}</div>
        </div>
        <div class="content-wrap">
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="tianjin"
                v-bind:class="{ active: provinceCode == 220}"
              >天津</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="xizang"
                v-bind:class="{ active: provinceCode == 891}"
              >西藏</div>
            </div>
            <div class="content border0">
              <div class="cityName"></div>
            </div>
          </div>
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="yunnan"
                v-bind:class="{ active: provinceCode == 871}"
              >云南</div>
            </div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="zhejiang"
                v-bind:class="{ active: provinceCode == 571}"
              >浙江</div>
            </div>
            <div class="content border0">
              <div class="cityName"></div>
            </div>
          </div>
          <div>
            <div class="content">
              <div
                class="cityName"
                v-on:click.stop="xinjiang"
                v-bind:class="{ active: provinceCode == 991}"
              >新疆</div>
            </div>
            <div class="content border0">
              <div class="cityName"></div>
            </div>
            <div class="content border0">
              <div class="cityName"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- four-->
    </div>
    <div class="tail">
      <div class="button">
        <div class="buttonText" @click="$router.go(-1)">取消</div>
      </div>
      <div class="button button-sure">
        <div class="buttonText" @click="sure">确定</div>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from "vant";
import {gotoService} from '@/api/customerservice.js'
import { mapState } from 'vuex'

export default {
  name: "customerService",
  data() {
    return {
      title: "城市定位",
      partOne: "A-G",
      partTwo: "H-J",
      partThree: "L-S",
      partFour: "T-Z",
      provinceCode: "",
      show: false,
      appKey: "",
      showFlag: false,
      provinceDatas: {
        '551': {
          name: 'anhui',
          tenantId: 1000079
        },
        '100': {
          name: 'beijing',
          tenantId: 1000064
        },
        '200': {
          name: 'guangdong',
          tenantId: 1000061
        },
        '210': {
          name: 'shanghai',
          tenantId: 1000065
        },
        '220':{
          name: 'tianjin',
          tenantId: 1000066
        },
        '230':{
          name: 'chongqing',
          tenantId: 1000067
        },
        '240':{
          name: 'liaoning',
          tenantId: 1000068
        },
        '250':{
          name: 'jiangsu',
          tenantId: 1000002
        },
        '270':{
          name: 'hubei',
          tenantId: 1000069
        },
        '280':{
          name: 'sichuan',
          tenantId: 1000070
        },
        '290':{
          name: 'shanxi',
          tenantId: 1000056
        },
        '311':{
          name: 'hebei',
          tenantId: 1000047
        },
        '351':{
          name: 'shangxi',
          tenantId: 1000055
        },
        '371':{
          name: 'henan',
          tenantId: 1000071
        },
        '431':{
          name: 'jilin',
          tenantId: 1000072
        },
        '451':{
          name: 'heilongjiang',
          tenantId: 1000034
        },
        '471':{
          name: 'neimenggu',
          tenantId: 1000073
        },
        '531':{
          name: 'shandong',
          tenantId: 1000058
        },
        '571':{
          name: 'zhejiang',
          tenantId: 1000080
        },
        '591':{
          name: 'fujian',
          tenantId: 1000048
        },
        '731':{
          name: 'hunan',
          tenantId: 1000063
        },
        '771':{
          name: 'guangxi',
          tenantId: 1000078
        },
        '791':{
          name: 'jiangxi',
          tenantId: 1000035
        },
        '851':{
          name: 'guizhou',
          tenantId: 1000074
        },
        '871':{
          name: 'yunnan',
          tenantId: 1000077
        },
        '891':{
          name: 'xizang',
          tenantId: 1000075
        },
        '898':{
          name: 'hainan',
          tenantId: 1000076
        },
        '931':{
          name: 'gansu',
          tenantId: 1000081
        },
        '951':{
          name: 'ningxia',
          tenantId: 1000082
        },
        '971':{
          name: 'qinghai',
          tenantId: 1000001
        },
        '991':{
          name: 'xinjiang',
          tenantId: 1000083
        }
      }
    };
  },
  props: ["channelType"],
  created(){
    this.init()
  },
  computed:{
      ...mapState([
          "userInfo" ,
          "sysInfo"
      ])
  },
  methods: {
    async sure() {
        let goURL = '';
        if (this.sysInfo.channel == 'st') {
          // goURL = 'https://shop.10086.cn/ad/livechat-touch-client/pub-page/liveChatTouchRobert.html?tenantId=' + this.provinceDatas[this.userInfo.provinceCode].tenantId + '&code=BS&channelType=1012&entranceType=rights&artifact=' + this.userInfo.artifact;
          goURL = 'https://login.10086.cn/AppSSO.action?targetChannelID=12026&UID='+ this.userInfo.uid +'&TransactionID=123456789&targetUrl=https%3A%2F%2Fshop.10086.cn%2Fad%2Flivechat-touch-client%2Fpub-page%2FliveChatTouchRobert.html%3FtenantId%3D'+ this.provinceDatas[this.userInfo.provinceCode].tenantId +'%26code%3DBS%26channelType%3D1012%26entranceType%3Drights%26type=00';
        } else {
          if (this.appKey == "" || this.provinceCode == "") {
            Toast("请选择省份");
            return;
          }else{
           window.console.log("else");
            let base_url = "https://cmkf.cmcc-cs.cn:31210/api/nguac/h5/index/";
            let companyId = "ydhkgzh_h5";
            let appKey = this.appKey;
           window.console.log(appKey);
            let deviceNo = this.userInfo.phone;
            // let username = Math.round(Math.random() * 10000);
            let provinceCode = this.provinceCode;
           window.console.log(provinceCode);
            let apiVersion = "1.0";
            // let phone = "NoNumber";
            let paramUrl =
              "companyId=" +
              companyId +
              "&appKey=" +
              appKey +
              "&deviceNo=" +
              deviceNo +
            
              "&provinceCode=" +
              provinceCode +
              "&apiVersion=" +
              apiVersion;
           window.console.log(paramUrl);
            //  const data1 = await this.$request("livehk/card/temporaryorder", "POST", {
            const data1 = await gotoService(
              {url:paramUrl}
            );
           window.console.log(data1);
            goURL = base_url + data1.data.data;
          }
        }
       window.console.log(goURL);
        location.replace(goURL);
    },
    init(){
      if(this.userInfo.provinceCode) {
       if (this.sysInfo.channel == 'st') {
         this.sure();
       } else {
         this[this.provinceDatas[this.userInfo.provinceCode].name]();
         this.sure();
       }
     } else {
       this.showFlag = true;
     }
    },
    anhui() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#AH36569512085";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#AH57908557366";
          break;
        default:
          this.appKey = "ydhkgzh_h5#AH41763296306&ent=2bdf5e6ef1504726b1473c917a28f973";
          break;
      }
      this.provinceCode = "551";
     window.console.log(this.provinceCode, this.appKey);
    },
    beijing() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#BJ48179300188";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#BJ21420655482";
          break;
        default:
          this.appKey = "ydhkgzh_h5#BJ67170632097&ent=41c9e7fde3d44f9e9c0e2c91bc75b083";
          break;
      }
      this.provinceCode = "100";
     window.console.log(this.provinceCode);
    },
    guangdong() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#GD20783935478";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#GD69025858938";
          break;
        default:
          this.appKey = "ydhkgzh_h5#GD38211704055&ent=eae4968f1aa44a8ba6190bdb88fb7940";

          break;
      }
      this.provinceCode = "200";
     window.console.log(this.provinceCode);
    },
    shanghai() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#SH78200687550";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#SH64781292295";
          break;
        default:
          this.appKey = "ydhkgzh_h5#SH60251975418&ent=46e4d51b93e143cdb22188147d25bb70";

          break;
      }
      this.provinceCode = "210";
     window.console.log(this.provinceCode);
    },
    tianjin() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#TJ18219765552";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#TJ62173490842";
          break;
        default:
          this.appKey = "ydhkgzh_h5#TJ94793165157&ent=a406fbf2a20447f0a07706b6cc7a42a7";

          break;
      }
      this.provinceCode = "220";
     window.console.log(this.provinceCode);
    },
    chongqing() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#CQ94588387394";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#CQ36132565921";
          break;
        default:
          this.appKey = "ydhkgzh_h5#CQ83957522609&ent=adef8b678f674003af3f9c2046938edc";

          break;
      }
      this.provinceCode = "230";
     window.console.log(this.provinceCode);
    },
    liaoning() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#LN93652594053";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#LN30199987537";
          break;
        default:
          this.appKey = "ydhkgzh_h5#LN10772936622&ent=d3b3a7bec0464379afa32860ab905be2";

          break;
      }
      this.provinceCode = "240";
     window.console.log(this.provinceCode);
    },
    jiangsu() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#JS19234517152";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#JS34877479827";
          break;
        default:
          this.appKey = "ydhkgzh_h5#JS41382283141&ent=d8453c62f0044da5974d7236b83aee2a";

          break;
      }
      this.provinceCode = "250";
     window.console.log(this.provinceCode);
    },
    hubei() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#HB39826513823";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#HB48677208638";
          break;
        default:
          this.appKey = "ydhkgzh_h5#HB37885126366&ent=2066883562684e9292e12f2f8b21ef31";

          break;
      }
      this.provinceCode = "270";
     window.console.log(this.provinceCode);
    },
    sichuan() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#SC35192362533";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#SC54169194934";
          break;
        default:
          this.appKey = "ydhkgzh_h5#SC80205932109&ent=572c3e73b0ed41b8904483f3234c00a3";

          break;
      }
      this.provinceCode = "280";
     window.console.log(this.provinceCode);
    },
    shanxi() {
      // 注：这个是陕西！
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#SN31245580311";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#SN58690671336";
          break;
        default:
          this.appKey = "ydhkgzh_h5#SN09457089487&ent=aa6853556c3c46e6a1597914c99ec463";

          break;
      }
      this.provinceCode = "290";
     window.console.log(this.provinceCode);
    },
    hebei() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#HE01933079507";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#HE54880676761";
          break;
        default:
          this.appKey = "ydhkgzh_h5#HE39236401782&ent=c4a21f09978e4a49abb96aab825de790";

          break;
      }
      this.provinceCode = "311";
     window.console.log(this.provinceCode);
    },
    shangxi() {
      // 注：这是山西
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#SX34732184418";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#SX79522419576";
          break;
        default:
          this.appKey = "ydhkgzh_h5#SX94716749009&ent=f395f8de44634313a9c9052480cf8735";

          break;
      }
      this.provinceCode = "351";
     window.console.log(this.provinceCode);
    },
    henan() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#HA48217735995";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#HA10996954173";
          break;
        default:
          this.appKey = "ydhkgzh_h5#HA18620672109&ent=ad7ebabf6e7b4807aebd45501080da5e";

          break;
      }
      this.provinceCode = "371";
     window.console.log(this.provinceCode);
    },
    jilin() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#JL16783359510";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#JL21420655949";
          break;
        default:
          this.appKey = "ydhkgzh_h5#JL97836346497&ent=a55919b14b03440597d7cd1a33991593";

          break;
      }
      this.provinceCode = "431";
     window.console.log(this.provinceCode);
    },
    heilongjiang() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#HL63549357290";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#HL40279946144";
          break;
        default:
          this.appKey = "ydhkgzh_h5#HL35408158413&ent=4ab3cbba53ed46a5a73f8b8bf89049f3";

          break;
      }
      this.provinceCode = "451";
     window.console.log(this.provinceCode);
    },
    neimenggu() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#NM60594913461";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#NM94673198899";
          break;
        default:
          this.appKey = "ydhkgzh_h5#NM51002850039&ent=97ff389794ed4aa4bb12528dcc5de049";

          break;
      }
      this.provinceCode = "471";
     window.console.log(this.provinceCode);
    },
    shandong() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#SD19765246333";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#SD61895197725";
          break;
        default:
          this.appKey = "ydhkgzh_h5#SD79630664324&ent=2fc49d7396ce409b81989f3ae12cba77";

          break;
      }
      this.provinceCode = "531";
     window.console.log(this.provinceCode);
    },
    zhejiang() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#ZJ37471405996";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#ZJ76271384570";
          break;
        default:
          this.appKey = "ydhkgzh_h5#ZJ40672960510&ent=ab92bc45e7bb4c5d8ad6e66ccea11ba4";

          break;
      }
      this.provinceCode = "571";
     window.console.log(this.provinceCode);
    },
    fujian() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#FJ52859407283";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#FJ09695030754";
          break;
        default:
          this.appKey = "ydhkgzh_h5#FJ81006876932&ent=410a67a69f0742c48cba356b7cbbc773";

          break;
      }
      this.provinceCode = "591";
     window.console.log(this.provinceCode);
    },
    hunan() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#HN53248372352";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#HN68931288949";
          break;
        default:
          this.appKey = "ydhkgzh_h5#HI06138049026&ent=81d3a0a54eb545008aa457a163b8afe5";

          break;
      }
      this.provinceCode = "731";
     window.console.log(this.provinceCode);
    },
    guangxi() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#GX95402131334";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#GX23905271086";
          break;
        default:
          this.appKey = "ydhkgzh_h5#GX87442111298&ent=a62f5179d07c4e0eb0e3a7bb81bab6b6";

          break;
      }
      this.provinceCode = "771";
     window.console.log(this.provinceCode);
    },
    jiangxi() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#JX38211704510";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#JX19438228368";
          break;
        default:
          this.appKey = "ydhkgzh_h5#JX84072815205&ent=213ff30ab41b4c159f5d5feeb71939ce";

          break;
      }
      this.provinceCode = "791";
     window.console.log(this.provinceCode);
    },
    guizhou() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#GZ59138435606";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#GZ86200651813";
          break;
        default:
          this.appKey = "ydhkgzh_h5#GZ07994036046&ent=20c67107a17540acb819b6a39938b332";

          break;
      }
      this.provinceCode = "851";
     window.console.log(this.provinceCode);
    },
    yunnan() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#YN38427127546";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#YN98031837091";
          break;
        default:
          this.appKey = "ydhkgzh_h5#YN49588382975&ent=8e9078fb65ae436fac6be6cadad77212";

          break;
      }
      this.provinceCode = "871";
     window.console.log(this.provinceCode);
    },
    xizang() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#XZ31419730181";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#XZ98665154497";
          break;
        default:
          this.appKey = "ydhkgzh_h5#XZ98077829446&ent=e1443cf8b70c401a98f6497fcaa5f2f9";

          break;
      }
      this.provinceCode = "891";
     window.console.log(this.provinceCode);
    },
    hainan() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#HI59307597437";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#HI90821996233";
          break;
        default:
          this.appKey = "ydhkgzh_h5#HI06138049026&ent=81d3a0a54eb545008aa457a163b8afe5";

          break;
      }
      this.provinceCode = "898";
     window.console.log(this.provinceCode);
    },
    gansu() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#GS54198122497";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#GS81314769336";
          break;
        default:
          this.appKey = "ydhkgzh_h5#GS20177941060&ent=99187301fbec41dea876b8e1d43778fd";

          break;
      }
      this.provinceCode = "931";
     window.console.log(this.provinceCode);
    },
    ningxia() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#NX38180644890";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#NX83981301972";
          break;
        default:
          this.appKey = "ydhkgzh_h5#NX86432114940&ent=eb120f99c3634b419d2eac87cd4ea344";

          break;
      }
      this.provinceCode = "951";
     window.console.log(this.provinceCode);
    },
    qinghai() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#QH34631393583";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#QH68302422921";
          break;
        default:
          this.appKey = "ydhkgzh_h5#QH62913727283&ent=d5cf016e94f2495fa4011c1fabd9bbbb";

          break;
      }
      this.provinceCode = "971";
     window.console.log(this.provinceCode);
    },
    xinjiang() {
      switch (this.channelType) {
        case "bilibili":
          this.appKey = "jyblbl_webchat#XJ86073875690";
          break;
        case "baidu":
          this.appKey = "jybd_webchat#XJ62913727188";
          break;
        default:
          this.appKey = "ydhkgzh_h5#XJ97428548263&ent=a471411ff7f346a3a094492956422967";

          break;
      }
      this.provinceCode = "991";
     window.console.log(this.provinceCode);
    },
    showPopup() {
      this.show = true;
    }
  },
  watch:{
    '$store.state.userInfo.provinceCode'(n){
        n && this.init();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  border: 1px solid #000;
  background: #ffffff;
  border-radius: 0.2rem;
  width: 6.5rem;
  height: 11rem;
  margin-left: -3.25rem;
  margin-top: -6rem;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 999999999;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.title-wrap {
  margin-top: 0.41rem;
  display: flex;
}
.title {
  font-size: 0.32rem;
  margin: auto;
  font-family: "FZLTHJW";
}
.part-wrap {
  margin-top: 0.55rem;
  display: flex;
  justify-content: flex-start;
}
.partText {
  margin-left: 0.25rem;
  font-size: 0.32rem;
  font-family: "FZLTHJW";
}
.circle {
  margin-left: 0.25rem;
  width: 0.25rem;
  height: 0.25rem;
  background-color: #00a5ff;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}
.content-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.cityName {
  font-size: 0.28rem;
  font-family: "FZLTHJW";
  height: 0.75rem;
  width: 1.75rem;
  text-align: center;
  line-height: 0.75rem;
}

.content {
  height: 0.75rem;
  width: 1.75rem;
  border: 0.01rem solid gray;
  margin: 0.44rem 0.125rem 0.44rem 0.125rem;
  border-radius: 0.1rem;
}
.partTwo-wrap {
  margin-top: 0rem;
}
.realcontent {
  overflow-y: scroll;
  height: 11rem;
}
.content-wrap-wrap {
  display: flex;
}
.border0 {
  border: 0rem;
}
.realcontent::-webkit-scrollbar-thumb {
  display: block;
  width: 6px;
  margin: 0 auto;
  border-radius: 10px;
  background: red; /*内层轨道*/
}
.tail {
  display: flex;
  /*justify-content: space-between; */
  font-size: 0.28rem;
  font-family: "FZLTHJW";
}
.button {
  width: 3.25rem;
  height: 1rem;
  line-height: 1rem;
  border-top: 0.01rem solid gray;
}
.button-sure {
  border-left: 0.01rem solid gray;
}
.buttonText {
  text-align: center;
}
.active {
  color: white;
  background-color: #00a5ff;
}
</style>
