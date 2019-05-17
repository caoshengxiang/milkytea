<template>
  <div class="btn-box" @click="handleClick">
    <img class="img" :style="{width: styleObj.width, height: styleObj.height}" :src="img" alt="">
    <div class="text" :style="{width: styleObj.width, height: styleObj.height, fontSize: styleObj.fontSize, color: styleObj.color}">
      <slot><span>{{title}}</span></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: { // 都是必传属性
      img: { // 注意下，相对路径得地址，是以当前组件bgButton作为参照（bgButton组件相对图片路径），而不是使用得组件作为参照
        type: String,
        required: true
      },
      title: {
        type: String,
        default: '',
        required: true
      },
      styleObj: {
        type: Object,
        default () {
          return { // 这三个属性必传
            width: '16.66666666vw',
            height: '8vw',
            fontSize: '3.46666666vw'
          }
        },
        required: true
      }
    },
    methods: {
      handleClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style scoped lang="less">
  .btn-box {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    .img {

    }
    .text {
      position: absolute;
      top: 0;
      left: 0;
      color: #1A1A1A;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
