<template>
    <div class="header">
        <div class="label">
            <img src="@/assets/logo.svg" class="logo" alt="logo">
            <span class="title">Movie Tube</span>
            <a-input-search class="search" aria-placeholder="搜索电影..." size="large" @search="onSearch" enterButton></a-input-search>
        </div>
        <div class="logout">
            <a-dropdown placement="bottomCenter">
                <a>
                    <a-icon type="user" style="font-size: 24px; color: #111111"></a-icon>
                </a>
                <a-menu slot="overlay">
                <a-menu-item>
                    <a-icon type="video-camera"></a-icon>
                    电影
                </a-menu-item>
                <a-menu-item>
                    <a-icon type="profile"></a-icon>
                    我的信息
                </a-menu-item>
                <a-menu-item>
                    <a-icon type="poweroff"></a-icon>
                    退出登录
                </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
        
    </div>
    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: '',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
        ])
    },
    methods: {
        ...mapActions([
            'searchMovieList'
        ]),
        onSearch(v) {
            this.$router.push({ name: 'search', query: { keyword: v } })
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
            margin-right: 40px
        }

    }
</style>