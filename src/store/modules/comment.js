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
const comment = {
    state: {
        commentList: [

        ],
        total_comments: 0,
        moreReply: {
            comment_username: '',
            comment_content: '',
            reply:[]
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
                    reply: res.content
                })
                commit('set_replyLoading')
            }
        }
    }
}
export default comment