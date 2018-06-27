<template>
  <div class="swiper-container" :class="swipeid">
    <div class="swiper-wrapper" >
      <slot name="swiper-con"></slot>
    </div>
    <!-- 分页器 -->
    <div :class="{'swiper-pagination':pagination}"></div>
  </div>
</template>
<script>
  import '../../base/lib/js/swiper.js'
  export default {
    props: {
      swipeid: {
        type: String,
        default: ''
      },
      effect: {
        type: String,
        default: 'slide'
      },
      loop: {
        type: Boolean,
        default: true
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      pagination: {
        type: Boolean,
        default: true
      },
      autoplay: {
        type: Number,
        default: 5000,
      },
      paginationType: {
        type: String,
        default: 'bullets'
      }
    },
    mounted() {
      var That = this;
      var mySwiper=new Swiper('.'+That.swipeid, {
        preloadImages:false,
        lazyLoading : true,
        //循环
        loop: That.loop,
        //分页器
        pagination: '.swiper-pagination',
        //分页类型
         paginationType: That.paginationType, //fraction,progress,bullets
        //自动播放
        autoplay: That.autoplay,
        //方向
        direction: That.direction,
        //特效
        observer:true,//这个很重要
        observeParents:true,
        effect: That.effect, //slide,fade,coverflow,cube
        onSlideChangeEnd: function(swiper){
          swiper.update();
          mySwiper.startAutoplay();
          mySwiper.reLoop();
        }
      })
    }
  }

</script>
<style>
  @import '../../base/lib/css/swiper.css';

  .swiper-container img{
    width: 100%
  }

</style>
