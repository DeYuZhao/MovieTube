<template>
  <div class="movieList">
    <Header></Header>
    <a-divider></a-divider>
    <a-layout>
      <a-spin :spinning="!movieList.content">
        <a-layout-content>
         <div class="card-wrapper">
          <MovieCard :movie="item" v-for="item in movieList.content" :key="item.index"></MovieCard>
          <div v-for="item in emptyBox" :key="item.name" class="emptyBox ant-col-xs-8 ant-col-lg-6 ant-col-xxl-4">

          </div>
          <a-pagination showQuickJumper :total="movieList.totalElements" :defaultCurrent="1" @change="pageChange"></a-pagination>
        </div>
      </a-layout-content>
       
      </a-spin>
      <a-layout-sider class="right-sider" width="300">
        <h3 :style="{ marginBottom: '16px' }">一周排行榜</h3>
        <a-list :dataSource="data">
          <a-list-item></a-list-item>
          <a-list-item slot="renderItem" slot-scope="item">{{item}}</a-list-item>
        </a-list>
      </a-layout-sider>
      
    </a-layout>

    <a-row>
     
    </a-row>

  </div>
</template>

<script>
import Header from '@/components/header'
import MovieCard from '@/components/movie/movieCard'
import { mapGetters, mapActions, mapMutations } from 'vuex'
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
export default {
  name: 'home',
  components: {
    Header,
    MovieCard
  },
  data(){
    return{
      data: data,
      emptyBox: [{ name: 'box1' }, { name: 'box2'}, {name: 'box3'}, {name:'box4'}]
    }
  },
  mounted() {
    this.getMovieList()
  },
  computed: {
    ...mapGetters([
      'movieList'
    ])
  },
  methods: {
    ...mapMutations([
      'set_movieListParams'
    ]),
    ...mapActions([
      'getMovieList'
    ]),

    pageChange(page, pageSize) {
      const data = {
        pageNo: page
      }
      this.$store.commit('set_movieListParams', data)
      this.getMovieList()
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
      padding: 20px 0
    }
    .card-wrapper .card-item {
      margin: 30px;
      position: relative;
      height: 188px;
    }

    .right-sider {
      background: transparent; 
      text-align: left; 
      padding: 20px 20px
      
    }
  }
</style>