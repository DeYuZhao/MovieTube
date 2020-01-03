<template>
  <div class="main">
      <div class="top">
        <div class="header">
          <div>
            <img src="@/assets/logo.svg" class="logo" alt="logo">
            <span class="title">Movie Tube</span>
          </div>
        </div>
        <div class="desc">
          
        </div>
      </div>
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误（admin/ant.design )" />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="邮箱/用户名"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码: admin or ant.design"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              class="login-button"
              @click="handlelogin()"
            >确定</a-button>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="tab2" tab="注册新账号">
          <a-form-item>
            <a-input size="large" type="email" placeholder="邮箱" v-decorator="['registerUserMail', {rules: [{ required: true, message: '请输入帐户名或邮箱地址'}], validateTrigger: 'blur'}]">
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input size="large" type="password" placeholder="密码" v-decorator="['registerPassword', {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}]">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input size="large" type="password" placeholder="确认密码" v-decorator="['registerPasswordconfirm', {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}]">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
           <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              class="login-button"
              @click="handleRegister()"
            >确定</a-button>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>


      

      <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <a
          
          class="forge-password"
          style="float: right;"
        >忘记密码</a>
      </div>
    </a-form>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'login',
  components: {
    
  },
  data () {
    return {
      customActiveKey: 'tab1',
      isLoginError: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions([
      'login'
      ]),

      init() {
        if(this.token){
          this.$router.push('/MovieTube/list')
        }
      },
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      
    },
    handleTabClick (key) {
      this.customActiveKey = key
    },
    handlelogin() {
      const data = {
        username: this.form.getFieldValue("username"),
        password: this.form.getFieldValue("password")
      }
      this.login(data)
    }
  }
}
</script>

<style lang="less" scoped>

.main{
    min-width: 260px;
    width: 368px;
    margin: 100px auto;
    .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
