<template>
  <div class="topic-content">
    <div class="toppic-content-wrap" v-show="!isLoading">
      <div class="topic-detail-title">
        {{ detail.title }}
      </div>
      <div class="topic-detail-content">
        <rich-text :nodes="detail.content" bindtap="tap" />
      </div>
      <div class="topic-detail-replies" v-if="detail.replies.length > 0">
        <div class="tips">
          跟帖内容：
        </div>
        <div class="open-close">
          展开
        </div>
      </div>
      <div class="none" v-else>
        暂无跟帖～
      </div>
      <div class="topic-detail-replay">
        <div class="topic-detail-replay-item" v-for="item of detail.replies" :key="item.id">
          <div class="topic-detail-replay-item-left">
            <img :src="item.author.avatar_url" :alt="item.author.loginname">
          </div>
          <div class="topic-detail-replay-item-right">
            <div class="topic-detail-replay-item-top">
              <div class="topic-replay-name">
                {{ item.author.loginname }}
              </div>
              <div class="topic-replay-created">
                {{ item.created_at }}
              </div>
            </div>
            <div class="topic-detail-replay-item-content">
              <rich-text :nodes="item.content" bindtap="tap" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { formatRichText } from '../../utils';

export default {
  data() {
    return {
      detail: {
        author: {
          avatar_url: '',
          loginname: '',
        },
        content: '',
        reply_count: 0,
        replies: [],
      },
      isLoading: true,
    };
  },
  methods: {
    getTopicDetail(id) {
      wx.showLoading({
        title: '加载中',
      });
      this.$ajax({
        url: `https://cnodejs.org/api/v1/topic/${id}`,
      }).then((res) => {
        wx.hideLoading();
        this.isLoading = false;
        this.detail = formatRichText(res.data);
      });
    },
  },
  mounted() {
    this.getTopicDetail(this.$root.$mp.query.id);
  },
};
</script>

<style scoped>
.topic-content {
  width: 345px;
  font-size: 14px;
  word-wrap:break-word;
  word-break:break-all;
  white-space: normal;
  padding-bottom: 30px;
  margin: 0 auto;
}
.topic-detail-replay {
  padding-bottom: 20px;
}
.topic-detail-title {
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}
.topic-detail-replies {
  display: flex;
  margin-top: 10px;
  margin-bottom: 15px;
  justify-content: space-between;
}
.topic-detail-replies .tips {
  font-size: 18px;
}
.topic-detail-content .markdown-text img {
  width: 100%;
}
.topic-detail-replay-item {
  width: 345px;
  display: flex;
  margin-bottom: 15px;
  border-radius: 8px;
  justify-content: flex-start;
  box-shadow: 0 0 8px 2px #dddddd;
}
.topic-detail-replay-item-left {
  width: 40px;
  height: 40px;
  margin: 10px;
  overflow: hidden;
  border-radius: 100%;
}
.topic-detail-replay-item-left img {
  width: 100%;
  height: 100%;
}
.topic-detail-replay-item-right {
  margin: 10px;
  width: 285px;
}
.none {
  text-align: center;
  font-size: 14px;
  color: #eeeeee;
  margin: 15px 0;
}
</style>


