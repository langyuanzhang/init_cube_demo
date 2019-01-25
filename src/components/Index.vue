<template>
  <div>
    <div class="fontsa">
      <div class="apply itop">标题标题</div>

      <div class="thep" @click="zxApply">
        <img class="pic ijs" src="../assets/zxsq.png">
        <label>表单提交</label>
      </div>

      <div class="thep" @click="bxApply">
        <img class="pic ils" src="../assets/bxsq.png">
        <label>上拉下拉</label>
      </div>

      <div class="thep">
        <img class="pic ivs" src="../assets/ydsq.png">
        <label>暂不开放</label>
      </div>

      <div class="thep">
        <img class="pic ihs" src="../assets/zxjl.png">
        <label>暂不开放</label>
      </div>

      <div class="thep">
        <img class="pic izs" src="../assets/bxjl.png">
        <label>暂不开放</label>
      </div>

      <div class="thep">
        <img class="pic ios" src="../assets/ydjl.png">
        <label>暂不开放</label>
      </div>

      <div class="thep">
        <img class="pic ixs" src="../assets/ysjl.png">
        <label>暂不开放</label>
      </div>
    </div>

    <div class="fontsa">
      <div class="apply itop">测试使用</div>

      <div class="thep">
        <img class="pic ijs" src="../assets/xc.png">
        <label>暂不开放</label>
      </div>

      <div class="thep">
        <img class="pic ils" src="../assets/fk.png">
        <label>暂不开放</label>
      </div>
    </div>

    <div class="fontsa ibom">
      <div class="apply itop">测试使用</div>

      <div class="thep">
        <img class="pic ijs" src="../assets/zxsh.png">
        <label>暂不开放</label>
      </div>

      <div class="thep">
        <img class="pic ils" src="../assets/bxsh.png">
        <label>暂不开放</label>
      </div>

      <div class="thep">
        <img class="pic ivs" src="../assets/ydsh.png">
        <label>暂不开放</label>
      </div>

      <div class="thep">
        <img class="pic izs" src="../assets/ys.png">
        <label>暂不开放</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staff: 0,
      ifgcb: 0,
      ifaqk: 0,
      position: 0
    };
  },
  created() {
    //获取openid，正式环境下获取的微信个人信息
    // this.getUserInfo();

    //测试环境下的个人信息
    var that = this;
    window.sessionStorage.setItem("openid", "oX0621BFlnSkN5SlghGgRvQHik61"); //保存缓存openid
  },
  methods: {
    /**
     * @description: 获取微信授权
     * @param {type}
     * @return:
     */
    getUserInfo() {
      var that = this;
      /**
       * 检测当前是否需要登录验证
       * 1. 确定当前页面是否需要登录
       */
      if (!window.sessionStorage.getItem("openid")) {
        // 微信授权
        if (!that.getUrlKey("code") || !that.getUrlKey("state")) {
          // 没有code 去授权获取code
          // 去授权
          // const URI = encodeURIComponent(window.location.href)
          var URI = "";
          var APPID = "11111111111"; // APPID是已知的公众号里有 必填！！！！！！
          //获取当前url路径，在回调地址中用
          if (window.location.href.indexOf("?") > 0) {
            URI = encodeURIComponent(window.location.href);
          } else {
            URI = encodeURIComponent(window.location.href.split("?")[0]);
          }

          //打开链接url
          var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID + "&redirect_uri=" + URI + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
          window.location.href = url;
        } else {
          // 有code通过code调后台接口去获取用户信息（uid、oppind等）

          console.log("code", that.getUrlKey("code")); //截取code
          //根据code获取openid
          that.axios
            .get("/testgetUserInfo", {
              params: {
                code: that.getUrlKey("code")
              }
            })
            .then(function(res) {
              console.log( "userinfo:", res.data.data, "------openid:",res.data.data.openid);
              that.getALLinfo(res.data.data.openid); //获取信息
            });
        }
      } else {
        that.getALLinfo(window.sessionStorage.getItem("openid"));
      }
    },

    /**
     * @description: 截取code
     * @param {type} 
     * @return: 
     */
    getUrlKey(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },

    /**
     * @description: 请求服务器
     * @param {type} 
     * @return: 
     */
    getALLinfo(openid) {
      var that = this;
      const toast = that.$createToast({
        time: 0,
        txt: "加载中"
      });
      toast.show(); //显示加载提示
      that.axios
        .get("/getAllInfo", {
          params: {
            openid: openid
          }
        })
        .then(res => {
          window.sessionStorage.setItem("openid", res.data.data.openid); //保存缓存openid
          toast.hide(); //关闭加载提示
        });
    },

    /**点击装修 */
    zxApply() {
      this.$router.push({ name: "Home", params: { id: "1" } });
    },
    /**点击报修 */
    bxApply() {
      this.$router.push({ name: "Dlist" });
    }
  }
};
</script>

<style lang="stylus">
.fontsa {
  font-size: 8pt;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-bottom: 1px solid #EEEEEE;
}

.pic {
  width: 48px;
  height: 48px;
  border-radius: 10%;
  margin-bottom: 10px;
}

.ijs {
  background-color: #FFAE27;
}

.ils {
  background-color: #61CBFF;
}

.ihs {
  background-color: #DB98FF;
}

.izs {
  background-color: #00E4A7;
}

.ivs {
  background-color: #99DF2E;
}

.ios {
  background-color: #FF87AB;
}

.ixs {
  background-color: #FDDC69;
}

.thep {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.apply {
  width: 90%;
  font-size: 14pt;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 20px;
  line-height: 24pt;
  color: #4A4C5B;
}

.itop {
  margin-top: 30px;
}

.ibom {
  padding-bottom: 50px;
}
</style>