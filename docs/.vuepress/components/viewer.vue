<template>
    <div class="demo-image__preview">
        <el-image
                :src="src"
                :preview-src-list="srcList">
        </el-image>
    </div>
</template>

<script>
    export default {
        name: "viewer",
        props: {'src': ''},
        data() {
            return {
                srcList: [
                    this._props.src
                ]
            }
        },
        watch: {
            src(curVal) {
                console.error(curVal);
                if (curVal) {
                    this._props.src = curVal;
                }
            },
        }
    }
</script>

<style scoped>

</style>