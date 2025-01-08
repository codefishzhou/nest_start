<template>
  <view class="content">
    <u-sticky
      ><view>
        <u-datetime-picker
          :show="show"
          v-model="value1"
          mode="year-month"
          @confirm="chonfirmDate"
          @cancel="show = false"
        ></u-datetime-picker>
        <u-button @click="show = true" class="select_month">
          <view class="la">当前展示的月份-----------</view>
          <text class="content">{{ selectDate || '请选择月份' }}</text>
        </u-button>
      </view></u-sticky
    >
    <view class="showlist">
      <u-swipe-action>
        <u-swipe-action-item
          :options="swipeoptions"
          :index="index"
          :name="JSON.stringify(item)"
          @open="open"
          @click="handleClick"
          :show="item.show"
          v-for="(item, index) in listData"
          :key="item.id"
          :disabled="item.disabled"
        >
          <view class="swipe-action u-border-top">
            <view class="swipe-action__content">
              <text class="swipe-action__content__text">
                <view
                  :class="{
                    item_showit: true,
                    item_show_one: item.date.split('.')[1] % 2 != 0,
                    item_show_two: item.date.split('.')[1] % 2 == 0,
                  }"
                >
                  <view class="header_cont">
                    <text class="inde"> 序号：{{ index + 1 }}</text>
                    <text class="date">记录时间：{{ item.date }}</text>
                  </view>
                  <view class="total">合计：{{ item.total }}</view>
                  <view class="personal">
                    <text class="person_text">周:{{ item.zhou }}</text>
                    <text class="person_text">肖:{{ item.xiao }}</text>
                    <text class="person_text">万:{{ item.wan }}</text>
                  </view>
                  <view class="remark">备注：{{ item.remark }}</view>
                </view>
              </text>
            </view>
          </view>
        </u-swipe-action-item>
      </u-swipe-action>
      <view
        :class="{
          item_showit: true,
          item_show_one: true,
        }"
        v-show="listData.length == 0"
      >
        本月暂无数据
      </view>
    </view>
    <u-popup :show="modalshow">
      <u-button disabled
        ><view style="color: #000">确认删除这条记录吗</view></u-button
      >
      <view class="header_cont">
        <text class="date">记录时间：{{ nowdata.date }}</text>
      </view>
      <view class="total">合计：{{ nowdata.total }}</view>
      <view class="personal">
        <text class="person_text">周:{{ nowdata.zhou }}</text>
        <text class="person_text">肖:{{ nowdata.xiao }}</text>
        <text class="person_text">万:{{ nowdata.wan }}</text>
      </view>
      <view class="remark">备注：{{ nowdata.remark }}</view>
      <u-button @click="confirmDelete">确定</u-button>
      <u-button @click="modalshow = false">取消</u-button>
    </u-popup>
    <u-popup
      :show="popupshow"
      @close="popupshow = false"
      @open="popupshow = true"
    >
      <view>
        {{ popupMsg }}
      </view>
    </u-popup>
  </view>
</template>

<script>
import { findMonth, deleteNote } from '@/http/modules/notes/note';
export default {
  data() {
    return {
      show: false,
      swipeKey: '',
      value1: Number(new Date()),
      searchData: {
        month: '',
      },
      popupshow: false,
      popupMsg: '',
      modalshow: false,
      nowdata: '',
      title: '提示',
      content: '',
      swipeoptions: [
        {
          text: '编辑',
          style: {
            backgroundColor: '#f9ae3d',
            borderRadius: '10px',
            width: '20vw',
            height: '100%',
          },
        },
        {
          text: '删除',
          style: {
            backgroundColor: '#f40',
            borderRadius: '10px',
            width: '20vw',
            height: '100%',
          },
        },
      ],
      selectDate:
        new Date().getFullYear() +
        '年' +
        Number(new Date().getMonth() + 1) +
        '月',
      listData: [],
    };
  },
  computed: {
    nowMonth() {
      return new Date(this.value1);
    },
  },
  onBackPress(event) {
    //返回键作用
    if (event.from === 'backbutton') {
      uni.navigateTo({
        url: '/pages/menu/index',
      });
      return true;
    }
  },
  onLoad() {},
  onReady() {
    this.getList(this.searchData);
  },
  methods: {
    handleClick(item) {
      if (item.index == 1) {
        this.deleteItem(item.name);
      } else {
        this.editItem(item.name);
      }
    },
    //删除记录
    deleteItem(item) {
      this.modalshow = true;
      this.nowdata = JSON.parse(item);
    },
    editItem(item) {
      console.log('edit');
      uni.navigateTo({
        url: '/pages/show/edit?data=' + item,
      });
    },
    confirmDelete() {
      let id = this.content.split('--')[5];
      deleteNote({ ids: [this.nowdata.id] }).then((res) => {
        if (res.code == 200) {
          this.popupshow = true;
          setTimeout(() => {
            this.popupshow = false;
          }, 3000);
          this.getList(this.searchData);
          this.popupMsg = '删除成功';
        }
      });
      this.modalshow = false;
    },
    open() {
      console.log('000');
    },
    //获取记录
    getList(obj) {
      findMonth(obj).then((res) => {
        if (res.code == 200) {
          let data = res.data.data;
          data.map((item, index) => {
            data[index].show = false;
            data[index].disabled = false;
          });
          console.log(data, '---');
          this.listData = data;
        }
      });
    },
    //选择月份
    chonfirmDate(e) {
      console.log(e);
      this.selectDate =
        new Date(e.value).getFullYear() +
        '年' +
        Number(new Date(e.value).getMonth() + 1) +
        '月';
      this.show = false;
      this.searchData.month = new Date(e.value).getMonth() + 1;
      this.getList(this.searchData);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .u-swipe-action-item {
  min-height: 200px;
}
::v-deep .u-swipe-action-item__content{
  min-height: 200px;
}
.content {
  font-size: 20px;

  .select_month {
    background: #b9dec9;
  }

  .showlist {
    padding: 1% 2%;
    .item_showit {
      margin: 1% 0;
      .header_cont {
        display: flex;
        justify-content: space-between;
      }
    }
    .personal {
      display: flex;
      .person_text {
        width: 33.33%;
      }
    }
    .item_show_one {
      background-color: #d0dfe6;
      background-origin: padding-box;
      padding: 2%;
      border-radius: 10px;
    }
    .item_show_two {
      background-color: #cad3c3;
      background-clip: padding-box;
      padding: 2%;
      border-radius: 10px;
    }
    .remark {
      background-color: #fff;
      margin-top: 10px;
      padding: 2%;
    }
  }
}
</style>
