<template>
	<div class="wrapper">
		<swiper :options="swiperOption" v-if="swiperList.length">
	    <!-- slides -->
	    <swiper-slide v-for="item in swiperList" :key="item.id">
				<img class="swiper-img" :src="item.picUrl" alt="">
	    </swiper-slide>
	    <!-- Optional controls -->
	    <div class="swiper-pagination"  slot="pagination"></div>
	  </swiper>
  </div>
</template>

<script>
	export default {
		props: {
			swiperList: Array
		},
		data () {
			return {
				swiperOption: {
					pagination: {
            el: '.swiper-pagination'
          },
          loop : true,
          autoplay: true
				}
			}
		},
		methods: {
		}
	}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet
    background: rgba(255, 255, 255, .5)
    opacity: 1
  
  .wrapper >>> .swiper-pagination-bullet-active
    background: rgba(255, 255, 255, .8)
    width: 20px
    border-radius: 4px
    
	.wrapper
		overflow: hidden
		width: 100%
		height: 0
		padding-bottom: 40%
		.swiper-img
			width: 100%
			
	
</style>