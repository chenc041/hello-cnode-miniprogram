<template>
  <div class="cnode-badge">
    {{ formatBadge }}
  </div>
</template>

<script>
export default {
  props: {
    badge: String,
  },
  data() {
    return {
      bagdeMap: {
        ask: '问答',
        share: '分享',
        dev: '开发',
        job: '招聘',
        good: '精华',
      },
    };
  },
  computed: {
    formatBadge() {
      return this.bagdeMap[this.badge];
    },
  },
};
</script>

<style scoped>
.cnode-badge {
  color: #333;
  height: 20px;
  width: 20px;
  line-height: 20px;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  background: #bbbbbb;
  border: 0.5px solid #eeeeee;
}
</style>
