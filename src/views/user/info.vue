<template>
    <div class="info-wrapper">
        <a-tabs>
            <a-tab-pane tab="我的信息" key="1">
                <a-form :form="form" style="margin-top: 30px">
                    <a-form-item label="头像" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-avatar src="./defaultAvatar.png" :size="64"></a-avatar>
                    </a-form-item>
                    <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                        <a-input
                            placeholder="请填写用户名"
                            v-decorator="['username', { rules: [{ required: true, message: '请输入用户名' }] }]"
                            v-if="modify"
                        />
                        <span v-else>{{ userInfo.username }}</span>
                    </a-form-item>
                    <a-form-item label="昵称" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                        <a-input
                            placeholder="请填写昵称"
                            v-decorator="['nickname', { rules: [{ required: true, message: '请输入昵称' }] }]"
                            v-if="modify"
                        />
                        <span v-else>{{ userInfo.nickname }}</span>
                    </a-form-item>
                    <a-form-item label="邮箱" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-input
                            placeholder="请填写邮箱"
                            v-decorator="['email', { rules: [{ required: true, message: '请输入邮箱' }] }]"
                            v-if="modify"
                        />
                        <span v-else>{{ userInfo.email }}</span>
                    </a-form-item>
                    <a-form-item label="性别" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-select
                            v-decorator="[
                            'gender',
                            { rules: [{ required: true, message: '请选择性别!' }] },
                            ]"
                            v-if="modify"
                            placeholder="请选择性别"
                        >
                            <a-select-option value="male">
                            男生
                            </a-select-option>
                            <a-select-option value="female">
                            女生
                            </a-select-option>
                        </a-select>
                        <span v-else>{{ userInfo.gender }}</span>
                    </a-form-item>
                    <a-form-item label="手机号" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-input
                            placeholder="请填写手机号"
                            v-decorator="['phoneNumber', { rules: [{ required: true, message: '请输入手机号' }] }]"
                            v-if="modify"
                        />
                        <span v-else>{{ userInfo.phoneNumber}}</span>
                    </a-form-item>
                    <a-form-item label="地址" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-input
                            type="textarea"
                            placeholder="请填写地址"
                            v-decorator="['address']"
                            v-if="modify"
                        />
                        <span v-else>{{ userInfo.address }}</span>
                    </a-form-item>
                   
                    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" v-if="modify">
                        <a-button type="primary" @click="saveModify">
                            保存
                        </a-button>
                        <a-button type="default" style="margin-left: 30px" @click="cancelModify">
                            取消
                        </a-button>
                    </a-form-item>
                     <a-form-item :wrapper-col="{ span: 8, offset: 4 }" v-else>
                        <a-button type="primary" @click="modifyInfo">
                            修改信息
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane tab="我发表的评论" key="2">
                <div class="chart">
                    <bar-chart type="bar" title="评论数柱状图"></bar-chart>
                    <bar-chart type="line" title="评论数折线图"></bar-chart>
                </div>
                <a-divider></a-divider>
                <h1>详细数据</h1>
                <a-table
                    rowKey="{record => record.id}"
                    :loading="postLoading"
                    :columns="postCommentsColumns"
                    :dataSource="postCommentsList.content"
                    :pagination="{ pageSize: 10 }"
                >
                
                    <a slot="movieName" slot-scope="record">{{ record }}</a>
                    <span slot="directors" slot-scope="record">{{ record.join(',') }}</span>
                </a-table>
            </a-tab-pane>
            <a-tab-pane tab="我收到的评论" key="3">
                <a-table
                    rowKey="{record => record.id}"
                    :loading="receiveLoading"
                    :columns="receiveCommentsColumns"
                    :dataSource="receiveCommentsList.content"
                    :pagination="{ pageSize: 10 }"
                >
                    <a slot="movieName" slot-scope="record">{{ record }}</a>
                    <span slot="directors" slot-scope="record">{{ record.join(',') }}</span>
                </a-table>
            </a-tab-pane>
        </a-tabs>
        
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BarChart from './components/chart'
const postCommentsColumns = [
    {
      title: '发表时间',
      dataIndex: 'createTime',
      width: 100,
    },
    {
      title: '导演',
      dataIndex: 'simpleMovieInfo.directors',
      width: 100,
      scopedSlots: { customRender: 'directors' }
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      width: 100,
    },
    {
      title: '评论用户',
      dataIndex: 'toUsername',
      width: 100,
    },
    {
      title: '评论电影',
      dataIndex: 'simpleMovieInfo.title',
      width: 100,
      scopedSlots: { customRender: 'movieName' },
    },
    
  ];
  const receiveCommentsColumns = [
    {
      title: '发表时间',
      dataIndex: 'createTime',
      width: 100,
    },
    {
      title: '导演',
      dataIndex: 'simpleMovieInfo.directors',
      width: 100,
      scopedSlots: { customRender: 'directors' }
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      width: 100,
    },
    {
      title: '来自用户',
      dataIndex: 'fromUsername',
      width: 100,
    },
    {
      title: '发表电影',
      dataIndex: 'simpleMovieInfo.title',
      width: 100,
      scopedSlots: { customRender: 'movieName' },
    },
  ];
export default {
    name: 'info',
    data(){
        return {
            modify: false,
            formLayout: 'horizontal',
            pagination: {},
            postCommentsColumns,
            receiveCommentsColumns,
            form: this.$form.createForm(this, { name: 'coordinated' }),
        }
    },
    components: {
        BarChart  
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'postCommentsList',
            'receiveCommentsList',
            'postLoading',
            'receiveLoading'
        ])
    },
    mounted() {
        this.getUserPostComments()
        this.getUserReceiveComments()
    },
    methods: {
        ...mapActions([
            'updateUserInfoById',
            'getUserPostComments',
            'getUserReceiveComments',
            'getCommentCountBarChart'
        ]),
        saveModify() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    const data = {
                        username: this.form.getFieldValue('username'),
                        nickname: this.form.getFieldValue('nickname'),
                        email: this.form.getFieldValue('email'),
                        phoneNumber: this.form.getFieldValue('phoneNumber'),
                        gender: this.form.getFieldValue('gender'),
                        address: this.form.getFieldValue('address')
                    }
                    this.updateUserInfoById(data).then(()=>{
                        this.modify = false
                    })
                }
            });
        },
        modifyInfo() {
            setTimeout(() => {
                this.form.setFieldsValue({
                    'username': this.userInfo.username,
                    'nickname': this.userInfo.nickname,
                    'email': this.userInfo.email,
                    'phoneNumber': this.userInfo.phoneNumber,
                    'gender': this.userInfo.gender,
                    'address': this.userInfo.address
                })
            }, 0)
            this.modify = true
        },
        cancelModify() {
            this.modify = false
        }
        
    }
}
</script>
<style scoped lang="less">
    .info-wrapper {
        padding: 50px 0 0;
        .chart {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
        }
    }
</style>
<style lang="less">
    .info-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">
    
</style>