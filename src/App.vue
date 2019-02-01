<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    console.log('app created and cache logs by setStorageSync'); // eslint-disable-line
  },
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  padding-top: 20px;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
