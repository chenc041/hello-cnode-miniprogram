<template>
  <div class="container">
    <div class="topic-list">
      <div class="topic-list-item" v-for="item of topics" :key="item.id" @click="navigateTo('/pages/detail/main', 'id', item.id)">
        <div class="topic-item-left">
          <img :src="item.author.avatar_url" :alt="item.author.loginname">
        </div>
        <div class="topic-item-right">
          <div class="topic-list-item-top">
            <div class="topic-author">{{ item.author.loginname }}</div>
            <div class="topic-time" :data-time="item.create_at">{{ item.create_at }}</div>
          </div>
          <div class="topic-list-item-bottom">
            <div class="toppic-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatData } from '../../utils';

export default {
  data() {
    return {
      topics: [],
    };
  },
  methods: {
    getTopics() {
      this.$ajax({
        url: 'https://cnodejs.org/api/v1/topics?limit=10',
      }).then(res => (this.topics = formatData(res.data))); // eslint-disable-line
    },
    navigateTo(url, key, value) {
      wx.navigateTo({
        url: `${url}?${key}=${value}`,
      });
    },
  },
  created() {
    this.getTopics();
  },
};
</script>

<style scoped>
.topic-list-item {
  display: flex;
  width: 345px;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 18px;
  justify-content: flex-start;
  box-shadow: 0 0 8px 2px #dddddd;
}

.topic-item-left {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
.topic-item-left img {
  width: 100%;
  height: 100%;
}
.topic-item-right {
  width: 285px;
}
.toppic-title {
  font-size: 15px;
}

.topic-list-item-top,
.topic-list-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toppic-title {
  width: 100%;
  margin-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.topic-author {
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 6px;
  padding-right: 10px;
}
.topic-time {
  color: #333333;
  font-size: 12px;
  padding-top: 10px;
  padding-bottom: 6px;
  padding-right: 10px;
}
</style>
