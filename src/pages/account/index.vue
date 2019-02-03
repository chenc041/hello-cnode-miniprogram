<template>
  <div class="account">
    <button type="default" text='扫码登录' @click="scanLogin()" />
  </div>
</template>

<script>
import button from '@/components/button';
import { scanCode } from '../../utils';

export default {
  components: {
    button,
  },
  methods: {
    scanLogin() {
      scanCode().then(res => console.log(res)); // eslint-disable-line
    },
  },
};
</script>

<style scoped>

</style>
