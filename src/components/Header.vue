<template>
  <header class="header">
    <slot name="main" />
    <slot name="sub" />
  </header>
</template>

<script>
export default {
  name: 'v-header',
};
</script>

<style lang="scss" scoped>
  @import '../styles/_settings.scss';

  .header {
    padding: $spacing-base;
    background-color: $primary-color;
    color: #fff;
    h1 {
      border: 3px solid #fff;
      width: 250px;
      margin: 0 auto;
      line-height: 1;
      border-radius: 30px;
      padding: 2px;
      background: $color-blue-dark;
    }
    h3 {
      margin: ($spacing-base + $spacing-xs) 0 0 0;
    }
  }
</style>
