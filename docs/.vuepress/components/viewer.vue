<template>
  <div class="demo-image__preview">
    <el-image :src="src"> </el-image>
  </div>
</template>

<script>
export default {
  name: "viewer",
  props: {
    src: "",
  },
};
</script>

<style scoped>
</style>