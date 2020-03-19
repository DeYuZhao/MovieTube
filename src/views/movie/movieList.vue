<template>
  <div class="movieList">
    <a-divider></a-divider>
    <a-layout>
        <a-layout-content style="min-width: 800px">
          <TagSelector :tagList="tagList"></TagSelector>
          <a-spin :spinning="movieListLoading">
            <div class="card-wrapper">
            <MovieCard :movie="item" v-for="item in movieList.content" :key="item.index" @click.native="jumpToDetails(item.id)"></MovieCard>
              <div v-for="item in emptyBox" :key="item.name" class="emptyBox ant-col-xs-8 ant-col-lg-6 ant-col-xxl-4">
              </div>
            <a-pagination showQuickJumper :total="movieList.totalElements" :defaultCurrent="1" :current="movieListParams.pageNo+1" @change="pageChange"></a-pagination>
          </div>
          </a-spin>
      </a-layout-content>
      <div>
        <Order :type="1"></Order>
        <Order :type="2"></Order>
      </div>
    </a-layout>
  </div>
</template>
<script>
import MovieCard from './components/movieCard'
import TagSelector from './components/tagSelector'
import Order from './components/order'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'home',
  components: {
    MovieCard,
    TagSelector,
    Order
  },
  data(){
    return{
      emptyBox: [{ name: 'box1' }, { name: 'box2'}, {name: 'box3'}, {name:'box4'}]
    }
  },
  mounted() {
    this.getTagsMap()
  },
  computed: {
    ...mapGetters([
      'movieList',
      'tagList',
      'token',
      'currentTag',
      'movieListLoading',
      'movieListParams'
    ])
  },
  methods: {
    ...mapMutations([
      'set_movieListParams',
      'set_movieListLoading'
    ]),
    ...mapActions([
      'getTagsMap',
      'getMovieList'
    ]),

    pageChange(page, pageSize) {
      const data = {
        pageNo: page - 1
      }
      this.set_movieListParams(data)
      this.getMovieList()
    },
    jumpToDetails(id){
      this.$router.push({ name: 'movieDetail', params: { movieId: id }})
    }
  }
}
</script>
<style scoped lang="less">
  .movieList {
    text-align: center;
    .emptyBox {
      height: 0;
      margin: 10px 20px
    }
    .card-wrapper{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      flex-grow: 3;
      min-height: 800px
    }
    .card-wrapper .card-item {
      margin: 30px;
      position: relative;
      height: 188px;
    }
  }
</style>