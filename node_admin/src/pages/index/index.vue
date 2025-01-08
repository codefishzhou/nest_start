<template>
  <view class="container">
    <view class="login-content">
      <view class="login-title">
        <view class="welcome">{{ OneLinerData.hitokoto }}</view>
      </view>
      <u--form
        :model="loginForm"
        ref="loginForm"
        class="login-form"
        labelPosition="top"
        :rules="rules"
      >
        <u-form-item prop="name" label="用户名" labelWidth="200rpx" required>
          <u--input
            v-model="loginForm.name"
            placeholder="用户名"
            clearable
          ></u--input>
        </u-form-item>
        <u-form-item prop="password" label="密码" labelWidth="200rpx" required>
          <u--input
            v-model="loginForm.password"
            password
            clearable
            placeholder="密码"
            @confirm="submitForm"
          ></u--input>
        </u-form-item>
        <u-button
          fontSize="18"
          color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
          type="primary"
          size="normal"
          text="登录"
          shape="square"
          class="button-style"
          @click="submitForm"
        >
        </u-button>
      </u--form>
    </view>
  </view>
</template>

<script>
import md5 from '@/utils/md5.js';
import { OneLiner } from '@/http/modules/notes/note.js';
import { login } from '@/http/modules/users/user.js';
export default {
  name: '',
  components: {}, // 引入组件
  data() {
    return {
      loginForm: {
        name: '', // 登录账户
        password: '', // 登录密码
      },
      labelStyle: {
        fontWeight: 'bold',
        color: '#333333',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'field.common.name_not_null',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 50,
            message: 'field.common.name',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'field.common.password_not_null',
            trigger: 'blur',
          },
        ],
        tenantName: [
          {
            required: true,
            message: 'field.common.tenant_not_null',
            trigger: 'blur',
          },
        ],
      },
      OneLinerData: {},
    };
  },
  // 计算属性
  computed: {
    currentTime() {
      return new Date();
      // return format(new Date())
    },
  },
  // 监听数据变化
  watch: {},
  // 监听页面加载 其参数为上个页面传递的数据
  onLoad(e) {
    // console.log(uni.getSystemInfoSync())
  },
  // 监听页面显示
  onShow() {},
  // 监听页面初次渲染完成
  onReady() {
    this.loadOneLear();
  },
  onBackPress(event) {
    //返回键作用
    // uni.navigateTo({
    //   url: "/pages/menu/index",
    // });
  },
  methods: {
    //加载一句话
    async loadOneLear() {
      const data = await OneLiner();
      if (data) {
        this.OneLinerData = data;
      }
    },
    // 提交表单
    async submitForm() {
      let obj = {
        name: this.loginForm.name,
        password: this.$md5(this.loginForm.password),
      };
      const data = await login(obj);
      console.log(data, 'login_data');
      if (data.data.code == 200) {
        console.log(data.data.data.token, 'token');
        uni.setStorageSync('TOKEN', data.data.data.token);
        uni.navigateTo({
          url: '/pages/menu/index',
        });
        return;
      } else {
        uni.showToast({
          title: `${data.data.msg}`,
          icon: 'none',
          duration: 3000,
        });
      }
    },
  },
};
</script>
<style>
page {
  background-color: #ffffff;
}
</style>

<style lang="scss" scoped>
@import '@/common/css/common.scss';
.container {
  padding: 0 40rpx;
  background: #ffffff;
  height: calc(100vh - var(--status-bar-height));
  position: relative;
  .login-content {
    padding-top: 80rpx;

    .login-title {
      color: $title-black;
      font-size: 36rpx;
      line-height: 1.5;
      font-weight: bold;
      text-align: left;
      margin-bottom: 180rpx;
      .welewome {
        font-size: 24rpx;
      }
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

    .form-item {
      padding: 16rpx 0;
      font-size: 28rpx;
      color: $title-black;
      box-sizing: border-box;

      .title {
        color: $title-black;
        font-size: 28rpx;
        margin-bottom: 10rpx;

        .custom-icon {
          color: $themeYellow;
          font-size: 36rpx;
          margin-right: 8rpx;
        }

        .label-title {
          font-weight: bold;
        }
      }

      .reset {
        color: $grey;
        text-align: center;
        font-size: 28rpx;
      }

      .input-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $border-color;
        padding: 16rpx 0;

        .uni-input {
          width: 100%;
          height: 2em;
          line-height: 1.6em;
          font-size: 28rpx;
          color: $grey;
        }

        .close {
          display: inline-block;
          margin-left: 30rpx;
        }
      }
    }
  }
}
.version-content {
  position: absolute;
  bottom: 20rpx;
  left: 200rpx;
  font-size: 24rpx;
  color: #000000;
  .version {
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      display: inline-block;
      margin-right: 10rpx;
    }
  }
}
</style>
