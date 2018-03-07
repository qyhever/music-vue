<template>
  <div class="recommend" ref="recommend">
    
    <!-- 2.0 轮播图结构-->
    <div class="slider-wrapper" v-if="sliderList.length" ref="sliderWrapper">
      <slider>
        <div v-for="(item, index) in sliderList" :key="index">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl" alt="">
          </a>
        </div>
      </slider>
    </div>


  </div>
</template>

<script>
import {getSliderList} from 'api/recommend';
import {ERR_OK} from 'api/config';
import Slider from 'base-components/slider/BaseSlider';
export default {
  components: {Slider},
  data() {
    return {
      sliderList: []
    }
  },
  created() {
    // 1.1调用
    this._getSliderList();
  },
  methods: {
    // 1.0 获取轮播图数据
    _getSliderList() {
      getSliderList().then(res => {
        if (res.code === ERR_OK) {
          this.sliderList = res.data.slider;
          console.log(this.sliderList);
        }
      });
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