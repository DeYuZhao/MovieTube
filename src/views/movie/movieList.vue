<template>
  <div class="movieList">
    <Header></Header>
    <a-divider></a-divider>

    <div class="card-wrapper">
      <MovieCard :movie="item" v-for="item in movieList.content" :key="item.index"></MovieCard>
      <div v-for="item in emptyBox" :key="item.name" class="emptyBox ant-col-xs-8 ant-col-lg-6 ant-col-xxl-4">

      </div>
    </div>
    
    <a-pagination showQuickJumper total=20 :defaultCurrent="1" ></a-pagination>
  </div>
</template>

<script>
import Header from '@/components/header'
import MovieCard from '@/components/movie/movieCard'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'home',
  components: {
    Header,
    MovieCard
  },
  data(){
    return{
      cards: 10,
      emptyBox: [{ name: 'box1' }, { name: 'box2'}, {name: 'box3'}, {name:'box4'}]
    }
  },
  mounted() {
    this.getMovieList()
    console.log(this.movieList)
  },
  computed: {
    ...mapGetters([
      'movieList'
    ])
  },
  methods: {
    ...mapActions([
      'getMovieList'
    ])
  }
}
</script>
<style scoped lang="less">
  .movieList {
    padding: 0 150px;
    .emptyBox {
      height: 0;
      margin: 10px 20px
    }
    .card-wrapper{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      flex-grow: 3;
      padding: 20px 0
    }
    .card-wrapper .card-item {
      margin: 30px;
      position: relative;
      height: 188px;
    }
  }
</style>