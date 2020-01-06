<template>
    <a-card hoverable class="movieCard ant-col-xs-8 ant-col-lg-6 ant-col-xxl-4">
    <img
      alt="example"
      :src="movie.cover"
      slot="cover"
      referrerPolicy="no-referrer"
    />
    <a-card-meta :title="movie.title">
      <template slot="description"
        ></template
      >
    </a-card-meta>
  </a-card>
</template>
<script>
export default {
  name:'',
  props: {
    movie: {}
  },
  data() {
    return{

    }
  },
}
</script>
<style scoped lang="less">
    .movieCard {
        margin: 10px 20px
    }
</style>