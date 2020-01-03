<template>
    <div class="header">
        <div class="label">
            <img src="@/assets/logo.svg" class="logo" alt="logo">
        <span class="title">Movie Tube</span>
        </div>
        <div class="search">
             <a-input-search size="large" style="width: 300px"></a-input-search>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {

        }
    }

}
</script>
<style scoped lang="less">
    .header {
        display: flex;
        line-height: 44px;
        height: 44px;
        align-items: center;
        justify-content: center;
        .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }

          .search{
              margin-left: 30px
          }
    }
</style>