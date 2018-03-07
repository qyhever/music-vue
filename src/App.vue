<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/MHeader';
export default {
  components: {MHeader}
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
#app
  color: $color-theme
</style>
