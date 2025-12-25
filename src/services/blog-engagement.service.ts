import blogEngagementQuery from "../db/queries/blog-engagement.query.js";
import { ApiError } from "../utils/apiError.js";

const blogBookmark = async(id, userId)=>{
    const bookmarked = await blogQuery.bookmark(id, userId);

    if(!bookmarked) throw new ApiError('Unable to bookmark the blog',400);

    return bookmarked;
}

const removeBookmark = async(userId, blogId)=>{
    const remove = await blogQuery.removeBookmark(userId, blogId);

    if(!remove.numDeletedRows) throw new ApiError('Error While removing the Bookmark', 400);

    return remove;
}

const likeBlog = async(id, userId)=>{
    const liked = await blogQuery.likeBlog(id, userId);

    console.log(liked);

    if(!liked) throw new ApiError('Error while adding a like in db', 400)

    return liked;
}

const removeLike = async(userId, blogId)=>{
    const remove = await blogQuery.removeLike(userId, blogId);

    if(!remove.numDeletedRows) throw new ApiError('error while removing like from blog', 400);

    return removeLike;
}

const comment = async(id, userId, comment)=>{
    const saveComment = await blogQuery.blogComment(id, userId, comment);

    if(!comment) throw new ApiError('Error while saving comment in db',400);

    return comment;
}

const editComment = async(userId, commentId, comment)=>{
    const edit = await blogQuery.editComment(userId, commentId, comment);

    if(!edit.numChangedRows) throw new ApiError('Error while editing the comment', 400);

    return edit;
}

const deleteComment = async(userId, commentId)=>{
    const deleted = await blogQuery.deleteComment(userId, commentId);

    if(!deleted.numChangedRows) throw new ApiError('Error while deleting the comment', 400);

    return deleted;
}

const likeComment = async(commentId, userId)=>{
    const like = await blogQuery.likeComment(commentId, userId);

    if(!like) throw new ApiError('Error while saving user like info in db', 400);

    return like;
}

const removeCommentLike = async(userId, commentId)=>{
    const remove = await blogQuery.removeCommentLike(userId, commentId);

    if(!remove.numDeletedRows) throw new ApiError('Error While removing like from comment',400);

    return remove;
}

const getComment = async(userId, blogId)=>{
    const comments = await blogQuery.getComment(blogId);

    if(!comments) throw new ApiError('Error while getting all the comments for the blog', 400);

    return comments;
}

export default {
    blogBookmark,
    removeBookmark,
    likeBlog,
    removeLike,
    comment,
    editComment,
    deleteComment,
    likeComment,
    removeCommentLike,
    getComment
}