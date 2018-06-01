<template>
  <transition name="slide">
    <slot></slot>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .slide-enter-active, .slide-leave-active
    transition: transform .3s ease-in-out
</style>