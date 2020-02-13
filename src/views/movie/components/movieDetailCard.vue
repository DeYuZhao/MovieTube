<template>
    <div class="movieDetailCard">
        <h1>
            {{ movieInfo.title }}
        </h1>
        <div class="movie-info">
            <a-card style="width: 240px">
                <img
                    alt="example"
                    :src="movieInfo.cover"
                    slot="cover"
                    />
            </a-card>
            <div class="info">
                <div class="items" v-if="movieInfo.title">
                    <span class="label">电影名称:</span>
                    <span class="value">{{ movieInfo.title }}</span>
                </div>
                <div class="items" v-if="movieInfo.directors">
                    <span class="label">导演:</span>
                    <span class="value" v-for="item in movieInfo.directors" :key="item.index">{{ item }}</span>
                </div>
                <div class="items" v-if="movieInfo.casts">
                    <span class="label">主演:</span>
                    <span class="value" v-for="item in movieInfo.casts" :key="item.index">{{ item }}</span>
                </div>
                <div class="items" v-if="movieInfo.rate">
                    <span class="label">评分:</span>
                    <span class="value">{{ movieInfo.rate }}</span>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: 'movieDetailCard',
    props: {
        movieInfo: {
            type: Object
        }
    },
    data() {
        return{

        }
    },
    computed: {

    },
    mounted(){
        
    },
    methods: {
        
    }
}
</script>
<style scoped lang="less">
    .movieDetailCard {
        padding: 0 40px;
    }
    .movie-info {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        .info{
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .items {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .label{
                    margin-right: 10px;
                    font-size: 18px;
                }
                .value {
                    margin-right: 15px
                }
            }
        }
    }
</style>