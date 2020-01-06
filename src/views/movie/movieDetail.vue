<template>
    <a-layout-content>
        <Header></Header>
        <a-divider></a-divider>
        <comment></comment>
    </a-layout-content>
</template>
<script>
import Header from '@/components/header'
import comment from '@/components/movie/comment'
export default {
    name: 'movieDetail',
    components: {
        Header,
        comment
    }
}
</script>