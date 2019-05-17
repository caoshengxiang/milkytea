<template>
    <div>
      <img v-if="isSwitch" @click="isSwitchHandle(false)" class="switch" src="../../../static/icon/switch-1.png"
           alt="">
      <img v-else @click="isSwitchHandle(true)" class="switch" src="../../../static/icon/switch-0.png" alt="">
    </div>
</template>

<script>
  export default {
    name: 'switch',
    data () {
      return {
        // isSwitch: false
      }
    },
    props: {
      isSwitch: {
        default: false,
        type: Boolean
      }
    },
    methods: {
      isSwitchHandle (va) {
        this.$emit('switchChange', va)
      }
    }
  }
</script>

<style scoped lang="less">
  .switch {
    width: 60/7.5vw;
    height: 41/7.5vw;
  }
</style>
