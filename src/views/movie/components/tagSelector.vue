<template>
    <div class="selector-wrapper">
        <a-tabs :activeKey="activeKey" @change="changeTabKey">
            <a-tab-pane tab="默认" key="0">
                <a-radio-group defaultValue="hot" buttonStyle="solid" :value="currentTag" @change="chooseTag">
                    <a-radio-button :value="item.value" class="item" v-for="item in tagList.General" :key="item.index">{{ item.name }}</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
            <a-tab-pane tab="全部类型" key="1" >
                <a-radio-group buttonStyle="solid" :value="currentTag" @change="chooseTag">
                    <a-radio-button :value="item.value" class="item" v-for="item in tagList.Category" :key="item.index">{{ item.name }}</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
            <a-tab-pane tab="全部年代" key="2">
                <a-radio-group buttonStyle="solid" :value="currentTag" @change="chooseTag">
                    <a-radio-button :value="item.value" class="item" v-for="item in tagList.Decade" :key="item.index">{{ item.name }}</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
            <a-tab-pane tab="全部地区" key="3">
                <a-radio-group buttonStyle="solid" :value="currentTag" @change="chooseTag">
                    <a-radio-button :value="item.value" class="item" v-for="item in tagList.Region" :key="item.index">{{ item.name }}</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
        </a-tabs>
        
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'tagSelector',
    props: {
        tagList: {
            type: Object
        }
    },
    computed: {
        ...mapGetters([
            'currentTag',
            'movieListLoading',
            'activeKey'
        ])
    },
    methods: {
        ...mapMutations([
            'set_currentTag',
            'set_movieListLoading',
            'set_activeKey'
        ]),
        ...mapActions([
            'getMovieList'
        ]),
        chooseTag(v) {
            this.set_movieListLoading(true)
            this.set_currentTag(v.target.value)
            this.getMovieList()
        },
        changeTabKey(v){
            this.set_activeKey(v)
        }
    }
}
</script>
<style scoped lang="less">
 .selector-wrapper {
     text-align: left;
     min-height: 145px;
     padding: 0 20px;
     .item {
         margin-right: 10px;
         margin-bottom: 10px;
         border-radius: 5px
     }
 }
</style>
<style lang='less'>
    .selector-wrapper {
        .ant-radio-group {
            max-width:600px;
        }
        .ant-radio-button-wrapper {
            border-left: 1px solid #d9d9d9
        }
        .ant-radio-button-wrapper:not(:first-child)::before{
            width: 0
        }
    }
</style>