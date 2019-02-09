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

export default {
  components: {
    badge,
  },
  data() {
    return {
      title: '',
      content: '',
      tab: '选择发帖分类',
      picker: ['问答', '分享', '招聘', '精华', '客户端测试'],
      bagdeMap: {
        问答: 'ask',
        分享: 'share',
        招聘: 'job',
        精华: 'good',
        客户端测试: 'dev',
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
          accesstoken: '',
          title: self.title,
          tab: self.bagdeMap[self.tab],
          content: self.content,
        },
      }).then(res => console.log(res)); // eslint-disable-line
    },
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
  padding: 10px;
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

