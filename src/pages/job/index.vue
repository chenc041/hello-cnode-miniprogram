<template>
  <div class="container">
    <scroll-view
      :scroll-y="true"
      :lower-threshold="20"
      :style="{'height': '1170px'}"
      @scrolltolower="scrolltolower"
      @scroll="scroll"
    >
      <div class="topic-list">
        <div
          class="topic-list-item"
          v-for="item of topics"
          :key="item.id"
          @click="navigateTo('/pages/detail/main', 'id', item.id)"
        >
          <div class="topic-item-left">
            <img :src="item.author.avatar_url" :alt="item.author.loginname">
          </div>
          <div class="topic-item-right">
            <div class="topic-list-item-top">
              <div class="topic-author">{{ item.author.loginname }}</div>
              <div class="topic-time" :data-time="item.create_at">{{ item.create_at }}</div>
            </div>
            <div class="topic-list-item-bottom">
              <div class="topic-title">{{ item.title }}</div>
              <div class="topic-badge">
                <div class="top" v-if="item.top">置顶</div><span v-if="item.top" class="divider">|</span>
                <badge :badge="item.tab"/> <span class="divider">|</span>
                <div class="topic-hot">{{ item.reply_count }} / {{ item.visit_count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <div class="menu-list" :class="{ 'menu-list-ani': isRotate }">
      <ul @click="filterTab($event)" v-for="item of tabs" :key="item.key">
        <li :data-tab="item.key">{{ item.name }}</li>
      </ul>
    </div>
    <div
      class="cnode-menu-bar"
      :class="{ 'cnode-menu-bar-ani': isRotate }"
      @click="changeRotate()"
    >+</div>
  </div>
</template>

<script>
import badge from '@/components/badge';
import { formatData, scanCode } from '../../utils';

export default {
  components: {
    badge,
  },
  data() {
    return {
      tab: 'job',
      topics: [],
      pageSize: 10,
      currentPage: 1,
      isRotate: false,
      tabs: [
        { name: '发帖', key: 'publish' },
        { name: '登录', key: 'scan' },
      ],
    };
  },
  methods: {
    getTopics(tab, currentPage) {
      wx.showLoading({
        title: '加载中',
      });
      this.$ajax({
        url: 'https://cnodejs.org/api/v1/topics',
        data: {
          tab: this.tab,
          limit: this.pageSize,
          page: currentPage || this.currentPage,
        },
      }).then((res) => {
        wx.hideLoading();
        if (this.topics.length > 0) {
          const tmp = [...this.topics, ...formatData(res.data)];
          this.topics = tmp;
        } else {
          this.topics = formatData(res.data);
        }
      });
    },
    scrolltolower() {
      const timer = setTimeout(() => {
        this.currentPage += 1;
        this.getTopics(this.tab, this.currentPage);
        clearTimeout(timer);
      }, 200);
    },
    navigateTo(url, key, value) {
      wx.navigateTo({
        url: `${url}?${key}=${value}`,
      });
    },
    changeRotate() {
      if (this.isRotate) {
        this.isRotate = false;
      } else {
        this.isRotate = true;
      }
    },
    scanLogin() {
      scanCode().then((res) => {
        if (res.errMsg === 'scanCode:ok') {
          this.isRotate = false;
          wx.showToast({
            title: 'token 获取成功',
            icon: 'success',
            duration: 2000,
          });
          wx.setStorageSync('token', res.result);
        } else {
          wx.showToast({
            title: 'token 获取失败',
            duration: 2000,
          });
        }
      });
    },
    filterTab(event) {
      const { dataset: { tab } } = event.target;
      if (tab !== 'scan') {
        wx.navigateTo({
          url: '/pages/publish/main',
        });
      } else {
        this.scanLogin();
      }
    },
  },
  mounted() {
    this.getTopics();
  },
};
</script>

<style scoped>
.topic-list {
  padding-top: 15px;
  padding-bottom: 30px;
}
.topic-list-item {
  display: flex;
  width: 345px;
  height: 96px;
  border-radius: 8px;
  margin: 0 auto 18px;
  justify-content: flex-start;
  box-shadow: 0 0 8px 2px #dddddd;
}

.topic-badge {
  display: flex;
  margin-top: 6px;
  align-items: center;
  justify-content: flex-start;
}

.topic-hot {
  color: #ccc;
  font-size: 12px;
  text-align: right;
  margin-right: 10px;
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
.topic-item-left>img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.topic-item-right {
  width: 285px;
}

.topic-list-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.topic-title {
  width: 275px;
  font-size: 15px;
  margin-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.topic-author {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 6px;
  padding-right: 10px;
  white-space: nowrap;
}
.topic-time {
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333;
  font-size: 12px;
  padding-top: 10px;
  padding-bottom: 6px;
  padding-right: 10px;
}

.cnode-menu-bar {
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
.menu-list {
  height: 0;
  opacity: 0;
  width: 40px;
  right: 30px;
  bottom: 80px;
  padding: 5px 0;
  position: fixed;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 0 8px 2px #dddddd;
  transition: all 0.3s ease-in-out;
}
.menu-list-ani {
  opacity: 1;
  height: 60px;
  overflow: auto;
  transition: all 0.3s ease-in-out;
}
.menu-list li {
  height: 30px;
  line-height: 30px;
  transition: all 0.3s ease-in-out;
}
.cnode-menu-bar-ani {
  transform: rotate(45deg);
  transition: all 0.3s ease-in-out;
}

.divider {
  color: #eeeeee;
  margin: 0 4px;
}

.top {
  color: #ffffff;
  height: 20px;
  width: 20px;
  line-height: 20px;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  background: #ff4466;
  border: 0.5px solid #ff4466;
}

</style>
