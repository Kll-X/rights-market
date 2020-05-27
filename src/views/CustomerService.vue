<template>
  <div class="wrap">
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

import Vue from "vue";
import { Dialog, Popup, Toast } from "vant";
import {gotoService} from '@/api/customerservice.js'
Vue.use(Dialog, Popup, Toast);
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
      appKey: ""
    };
  },
  props: ["channelType"],
  methods: {
    async sure() {
      if (this.appKey == "" || this.provinceCode == "") {
        Toast("请选择省份");
      } else {
        console.log("else");
        let base_url = "https://cmkf.cmcc-cs.cn:31210/api/nguac/h5/index/";
        let companyId = "qycs_h5";
        let appKey = this.appKey;
        console.log(appKey);
        let deviceNo = Math.round(Math.random() * 10000);
        let username = Math.round(Math.random() * 10000);
        let provinceCode = this.provinceCode;
        console.log(provinceCode);
        let apiVersion = "1.0";
        // let phone = "NoNumber";
        let paramUrl =
          "companyId=" +
          companyId +
          "&appKey=" +
          appKey +
          "&deviceNo=" +
          deviceNo +
          "&username=" +
          username +
          "&provinceCode=" +
          provinceCode +
          "&apiVersion=" +
          apiVersion;
        console.log(paramUrl);
        //  const data1 = await this.$request("livehk/card/temporaryorder", "POST", {
        const data1 = await gotoService(
          {url:paramUrl}
        );
        console.log(data1);
        let goURL = base_url + data1.data.data;
        console.log(goURL);
        window.location.href = goURL;
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
          this.appKey = "qycs_h5#AH23455379901";
          break;
      }
      this.provinceCode = "551";
      console.log(this.provinceCode, this.appKey);
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
          this.appKey = "qycs_h5#BJ03659088143";
          break;
      }
      this.provinceCode = "100";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#GD46078862221";

          break;
      }
      this.provinceCode = "200";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#SH30734907845";

          break;
      }
      this.provinceCode = "210";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#TJ47965392852";

          break;
      }
      this.provinceCode = "220";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#CQ37208483342";

          break;
      }
      this.provinceCode = "230";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#LN27126552110";

          break;
      }
      this.provinceCode = "240";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#JS41007826934";

          break;
      }
      this.provinceCode = "250";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#HB09405065225";

          break;
      }
      this.provinceCode = "270";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#SC60251975724";

          break;
      }
      this.provinceCode = "280";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#SN05436022493";

          break;
      }
      this.provinceCode = "290";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#HE81975417025";

          break;
      }
      this.provinceCode = "311";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#SX34055878628";

          break;
      }
      this.provinceCode = "351";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#HA63158425476";

          break;
      }
      this.provinceCode = "371";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#JL60349934406";

          break;
      }
      this.provinceCode = "431";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#HL82449191674";

          break;
      }
      this.provinceCode = "451";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#NM61305398053";

          break;
      }
      this.provinceCode = "471";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#SD14615799225";

          break;
      }
      this.provinceCode = "531";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#ZJ15834571051";

          break;
      }
      this.provinceCode = "571";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#FJ03406084353";

          break;
      }
      this.provinceCode = "591";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#HN76312709227";

          break;
      }
      this.provinceCode = "731";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#GX12946500053";

          break;
      }
      this.provinceCode = "771";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#JX90765972800";

          break;
      }
      this.provinceCode = "791";
      console.log(this.provinceCode);
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
          this.appKey = "ydhkgzh_h5#GZ63158425529";

          break;
      }
      this.provinceCode = "851";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#GZ48217735554";

          break;
      }
      this.provinceCode = "871";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#XZ45371272371";

          break;
      }
      this.provinceCode = "891";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#HI07662076286";

          break;
      }
      this.provinceCode = "898";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#GS76032813818";

          break;
      }
      this.provinceCode = "931";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#NX01933079951";

          break;
      }
      this.provinceCode = "951";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#QH48591273424";

          break;
      }
      this.provinceCode = "971";
      console.log(this.provinceCode);
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
          this.appKey = "qycs_h5#XJ84195356293";

          break;
      }
      this.provinceCode = "991";
      console.log(this.provinceCode);
    },
    showPopup() {
      this.show = true;
    }
  }
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
