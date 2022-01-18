<template>
  <div>
    <div class="copyright">{{ copyright }}</div>
    <div><a href="https://beian.miit.gov.cn/" target="_blank" style="color: #000000">京ICP备18014669号</a></div>
  </div>
</template>

<script>
export default {
  name: "copyright",
  data() {
    return {
      copyright: ""
    }
  },
  mounted() {
    this.copyright = `©2016-${new Date().getFullYear()} lengmang.net 版权所有`
  }
}
</script>

<style scoped>

</style>