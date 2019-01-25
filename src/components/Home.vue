<template>
  <div type="toolbar" title="Toolbar" class="option-demo newpad">
    <div slot="content">
      <div class="options">
        <div class="option-list">
        <!-- <cube-form :model="model" @validate="validateHandler" @submit="submitHandler"> -->
        <cube-form :model="model" @validate="validateHandler">
          <cube-form-group class="cfg">
          <cube-form-item :field="fields[0]" class="cfi"></cube-form-item>
          <cube-form-item :field="fields[1]" class="cfi"></cube-form-item>
          <cube-form-item :field="fields[2]" class="cfi"></cube-form-item>
          
          <cube-form-item :field="fields[3]" class="cfi">
            <cube-button class="cb" @click="showDatePicker(0)">{{model.addday || '请选择开工日期'}}</cube-button>
          </cube-form-item>

          <cube-form-item :field="fields[4]" class="cfi">
            <cube-button class="cb" @click="showDatePicker(1)">{{model.endday || '请选择完工日期'}}</cube-button>
          </cube-form-item>
          
          <cube-form-item :field="fields[5]" class="cfi"></cube-form-item>
          <cube-form-item :field="fields[6]" class="cfi"></cube-form-item>
          <cube-form-item :field="fields[7]" class="cfi"></cube-form-item>

          <cube-form-item :field="fields[8]" class="cfi ss"></cube-form-item>
          
          <cube-form-item :field="fields[9]" class="cfi"></cube-form-item>
          
          <cube-form-item :field="fields[10]" class="cfi"></cube-form-item>

          </cube-form-group>

          <cube-form-group class="hwhcl">
          <cube-button type="button" @click="submitHandler" :primary="true" class="hcbp">提交申请</cube-button>
          </cube-form-group>
          <div @click="showAlert" class="read"><i class="cubeic-right icon-right"></i> 《阅读有关规定》 </div>
          
        </cube-form>
      </div>
       </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { DatePicker } from "cube-ui";

export default {
  data() {
    return {
      checked: false,
      validity: {},
      valid: undefined,
      model: {
        id:"",
        address: "",
        name: "",
        phone: "",
        addday: "",
        endday: "",
        workname: "",
        workman: "",
        worktel: "",
        area: [],
        qita: "",
        bumen: "",
        chtime: 0,
      },
      fields: [
        {
          type: "input",
          modelKey: "address",
          label: "联系地址",
          props: {
            placeholder: "请输入地址",
          },
          rules: {
            required: true
          }
        },

        {
          type: "input",
          modelKey: "name",
          label: "业主名称",
          props: {
            placeholder: "请输入业主名称"
          },
          rules: {
            required: true
          }
        },

        {
          type: "input",
          modelKey: "phone",
          label: "联系电话",
          props: {
            placeholder: "请输入联系电话"
          },
          rules: {
            required: true
          }
        },

        {
          modelKey: "addday",
          label: "开工日期",
          rules: {
            required: true
          }
        },

        {
          modelKey: "endday",
          label: "完工日期",
          rules: {
            required: true
          }
        },
        {
          type: "input",
          modelKey: "workname",
          label: "单位",
          props: {
            placeholder: "请输入单位"
          },
          rules: {
            required: true
          }
        },

        {
          type: "input",
          modelKey: "workman",
          label: "负责人",
          props: {
            placeholder: "请输入负责人"
          },
          rules: {
            required: true
          }
        },

        {
          type: "input",
          modelKey: "worktel",
          label: "电话",
          props: {
            placeholder: "请输入电话"
          },
          rules: {
            required: true
          }
        },

        {
          type: "checkbox-group",
          modelKey: "area",
          label: "范围",
          props: {
            options: [
              {
                label: "中国",
                value: "0"
              },
              {
                label: "美国",
                value: "1"
              },
              {
                label: "英国",
                value: "2"
              },
            ]
          },
          rules: {
            required: true
          }
        },
        {
          type: "textarea",
          modelKey: "qita",
          label: "其他",
          debounce: 100,
          props: {
            maxlength: 1000,
            placeholder: '请输入其他内容',
          }
        },

        {
          type: "select",
          modelKey: "bumen",
          label: "审核部门",
          rules: {
            required: true
          },
          props: {
            options: [
              {
                value: 0,
                text: "业务部"
              },
              {
                value: 1,
                text: "市场部"
              },
            ],
            placeholder: "请选择审核部门"
          }
        }
      ],

      dlist:'',//部门列表
    };
  },
  mounted () {
    // window.sessionStorage.getItem('openid') //获取缓存中的openid
  },
  //弹窗createAPI
  created () {
    var id=this.$route.params.id
    console.log("接收",id)

    this.subscribeDialog = this.$createSubscribeDialog()
  }, 
  methods: {
    
    // 日期选择器
    showDatePicker(chtime) {
      console.log(this);
      this.model.chtime = chtime;
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "日期选择",
          value: new Date(),
          onSelect: (selectedTime, selectedText, formatedTime) => {
            if (this.model.chtime == 0) {
              this.model.addday = selectedText.join("-");
            } else {
              this.model.endday = selectedText.join("-");
            }
          },
          onCancel: this.cancelHandle
        });
      }

      this.datePicker.show();
    },

    /**注意事项 */
    showAlert() {
      this.subscribeDialog.show();
    },

    //表单提交
    submitHandler(e) {
      var that=this;
      //检验
      if(that.valid==false||this.model.name==""){  
        that.$createDialog({
          type: 'alert',
          title: '必填项不能为空',
          icon: 'cubeic-wrong',
          confirmBtn: {
            text: '确定',
          }
        }).show()
        return false;
      };

      //提交请求
      this.axios.post("http://www.baidu.com/theApply",
          this.qs.stringify({
            id:this.model.id,
            openid:window.sessionStorage.getItem('openid'),
          }))
        .then(
          function(res) {
            console.log(res)
            if(res.data.code==200){
              
              that.$createDialog({
                type: 'alert',
                icon: 'cubeic-alert',
                title: '提交成功',
                confirmBtn: {
                  text: '确定',
                  active: true,
                  disabled: false,
                  href: 'javascript:;'
                },
                onConfirm: () => {
                  //返回上一页
                  that.$router.go(-1);
                },
              }).show()

            }else{
              const toast = this.$createToast({
                //成功提示
                txt: res.data.msg,
                time: 3000,
                mask:true,
              });
              toast.show();
            }
          }.bind(this)
        );
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    }
  },

  components: {
    DatePicker
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.newpad{
  padding-top: 30px;
  padding-bottom: 130px;
}

.cfg {
  background-color: #FAFAFA;
}

.cfi {
  background-color: #ffffff;
  margin-bottom: 20px;
}

.ss {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.cb {
  background-color: #ffffff !important;
  color: #C0C0C0 !important;
}

.hcbp {
  width: 90% !important;
  margin-left: 5% !important;
}

.read {
  font-size: 10pt;
  background-color: #FAFAFA;
  text-align: left;
  padding: 15px 0px 0px 7%;
  display :flex;
  flex-direction:row;
  align-items: center;
  color:#3CA0E6;
}

.hwhcl {
  background-color: #FAFAFA;
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

.icon-right{
  color:#FC9153;
  font-size: 14pt;
}
</style>