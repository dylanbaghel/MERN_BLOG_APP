const getPostsComments = (comments, postId) => {
    return comments.filter(comment => comment.post._id === postId);
};

export default getPostsComments;