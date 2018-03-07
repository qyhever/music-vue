<template>
  <div class="slider" ref="slider">
    <!-- 1.0图片列表结构 -->
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <!-- 3.2指示器结构 -->
    <div class="dots">
      <span class="dot"
            v-for="(item, index) in dots"
            :key="index"
            :class="{'active' : currentPageIndex === index}"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import {addClass} from 'common/js/dom';
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {
      // 2.1 调用
      this._setSliderWidth();
      // 3.3 调用
      this._initDots();
      // 1.2 调用
      this._initSlider();
    }, 20);
  },
  methods: {
    // 1.1 初始化轮播图BScroll
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });

      // 3.1获取当前图片索引
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex;
      });
    },
    // 2.0 设置轮播图宽度
    _setSliderWidth() {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        const item = this.children[i]; // 每一个轮播图盒子
        addClass(item, 'slider-item');
        item.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    // 3.0获取点的个数
    _initDots(){
      this.dots = this.children.length;
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.slider
  position: relative
  min-height: 1px
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slider-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>