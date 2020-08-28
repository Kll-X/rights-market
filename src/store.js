import Vue from 'vue'
import Vuex from 'vuex'
import {CHANNELCODE} from "@/utils/constant";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            id:'',
            avatar: require('@imgs/home/avatar@2x.png'),
            token: '',
            userInformation: '',
            phone: '',
            phoneMask: '',
            phoneShow: '',
            phoneMaskShow: '',
            timestamp: '',
            provinceCode: null,
            iswhite:0,
            vipInfo:'',
            newStarVipInfo:''
            // isVip:'',
            // orderId:'',
            // expireTime:'',
            // cancelFlag:'',
            // hasNewGift:'',
            // vipTypeTag:['全网会员','5G高级会员'],
            // vipLevelTag:['普通','黄金','铂金'],
            // vipType:'',
            // vipLevel:'',
            // effectTime:'',
            // returnOrderId:'',
            // effect:'',
            // effectDaysBefore:''
        },
        showQuickLogin: false,
        sysInfo: {
            channelCode:'',
            channel: 'all',
            locationCode: '',
            selfChannelCode:'00020001',
            interval:0
        }
    },
    mutations: {
        SET_USERINFO: (state, userinfo) => {
            Object.assign(state.userInfo, userinfo);
        },
        SET_SHOWQUICKLOGIN: (state, boolean) => {
            state.showQuickLogin = boolean;
        },
        SET_CHANNEL: (state, code) => {
            switch (+code) {
                case 0 : state.sysInfo.channel = 'wx';break;
                case 1 : state.sysInfo.channel = 'st';break;
            }
            
        },
        SET_CHANNELCODE:(state, code) => {
            console.log(code)
            switch (+code) {
                case CHANNELCODE.st: state.sysInfo.channelCode = +code;state.sysInfo.selfChannelCode='00010017';break;
                case CHANNELCODE.wx: state.sysInfo.channelCode = +code;break;
                case CHANNELCODE.group: state.sysInfo.channelCode = +code;break;
                case CHANNELCODE.sms: state.sysInfo.channelCode = +code;break;
                case CHANNELCODE.banner: state.sysInfo.channelCode = +code;break;
                default: state.sysInfo.channelCode = CHANNELCODE.all;
            }
        },
        SET_SELFCHANNEL:(state, code) => {
            state.sysInfo.selfChannelCode = code;
            // if (SELFCHANNELCODE.indexOf(code)>-1) {
            //     state.sysInfo.selfChannelCode = code;
            //     if (code == '00010017') {
            //         state.sysInfo.channel = 'st'
            //     }
            // } else {
            //     state.sysInfo.selfChannelCode = '00020001';
            // }
        },
        SET_SYSINFO: (state, sysInfo) => {
            Object.assign(state.sysInfo, sysInfo);
        }
    },
    actions: {}
})