import {
    deleteByCommentIdAPI,
    deleteByMovieIdAPI,
    insertCommentAPI,
    listReplyCommentOfRootCommentAPI,
    listRootCommentByMovieIdAPI,
    listUserPostCommentsAPI,
    listUserReceiveComments
} from '@/api/comment'
import store from '@/store'
import { message } from 'ant-design-vue'
const comment = {
    state: {
        commentList: [

        ],
        total_comments: 0,
        moreReply: {
            comment_username: '',
            comment_content: '',
            reply:[],
            total:0
        },
        newComment: {
            content: '',
            createTime: '',
            fromUserId: 1,
            id:'',
            movieId:'',
            parentCommentId: -1,
            rootCommentId: -1,
            toUserId: -1
          },
        newReply: {
            content: '',
            createTime: '',
            fromUserId: 1,
            id:'',
            movieId:'',
            parentCommentId: '',
            rootCommentId: '',
            toUserId: ''
          },
        commentLoading: true,
        replyLoading: true
    },
    mutations: {
        set_commentList: function(state, data){
            state.commentList = data
        },
        set_total_comments: function(state, data){
            state.total_comments = data
        },
        set_moreReply: function(state, data){
            state.moreReply = {
                ...state.moreReply,
                ...data
            }
        },
        set_commentLoading: function(state){
            state.commentLoading = false
        },
        set_replyLoading: function(state){
            state.replyLoading = false
        },
        set_newComment: function(state, data){
            state.newComment = {
                ...state.newComment,
                ...data
            }
        },
        set_newReply: function(state, data){
            state.newReply = {
                ...state.newReply,
                ...data
            }
        }
    },
    actions: {
        getRootComment: async({ commit }) => {
            const res = await listRootCommentByMovieIdAPI({
                movieId: store.state.movie.currentMovieId,
                pageNo: '',
                pageSize: ''
            })
            if(res){
                commit('set_commentList', res.content)
                commit('set_total_comments', res.totalElements)
                commit('set_commentLoading')
            }
        },
        getReplyOfComment: async({ commit }, commentId) => {
            const res = await listReplyCommentOfRootCommentAPI({
                movieId: store.state.movie.currentMovieId,
                rootCommentId: commentId,
                pageNo: '',
                pageSize: ''
            })
            if(res){
                commit('set_moreReply', {
                    reply: res.content,
                    total: res.totalElements
                })
                commit('set_replyLoading')
            }
        },
        insertComment: async({ state, commit, dispatch }) => {
            commit('set_newComment',{
                movieId: store.state.movie.currentMovieId
            })
            const res = await insertCommentAPI(state.newComment)
            
            if(res){
                dispatch('getRootComment')
                commit('set_newComment',{
                    content: ''
                })
                message.success('发表成功')
            }
        },
        insertReply: async({ state, commit, dispatch }) => {
            commit('set_newReply', {
                movieId: store.state.movie.currentMovieId
            })
            const res = await insertCommentAPI(state.newReply)
        }
    }
}
export default comment