<template>
    <a-spin :spinning="orderLoading">
        <a-layout-sider class="right-sider" width="300">
        <h3 :style="{ marginBottom: '16px' }">{{ title }}</h3>
        <a-list :dataSource="content">
          <a-list-item></a-list-item>
          <a-list-item slot="renderItem" slot-scope="item, index">
              <span style="margin-right: 10px">{{ index+1 }}.</span>
              <router-link class="link" :to="{ name: 'movieDetail', params: { movieId: item.id } }">
                  <span>{{ item.title }}</span>
              </router-link>
          </a-list-item>
        </a-list>
      </a-layout-sider>
    </a-spin>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'order',
    props: {
        type: {
            type: Number
        }
    },
    data() {
        return {
            title: '',
            content: []
        }
    },
    computed: {
        ...mapGetters([
            'recommendMovieList',
            'koubeiMovieList',
            'orderLoading'
        ])
    },
    async mounted() {
        this.$store.commit('set_orderLoading', true)
        if(this.type === 1){
            await this.getRecommendMovieList()
            this.content = this.recommendMovieList.content
            this.title = '一周推荐榜'
        }else if (this.type === 2){
            await this.getKoubeiMovieList()
            this.content = this.koubeiMovieList.content
            this.title = '一周口碑榜'
        }
    },
    methods: {
        ...mapActions([
            'getRecommendMovieList',
            'getKoubeiMovieList'
        ])
    }
}
</script>
<style lang="less">
    .right-sider {
        background: transparent; 
        text-align: left; 
        padding: 30px 0 0 50px;
        min-height: 500px;
        .link {
            color: #111;
            
        }
        .link:hover {
            color: #1890ff
        }
    }
</style>