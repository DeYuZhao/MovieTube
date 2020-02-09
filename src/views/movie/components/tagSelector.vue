<template>
    <div class="selector-wrapper">
        <a-tabs defaultActiveKey="0">
            <a-tab-pane tab="默认" key="0" >
                <a-radio-group defaultValue="a" buttonStyle="solid">
                    <a-radio-button :value="item.value" class="item" v-for="item in tagList.General" :key="item.index">{{ item.name }}</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
            <a-tab-pane tab="全部类型" key="1" >
                <a-radio-group defaultValue="a" buttonStyle="solid">
                    <a-radio-button :value="item.value" class="item" v-for="item in tagList.Category" :key="item.index">{{ item.name }}</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
            <a-tab-pane tab="全部年代" key="2">
                <a-radio-group defaultValue="a" buttonStyle="solid">
                    <a-radio-button :value="item.value" class="item" v-for="item in tagList.Decade" :key="item.index">{{ item.name }}</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
            <a-tab-pane tab="全部地区" key="3">
                <a-radio-group defaultValue="a" buttonStyle="solid">
                    <a-radio-button :value="item.value" class="item" v-for="item in tagList.Region" :key="item.index">{{ item.name }}</a-radio-button>
                </a-radio-group>
            </a-tab-pane>
        </a-tabs>
        
    </div>
</template>
<script>
export default {
    name: 'tagSelector',
    props: {
        tagList: {
            type: Object
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