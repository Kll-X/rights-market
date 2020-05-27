export default {  
    install(Vue)  
    {  
      Vue.prototype.Common = {
        getImgUrl : function (src) {  
          return src?(src.search("http")>-1||src.search("data:image")>-1)? src : process.env.VUE_APP_IMG_PRE + src:'';
       }
      }
    }  
  }  