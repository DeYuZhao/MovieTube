const getters = {
  token: state => state.user.token,
  movieList: state => state.movie.movieList,
  currentMovieId: state => state.movie.currentMovieId,
  currentMovieInfo: state => state.movie.currentMovieInfo,
  commentList: state => state.comment.commentList,
  total_comments: state => state.comment.total_comments,
  moreReply: state => state.comment.moreReply,
  commentLoading: state => state.comment.commentLoading,
  replyLoading: state => state.comment.replyLoading
  }
  
  export default getters