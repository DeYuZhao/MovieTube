<template>
  <div class="comment-wrapper">
    <h1>共{{ totalCount }}条评论</h1>
    <a-spin v-if="commentLoading" class="spin"/>
    <a-list itemLayout="vertical" size="small" :pagination="pagination" :dataSource="commentList" style="padding: 0 20px" v-else>
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
        <a-list-item-meta :description="item.content">
            <div slot="title" v-if="item.fromUsername" style="display: flex; align-items: center; justify-content: space-between">
              <a>{{ item.fromUsername}}</a>
              <a-button type="link" @click="cancelReplyToComment(item)" v-if="item.newReply">取消回复</a-button>
              <a-button type="link" @click="showReplyToComment(item)" v-else>回复</a-button>
            </div>
            <a slot="title" v-else>
              <div slot="title" style="display: flex; align-items: center; justify-content: space-between">
                <a>用户</a>
                <a-button type="link" @click="cancelReplyToComment(item)" v-if="item.newReply">取消回复</a-button>
                <a-button type="link" @click="showReplyToComment(item)" v-else>回复</a-button>
              </div>
            </a>
            <a-avatar slot="avatar" v-if="item.fromUsername">{{ item.fromUsername }}</a-avatar>
            <a-avatar slot="avatar" icon="user" v-else></a-avatar>
        </a-list-item-meta>
            
          <a-list v-if="item.defaultReplyCommentList.length > 0" itemLayout="vertical" size="small" :dataSource="item.defaultReplyCommentList" style="padding: 0 45px">
            <a-list-item slot="renderItem" slot-scope="subItem" key="subItem.id" class="reply">
              <a-list-item-meta :description="subItem.content">
                <div slot="title" v-if="subItem.fromUsername" style="display: flex; align-items: center; justify-content: space-between">
                  <div>
                    <a>{{ subItem.fromUsername }}</a>
                    <span style="margin: 0 10px">回复</span>
                    <a>{{ subItem.toUsername }}</a>
                  </div>
                  <a-button type="link" class="reply-button" @click="cancelReply(subItem)" v-if="subItem.newReply">取消回复</a-button>
                  <a-button type="link" class="reply-button" @click="showReply(item, subItem)" v-else>回复</a-button>
                </div>
              <a-avatar slot="avatar" v-if="subItem.fromUsername">{{ subItem.fromUsername }}</a-avatar>
              <a-avatar slot="avatar" icon="user" v-else></a-avatar>
            </a-list-item-meta>
            <div class="write-comment" v-if="subItem.newReply">
              <a-input type="textarea" placeholder="请写下你的回复" :rows="1" v-model="subItem.newReply.content"></a-input>
              <a-button type="primary" @click="insertNewReply(subItem)">发表</a-button>
            </div>
            </a-list-item>
          </a-list>
          <a-button type="link" style="padding: 0 45px" v-if="item.totalReplyCommentCount > 2" @click="showMoreReply(item)">查看全部{{ item.totalReplyCommentCount }}条回复</a-button>
          <div class="write-comment" v-if="item.newReply">
            <a-input type="textarea" placeholder="请写下你的回复" :rows="1" v-model="item.newReply.content"></a-input>
            <a-button type="primary" @click="insertNewReply(item)">发表</a-button>
          </div>
        </a-list-item>
    </a-list>
    <div class="write-comment">
      <a-input type="textarea" v-model="newComment.content" placeholder="请写下你的评论" :rows="1"></a-input>
      <a-button type="primary" @click="insert()">发表</a-button>
    </div>
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

      <h3 style="margin: 20px 24px">共{{moreReply.total}}条回复</h3>

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
        showReplyVisible: false,
        pagination: {
          pageSize: 8,
        },
      }
    },
    computed: {
      ...mapGetters([
        'moreReply',
        'commentLoading',
        'replyLoading',
        'newComment'
      ])
    },
    methods: {
      ...mapMutations([
        'set_moreReply',
        'set_newReply'
      ]),
      ...mapActions([
        'getReplyOfComment',
        'insertComment',
        'insertReply',
      ]),
      showReplyToComment(item) {
        const a = {
          content: '',
          parentCommentId: item.id,
          rootCommentId: item.id,
          toUserId: item.fromUserId
        }
        delete item.noNewReply
        this.$set(item, 'newReply', a)
      },
      cancelReplyToComment(item) {
        const a = {
          key: ''
        }
        delete item.newReply
        this.$set(item, 'noNewReply', a)
      },
      showReply(item, subItem) {
        const a = {
          content: '',
          parentCommentId: subItem.id,
          rootCommentId: item.id,
          toUserId: subItem.fromUserId
        }
        delete subItem.noNewReply
        this.$set(subItem, 'newReply', a)
      },
      cancelReply(subItem) {
        const a = {
          key: ''
        }
        delete subItem.newReply
        this.$set(subItem, 'noNewReply', a)
      },
      showMoreReply(item) {
        this.set_moreReply({
          comment_content: item.content,
          comment_username: item.fromUsername
        })
        this.getReplyOfComment(item.id)
        this.moreReplyVisible = true
      },
      insert() {
        this.insertComment()
      },
      insertNewReply(subItem) {
        this.set_newReply(subItem.newReply)
        this.insertReply()
      }
    }
  };
</script>
<style scoped lang="less">
  .comment-wrapper{
    padding: 0 40px;
    max-width: 1000px;
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
  .write-comment {
    display: flex;
    align-items: flex-end;
    margin-top: 20px;
    textarea {
      margin-right: 20px
    }
  }
</style>