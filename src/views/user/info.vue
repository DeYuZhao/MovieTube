<template>
    <div class="info-wrapper">
        <a-form :form="form" @submit="handleSubmit">
            <a-form-item label="头像" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                <a-avatar src="./defaultAvatar.png" :size="64"></a-avatar>
            </a-form-item>
            <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                <a-input
                    placeholder="请填写用户名"
                    v-decorator="['username', { rules: [{ required: true, message: '请输入用户名' }] }]"
                />
            </a-form-item>
            <a-form-item label="昵称" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
            <a-input
                placeholder="请填写昵称"
                v-decorator="['nickname', { rules: [{ required: true, message: '请输入昵称' }] }]"
            />
            </a-form-item>
            <a-form-item label="邮箱" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                <a-input
                    placeholder="请填写邮箱"
                    v-decorator="['email', { rules: [{ required: true, message: '请输入邮箱' }] }]"
                />
            </a-form-item>
            <a-form-item label="性别" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
            <a-select
                v-decorator="[
                'gender',
                { rules: [{ required: true, message: '请选择性别!' }] },
                ]"
                placeholder="请选择性别"
                @change="handleSelectChange"
            >
                <a-select-option value="male">
                男生
                </a-select-option>
                <a-select-option value="female">
                女生
                </a-select-option>
            </a-select>
            </a-form-item>
            <a-form-item label="手机号" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                <a-input
                    placeholder="请填写手机号"
                    v-decorator="['phone', { rules: [{ required: true, message: '请输入手机号' }] }]"
                />
            </a-form-item>
            <a-form-item label="地址" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                <a-input
                    type="textarea"
                    placeholder="请填写地址"
                    v-decorator="['address']"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
                <a-button type="default" style="margin-left: 30px" html-type="submit">
                    取消
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'info',
    data(){
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {

                }
            });
        },
        handleSelectChange(value) {
            
        },
    }
}
</script>
<style scoped lang="less">
    .info-wrapper {
        padding: 100px 0 0
    }
</style>