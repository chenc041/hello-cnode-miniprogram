<template>
  <div class="topic-content">
    <div class="toppic-content-wrap">
      <div class="topic-detail-title">x</div>
      <div class="topic-detail-content">x</div>
      <div class="topic-detail-replies">
        <SkeletonIndex />
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonIndex from '@/components/skeletonIndex';

export default {
  components: {
    SkeletonIndex,
  },
};
</script>

<style scoped>
.topic-content {
  width: 345px;
  font-size: 14px;
  margin-top: 10px;
}
.topic-detail-title {
  width: 65%;
  height: 14px;
  color: #eeeeee;
  margin-bottom: 10px;
  background-color: #eeeeee;
}
.topic-detail-content {
  width: 100%;
  height: 100px;
  color: #eeeeee;
  background: #eeeeee;
}
</style>


