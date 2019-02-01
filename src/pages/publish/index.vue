<template>
  <picker mode="selector" :range="picker">1111</picker>
</template>

<script>
export default {
  data() {
    return {
      picker: ['招聘'],
    };
  },
  created() {
    console.log(this.$root.$mp); // eslint-disable-line
  },
};
</script>

<style scoped>
</style>

