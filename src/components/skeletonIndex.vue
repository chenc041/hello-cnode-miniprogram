<template>
  <div class="container">
    <div class="topic-list">
      <div class="topic-list-item" v-for="item of Skeleton" :key="item">
        <div class="topic-item-left"></div>
        <div class="topic-item-right">
          <div class="topic-list-item-top">
            <div class="topic-author">c</div>
          </div>
          <div class="topic-list-item-bottom">
            <div class="topic-title">c</div>
            <div class="topic-badge">c</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Skeleton: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6],
    },
  },
  data() {
    return {
      Skeleton: this.Skeleton,
    };
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
  height: auto;
  border-radius: 8px;
  margin: 0 auto 18px;
  padding-bottom: 10px;
  justify-content: flex-start;
  box-shadow: 0 0 8px 2px #dddddd;
}

.topic-badge {
  width: 55%;
  height: 15px;
  font-size: 10px;
  margin-top: 6px;
  color: #eeeeee;
  margin-right: 10px;
  background: #eeeeee;
}

.topic-item-left {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  background: #eeeeee;
}
.topic-item-left > img {
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
  height: 30px;
  font-size: 10px;
  overflow: hidden;
  margin-top: 10px;
  color: #eeeeee;
  margin-right: 10px;
  text-overflow: ellipsis;
  background-color: #eeeeee;
}
.topic-author {
  width: 30%;
  height: 16px;
  color: #eeeeee;
  margin-top: 10px;
  overflow: hidden;
  background: #eeeeee;
}
</style>
