<template>
    <div class="search-wrapper">
        <a-divider></a-divider>
        <h1>搜索    {{ searchParams.keyword }}    </h1>
        <a-layout>
          <a-layout-content>
            <a-spin :spinning="searchLoading">
                <a-list itemLayout="vertical" size="large" :pagination="{ total: searchMovieRes.totalElements, pageSize: 10, onChange: this.changePage }" :dataSource="searchMovieRes.content">
                    <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                    <a-list-item-meta>
                        <router-link slot="title" :to="{ name: 'movieDetail', params: { movieId: item.id } }">{{item.title}}</router-link>
                        <img slot="avatar" :src="item.cover" referrerPolicy="no-referrer" style="width: 100px" @click="jumpToMovieDetail(item.id)"/>
                        <div slot="description">
                            <a-rate style="font-size: 15px" :value="item.star/10" disabled allowHalf/> {{item.doubanRate}}分
                            <div style="margin-top: 10px">
                                <span>导演：</span>
                                <span v-for="director in item.directors" :key="director.index">{{ director }}</span>
                            </div>
                            <div class="casts">
                                <span>主演：</span>
                                <span v-for="cast in item.casts" :key="cast.index">{{ cast }}</span>
                            </div>
                        </div>
                    </a-list-item-meta>
                    </a-list-item>
                </a-list>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Order from './components/order'
export default {
    name: 'searchMovie',
    data() {
        return {
            
        }
    },
    components: {
        Order
    },
    computed: {
        ...mapGetters([
            'searchParams',
            'searchMovieRes',
            'searchLoading'
        ])
    },
    beforeRouteUpdate(to, from ,next) {
        this.set_searchParams({
                keyword: to.query.keyword
            })
        this.searchMovieList()
        next()
    },
    beforeRouteLeave (to, from ,next) {
        this.set_searchParams({
            keyword: '',
            pageNo: 0
        })
        next()
    },
    mounted() {
        this.set_searchParams({
                keyword: this.$route.query.keyword
            })
        this.searchMovieList()
    },
    methods: {
        ...mapMutations([
            'set_searchParams'
        ]),
        ...mapActions([
            'searchMovieList'
        ]),
        changePage(page, pageSize) {
            this.set_searchParams({
                pageNo: page - 1,
                pageSize: pageSize
            }),
            this.searchMovieList()
        },
        jumpToMovieDetail(v){
            this.$router.push({name: 'movieDetail', params: { movieId: v }})
        }
    }
}
</script>
<style scoped lang="less">
    .search-wrapper {
        min-height: 600px;
        padding: 0 50px;
        img {
            cursor: pointer;
        }
        .casts {
            margin-top: 10px;
            span {
                margin-right: 10px
            }
        }
    }
</style>