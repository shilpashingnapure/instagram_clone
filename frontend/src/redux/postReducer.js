import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: { reloadPosts: false, posts: [] },
  reducers: {
    updateStatusforReload: (state) => {
      state.reloadPosts = !state.reloadPosts;
    },
    storePosts: (state, action) => {
      state.posts = action.payload;
    },
    addCommentToPost: (state, { payload }) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === payload.postId
          ? { ...post, comments: [payload.newComment, ...post.comments] }
          : post
      );
      state.posts = [...updatedPosts];
    },
    removeCommentToPost: (state, { payload }) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === payload.postId) {
          const updatedComments = post.comments.filter(
            (comment) => comment.id !== payload.commentId
          );
          return { ...post, comments: [...updatedComments] };
        }
        return post;
      });

      state.posts = [...updatedPosts];
    },
    handleLikePost: (state, { payload }) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === payload.postId
      );
      if (postIndex !== -1) {
        const post = state.posts[postIndex];
        state.posts[postIndex] = {
          ...post,
          isLikedByUser: !post.isLikedByUser,
          totalLikes: post.isLikedByUser
            ? post.totalLikes - 1
            : post.totalLikes + 1,
        };
      }
    },
  },
});

export const {
  updateStatusforReload,
  storePosts,
  addCommentToPost,
  handleLikePost,
  removeCommentToPost,
} = postSlice.actions;
export default postSlice.reducer;
