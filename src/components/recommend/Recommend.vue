<template>
  <div class="recommend" ref="recommend">
    
    <!-- 2.3 使用scroll组件 -->
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>

        <!-- 1.3 轮播图结构-->
        <div class="slider-wrapper" v-if="sliderList.length" ref="sliderWrapper">
          <slider>
            <div v-for="(item, index) in sliderList" :key="index">
              <a :href="item.linkUrl">
                <!-- 3.0 注册图片加载事件 -->
                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>

        <!-- 2.2 热门歌单列表-->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item, index) in discList" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <!-- 4.0 loading结构 => 没有数据时显示，获取到数据时隐藏 -->
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>

    </scroll>

  </div>
</template>

<script>
import {getSliderList, getDiscList} from 'api/recommend';
import {ERR_OK} from 'api/config';
import Slider from 'base-components/slider/BaseSlider';
// import Slider from 'base-components/slider/slider';
import Scroll from 'base-components/scroll/BaseScroll';
import Loading from 'base-components/loading/BaseLoading';
export default {
  components: {Slider, Scroll, Loading},
  data() {
    return {
      sliderList: [],
      discList: []
    }
  },
  created() {
    // 1.1调用
    this._getSliderList();
    // 2.1调用
    this._getDiscList();
  },
  methods: {
    // 1.0 获取轮播图数据
    _getSliderList() {
      getSliderList().then(res => {
        if (res.code === ERR_OK) {
          this.sliderList = res.data.slider;
        }
      });
    },
    // 2.0获取热门唱片数据
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
    // 3.1 解决歌单数据先加载导致不能滑到底部的问题
    loadImage() {
      if (!this.isImageLoaded) {
        this.$refs.scroll.refresh();
        this.isImageLoaded = true;
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
.recommend {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          padding-left: 16px;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>