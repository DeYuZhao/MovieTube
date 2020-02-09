<template>
    <a-layout-content>
        <Header></Header>
        <a-divider></a-divider>
        <movieDetailCard :movieInfo="currentMovieInfo"></movieDetailCard>
        <a-divider></a-divider>
        <comment :commentList="commentList" :totalCount="total_comments"></comment>
    </a-layout-content>
</template>
<script>
import Header from '@/components/header'
import movieDetailCard from './components/movieDetailCard'
import comment from './components/comment'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'movieDetail',
    components: {
        Header,
        comment,
        movieDetailCard
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'currentMovieInfo',
            'commentList',
            'total_comments'
        ])
    },
    mounted() {
        this.set_currentMovieId(this.$route.params.movieId)
        this.getByMovieId()
        this.getRootComment()
    },
    methods: {
        ...mapMutations([
            'set_currentMovieId'
        ]),
        ...mapActions([
            'getByMovieId',
            'getRootComment'
        ])
    }
}
</script>