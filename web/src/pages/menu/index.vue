<template>
  <view class="content">
    <view class="container">
      <view class="item" v-for="item in menuData" :key="item.id" @click="linkPage(item.path)">
        <u--image
          :showLoading="true"
          src="https://cdn.uviewui.com/uview/album/1.jpg"
          width="80px"
          height="80px"
        ></u--image>
        <text class="name">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      menuData: [
        {
          id: "1",
          name: "添加记录",
          path: "/pages/add/index",
        },
        {
          id: "2",
          name: "月度记录",
          path: "/pages/show/month",
        },
        // {
        //   id: "3",
        //   name: "add",
        //   path: "/pages/add/index",
        // },
      ],
    };
  },
  onLoad() {},
  onBackPress(event) {
    //返回键作用
    //返回键作用
    if (event.from === "backbutton") {
      uni.navigateTo({
        url: "/pages/menu/index",
      });
      return true;
    }
  },
  methods: {
    linkPage(path){
      uni.navigateTo({
        url:path
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    display: flex;
	width: 96%;
	margin:0 auto;
	margin-top: 30px;
    .item {
      padding:20px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 30%;
	  // background-color: rgb(218, 185, 185);
    }
	.item:nth-child(3n+2){
		margin: 0 5%;
	}
  }
}
</style>
