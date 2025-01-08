<template>
  <view class="content">
    <view>
      <u-datetime-picker
        :show="show"
        v-model="value1"
        :mode="date"
      ></u-datetime-picker>
      <u-button @click="show = true">打开</u-button>
    </view>
  </view>
</template>

<script>
import { add } from "@/http/modules/notes/notes";
export default {
  data() {
    return {
      show: false,
      value1: Number(new Date().getMonth()+1),
    };
  },
  onLoad() {},
  onReady() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
