<template>
<div class="music-list">
    <div class="back">
      <i class="icon-back"  @click="back"></i>
    </div>
  <h1 class="title" v-html="title"></h1>
  <div class="bg-image" :style="bgStyle" ref="bgImage">
    <div class="filter"></div>
  </div>
  <div :dtat="songs" class="list" ref="list">
  <div>
    <div class="song-list-wrapper"></div>
    <songlist @select="selectItem" :songs="songs"></songlist>
  </div>
  </div>
</div>
</template>

<script>
  import Bscroll from "better-scroll"
import songlist from '../../base/song-list/song-list'
import {mapActions} from 'vuex'
    export default {
        name: "music-list",
        props:{
        bgImage:{
        type:String,
        default:''
        },
        songs:{
        type:Array,
        default:[]
        },
        title:{
        type:String,
        default:''
        }
        },
        computed:{
          bgStyle() {
            return `background-image:url(${this.bgImage})`
          }
        },
        mounted(){
          this.scroll = new Bscroll(this.$refs.list,{click:true})
        },
        components:{
        songlist
        },
        methods:{
          back() {
            this.$router.back()
          },
        selectItem(item,index){
        this.selectPlay({
        list: this.songs,
        index
        })
        },
          ...mapActions([
          'selectPlay'
          ]
          )
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 2000
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 2000
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      overflow hidden
      transform-origin: top
      background-size: cover
      z-index:1000
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 250px
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper

      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
