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
      default: 1000
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
      // 1.2
      this._setSliderWidth();
      // 3.3
      this._initDots();
      // 2.2
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
    }, 20);
  },
  methods: {
    // 2.1 初始化轮播图BScroll
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        // snap: true,
        snap: {
          loop: this.loop,
          threshold: 0.3
        },
        // snapLoop: this.loop,
        // snapThreshold: 0.3,
        // snapSpeed: 400
      });

      // 3.1获取当前图片索引
      this.slider.on('scrollEnd', () => {
        this.currentPageIndex = this.slider.getCurrentPage().pageX;

        if (this.autoPlay) {
          this._play();
        }
      });
      // 滚动开始之前清除定时器
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    // 1.1 设置轮播图宽度
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
      if (this.loop) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    // 3.0获取点的个数
    _initDots(){
      this.dots = this.children.length;
    },
    _play() {
      let pageIndex = this.currentPageIndex;
      if (this.loop) {
        pageIndex += 1;
      }
      if (pageIndex === 5) {
        pageIndex = 0;
      }
      this.timer = setTimeout(() => {
        // this.slider.goToPage(pageIndex, 0, 400);
        this.slider.next();
      }, this.interval);
    }
  },
  // 当keep-alive切换时，再次轮播
  activated() {
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  destory() {
    clearTimeout(this.timer)
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