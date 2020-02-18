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
                    referrerPolicy="no-referrer"
                    />
            </a-card>
            <div class="info">
                <div class="items" v-if="movieInfo.title">
                    <span class="label">电影名称：</span>
                    <span class="value">{{ movieInfo.title }}</span>
                </div>
                <div class="items" v-if="movieInfo.directors">
                    <span class="label">导演：</span>
                    <span class="value" v-for="item in movieInfo.directors" :key="item.index">{{ item }}</span>
                </div>
                <div class="items" v-if="movieInfo.casts">
                    <span class="label">主演：</span>
                    <span class="value" v-for="item in movieInfo.casts" :key="item.index">{{ item }}</span>
                </div>
                <div class="items" v-if="movieInfo.doubanRate">
                    <span class="label">评分:</span> 
                    <span class="value">{{ movieInfo.doubanRate }}</span>
                </div>
                <div class="items">
                    <span class="label">我的打分：</span>
                    <a-rate v-model="rateParams.rate" allowHalf :tooltips="rateDes" @change="change"></a-rate>
                    <span>{{ des }}</span>
                </div>
            </div>
        </div>
        
    </div>
    
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'movieDetailCard',
    props: {
        movieInfo: {
            type: Object
        }
    },
    components: {
    },
    data() {
        return{
            rateDes: ['很差', '较差', '一般', '推荐', '力荐'],
            des: ''
        }
    },
    computed: {
        ...mapGetters([     
            'rateParams'
        ])
    },
    mounted(){
        
    },
    methods: {
        ...mapActions([
            'insertOrUpdateRate'
        ]),
        hoverChange(v) {
            
        },
        change(v) {
            if(v<=1){
                this.des = this.rateDes[0]
            }else if(v<=2){
                this.des = this.rateDes[1]
            }else if(v<=3){
                this.des = this.rateDes[2]
            }else if(v<=4){
                this.des = this.rateDes[3]
            }else{
                this.des = this.rateDes[4]
            }
            this.insertOrUpdateRate()
        }
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
<style lang="less">
    .ant-rate {
        margin-bottom: 3px
    }
</style>