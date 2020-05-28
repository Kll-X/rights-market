<template>
    <div id="goods-detail">
        <!-- 滑动走马灯 -->
        <div class="goods-swiper-wrap">
            <GoodsSwipe ref="swipe"
                @change="changeSwipe"
                :swipeList="goodsList"
                :isVip="isVip"
                :itemDetail="paydetailList"/>
        </div>
        <!-- 开通会员选项 -->
        <div class="goods-vip-wrap">
            <div v-show="!isVip && (paydetailList.price2 && paydetailList.price2 !== null)" class="goods-vip-icon">
                <router-link :to="{name: 'vipBenefit'}" class="goods-vip-button"></router-link>
            </div>
        </div>
        <!-- 单选框 -->
        <div class="radio-wrap">
            <RadioCard class="order-radio"
                ref="radioOrder"
                @change="changeRadio"
                :radioObj="orderList"/>
            <RadioCard class="pay-radio"
                ref="radioPay"
                @change="changeRadio"
                :radioObj="payList"/>
        </div>
        <!-- 商品详情卡片 -->
        <DetailCard class="detail-card" cardTitle="产品详情"
            :cardIntroduce="paydetailList"/>
        <!-- 底部付款框 -->
        <div class="payment-wrap">
            <div class="payment-font" @click="showPopup">
                <div class="payment-font-wrap">
                    <div class="payment-font-con">
                        <span>已选套餐：</span>
                        <span class="payment-font-con-color">{{order}}</span>
                        <span class="select-icon">
                            <img class="select-icon-img" src="@imgs/goodsdetail/selectBtn.png" alt="">
                        </span>
                    </div>
                    <div class="payment-font-con">
                        <span>付款方式：</span>
                        <span class="payment-font-con-color">{{pay}}</span>
                    </div>
                </div>
            </div>
            <div class="payment-button" @click="orderFunc">
                <div class="payment-button-con" :class="{'payment-button-con-gray': (isFivego && isVip && !canBuyFivego)}">
                    <p v-show="!isFivego || (isFivego && !phoneNumber) || (isFivego && canBuyFivego && isVip)" class="payment-button-con-buy">立即订购</p>
                    <p v-show="!isFivego || (isFivego && !phoneNumber) || (isFivego && canBuyFivego && isVip)" class="payment-button-con-price">待支付：{{((paydetailList.price)/100).toFixed(2)}}元</p>
                    <p v-show="isFivego && !isVip && phoneNumber" class="payment-button-con-buy">开通会员立享5折</p>
                    <p v-show="isFivego && isVip && !canBuyFivego" class="payment-button-con-buy">本月已享5折优惠</p>
                </div>
            </div>
        </div>
        <!-- 弹出二次确认框 -->
        <OverlayBox class="overlay-box" :OverlayObj="overlayList" v-if="overlay">
            <div class="overlay-input-wrap">
                <div class="overlay-ipt">
                    <van-cell-group>
                        <van-field v-model="phoneNumber" readonly placeholder="" />
                    </van-cell-group>
                </div>
                <div class="overlay-ipt">
                    <van-field
                        v-model="orderObject.smsCode"
                        center
                        clearable
                        type="digit"
                        placeholder="请输入验证码">
                        <van-button slot="button" size="small" type="default" :disabled="coutdownShow"
                            @click="getSms">
                            <span v-show="!coutdownShow">获取验证码</span>
                            <span v-show="coutdownShow">{{ coutdownTime }}s</span>
                        </van-button>
                    </van-field>
                </div>
            </div>
            <div class="overlay-detail">
                <div>订购产品：{{paydetailList.name}}</div>
                <div>支付金额：{{((paydetailList.price)/100).toFixed(2)}}元</div>
                <div>支付方式：{{paydetailList.paytyperemark}}</div>
            </div>
        </OverlayBox>
        <!-- 底部菜单弹出层 -->
        <van-popup class="overlay-popup"
            v-model="popupShow"
            @open="changePopup"
            @close="closePopup"
            position="bottom">
            <img class="close-popup" @click="popupShow = false"
                src="@imgs/goodsdetail/close-popup.png" alt="">
            <div class="popup-detail">
                <img class="popup-detail-icon" :src="Common.getImgUrl(paydetailList.iconurl)" alt="">
                <div class="popup-detail-font">
                    <div class="popup-detail-font-con">
                        <!-- <span class="popup-detail-font-name">{{paydetailList.name}}</span> -->
                        <span class="popup-detail-font-name">{{goodsName}}</span>
                        <span class="popup-detail-font-fee">资费：{{((paydetailList.price)/100).toFixed(2)}}元</span>
                    </div>
                </div>
            </div>
            <div class="popup-radio">
                <RadioCard class="popup-order-radio"
                    ref="popupOrder"
                    @change="changeRadio"
                    :radioObj="orderList"/>
                <RadioCard class="popup-pay-radio"
                    ref="popupPay"
                    @change="changeRadio"
                    :radioObj="payList"/>
            </div>
            <div class="popup-btn" @click="changeSelect">确定</div>
        </van-popup>
        <!-- 二次确认蒙版 -->
        <van-popup class="overlay-popup"
            v-model="payShow"
            position="bottom">
            <img class="close-popup" @click="payShow = false"
                src="@imgs/goodsdetail/close-popup.png" alt="">
            <div class="popup-title">产品订购</div>
            <div class="popup-price">¥
                <span>{{((paydetailList.price)/100).toFixed(2)}}</span>
            </div>
            <div class="popup-input">
                <div class="popup-ipt">
                    <van-cell-group>
                        <van-field v-model="phoneNumber" readonly placeholder="请输入您的订购号码" />
                    </van-cell-group>
                </div>
                <div class="popup-ipt">
                    <van-field
                        v-model="orderObject.smsCode"
                        center
                        clearable
                        maxlength="6"
                        type="digit"
                        placeholder="请输入验证码">
                        <van-button slot="button" size="small" type="default" :disabled="coutdownShow"
                            @click="getSms">
                            <span v-show="!coutdownShow">获取验证码</span>
                            <span v-show="coutdownShow">{{ coutdownTime }}s</span>
                        </van-button>
                    </van-field>
                </div>
            </div>
            <div class="popup-btn submit" @click="submitBtn">立即订购</div>
        </van-popup>
        <BackHome/>
    </div>
