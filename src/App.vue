<script>
export default {
  created() {
    wx.showShareMenu({
      withShareTicket: true,
    });
  },
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
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
