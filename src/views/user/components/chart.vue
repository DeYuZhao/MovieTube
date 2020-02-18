<template>
    <a-spin :spinning="commentChartLoading">
        <Echart
            :options="options"
            autoresize
            theme="macarons"
        >
        </Echart>
    </a-spin>
</template>
<script>
import Echart from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/theme/macarons'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'chart',
    props: {
        type: {
            type: String
        },
        title: {
            type: String
        },
    },
    components: {
        Echart
    },
    data() {
        return {
            options: {}
        }
    },
    computed: {
        ...mapGetters([
            'commentChartData',
            'commentChartLoading'
        ])
    },
    mounted() {
        this.initChart()
    },
    methods: {
        ...mapActions([
            'getCommentCountBarChart'
        ]),
        async initChart() {
            await this.getCommentCountBarChart()
            this.options = {
                title: {
                    text: this.title,
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['评论数量']
                },
                xAxis: {
                    type: 'category',
                    data: this.commentChartData.xaxisDataList,
                    axisLine:{
                        lineStyle:{
                            color:'#9a9a9a'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine:{
                        lineStyle:{
                            color:'#9a9a9a'
                        }
                    }
                },
                series: [{
                    data: this.commentChartData.yaxisDataLists[0],
                    type: this.type,
                    itemStyle:{
                        normal:{
                            color:'#1890ff'
                        }
                    }
                }]
            }
        }
    }
}
</script>
<style scoped lang="less">

</style>