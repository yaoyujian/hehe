<template>
  <div class="recommend" ref="recommend">
    <div  ref="wrapper" class="recommend-content" >
      <div>
      <div  class="slider-wrapper">
     <slider swipeid="swipe01" :autoplay="1000" paginationDirection="right">
       <div class="swiper-slide " slot="swiper-con" v-for="item in recommends"> <img  :src="item.picUrl"></div>
     </slider>
      </div>
    <div class="recommend-list">
      <h1 class="list-title"  >热门推荐</h1>
      <ul>
        <li @click="selectItem(item)" v-for="item in discList" class="item">
          <div class="icon">
            <img width="60" height="60" :src="item.imgurl">
          </div>
          <div class="text">
            <h2 class="name" v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
  <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from '../../base/slider/slider'
  import {ERR_OK} from "../../api/config";
  import {getRecommend,getDiscList} from "../../api/recommend";
  import Bscroll from "better-scroll"
  import {mapMutations} from 'vuex'
  export default {
    components: {Slider},
    data(){
  return{
  recommends:[],
  discList:[]
  }
  },
  created(){
    this._getRecommend()
    this._getDiscList()
    },

  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
        _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
          this.$nextTick(()=>{
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.wrapper,{click:true})
            } else {
              this.scroll.refresh();
            }

          })
        })
      },
    ...mapMutations({
    setDisc:'SET_DISC'

    })
    },

   //在get函数执行完以后，然后then才开始执行，然后res相当于获取的数据。然后箭头函数是相当于建立一个函数给res穿进去
  compents:{
  Slider
  },
    watch:{
      letter(){
        if(this.letter) {
          const element=this.$refs[this.letter][0]

          this.scroll.scrollToElement(element)
        }
      }
    }
  }


</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
