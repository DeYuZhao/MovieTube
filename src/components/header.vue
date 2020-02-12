<template>
    <div class="header">
        <div class="label">
            <img src="@/assets/logo.svg" class="logo" alt="logo">
            <span class="title">Movie Tube</span>
            <a-input-search class="search" aria-placeholder="搜索电影..." size="large" v-model="searchParams.keyword" @search="onSearch" enterButton></a-input-search>
        </div>
        <div class="logout">
            <a-dropdown placement="bottomCenter">
                <div class="user">
                    <a-avatar src="./defaultAvatar.png"></a-avatar>
                    <span style="font-size: 18px">{{ userInfo.username }}</span>
                    <a-icon style="margin-left: 3px; font-size: 16px" type="down"></a-icon>
                </div>
                <a-menu slot="overlay">
                <a-menu-item  @click="jumpToMovie()">
                    <a-icon type="video-camera"></a-icon>
                    电影
                </a-menu-item>
                <a-menu-item @click="jumpToUserInfo()">
                    <a-icon type="profile"></a-icon>
                    我的信息
                </a-menu-item>
                <a-menu-item @click="quit()">
                    <a-icon type="poweroff"></a-icon>
                    退出登录
                </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
        
    </div>
    
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: '',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'searchParams',
            'userId',
            'userInfo'
        ])
    },
    mounted() {
        
        },
    methods: {
        ...mapMutations([
            'set_searchParams'
        ]),
        ...mapActions([
            'searchMovieList',
            'logout'
        ]),
        onSearch(v) {
            if(this.$route.query.keyword != v){
                this.$router.push({ name: 'search', query: { keyword: v } })
            }
        },
        async quit() {
            await this.$store.dispatch('logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        jumpToUserInfo() {
            this.$router.push({ name: 'info', params: { userId: this.userId } })
        },
        jumpToMovie() {
            this.$router.push({ name: 'list'})
        }
    }
}
</script>
<style scoped lang="less">
    .header {
        display: flex;
        line-height: 44px;
        height: 44px;
        align-items: center;
        justify-content: space-between;
        min-width: 800px;
        .label{
            height: 44px;
            line-height: 44px;
            vertical-align: middle;

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

          .search {
              width: 300px; 
              margin-left: 30px
          }
        }
        .logout {
            margin-right: 40px;
            .user {
                cursor: pointer;
                display:flex;
                align-items: center;
                span {
                    margin-left: 5px
                }
            }
        }

    }
</style>