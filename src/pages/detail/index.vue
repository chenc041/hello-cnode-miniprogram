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
        <div class="topic-replay-agree" @click="collect(detail.id, detail.is_collect)">{{detail.is_collect? '❤️':'收藏'}}</div>
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
                {{ item.create_at }}
              </div>
            </div>
            <div class="topic-detail-replay-item-content">
              <rich-text :nodes="item.content" bindtap="tap" />
            </div>
            <div class="topic-detail-replay-item-content topic-detail-replay-item-bottom">
              <div class="topic-replay-agree">{{ item.ups.length }} 赞 <span class="divider">|</span> </div>
              <div class="topic-replay-agree" @click="agree(item.id)"> {{item.is_uped?'👍':'点赞'}} </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reply-topic" @click="showReply()">
        +
      </div>
      <div class="reply-form" v-show="isShowReply">
        <div class="reply-mask"></div>
        <div class="reply-content">
          <textarea v-model="content" cols="30" rows="10"></textarea>
          <div class="reply-content-bottom">
            <div class="cancel button" @click="showReply()">取消</div>
            <div class="confirm button" @click="replay(detail.id)">确定</div>
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
      content: '',
      accesstoken: '',
      isLoading: true,
      isShowReply: false,
    };
  },
  methods: {
    getTopicDetail(id, accesstoken) {
      wx.showLoading({
        title: '加载中',
      });
      this.$ajax({
        url: `https://cnodejs.org/api/v1/topic/${id}`,
        data: {
          accesstoken,
        },
      }).then((res) => {
        wx.hideLoading();
        this.isLoading = false;
        wx.stopPullDownRefresh();
        this.detail = formatRichText(res.data);
      });
    },
    agree(id) {
      if (!this.accesstoken) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1200,
        });
        return;
      }
      this.$ajax({
        method: 'POST',
        url: `https://cnodejs.org/api/v1/reply/${id}/ups`,
        data: {
          accesstoken: this.accesstoken,
        },
      }).then((res) => {
        const { success } = res;
        if (success) {
          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 1200,
          });
        } else {
          wx.showToast({
            title: '点赞失败',
            icon: 'none',
            duration: 1200,
          });
        }
        this.getTopicDetail(this.$root.$mp.query.id, this.accesstoken);
      });
    },
    showReply() {
      this.isShowReply = !this.isShowReply;
    },
    replay(id) {
      if (!this.accesstoken) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1200,
        });
        return;
      }
      if (!this.content) {
        wx.showToast({
          title: '请填写内容',
          icon: 'none',
          duration: 800,
        });
        return;
      }
      this.$ajax({
        method: 'POST',
        url: `https://cnodejs.org/api/v1/topic/${id}/replies`,
        data: {
          content: this.content,
          accesstoken: this.accesstoken,
        },
      }).then((res) => {
        const { success } = res;
        this.isShowReply = false;
        if (success) {
          wx.showToast({
            title: '回复成功',
            icon: 'success',
            duration: 1200,
          });
        } else {
          wx.showToast({
            title: '回复失败',
            icon: 'none',
            duration: 1200,
          });
        }
        this.getTopicDetail(this.$root.$mp.query.id, this.accesstoken);
      });
    },
    collect(id, collect) {
      let url = 'topic_collect/de_collect';
      if (!collect) {
        url = 'topic_collect/collect';
      }
      this.$ajax({
        method: 'POST',
        url: `https://cnodejs.org/api/v1/${url}`,
        data: {
          accesstoken: this.accesstoken,
          topic_id: id,
        },
      }).then((res) => {
        const { success } = res;
        if (success) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1200,
          });
        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 1200,
          });
        }
        this.getTopicDetail(this.$root.$mp.query.id, this.accesstoken);
      });
    },
  },
  onPullDownRefresh() {
    this.getTopicDetail(this.$root.$mp.query.id, this.accesstoken);
  },
  mounted() {
    const accesstoken = wx.getStorageSync('token');
    if (accesstoken) {
      this.accesstoken = accesstoken;
    }
    this.getTopicDetail(this.$root.$mp.query.id, accesstoken);
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
  align-items: center;
  justify-content: space-between;
}
.topic-detail-replies .tips {
  font-size: 16px;
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
.topic-detail-replay-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.topic-replay-name {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 6px;
  padding-right: 10px;
  white-space: nowrap;
}
.topic-replay-created {
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333;
  font-size: 12px;
  padding-top: 10px;
  padding-bottom: 6px;
  text-align: right;
  padding-right: 10px;
}
.topic-detail-replay-item-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.topic-detail-replay-item-bottom {
  margin-top: 10px;
}
.topic-replay-agree {
  color: #777;
  font-size: 14px;
}
.reply-topic {
  width: 40px;
  height: 40px;
  right: 30px;
  bottom: 30px;
  color: #333;
  font-size: 24px;
  position: fixed;
  line-height: 36px;
  text-align: center;
  border-radius: 100%;
  background-color: #eeeeee;
  transition: all 0.3s ease-in-out;
}
.divider {
  margin: 0 4px;
}
.reply-form {
  position: relative;
}
.reply-form .reply-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
.reply-form .reply-content {
  top: -10%;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 345px;
  height: 50%;
  padding: 5px;
  position: fixed;
  border-radius: 5px;
  background: #ffffff;
}
.reply-form .reply-content textarea {
  width: 100%;
  height:88%;
  margin-bottom:2%;
  border-radius:5px;
  border:1px solid #eeeeee;
}
.reply-content-bottom {
  display: flex;
  justify-content: flex-end;
}
.button {
  color: #ffffff;
  margin-left: 6px;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  background: #0099FF;
  border: 1px solid #0099FF;
}
</style>


