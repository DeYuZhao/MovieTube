<template>
  <a-card hoverable class="movieCard ant-col-xs-7 ant-col-lg-5 ant-col-xxl-3">
    <img
      alt="example"
      :src="movie.cover"
      slot="cover"
      referrerPolicy="no-referrer"
    />
    <a-tooltip :title="movie.title" placement="top">
      <a-card-meta :title="movie.title">
      <template slot="description">
        <a-rate style="font-size: 15px" :value="movie.star/10" disabled allowHalf/> {{movie.doubanRate}}分
      </template>
    </a-card-meta>
    </a-tooltip>
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
        margin: 10px 10px;
        min-width: 180px;
        img {
          height: 250px;
        }
    }
</style>

<style lang="less">
.movieCard{
  .ant-card-body{
    padding: 12px
  }
}

.ant-card-hoverable:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.4)
}

</style>