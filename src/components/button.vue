<template>
  <div class="cnode-button-common" :class="buttonClass" @click="handleClick">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    type: {
      type: String,
      default: 'default',
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
  computed: {
    buttonClass() {
      return `cnode-button-${this.type}`;
    },
  },
};
</script>

<style>
.cnode-button-common {
  width: 100%;
  height: 34px;
  font-size: 12px;
  border-radius: 8px;
  margin: 15px auto;
  line-height: 34px;
  text-align: center;
}
.cnode-button-primary {
  color: #ffffff;
  background: #0099FF;
  border: 1px solid #0099FF;
}
.cnode-button-default {
  color: #333;
  background: #eeeeee;
  border: 1px solid #eeeeee;
}

</style>
