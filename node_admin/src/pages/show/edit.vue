<template>
  <view class="content">
    <u-form
      ><u-form-item label="参与者" labelWidth="200rpx" required> </u-form-item
    ></u-form>
    <u-checkbox-group
      @change="checkboxGroupChange"
      ref="selectBox"
      placement="column"
      name="选择"
      v-model="checkedData"
      size="32"
    >
      <u-checkbox
        v-model="item.checked"
        v-for="(item, index) in list"
        :key="index"
        :name="item.name"
        :label="item.name"
        style="margin: 10rpx 20rpx"
      ></u-checkbox>
    </u-checkbox-group>
    <u--form
      :model="loginForm"
      ref="loginForm"
      class="login-form"
      labelPosition="top"
    >
      <u-form-item prop="date" label="日期" labelWidth="200rpx" required>
        <!-- <u--input
          v-model="loginForm.date"
          border="surround"
          placeholder="日期"
          clearable
        ></u--input> -->
        <u-button @click="dateShow = true" class="select_month">
          <view class="la">选择记录的日期-----------</view>
          <text class="content">{{ changeDate || "请选择日期" }}</text>
        </u-button>
      </u-form-item>
      <u-form-item>
        <view>
          <u-datetime-picker
            :show="dateShow"
            v-model="selectDate"
            mode="date"
            @confirm="chonfirmDate"
            @cancel="dateShow = false"
          ></u-datetime-picker>
        </view>
      </u-form-item>
      <u-form-item
        prop="password"
        label="合计（不带单位）"
        labelWidth="100%"
        required
      >
        <u--input
          v-model="loginForm.total"
          clearable
          border="surround"
          placeholder="合计"
        ></u--input>
      </u-form-item>
      <u-form-item prop="password" label="备注" labelWidth="200rpx" required>
        <u--textarea
          v-model="loginForm.remark"
          placeholder="备注"
          border="surround"
          height="20vh"
          style="border: 1px solid #000"
        ></u--textarea>
      </u-form-item>
      <u-button
        fontSize="18"
        type="primary"
        size="normal"
        text="提交编辑"
        shape="square"
        class="button-style"
        style="background: #ee3f4d"
        @click="submitForm"
      >
      </u-button>
      <u-button
        fontSize="18"
        type="primary"
        size="normal"
        text="查看记录"
        shape="square"
        style="background: #f1939c"
        class="button-style"
        @click="linkMonth"
      >
      </u-button>
      <u-button
        fontSize="18"
        type="primary"
        v-show="false"
        size="normal"
        text="导出"
        shape="square"
        style="background: #f40"
        class="button-style"
        @click="exportFile"
      >
      </u-button>
    </u--form>
    <br />
    <u-modal
      :show="modalshow"
      :title="title"
      :content="content"
      @confirm="modalshow = false"
    >
    </u-modal>
  </view>
</template>

