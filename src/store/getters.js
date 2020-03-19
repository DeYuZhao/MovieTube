const getters = {
  //user
  token: state => state.user.token,
  userId: state => state.user.userId,
  userInfo: state => state.user.userInfo,
  postCommentsList: state => state.user.postCommentsList,
  postLoading: state => state.user.postLoading,
  receiveCommentsList: state => state.user.receiveCommentsList,
  receiveLoading: state => state.user.receiveLoading,
  commentChartData: state => state.user.commentChartData,
  commentChartLoading: state => state.user.commentChartLoading,
  //movie
  movieList: state => state.movie.movieList,
  movieListParams: state => state.movie.movieListParams,
  movieListLoading: state => state.movie.movieListLoading,
  recommendMovieList: state => state.movie.recommendMovieList,
  koubeiMovieList: state => state.movie.koubeiMovieList,
  orderLoading: state => state.movie.orderLoading,
  activeKey: state => state.movie.activeKey,
  tagList: state => state.movie.tagList,
  searchMovieRes: state => state.movie.searchMovieRes,
  searchParams: state => state.movie.searchParams,
  searchLoading: state => state.movie.searchLoading,
  currentMovieId: state => state.movie.currentMovieId,
  currentTag: state => state.movie.currentTag,
  currentMovieInfo: state => state.movie.currentMovieInfo,
  rateParams: state => state.movie.rateParams,
  //comment
  commentList: state => state.comment.commentList,
  total_comments: state => state.comment.total_comments,
  moreReply: state => state.comment.moreReply,
  commentLoading: state => state.comment.commentLoading,
  replyLoading: state => state.comment.replyLoading,
  newComment: state => state.comment.newComment,
  newReply: state => state.comment.newReply,
  gestureVisible: state => state.user.gestureVisible,
  }
  
  export default getters