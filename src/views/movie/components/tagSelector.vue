<template>
    <div class="selector-wrapper">
        <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="全部类型" key="1">
                <a-radio-group defaultValue="a" buttonStyle="solid">
                    <a-radio-button value="a" class="item">爱情</a-radio-button>
                    <a-radio-button value="b" class="item">科幻</a-radio-button>
                    <a-radio-button value="c" class="item">悬疑</a-radio-button>
                    <a-radio-button value="d" class="item">恐怖</a-radio-button>
                    <a-radio-button value="e" class="item">动作</a-radio-button>
                    <a-radio-button value="f" class="item">喜剧</a-radio-button>
                    <a-radio-button value="g" class="item">文艺</a-radio-button>
                    <a-radio-button value="h" class="item">经典</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
            <a-tab-pane tab="全部年代" key="2" forceRender>
                <a-radio-group defaultValue="a" buttonStyle="solid">
                    <a-radio-button value="a" class="item">2010</a-radio-button>
                    <a-radio-button value="b" class="item">2011</a-radio-button>
                    <a-radio-button value="c" class="item">2012</a-radio-button>
                    <a-radio-button value="d" class="item">2013</a-radio-button>
                    <a-radio-button value="e" class="item">2014</a-radio-button>
                    <a-radio-button value="f" class="item">2015</a-radio-button>
                    <a-radio-button value="g" class="item">2016</a-radio-button>
                    <a-radio-button value="h" class="item">2017</a-radio-button>
                    <a-radio-button value="i" class="item">2018</a-radio-button>
                    <a-radio-button value="j" class="item">2019</a-radio-button>
                    <a-radio-button value="k" class="item">2020</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
            <a-tab-pane tab="全部地区" key="3">
                <a-radio-group defaultValue="a" buttonStyle="solid">
                    <a-radio-button value="a" class="item">中国</a-radio-button>
                    <a-radio-button value="b" class="item">日本</a-radio-button>
                    <a-radio-button value="c" class="item">韩国</a-radio-button>
                    <a-radio-button value="d" class="item">欧美</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
        </a-tabs>
        
    </div>
</template>
<script>
export default {
    name: 'tagSelector',
    props: {

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