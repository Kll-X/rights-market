import { pagelog,blocklog } from "@/api/common";
import { mapState } from 'vuex'

export const pagelogMixin = {
    computed:{
        ...mapState([ 
            "userInfo" ,
            "sysInfo"
        ])
    },
    mounted() {
        //统计页面数据
        pagelog({
            phone: this.userInfo.phone
        },{
            "isvip":this.userInfo.isVip,//是否会员
            "chanelcode":this.sysInfo.selfChannelCode,//超市渠道号
            "chanelcode3":this.sysInfo.channelCode,//三级渠道号
            "cur_url":location.href,//当前页面url
            "up_url":location.origin+'/'+location.search+'#'+window.preRoute.path,//上个页面url
            "mid":"",//权益会员id
            "mname":""// 权益会员名称
        });
    }
}

export const blocklogMixin = {
    computed:{
        ...mapState([ 
            "userInfo" ,
            "sysInfo"
        ])
    },
    methods: {
        //统计模块数据,positionid不传时为统计曝光，一般情况下曝光埋点埋在本组件或者父组件的created中
        blocklogHandler(blockname,blockid,positionid='',jumpurl='',mid,mname){
            console.log(arguments)
            blocklog({
                phone: this.userInfo.phone
            },{
                "isvip": this.userInfo.isVip,
                "chanelcode":this.sysInfo.selfChannelCode,//超市渠道号
                "chanelcode3":this.sysInfo.channelCode,//三级渠道号
                "cur_url":location.href,//当前页面url
                "up_url":location.origin+'/'+location.search+'#'+window.preRoute.path,//上个页面url
                "blockid":blockid,//模块id
                "blockname":blockname,// 模块名称,
                "positionid": positionid,//位置id
                "jumpurl":jumpurl,  //跳转地址
                "mid": mid, //权益会员id
                "mname": mname //权益会员名称
            })
        }
    }
}