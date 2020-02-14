<template>
    <a-layout>
      <a-layout-content>
        <a-divider></a-divider>
        <movieDetailCard :movieInfo="currentMovieInfo"></movieDetailCard>
        <a-divider></a-divider>
        <comment :commentList="commentList" :totalCount="total_comments"></comment>
    </a-layout-content>
    <div>
        <Order :type="1"></Order>
        <Order :type="2"></Order>
    </div>
    </a-layout>
    
</template>
<script>
import movieDetailCard from './components/movieDetailCard'
import comment from './components/comment'
import Order from './components/order'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'movieDetail',
    components: {
        comment,
        Order,
        movieDetailCard,
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'currentMovieInfo',
            'commentList',
            'total_comments',
            'recommendMovieList',
            'koubeiMovieList'
        ])
    },
    mounted() {
        this.set_currentMovieId(Number(this.$route.params.movieId))
        this.getByMovieId()
        this.getRootComment()
    },
    beforeRouteUpdate(to, from, next) {
        this.set_currentMovieId(Number(to.params.movieId))
        this.getByMovieId()
        this.getRootComment()
        next()
    },
    methods: {
        ...mapMutations([
            'set_currentMovieId',
            'set_currentTag'
        ]),
        ...mapActions([
            'getByMovieId',
            'getRootComment'
        ])
    }
}
</script>