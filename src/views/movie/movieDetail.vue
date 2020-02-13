<template>
    <a-layout-content>
        <a-divider></a-divider>
        <movieDetailCard :movieInfo="currentMovieInfo"></movieDetailCard>
        <a-divider></a-divider>
        <comment :commentList="commentList" :totalCount="total_comments"></comment>
    </a-layout-content>
</template>
<script>
import movieDetailCard from './components/movieDetailCard'
import comment from './components/comment'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'movieDetail',
    components: {
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
        this.set_currentMovieId(Number(this.$route.params.movieId))
        this.set_currentTag(this.$route.query.tag)
        this.getByMovieId()
        this.getRootComment()
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