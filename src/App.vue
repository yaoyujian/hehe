<template>
  <div id="app">
    <M-Header></M-Header>
  <router-view>
  </router-view>
    <tab></tab>
    <player></player>
  </div>
</template>

<script >
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/palyer/palyer'
export default {
  components: {
    MHeader,
    Tab,
    Player
  },
}
</script>

<style>

</style>