</template>

<script>
    import GoodsSwipe from '@/components/goodsdetail/GoodsSwipe.vue';
    import RadioCard from '@/components/goodsdetail/DetailRadio.vue';
    import DetailCard from '@/components/goodsdetail/DetailCard.vue';
    import OverlayBox from '@/components/goodsdetail/OverlayBox.vue';
    import BackHome from '@/components/common/BackHome.vue';
    import {STATISTICS} from "@/utils/constant";
    import {customAnalysis} from "@/assets/js/analysis";

    // 接口调用
    import { mapState } from 'vuex';
    // import { Encrypt } from '@/utils/encrypt';
    import { getFindMembersBymid, getFindMemberSales, sendSmsCode, placeOrder, payOrderByH5, findMemberTc, queryAcceptFivego } from "@/api/goodsdetail";
    import { Toast } from 'vant';
    import { myVip } from '@/api/vipbenefit';
    // import { getFindMembers } from "@/api/sort"; // 获取商品列表

    export default {
        name: "goods-detail",
        components: {
            GoodsSwipe,RadioCard,DetailCard,OverlayBox,BackHome
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ])
        },
        data() {
            return {
                isFristLoad: true,

                // 会员参数
                isVip: 0, // 0：非会员 1：会员
                isFivego: 0, // 0: 不是五折产品 1：五折产品
                canBuyFivego: 1, // 1:可以购买五折 2：不可以购买五折

                // 浏览器参数
                isAli: false,
                isWeixin: false,
                // 当前产品id
                mid: '',

                // 默认套餐组合文字
                order: '月卡',
                pay: '话费支付-单次点播',
                price: '0', // 价格

                // 蒙版控制参数
                overlay: false,

                // 弹出层控制参数
                popupShow: false,
                payShow: false,

                // 计时器参数
                coutdownShow: false,
                coutdownTime: 60,

                // 商品列表
                goodsList: [],
                goodsName: '',

                //产品详情列表
                paydetailList: {
                    price: '0',
                },

                // 产品订购对象
                orderObject: {
                    mobile: '',
                    smsCode: '',
                },
                phoneNumber: '',

                // 单选列表1：套餐选择
                orderList: {
                    title: '套餐选择',
                    eng: 'order',
                    value: "1",
                    list: [],
                    obj: {
                        '1': '月卡',
                        '2': '季卡',
                        '3': '年卡',
                    },
                },
                // 单选列表2：支付方式
                payList: {
                    title: '支付方式',
                    eng: 'pay',
                    value: "1",
                    list: [
                        {
                            label: ['话费支付', '单次点播'],
                            value: '1',
                            disable: true,
                            hidden: false,
                        }, {
                            label: ['话费支付', '连续包月'],
                            value: '2',
                            disable: true,
                            hidden: false,
                        }
                        // , {
                        //     label: ['支付宝支付', '单次点播'],
                        //     value: '3',
                        //     disable: true,
                        //     hidden: false,
                        // }, {
                        //     label: ['微信支付', '单次点播'],
                        //     value: '4',
                        //     disable: true,
                        //     hidden: false,
                        // }
                    ],
                    obj: {
                        '1': '话费支付-单次点播',
                        '2': '话费支付-连续包月',
                        '3': '支付宝支付-单次点播',
                        '4': '微信支付-单次点播',
                    },
                },
                paymentTypeList: {
                    '3': 'ALIPAY-WAP',
                    '4': 'WEIXIN-WAP',
                },
                // 详情方案集合
                detailList: [],
                // 弹出框参数
                overlayList: {
                    title: '产品订购',
                    btnList: [{
                        label: '取消',
                        type: 'cancel',
                        func: this.cancelBtn,
                    }, {
                        label: '立即订购',
                        type: 'submit',
                        func: this.submitBtn,
                    }]
                },

                // 不能点击立即订购的情况
                isCantOrder: false,
                isFristChangeRadio: true,
            };
        },
        mounted() {
            // 获取当前商品的详情
            let userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.match(/Alipay/i)=="alipay") {
                this.isAli = true;
            }
            if (userAgent.match(/MicroMessenger/i)=="micromessenger") {
                this.isWeixin = true;
            }
            this.mid = this.$route.params.mid;
            if (this.userInfo.isVip !== '') this.isVip = +this.userInfo.isVip;
            this.initialize();
            if (this.userInfo.phone) {
                this.phoneNumber = this.userInfo.phoneMask;
                this.orderObject.mobile = this.userInfo.phone;
            }
            if (this.sysInfo.channel == 'st' || this.sysInfo.channel == 'wx'){
                customAnalysis(STATISTICS.activityId, STATISTICS[this.sysInfo.channel][1],this.mid)
            }
            customAnalysis(STATISTICS.activityId, STATISTICS.all[1], this.mid);
        },
        methods: {
            // 初始化页面
            async initialize() {
                await this.getIsVip();
                await this.getMemberTc();
                this.getList(this.mid);
            },
            async changeInitialize(mid) {
                await this.getMemberTc();
                this.getDeatailData(mid);
            },
            // 获取用户vip信息
            getIsVip() {
                return new Promise((reslove, reject) => {
                    if (this.userInfo.isVip == 1) {
                        reslove();
                        return false;
                    }
                    if (this.userInfo.phone && this.userInfo.isVip === '') {
                        myVip({
                            proId: '6000692',
                            salesId: '102125',
                            channelCode: this.sysInfo.channelCode,
                            phone: this.userInfo.phone,
                        }).then((res)=>{
                            if (res.data.resultCode == 0){ //获得vip信息
                                this.isVip = 1;
                            } else {
                                this.isVip = 0;
                            }
                            reslove();
                        }).catch(() => {
                            reject();
                        })
                    } else {
                        reslove();
                    }
                })
            },
            // 获取支付类型列表
            getMemberTc() {
                return new Promise((reslove, reject) => {
                    findMemberTc({mid: this.mid}).then((response) => {
                        if (response.data.data.length !== 0) {
                            let obj = {};
                            for (let index = 0; index < response.data.data.length; index++) {
                                const item = response.data.data[index];
                                obj[item.tc] = item.tcremark;
                            }
                            // 默认展示第一个
                            this.order = response.data.data[0].tcremark;
                            this.orderList.obj = obj;
                        } else {
                            this.orderList.obj = {
                                '1': '月卡',
                                '2': '季卡',
                                '3': '年卡',
                            }
                            this.order = this.orderList.obj[1];
                        }
                        reslove();
                    }).catch(() => {
                        reject();
                    })
                })
            },
            // 获取商品列表
            getList(id) {
                let that = this;
                getFindMembersBymid({mid: id}).then((response) => {
                    if (response.data.resultCode == 0) {
                        // 将所有商品赋值给goodsList列表
                        let data = response.data.data;
                        that.goodsList = data;
                        if (data.length == 0 || data == null) {
                            Toast.fail({message: '此商品已经下架或不存在', forbidClick: true, duration: 4000});
                            return false;
                        }
                        // 判断当前产品在列表的哪个位置
                        for (let index = 0; index < data.length; index++) {
                            const item = data[index];
                            if (item.mid == that.mid) {
                                that.$refs.swipe.$refs.swipe.swipeTo(index);
                                that.getDeatailData(that.mid);
                                if (index == 0) that.isFristLoad = false;
                                break;
                            }
                        }
                    }
                })
            },
            // 获取商品详情
            getDeatailData(id) {
                // 不存在的策略则将对应radio置灰
                let that = this;
                let data = {
                    mid: id
                }
                if (this.phoneNumber) data.isVip = this.isVip;
                getFindMemberSales(data).then((response) => {
                    if (response.data.resultCode == 0){
                        if (response.data.data.length == 0 || response.data.data == null) {
                            Toast.fail({message: '此商品已经下架或不存在', forbidClick: true, duration: 4000});
                        }
                        that.detailList = response.data.data;
                        let provinceFlag = false; // 所有数据是否包含的标志
                        if (this.$route.params.proid && this.$route.params.saleid){ // 如果路径有存在的参数
                            for (let index = 0; index < this.detailList.length; index++) {
                                const item = this.detailList[index];
                                if (item.proid == this.$route.params.proid
                                    && item.saleid == this.$route.params.saleid){
                                    // 如果是输入未登录或者是白名单的情况 正常处理
                                    if (this.userInfo.provinceCode == null || this.userInfo.iswhite == 1
                                        || (item.provincecode == '' || item.provincecode == 0 || item.provincecode.indexOf(this.userInfo.provinceCode) != -1)) {
                                        // 支付环境的判断
                                        // if ((item.paytype == 3 && this.isAli)
                                        //     || (item.paytype == 4 && this.isWeixin)
                                        //     || (!this.isAli && !this.isWeixin)) {
                                        //     this.$refs.radioOrder.radio = item.tc;
                                        //     this.$refs.radioPay.radio = item.paytype;
                                        //     this.paydetailList = item;
                                        //     this.goodsName = item.name;
                                        // } else {
                                        //     this.$refs.radioOrder.radio = this.detailList[0].tc;
                                        //     this.$refs.radioPay.radio = this.detailList[0].paytype;
                                        //     this.paydetailList = this.detailList[0];
                                        //     this.goodsName = this.detailList[0].name;
                                        // }
                                        if ((item.paytype == 3 && this.isWeixin) || (item.paytype == 4 && this.isAli)) {
                                            this.$refs.radioOrder.radio = this.detailList[0].tc;
                                            this.$refs.radioPay.radio = this.detailList[0].paytype;
                                            this.paydetailList = this.detailList[0];
                                            this.goodsName = this.detailList[0].name;
                                        } else {
                                            this.$refs.radioOrder.radio = item.tc;
                                            this.$refs.radioPay.radio = item.paytype;
                                            this.paydetailList = item;
                                            this.goodsName = item.name;
                                        }
                                        // 判断是否存在autobuy参数，自动调起支付框
                                        if (this.$route.query.autobuy) {
                                            this.orderFunc();
                                        }
                                    } else {
                                        this.isCantOrder = true;
                                        if (item.tc == 1 && item.paytype == 1) this.isFristChangeRadio = false;
                                        Toast.fail('您好，本省号码暂未上架本产品，可看看其他商品哦~');
                                        // 选择第一个可选权益
                                        this.$refs.radioOrder.radio = item.tc;
                                        this.$refs.radioPay.radio = item.paytype;
                                        this.paydetailList = item;
                                        this.goodsName = item.name;
                                    }
                                } else {
                                    this.$refs.radioOrder.radio = this.detailList[0].tc;
                                    this.$refs.radioPay.radio = this.detailList[0].paytype;
                                    this.paydetailList = this.detailList[0];
                                    this.goodsName = this.detailList[0].name;
                                }
                            }
                        } else { // 默认选择第一个策略 赋值
                            // 如果当前页面未登录的情况
                            if (this.userInfo.provinceCode == null || this.userInfo.iswhite == 1) {
                                this.$refs.radioOrder.radio = this.detailList[0].tc;
                                this.$refs.radioPay.radio = this.detailList[0].paytype;
                                this.paydetailList = this.detailList[0];
                                this.goodsName = this.detailList[0].name;
                            } else { // 当前页面已经登录，则根据省份选择第一个可选的策略
                                for (let index = 0; index < this.detailList.length; index++) {
                                    const item = this.detailList[index];
                                    // 第一个包含省份的策略
                                    if (item.provincecode == '' || item.provincecode == 0 || item.provincecode.indexOf(this.userInfo.provinceCode) != -1) {
                                        this.$refs.radioOrder.radio = item.tc;
                                        this.$refs.radioPay.radio = item.paytype;
                                        this.paydetailList = item;
                                        this.goodsName = item.name;
                                        provinceFlag = true;
                                        break;
                                    }else {
                                        if (item.tc == this.$refs.radioOrder.radio && item.paytype == this.$refs.radioPay.radio) {
                                            this.paydetailList = item;
                                            break;
                                        } else {
                                            this.paydetailList = item;
                                        }
                                    }
                                }
                                if (!provinceFlag) { // 数组中不存在任何一个与当前手机号所在区域的策略
                                    Toast.fail('您好，本省号码暂未上架本产品，可看看其他商品哦~');
                                }
                            }
                        }
                        this.isRadioDisable();
                        // 会员支付方式标签处理
                        if (this.isVip) {
                            for (let index = 0; index < this.orderList.list.length; index++) {
                                let radio = this.orderList.list[index];
                                for (let index = 0; index < this.detailList.length; index++) {
                                    const item = this.detailList[index];
                                    if (radio.value == item.tc && (item.mbusercode !== null && item.mbusercode !== '')) {
                                        radio.vip = true;
                                        return false;
                                    } else {
                                        radio.vip = false;
                                    }
                                }
                            }
                        }
                        // 五折会员产品的处理
                        if (this.paydetailList.fivego == 1) {
                            this.isFivego = 1;
                            // 支付方式限定为1个
                            let newList = [];
                            for (let index = 0; index < this.payList.list.length; index++) {
                                const item = this.payList.list[index];
                                if (item.value == this.paydetailList.paytype) {
                                    newList.push(item);
                                }
                            }
                            this.payList.list = newList;
                            // 查询当前五折是否可用接口
                            if (this.phoneNumber) this.checkFivego();
                        }
                    }
                }).catch(() => {
                    Toast.fail({message: '服务器出了点小问题！', duration: 4000});
                })
            },
            // 循环判断是否有按钮需要置灰方法
            isRadioDisable() {
                this.orderList.list = [];
                // let orderObjArr = ['4'];
                let orderObjArr = [];
                for (let index = 0; index < this.detailList.length; index++) {
                    const item = this.detailList[index];
                    // 套餐选择穷举
                    for (const key in this.orderList.obj) {
                        if (this.orderList.obj.hasOwnProperty(key)) {
                            if (item.tc == key) {
                                orderObjArr.push(item.tc);
                            }
                        }
                    }
                    // for (let j = 0; j < this.orderList.list.length; j++) {
                    //     let order = this.orderList.list[j];
                    //     if (item.tc == order.value) {
                    //         order.disable = false;
                    //     }
                    // }
                }
                orderObjArr = Array.from(new Set(orderObjArr)); // 数组去重
                for (let index = 0; index < orderObjArr.length; index++) {
                    const item = orderObjArr[index];
                    if (this.orderList.obj[item]) {
                        this.orderList.list.push({
                            label: [this.orderList.obj[item]],
                            value: item,
                        })
                    }
                }
                // 登录的情况下判断套餐是否可以选择
                if (this.userInfo.provinceCode !== null && this.userInfo.iswhite == 0) {
                    for (let index = 0; index < this.orderList.list.length; index++) {
                        const order = this.orderList.list[index];
                        // 判断套餐是否置灰的标志
                        let orderFlag = false;
                        for (let i = 0; i < this.detailList.length; i++) {
                            const item = this.detailList[i];
                            if (order.value == item.tc && (item.provincecode == '' || item.provincecode == 0 || item.provincecode.indexOf(this.userInfo.provinceCode) != -1)) {
                                orderFlag = true;
                                break;
                            }
                        }
                        if (!orderFlag) order.disable = true;
                    }
                }
                this.judgeRadio();
            },
            // 查询当前五折是否可用
            checkFivego() {
                let headers = {'phone': this.orderObject.mobile};
                let data = {
                    proId: this.paydetailList.proid,
                    salesId: this.paydetailList.saleid,
                }
                queryAcceptFivego(data, headers).then((response) => {
                    if (response.data.resultCode == 0) {
                        this.canBuyFivego = response.data.data;
                    } else if (response.data.resultCode == -119) {
                        Toast.fail({message: '该产品为非五折产品', duration: 4000});
                    } else if (response.data.resultCode == -133) {
                        Toast.fail({message: '该五折商品一月只能订购一次哦', duration: 4000});
                    }
                })
            },

            // 返回改变swipe的index
            changeSwipe(index) {
                this.mid = this.goodsList[index].mid;
                // 复原支付方式和五折产品参数
                this.isFivego = 0;
                this.canBuyFivego = 1;
                this.payList.list = [
                    {
                        label: ['话费支付', '单次点播'],
                        value: '1',
                        disable: true,
                        hidden: false,
                    }, {
                        label: ['话费支付', '连续包月'],
                        value: '2',
                        disable: true,
                        hidden: false,
                    }
                    // , {
                    //     label: ['支付宝支付', '单次点播'],
                    //     value: '3',
                    //     disable: true,
                    //     hidden: false,
                    // }, {
                    //     label: ['微信支付', '单次点播'],
                    //     value: '4',
                    //     disable: true,
                    //     hidden: false,
                    // }
                ];
                if (!this.isFristLoad) {
                    this.$router.replace({name: 'goodsDetail', params: {mid: this.mid}});
                    this.changeInitialize(this.goodsList[index].mid);
                }
                this.isFristLoad = false;
            },
            // 返回对应子组件的radio值
            changeRadio(value, radioObj) {
                if (this.isFristChangeRadio) {
                    this.isFristChangeRadio = false;
                } else {
                    this.isCantOrder = false;
                }
                if (radioObj.eng == 'order') {
                    this.order = radioObj.obj[value];
                    this.judgeRadio()
                }
                if (radioObj.eng == 'pay') {
                    this.pay = radioObj.obj[value];
                }
                // 更换组策略
                for (let index = 0; index < this.detailList.length; index++) {
                    const item = this.detailList[index];
                    if (item.tc == this.orderList.value && item.paytype == this.payList.value) {
                        this.paydetailList = item;
                        this.goodsName = item.name;
                    }
                }
            },
            // 更改一级套餐选择时，列出对应的支付方式组
            judgeRadio() {
                let flag = false; // 判断支付方式是否存在的标识
                // 重置支付方式的状态
                for (let index = 0; index < this.payList.list.length; index++) {
                    const item = this.payList.list[index];
                    item.disable = true;

                    // 根据浏览器判断
                    if (item.value == 3 && this.isAli) {
                        this.payList.list[index + 1].hidden = true;
                    }
                    if (item.value == 4 && this.isWeixin) {
                        this.payList.list[index - 1].hidden = true;
                    }
                }
                // 二级选项栏重新赋值
                for (let index = 0; index < this.detailList.length; index++) {
                    const item = this.detailList[index];
                    if (item.tc == this.orderList.value) {
                        for (let k = 0; k < this.payList.list.length; k++) {
                            let pay = this.payList.list[k];
                            if (item.paytype == pay.value) {
                                if (this.userInfo.provinceCode == null) {
                                    pay.disable = false;
                                } else {
                                    if ((item.provincecode == '' || item.provincecode == 0 || item.provincecode.indexOf(this.userInfo.provinceCode) != -1) || this.userInfo.iswhite == 1) {
                                        pay.disable = false;
                                    }
                                }
                            }
                        }
                        // 判断当前支付方式是否存在
                        if (item.paytype == this.payList.value) {
                            if (this.userInfo.provinceCode == null) {
                                flag = true;
                            } else {
                                if ((item.provincecode == '' || item.provincecode == 0 || item.provincecode.indexOf(this.userInfo.provinceCode) != -1) || this.userInfo.iswhite == 1) {
                                    flag = true;
                                }
                            }
                        }
                    }
                }
                if (!flag) { // 如果当前套餐没有对应的支付，则选择该套餐第一个可行支付
                    for (let index = 0; index < this.detailList.length; index++) {
                        const item = this.detailList[index];
                        if (item.tc == this.orderList.value && !this.payList.list[item.paytype - 1].hidden
                            && !this.payList.list[item.paytype - 1].disable) {
                            if (this.popupShow) {
                                this.$refs.popupPay.radio = item.paytype;
                            }
                            if (!this.popupShow) {
                                this.$refs.radioPay.radio = item.paytype;
                            }
                            break;
                        }
                    }
                }
                // let isFlag = false; // 判断是否有相同的情况 true:有相同的情况 false:没有相同的情况
                // for (let index = 0; index < this.detailList.length; index++) {
                //     const item = this.detailList[index];
                //     // order的情况 判断pay的情况
                //     if (item.tc == this.orderList.value && item.paytype == this.payList.value) {
                //         isFlag = true;
                //     }
                // }
                // if (!isFlag) { // 当isFlag为false证明没有此策略，需自动选择已有的策略
                //     for (let index = 0; index < this.detailList.length; index++) {
                //         const item = this.detailList[index];
                //         // order的情况 判断pay的情况
                //         if (type == 'order' && item.tc == this.orderList.value) {
                //             // 判断此时popup的状态
                //             if (this.popupShow) {
                //                 this.$refs.popupPay.radio = item.paytype;
                //             } else {
                //                 this.$refs.radioPay.radio = item.paytype;
                //             }
                //             break;
                //         }
                //         if (type == 'pay' && item.paytype == this.payList.value) {
                //             // 判断此时popup的状态
                //             if (this.popupShow) {
                //                 this.$refs.popupOrder.radio = item.tc;
                //             } else {
                //                 this.$refs.radioOrder.radio = item.tc;
                //             }
                //             break;
                //         }
                //     }
                // }
            },
            // 呼出弹出层
            showPopup() {
                this.popupShow = true;
            },
            // 改变popup中的radio
            changePopup() {
                setTimeout(()=> {// 异步一下等待元素注册
                    this.$refs.popupOrder.radio = this.orderList.value;
                    this.$refs.popupPay.radio = this.payList.value;
                })
            },
            // 关闭弹出层
            closePopup() {
                this.orderList.value = this.$refs.radioOrder.radio;
                this.payList.value = this.$refs.radioPay.radio;
                this.order = this.orderList.obj[this.orderList.value];
                this.pay = this.payList.obj[this.payList.value];
            },
            // 改变原有的策略
            changeSelect() {
                this.$refs.radioOrder.radio = this.$refs.popupOrder.radio;
                this.$refs.radioPay.radio = this.$refs.popupPay.radio;
                this.popupShow = false;
            },
            // 立即订购
            orderFunc() {
                // 如果为空
                if (this.detailList.length == 0 || this.detailList == null) {
                    Toast.fail({message: '此商品已经下架或不存在', forbidClick: true, duration: 4000});
                }
                // 五折登录非会员的处理
                if (this.isFivego && !this.isVip && this.phoneNumber) {
                    this.$router.push({name: 'vipBenefit'});
                    return false;
                }
                // 五折登录会员不能购买处理
                if (this.isFivego && this.isVip && !this.canBuyFivego) {
                    return false;
                }
                if (this.isCantOrder) {
                    Toast.fail('您好，本省号码暂未上架本产品，可看看其他商品哦~');
                    return false;
                }
                // 判断是否登录
                if (!this.phoneNumber) { // 跳转到登录页面
                    if (this.paydetailList.proid != this.$route.params.proid && this.paydetailList.saleid != this.$route.params.saleid){
                        this.$router.replace({name: 'goodsDetail', params: {mid: this.mid, proid: this.paydetailList.proid, saleid: this.paydetailList.saleid}});
                    }
                    let backUrl = encodeURIComponent(this.$route.fullPath + '?autobuy=true');
                    this.$router.push({name: 'login', query: {'backUrl': backUrl}});
                } else {
                    if (this.payList.value < '3') {
                        // 弹出二次确认框
                        // this.overlay = true;
                        this.payShow = true;
                    } else { // 第三方支付
                        const toast = Toast.loading({
                            message: '订购中,请稍等…',
                            forbidClick: true,
                            duration: 0,
                        });
                        let channelCode = this.sysInfo.channelCode?'?channelCode='+this.sysInfo.channelCode:'';
                        let data = {
                            tc: this.paydetailList.tc,
                            paytype: this.paydetailList.paytype,
                            productId: this.paydetailList.proid,
                            salesId: this.paydetailList.saleid,
                            mobile: this.orderObject.mobile,
                            channelCode: this.sysInfo.channelCode,
                            returnUrl: window.location.origin + '/transfer.html'+ channelCode,
                            paymentType: this.paymentTypeList[this.payList.value],
                        }
                        payOrderByH5(data).then((response) => {
                            toast.clear();
                            if (response.data.code == 0) {
                                window.location.href = response.data.data;
                            } else {
                                Toast.fail({message: '订购失败，请稍后重试哦！', duration: 4000});
                            }
                        }).catch(() => {
                            toast.clear();
                        })
                    }
                }
            },
            // 获取验证码
            getSms() {
                let that = this;
                sendSmsCode({mobile: this.orderObject.mobile}).then((response) => {
                    if (response.data.code == 0) {
                        // 倒计时逻辑
                        that.coutdownShow = true;
                        that.coutdownFunc();
                    } else {
                        Toast.fail('验证码跑丢了，稍后再试哦！');
                        // 去掉获取验证码失败跳转逻辑
                        // this.$router.replace({name: 'goodsDetail', params: {mid: this.mid, proid: this.paydetailList.proid, saleid: this.paydetailList.saleid}});
                        // let backUrl = encodeURIComponent(this.$route.fullPath + '?autobuy=true');
                        // this.$router.replace({name: 'login', query: {'backUrl': backUrl}});
                    }
                })
            },
            // 倒计时方法
            coutdownFunc() {
                if (this.coutdownTime == 0) {
                    this.coutdownShow = false;
                    this.coutdownTime = 60;
                    return;
                }
                this.coutdownTime--;
                setTimeout(() => {
                    this.coutdownFunc();
                }, 1000);
            },
            // 退订的方法
            cancelBtn() {
                this.overlay = false;
            },
            // 购买的方法
            submitBtn() {
                let that = this;
                // 短信码不能为空
                if (this.orderObject.smsCode == ''){
                    Toast.fail('请输入验证码');
                    return false;
                }
                // 短信码六位数校验
                if (this.orderObject.smsCode.length != 6){
                    Toast.fail('请输入六位验证码');
                    return false;
                }
                // 如果手机号为空，则跳转到登录页
                if (this.orderObject.mobile == '') {
                    this.$router.replace({name: 'goodsDetail', params: {mid: this.mid, proid: this.paydetailList.proid, saleid: this.paydetailList.saleid}});
                    let backUrl = encodeURIComponent(this.$route.fullPath + '?autobuy=true');
                    this.$router.replace({name: 'login', query: {'backUrl': backUrl}});
                    return false;
                }
                const toast = Toast.loading({
                    message: '订购中,请稍等…',
                    forbidClick: true,
                    duration: 0,
                });
                // 校验短信验证码
                // checkSmsCode(this.orderObject).then((response) => {
                //     if (response.data.code == 0) {
                //         // 调用立即订购接口
                //         let headers = {'phone': this.orderObject.mobile};
                //         let data = {
                //             proId: this.paydetailList.proid,
                //             name: this.paydetailList.name,
                //             salesId: this.paydetailList.saleid,
                //             channelCode: '',
                //             dealType: 0,
                //             isPay: 1,
                //             payType: 10,
                //             amount: this.paydetailList.price,
                //             orderWay: this.payList.value,
                //             smsCode: this.orderObject.smsCode,
                //         }
                //         placeOrder(data, headers).then((r) => {
                //             toast.clear();
                //             if (r.data.resultCode == 0) {
                //                 that.$router.push({name: 'myOrder', params: {type:'all'}});
                //             } else {
                //                 Toast.fail(r.data.msg);
                //             }
                //         }).catch(() => {
                //             toast.clear();
                //         })
                //     } else if (response.data.code == -1){
                //         toast.clear();
                //         Toast.fail('验证码不正确，请重新输入。');
                //     } else {
                //         toast.clear();
                //         Toast.fail(response.data.msg);
                //     }
                // }).catch(() => {
                //     toast.clear();
                // })
                let headers = {'phone': this.orderObject.mobile};
                let data = {
                    proId: this.paydetailList.proid,
                    name: this.paydetailList.name,
                    salesId: this.paydetailList.saleid,
                    channelCode: this.sysInfo.channelCode ,
                    dealType: 0,
                    isPay: 1,
                    payType: 10,
                    amount: this.paydetailList.price,
                    orderWay: this.payList.value,
                    smsCode: this.orderObject.smsCode,
                }
                placeOrder(data, headers).then((r) => {
                    toast.clear();
                    if (r.data.resultCode == 0) {
                        Toast.success({message: '订购成功啦,快去体验吧！', duration: 4000});
                        that.$router.push({name: 'myOrder', params: {type:'all'}});
                    } else if(r.data.resultCode == -1 && r.data.data.code == -1) {
                        Toast.fail({message: '请输入正确的验证码哦', duration: 4000});
                    } else if(r.data.resultCode == -102) {
                        Toast.fail({message: '订购异常,请稍后重试!', duration: 4000});
                    } else if(r.data.resultCode == -117) {
                        Toast.fail({message: '退订异常,请稍后重试！', duration: 4000});
                    } else if(r.data.resultCode == -116) {
                        Toast.fail({message: '退订异常,请稍后重试！', duration: 4000});
                    } else if(r.data.resultCode == -113) {
                        Toast.fail({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                    } else if(r.data.resultCode == -118) {
                        Toast.fail({message: r.data.msg, duration: 4000});
                    } else if(r.data.resultCode == -112) {
                        Toast.fail({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                    } else if(r.data.resultCode == 4) {
                        Toast.fail({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                    } else {
                        Toast.fail({message: r.data.msg, duration: 4000});
                    }
                }).catch(() => {
                    toast.clear();
                })
            },
        },
    }
</script>

<style scoped lang="less">
    #goods-detail{
        font-family:Source Han Sans CN;
        color: #383A3F;
        min-height: calc(~"100vh - 1.59rem");
        background: #F5F7FA;
        padding-bottom: 1.59rem;
        .goods-swiper-wrap{
            padding: .2rem 0;
            background: #FFF;
        }
        .goods-vip-wrap{
            background: #fff;
            .goods-vip-icon{
                width: 6.19rem;
                height: 1.11rem;
                margin: 0 auto;
                background-image: url('../assets/imgs/goodsdetail/vipBtn.png');
                background-size: 6.19rem 1.11rem;
                position: relative;
                .goods-vip-button{
                    position: absolute;
                    width: 1.35rem;
                    height: .55rem;
                    top: .32rem;
                    right: .2rem;
                }
            }
        }
        .radio-wrap{
            background: #FFF;
            padding: 0 .35rem;
            padding-right: 0;
            .order-radio{
                // padding-bottom: .26rem;
                border-bottom: .01rem solid #d7d9db;
            }
            .pay-radio{
                padding: .26rem 0 .36rem;
            }
        }
        .detail-card{
            background: #FFF;
            margin-top: .16rem;
        }
        .payment-wrap{
            position: fixed;
            width: 100%;
            bottom: 0;
            background: #FFF;
            font-size: 0;
            border-top: 1px solid #DBDBDB;
            padding: .22rem 0 .49rem;
            z-index: 1;
            div{
                display: inline-block;
                height: .88rem;
                vertical-align: top;
            }
            .payment-font{
                width: calc(~"100% - 3.61rem");
                padding-left: .35rem;
                .payment-font-wrap{
                    display: flex;
                    flex-flow: column;
                    .payment-font-con{
                        flex: 1;
                        width: 100%;
                        align-items: center;
                        display: inline-block;
                        font-size: .26rem;
                        text-align: left;
                        vertical-align: middle;
                        display: flex;
                        align-items: center;
                        .payment-font-con-color{
                            color: #FF8666;
                            max-width: 2.2rem;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .select-icon{
                            margin-left: .08rem;
                            display: flex;
                            .select-icon-img{
                                width: .2rem;
                                height: .1rem;
                            }
                        }
                    }
                }
            }
            .payment-button{
                width: 3rem;
                padding-right: .26rem;
                // background: #FF8666;
                transition: opacity .2s;
                color: #FFF;
                font-size: .26rem;
                &:active{
                    opacity: .8;
                }
                .payment-button-con{
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    background: #FF8666;
                    border-radius: 1rem;
                    p{
                        flex: 1;
                        margin: 0;
                    }
                    .payment-button-con-price{
                        font-size: .22rem;
                    }
                    .payment-button-con-buy{
                        display: flex;
                        align-items: center;
                    }
                }
                .payment-button-con-gray{
                    background: #BDBFC2;
                }
            }
        }
        .overlay-box{
            .overlay-input-wrap{
                padding: 0 .6rem .4rem;
                border-bottom: 1px dashed #888;
                .overlay-ipt{
                    border-bottom: 1px dashed #888;
                    .van-cell-group{
                        &:after{
                            border-width: 0;
                        }
                    }
                    .van-cell{
                        padding: .25rem 0;
                        font-size: .32rem;
                        .van-field__button{
                            .van-button{
                                padding: 0;
                                margin-right: 0.27rem;
                                border: 0;
                                font-size: .28rem;
                                color: #6696FF;
                            }
                        }
                    }
                }
            }
            .overlay-detail{
                margin: .4rem 0 .55rem;
                font-size: .32rem;
                color: #0F0B1A;
                opacity: .6;
                text-align: left;
                padding: 0 .6rem;
            }
        }
        .overlay-popup{
            box-sizing: border-box;
            padding: .6rem .35rem .5rem .35rem;
            border-top-left-radius: .16rem;
            border-top-right-radius: .16rem;
            font-size: 0;
            .close-popup{
                position: absolute;
                right: .35rem;
                width: .5rem;
                height: .5rem;
                z-index: 9999;
            }
            .popup-title{
                font-size: .36rem;
                text-align: left;
            }
            .popup-price{
                margin: .4rem 0 .3rem;
                font-size: .36rem;
                span{
                    font-size: .6rem;
                }
            }
            .popup-detail{
                margin-bottom: .6rem;
                .popup-detail-icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 1.2rem;
                    height: 1.2rem;
                    margin-right: .24rem;
                }
                .popup-detail-font{
                    display: inline-block;
                    width: calc(~"100% - 1.44rem");
                    vertical-align: top;
                    .popup-detail-font-con{
                        display: flex;
                        height: 1.2rem;
                        flex-flow: column;
                        align-items: center;
                        text-align: left;
                        color: #0F0B1A;
                        span{
                            flex: 1;
                            width: 100%;
                            display: flex;
                        }
                        .popup-detail-font-name{
                            font-size: .36rem;
                            opacity: .8;
                            align-items: flex-end;
                        }
                        .popup-detail-font-fee{
                            font-size: .3rem;
                            color: #6696FF;
                            opacity: .8;
                            align-items: flex-start;
                        }
                    }
                }
            }
            .popup-radio{
                margin-bottom: .57rem;
                .popup-order-radio{
                    // padding-bottom: .26rem;
                    border-bottom: .01rem solid #d7d9db;
                    margin-bottom: .2rem;
                }
            }
            .popup-input{
                margin-bottom: .69rem;
                .popup-ipt{
                    border-bottom: 1px solid #d7d9db;
                    .van-cell-group{
                        &:after{
                            border-width: 0;
                        }
                    }
                    .van-cell{
                        padding: .25rem 0;
                        font-size: .32rem;
                        .van-field__button{
                            .van-button{
                                padding: 0;
                                margin-right: 0.27rem;
                                border: 0;
                                font-size: .28rem;
                                color: #6696FF;
                            }
                        }
                    }
                }
            }
            .popup-btn{
                width: 6rem;
                height: .88rem;
                line-height: .88rem;
                font-size: .36rem;
                color: #FFF;
                background: #FE8668;
                text-align: center;
                border-radius: 2rem;
                margin: 0 auto;
                transition: opacity .2s;
                &:active{
                    opacity: .8;
                }
            }
            .submit{
                background: #6696FF;
                color: #FFF;
            }
        }
    }
</style>
