<template>
  <div class="topic-publish">
    <div class="topic-title">
      <input type="text" v-model="title" placeholder="请输入标题" />
    </div>
    <div class="topic-content">
      <textarea type="text" rows="4" v-model="content" placeholder="请输入内容" />
    </div>
    <!-- <div class="topic-choose-pic" @click="chooseImages()">选择图片</div> -->
    <div class="topic-picker">
      <picker mode="selector" @change="pickerChange" :range="picker">{{tab}}</picker>
    </div>
    <div class="topic-picker topic-confirm" @click="confirmCreate()">
      确定
    </div>
  </div>
</template>

<script>

import badge from '@/components/badge';
import { scanCode } from '../../utils';

export default {
  components: {
    badge,
  },
  data() {
    return {
      title: '',
      content: '',
      accesstoken: '',
      tab: '选择发帖分类',
      picker: ['问答', '分享', '招聘', '精华'],
      bagdeMap: {
        问答: 'ask',
        分享: 'share',
        招聘: 'job',
        精华: 'good',
      },
    };
  },
  methods: {
    chooseImages() {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const { tempFilePaths } = res;
          console.log(tempFilePaths) // eslint-disable-line
        },
      });
    },
    pickerChange(val) {
      this.tab = this.picker[val.mp.detail.value];
    },
    confirmCreate() {
      const self = this;
      this.$ajax({
        method: 'POST',
        url: 'https://cnodejs.org/api/v1/topics',
        data: {
          accesstoken: self.accesstoken,
          title: self.title,
          tab: 'dev',
          content: self.content,
        },
      }).then((res) => {
        const { success } = res;
        if (success) {
          wx.showToast({
            title: '帖子发布成功！',
            icon: 'success',
            duration: 2000,
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/index/main',
            });
          }, 2100);
        } else {
          wx.showToast({
            title: res.error_msg,
            duration: 2000,
          });
        }
      });
    },
  },
  mounted() {
    const accesstoken = wx.getStorageSync('token');
    if (accesstoken) {
      this.accesstoken = accesstoken;
    } else {
      wx.showToast({
        title: '请登录发帖',
        icon: 'none',
        duration: 1200,
      });
      setTimeout(() => {
        scanCode().then((res) => {
          if (res.errMsg === 'scanCode:ok') {
            this.isRotate = false;
            wx.showToast({
              title: 'token 获取成功',
              icon: 'success',
              duration: 600,
            });
            wx.setStorageSync('token', res.result);
          } else {
            wx.showToast({
              title: 'token 获取失败',
              icon: 'none',
              duration: 600,
            });
          }
        });
      }, 2000);
    }
  },
};
</script>

<style scoped>
.topic-publish {
  width: 345px;
  font-size: 12px;
  margin: 15px auto;
}
.topic-title {
  height: 34px;
  padding-left: 10px;
  border-radius: 8px;
  color: #333;
  border: 1px solid #eeeeee;
}
.topic-title input {
  height: 34px;
  color: #333;
  line-height: 34px;
}
.topic-content {
  padding: 5px;
  margin: 15px auto;
  border-radius: 8px;
  border: 1px solid #eeeeee;
}
.topic-picker {
  width: 100%;
  height: 34px;
  color: #333;
  border-radius: 8px;
  margin: 15px auto;
  line-height: 34px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #eeeeee;
}
.topic-confirm {
  color: #ffffff;
  background: #0099FF;
  border: 1px solid #ffffff;
}
</style>