<script>
import { editNote } from "../../http/modules/notes/note";
export default {
  data() {
    return {
      title: "hello",
      loginForm: {
        date: "",
        total: "",
        remark: "",
        zhou: "",
        xiao: "",
        wan: "",
        id: "",
      },
      dateShow: false,
      modalshow: false,
      title: "提示",
      changeDate: "",
      selectDate: "",
      content: "",
      list: [
        {
          name: "周",
          checked: true,
          key: "zhou",
          disabled: false,
        },
        {
          name: "肖",
          checked: true,
          key: "xiao",
          disabled: false,
        },
        {
          name: "万",
          checked: true,
          key: "wan",
          disabled: false,
        },
      ],
      checkedData: [],
      newObj: {},
    };
  },
  watch: {
    selectDate: {
      handler(val) {
        this.changeDate =
          new Date(this.selectDate).getMonth() +
          1 +
          "." +
          new Date(this.selectDate).getDate();
      },
    },
  },
  onLoad(e) {
    let data = JSON.parse(e.data);
    this.loginForm = data;
    let arr = data.date.split('.')
    let nowData = new Date(data.createDate)
    nowData.setMonth(Number(arr[0]-1))
    nowData.setDate(Number(arr[1]))
    this.selectDate = nowData +''
    console.log(this.selectDate, "this.selectDate");
    console.log(data, "-da");
    let arrs = [];
    if (data.zhou) {
      this.list[0].checked = true;
      let arr = this.list[0];
      this.list.splice(0, 1, arr);
      arrs.push("周");
    }
    if (data.xiao) {
      this.list[1].checked = true;
      let arr = this.list[1];
      this.list.splice(1, 1, arr);
      arrs.push("肖");
    }
    if (data.wan) {
      this.list[2].checked = true;
      let arr = this.list[2];
      this.list.splice(2, 1, arr);
      arrs.push("万");
    }
    this.checkedData = arrs;
  },
  onReady() {
    // this.selectDate = this.loginForm.createDate;
  },
  onBackPress(event) {
    //返回键作用
    if (event.from === "backbutton") {
      uni.navigateTo({
        url: "/pages/show/month",
      });
      return true;
    }
  },
  methods: {
    chonfirmDate(e) {
      this.loginForm.date =
        new Date(e.value).getFullYear() +
        "年" +
        Number(new Date(e.value).getMonth() + 1) +
        "月";
      this.dateShow = false;
    },
    exportFile() {
      exportFile().then((res) => {
        if (res.code == 200) {
          this.saveFile(res.data.data, "月度记录");
        }
      });
    },
    saveFile(file, filename) {
      const length = file.length;
      let buf = new ArrayBuffer(length);
      let view = new Uint8Array(buf);
      for (let i = 0; i < length; ++i) {
        view[i] = file[i];
      }
      const blob = new Blob([view], { type: "application/vnd.ms-excel" });
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        const href = URL.createObjectURL(blob); // 创建新的URL表示指定的blob对象
        const a = document.createElement("a"); // 创建a标签
        a.style.display = "none";
        a.href = href; // 指定下载链接
        a.download = `${filename}.xlsx`; // 指定下载文件名
        a.click(); // 触发下载
        URL.revokeObjectURL(a.href); // 释放URL对象
      }
    },
    linkMonth() {
      uni.navigateTo({
        url: "/pages/show/month",
      });
    },
    async submitForm() {
      let that = this;
      this.list.map((item) => {
        if (item.checked) {
          let index = item.key;
          that.loginForm[index] = true;
        }
      });
      let newObj = JSON.parse(JSON.stringify(this.loginForm));
      this.newObj = newObj;
      newObj.date = this.changeDate;
      if (newObj.wan && newObj.zhou && newObj.xiao) {
        newObj.wan = newObj.xiao = newObj.zhou = (newObj.total / 3).toFixed(2);
      } else if (newObj.wan && newObj.zhou && !newObj.xiao) {
        newObj.wan = newObj.zhou = (newObj.total / 2).toFixed(2);
      } else if (newObj.wan && !newObj.zhou && newObj.xiao) {
        newObj.wan = newObj.xiao = (newObj.total / 2).toFixed(2);
      } else if (!newObj.wan && newObj.zhou && newObj.xiao) {
        newObj.zhou = newObj.xiao = (newObj.total / 2).toFixed(2);
      } else if (!newObj.wan && !newObj.zhou && newObj.xiao) {
        newObj.xiao = newObj.total;
      } else if (!newObj.wan && newObj.zhou && !newObj.xiao) {
        newObj.zhou = newObj.total;
      } else if (newObj.wan && !newObj.zhou && !newObj.xiao) {
        newObj.wan = newObj.total;
      }
      const data = await editNote(this.newObj);
      if (data.code == 200) {
        // uni
        this.modalshow = true;
        this.content = "记录编辑成功";
      }
    },
    checkboxGroupChange(n) {
      console.log(n, "n");
      this.list.map((item, index) => {
        if (n.join().includes(item.name)) {
          this.list[index].checked = !this.list[index].checked;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/css/common.scss";
.content {
  font-weight: 700;
  padding: 0 30px;
}
.u-input {
  border: 1px solid #000;
}
.login-form {
  .button-style {
    border-color: $themeYellow;
    background-color: $themeYellow;
    color: #ffffff;
    font-weight: bold;
    margin-top: 40rpx;
    font-size: 60rpx !important;
  }
  ::v-deep .u-form-item__body__right__message {
    margin-left: 0 !important;
  }
  ::v-deep .u-icon__icon {
    font-size: 40rpx !important;
    font-weight: bolder !important;
    vertical-align: middle;
    color: $themeYellow !important;
  }
  ::v-deep .u-form-item__body__left__content__label {
    margin-bottom: 0 !important;
  }
  .reset {
    margin-top: 40rpx;
    color: $grey;
    text-align: center;
    font-size: 28rpx;
  }
}
</style>
