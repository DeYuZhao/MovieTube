<template>
    <div id="layout">
        <Header></Header>
        <transition name="fade-transform" mode="out-in">
            <router-view/>
        </transition>
        <div class="recognize" :class="{'active': gestureVisible}">
            <div id="test" class="stage"></div>
            <div class="result">
                <h2>识别结果</h2>
                <p>手势名称: <span style="font-weight: bold; color: #111;" id="result">{{ gestureName }}</span></p>
                <p>操作结果: <span style="font-weight: bold; color: #111;" id="result0">{{ gestureResult }}</span></p>
            </div>
        </div>
        <a-button type="primary" shape="circle" style="position:fixed;right: 10px;bottom:10px" @click="showGesture"><a-icon type="form"></a-icon></a-button>
    </div>
</template>
<script>
import Header from '@/components/header'
import smartGesture from '../utils/smart-gesture.min.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'layout',
    components: {
        Header
    },
    data() {
        return {
            gestureVisible: false,
            gestureName:'',
            gestureResult: ''
        }
    },
    computed: {
        ...mapGetters([
            'tagList',
            'activeKey',
            'currentTag',
            'movieListParams'
        ])
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapMutations([
            'set_gestureVisible',
            'set_activeKey',
            'set_currentTag',
            'set_movieListParams'
        ]),
        ...mapActions([
            'getMovieList'
        ]),
        init() {
            const options = {
                el: document.getElementById('test'),
                 enablePath: true,
                timeDelay: 100,
                lineColor: '#666',
                lineWidth: 4,
                triggerMouseKey: 'left',
                activeColor: 'rgba(0, 0, 0, .05)',
                onSwipe: (list) => {
                    switch(list.toString()){
                        case 'D':
                            this.gestureName = '页面滚动'
                            this.gestureResult = '向下滑动'
                            window.scrollBy(0,200)
                            break
                        case 'U':
                            this.gestureName = '页面滚动'
                            this.gestureResult = '向上滑动'
                            window.scrollBy(0,-200)
                            break
                        case 'R':
                            this.gestureName = '翻页'
                            this.gestureResult = '下一页'
                            this.set_movieListParams({
                                pageNo: this.movieListParams.pageNo + 1
                            })
                            this.getMovieList()
                            break
                        case 'L':
                            this.gestureName = '翻页'
                            this.gestureResult = '上一页'
                            if(this.movieListParams.pageNo > 0){
                                this.set_movieListParams({
                                    pageNo: this.movieListParams.pageNo - 1
                                })
                                this.getMovieList()
                            }else{
                                this.$message.warning('已经是第一页啦！')
                            }
                            
                            break
                        case 'U,R,D':
                            this.gestureName = '分类切换'
                            this.gestureResult = '向右切换'
                            if(this.activeKey == '0'){
                                this.set_activeKey('1')
                                this.set_currentTag(this.tagList.Category[0].value)
                                this.getMovieList()
                            }else if(this.activeKey == '1'){
                                this.set_activeKey('2')
                                this.set_currentTag(this.tagList.Decade[0].value)
                                this.getMovieList()
                            }else if(this.activeKey == '2'){
                                this.set_activeKey('3')
                                this.set_currentTag(this.tagList.Region[0].value)
                                this.getMovieList()
                            }else{
                                this.$message.warning('到最右边啦！')
                            }
                            break;
                        case 'U,L,D':
                            this.gestureName = '分页切换'
                            this.gestureResult = '向左切换'
                            if(this.activeKey == '3'){
                                this.set_activeKey('2')
                                this.set_currentTag(this.tagList.Decade[0].value)
                                this.getMovieList()
                            }else if(this.activeKey == '2'){
                                this.set_activeKey('1')
                                this.set_currentTag(this.tagList.Category[0].value)
                                this.getMovieList()
                            }else if(this.activeKey == '1'){
                                this.set_activeKey('0')
                                this.set_currentTag(this.tagList.General[0].value)
                                this.getMovieList()
                            }else{
                                this.$message.warning('到最左边啦！')
                            }
                            break
                        case 'D,R,U':
                            this.gestureName = '小标签切换'
                            this.gestureResult = '向右切换'
                            if(this.activeKey == '0'){
                                const index = this.tagList.General.indexOf(this.tagList.General.filter(item=>item.value == this.currentTag)[0])+1
                                this.set_currentTag(this.tagList.General[index].value)
                            }else if(this.activeKey == '1'){
                                const index = this.tagList.Category.indexOf(this.tagList.Category.filter(item=>item.value == this.currentTag)[0])+1
                                this.set_currentTag(this.tagList.Category[index].value)
                            }else if(this.activeKey == '2'){
                                const index = this.tagList.Decade.indexOf(this.tagList.Decade.filter(item=>item.value == this.currentTag)[0])+1
                                this.set_currentTag(this.tagList.Decade[index].value)
                            }else{
                                const index = this.tagList.Region.indexOf(this.tagList.Region.filter(item=>item.value == this.currentTag)[0])+1
                                this.set_currentTag(this.tagList.Region[index].value)
                            }
                            this.getMovieList()
                            break
                        case 'D,L,U':
                            this.gestureName = '小标签切换'
                            this.gestureResult = '向左切换'
                            if(this.activeKey == '0'){
                                const index = this.tagList.General.indexOf(this.tagList.General.filter(item=>item.value == this.currentTag)[0])-1
                                this.set_currentTag(this.tagList.General[index].value)
                            }else if(this.activeKey == '1'){
                                const index = this.tagList.Category.indexOf(this.tagList.Category.filter(item=>item.value == this.currentTag)[0])-1
                                this.set_currentTag(this.tagList.Category[index].value)
                            }else if(this.activeKey == '2'){
                                const index = this.tagList.Decade.indexOf(this.tagList.Decade.filter(item=>item.value == this.currentTag)[0])-1
                                this.set_currentTag(this.tagList.Decade[index].value)
                            }else{
                                const index = this.tagList.Region.indexOf(this.tagList.Region.filter(item=>item.value == this.currentTag)[0])-1
                                this.set_currentTag(this.tagList.Region[index].value)
                            }
                            this.getMovieList()
                            break
                        default:
                            this.gestureName = '未知手势'
                            this.gestureResult = ''
                    }
                },
                onGesture: (res, points) => {
                }
            };
            const gesture = new smartGesture(options)
        },
        showGesture() {
            this.gestureVisible = !this.gestureVisible
        }
    }
}
</script>
<style scoped>
.configure,
  .recognize {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 15px;
    margin-top: 10px;
    position:fixed;
    bottom: 10px;
    background: #fff;
    right: 50px;
    width: 300px;
    display: none;
  }
  .active {
      display: block;
  }
  .add,
  .result {
    display: inline-block;
    vertical-align: top;
  }
  
  .result {
    /* margin-left: 100px; */
    padding: 0 50px;
    margin-right: 10px;
    /* border-left: 1px dashed #ccc; */
  }
  
  .config-title {
    display: inline-block;
    width: 200px;
  }
  
  .option-tip {
    margin-left: 10px;
    font-size: 12px;
    vertical-align: middle;
  }
  
  .stage {
    height: 200px;
    background: #ddd;
    position: relative;
    margin: 15px 0;
  }
  
  .stage:before {
    content: '绘制区域';
    color: #eeeeee;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>