<template>
  <div class="comment-wrapper">
    <h1>共{{ totalCount }}条评论</h1>
    <a-spin v-if="commentLoading" class="spin"/>
    <a-list itemLayout="vertical" size="small" :pagination="pagination" :dataSource="commentList" style="padding: 0 20px" v-else>
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
        <a-list-item-meta :description="item.content">
            <a slot="title" v-if="item.fromUsername">{{item.fromUsername}}</a>
            <a slot="title" v-else>用户</a>
            <a-avatar slot="avatar" v-if="item.fromUsername">{{ item.fromUsername }}</a-avatar>
            <a-avatar slot="avatar" icon="user" v-else></a-avatar>
        </a-list-item-meta>
          <a-list v-if="item.defaultReplyCommentList.length > 0" itemLayout="vertical" size="small" :dataSource="item.defaultReplyCommentList" style="padding: 0 45px">
            <a-list-item slot="renderItem" slot-scope="subItem" key="subItem.id">
              <a-list-item-meta :description="subItem.content">
                <div slot="title" v-if="subItem.fromUsername">
                  <a>{{ subItem.fromUsername }}</a>
                  <span style="margin: 0 10px">回复</span>
                  <a>{{ subItem.toUsername }}</a>
                </div>
              <a-avatar slot="avatar" v-if="subItem.fromUsername">{{ subItem.fromUsername }}</a-avatar>
              <a-avatar slot="avatar" icon="user" v-else></a-avatar>
            </a-list-item-meta>
            </a-list-item>
          </a-list>
          <a-button type="link" style="padding: 0 45px" v-if="item.totalReplyCommentCount > 1" @click="showMoreReply(item)">查看全部{{ item.totalReplyCommentCount }}条回复</a-button>
        </a-list-item>
    </a-list>
    <a-modal title="查看对话" v-model="moreReplyVisible" :bodyStyle="{ 'padding': '0' ,'min-height':'400px','max-height':'550px', 'overflow-y':'scroll' }" :width="600" :footer="null">
      <a-list itemLayout="vertical" size="small" style="padding: 0 20px">
        <a-list-item>
        <a-list-item-meta :description="moreReply.comment_content">
            <a slot="title" v-if="moreReply.comment_username">{{moreReply.comment_username}}</a>
            <a slot="title" v-else>用户</a>
            <a-avatar slot="avatar" v-if="moreReply.comment_username">{{ imoreReply.comment_username }}</a-avatar>
            <a-avatar slot="avatar" icon="user" v-else></a-avatar>
        </a-list-item-meta>
        </a-list-item>
      </a-list>

      <div class="divider"></div>

      <h3 style="margin: 20px 24px">共{{7}}条回复</h3>

      <a-spin v-if="replyLoading" class="spin"/>

      <a-list itemLayout="vertical" size="small" :dataSource="moreReply.reply" style="padding: 0 20px" v-else>
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
        <a-list-item-meta :description="item.content">
            <div slot="title" v-if="item.fromUsername">
                  <a>{{ item.fromUsername }}</a>
                  <span style="margin: 0 10px">回复</span>
                  <a>{{ item.toUsername }}</a>
                </div>
            <a-avatar slot="avatar" v-if="item.fromUsername">{{ item.fromUsername }}</a-avatar>
            <a-avatar slot="avatar" icon="user" v-else></a-avatar>
        </a-list-item-meta>
        </a-list-item>
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
        <a-list-item-meta :description="item.content">
            <div slot="title" v-if="item.fromUsername">
                  <a>{{ item.fromUsername }}</a>
                  <span style="margin: 0 10px">回复</span>
                  <a>{{ item.toUsername }}</a>
                </div>
            <a-avatar slot="avatar" v-if="item.fromUsername">{{ item.fromUsername }}</a-avatar>
            <a-avatar slot="avatar" icon="user" v-else></a-avatar>
        </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
  </div>
    
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: {
      commentList: {
        type: Array
      },
      totalCount: {
        type: Number
      }
    },
    data() {
      return {
        moreReplyVisible: false,
        pagination: {
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }
      };
    },
    computed: {
      ...mapGetters([
        'moreReply',
        'commentLoading',
        'replyLoading'
      ])
    },
    methods: {
      ...mapMutations([
        'set_moreReply'
      ]),
      ...mapActions([
        'getReplyOfComment'
      ]),
      showMoreReply(item) {
        this.set_moreReply({
          comment_content: item.content,
          comment_username: item.fromUsername
        })
        this.getReplyOfComment(item.id)
        this.moreReplyVisible = true
      }
    }
  };
</script>
<style scoped lang="less">
  .comment-wrapper{
    padding: 0 40px;
    
  }
  .divider {
    height: 10px;
    background-color: #f6f6f6
  }
  .spin {
    position: relative;
    left: 50%;
    margin-bottom: 20px  
  }
</style>