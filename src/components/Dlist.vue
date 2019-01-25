<template>
  <div type="toolbar" title="Toolbar" class="option-demo">
    <div slot="content" v-bind:style="styleObject">
      <cube-scroll
      ref="scroll"
      :data="articles"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

          <div  v-if="articles==''" class="nojl">
              暂无记录
          </div>

          <div class="content" v-for="(item, index) in articles" :key="index" >
            <div class="top">
                <div class="title" >
                  {{item.id}}
                </div>
                <div class="cent">{{item.time}}</div>
            </div>
            <div class="cont">
              名称：{{item.name}} <br>
              电话：{{item.phone}} <br>
            </div>
            <div class="shb">
                <div class="titlebtn">
                  查看详情
                </div>
                
                <div class="titlebtn luru" @click="decail(item.id)" >
                  点击录入
                </div>

            </div>
          </div>
      </cube-scroll>

    </div>


  </div>
</template>


<script>
export default {
  data() {
    return {
      page:1,
      styleObject: {
        height:0
      },
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 0,
            txt: {
            more: '上拉加载更多...',
            noMore: '没有更多数据...'
          }
        }
      },
      //测试数据
      articles: [
        {
          'id':20190101,
          'time':'2019年1月1日',
          'name':'张三',
          'phone':'17774893133'
        },
        {
          'id':20190101,
          'time':'2019年1月1日',
          'name':'张三',
          'phone':'17774893133'
        },
        {
          'id':20190101,
          'time':'2019年1月1日',
          'name':'张三',
          'phone':'17774893133'
        },
        {
          'id':20190101,
          'time':'2019年1月1日',
          'name':'张三',
          'phone':'17774893133'
        },
        {
          'id':20190101,
          'time':'2019年1月1日',
          'name':'张三',
          'phone':'17774893133'
        },
      ],
      ////正式环境
      // articles:[],
    };
  },
  mounted () {
    //获取屏幕高度
    this.styleObject.height = ((document.documentElement.clientHeight || document.body.clientHeight)-2)+'px';
    //初始化数据
    this.depList(1);
  },
  methods: {

    //获取首页初始化信息
    depList(page){
      var that=this;

      //测试测试
      var dlist = [
        {
          'id':20190102,
          'time':'2019年1月2日',
          'name':'李四',
          'phone':'17774893122'
        },
      ];
      that.articles=that.articles.concat(dlist);

      /**********正式环境 通过请求获取数据 ************/
      // that.axios.post("http://wxgzh.liuzhouchuyun.com/dlist",
      //     that.qs.stringify({
      //         openid:window.sessionStorage.getItem('openid'),
      //         page:page
      //     }),
      //   )
      //   .then(res=> {
      //       console.log("初始化：",res.data.data);
      //       var dlist=res.data.data.dlist;
      //       if(dlist==''&&that.$refs.scroll!=undefined){
      //         that.$refs.scroll.forceUpdate()
      //       }else{
      //         that.page=page+1;
      //         that.articles=that.articles.concat(res.data.data.dlist);
      //       }
      //     }
      //   )

    },

    /**点击录入 */
    decail(id) {
      //带参传值 ，跳转的两种方式
      // this.$router.push({ path: "supervision", query: { id: id } }); 
      // this.$router.push({name:'Supervision',params:{id:id}}) 
    },


    // TODO 下拉刷新
    onPullingDown: function(){
      console.log("下拉刷新");
      // 如果有最新数据，数组开头追加数据
      this.articles=[];
      setTimeout(() => {
         this.depList(1);
      }, 1000)
    },
    //TODO 上拉加载
    onPullingUp: function() {
      console.log("上拉加载");
      //延迟
      setTimeout(() => {
        this.depList(this.page);
      }, 1000)
    },

  }
};
</script>

<style lang="stylus" >
.nojl{
  margin-top :30px;
}

.content {
  width :100%;
  background-color: #ffffff;
  display: flex !important;
  flex-direction: column !important;
  margin-bottom: 20px;
  padding: 0px 0px !important;
}

.top {
  width: 90%;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
}

.shb {
  width: 90%;
  height: 40px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 10pt;
  padding-left: 5%;
  padding-right: 5%;
}

.cont {
  width: 90%;
  text-align: left;
  font-size: 10pt;
  margin: 0px 5%;
  color: #9599A0;
  line-height: 15pt;
  padding: 10px 0px;
  border-top: 2px solid #FAFAFA;
  border-bottom: 2px dashed #FAFAFA;
}

.content .title {
  color: #666666;
}

.titlebtn{
  font-size :8pt;
  background-color :#444654;
  color: #ffffff;
  border-radius :2px;
  line-height: 22pt;
  padding: 0px 10px;
}

.luru{
  background-color :#fc9153;
}

.content .cent {
  font-size: 10pt;
  color: #CCCCCC;
}

.stac {
  font-size: 10pt;
}

.nop {
  color: #FF0000;
}

.alp {
  color: #0DBC79;
}

.inp {
  color: #C66D3B;
}

.seed {
  color: #9599A0;
  font-size: 8pt;
}

.orange{
  color: #fc9153
}

.cube-toolbar-item {
    background-color: #4a4c5b !important;
}

.cube-toolbar-item .cube-btn{
  color:#ffffff !important;
}
</style>