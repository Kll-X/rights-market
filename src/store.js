import Vue from 'vue'
import Vuex from 'vuex'
import {CHANNELCODE} from "@/utils/constant";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
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
            isVip:'',
            expireTime:'',
            cancelFlag:'',
            hasNewGift:'',
            vipTypeTag:['全网会员','5G高级会员'],
            vipLevelTag:['普通','黄金','铂金'],
            vipType:'',
            vipLevel:'',
            effectTime:'',
            returnOrderId:'',
            effect:'',
            effectDaysBefore:''
        },
        showQuickLogin: false,
        sysInfo: {
            channelCode:'',
            channel: 'all',
            locationCode: ''
        }
    },
    mutations: {
        SET_USERINFO: (state, userinfo) => {
            Object.assign(state.userInfo, userinfo);
        },
        SET_SHOWQUICKLOGIN: (state, boolean) => {
            state.showQuickLogin = boolean;
        },
        SET_CHANNEL:(state, code) => {
            switch (+code) {
                case CHANNELCODE.st: state.sysInfo.channel = 'st';state.sysInfo.channelCode = +code;break;
                case CHANNELCODE.wx: state.sysInfo.channel = 'wx';state.sysInfo.channelCode = +code;break;
                default: state.sysInfo.channel = 'all';state.sysInfo.channelCode = CHANNELCODE.all;
            }
        },
        SET_SYSINFO: (state, sysInfo) => {
            Object.assign(state.sysInfo, sysInfo);
        }
    },
    actions: {}
})