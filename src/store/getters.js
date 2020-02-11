const getters = {
  token: state => state.user.token,
  movieList: state => state.movie.movieList,
  tagList: state => state.movie.tagList,
  searchParams: state => state.movie.searchParams,
  currentMovieId: state => state.movie.currentMovieId,
  currentTag: state => state.movie.currentTag,
  currentMovieInfo: state => state.movie.currentMovieInfo,
  commentList: state => state.comment.commentList,
  total_comments: state => state.comment.total_comments,
  moreReply: state => state.comment.moreReply,
  commentLoading: state => state.comment.commentLoading,
  replyLoading: state => state.comment.replyLoading,
  newComment: state => state.comment.newComment,
  newReply: state => state.comment.newReply
  }
  
  export default getters