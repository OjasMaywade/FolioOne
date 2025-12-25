import blogEngagement from "../services/blog-engagement.service.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const bookmark = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const {id} = req.params;

    if(!id) throw new ApiError('Blog ID is required',400);

    const bookmark = await blogService.blogBookmark(id, userId);

    if(!bookmark) throw new ApiError('Blog not bookmarked, try again', 400);

    res.json(new ApiResponse(200, 'Blog bookmarked successfully', bookmark));
})

const removeBookmark = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const blogId = req.params.id;

    if(!blogId) throw new ApiError('Blog ID is required',400);

    const removed = await blogService.removeBookmark(userId, blogId);

    res.json(new ApiResponse(204, 'User Liked Removed Successfully', removed))
})

const likeBlog = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const {id} = req.params;

    if(!id) throw new ApiError('Blog ID is required',400);

    const like = await blogService.likeBlog(id, userId);

    res.json(new ApiResponse(200, 'User liked the blog successfully', like))

})

const removeLike = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const blogId = req.params.id;

    if(!blogId) throw new ApiError('Blog ID is required',400);

    const removed = await blogService.removeLike(userId, blogId);

    res.json(new ApiResponse(204, 'User Liked Removed Successfully', removed))
})

const comment = asyncHandler(async(req, res)=>{
    const {comment} = req.body;
    const {id} = req.params;
    const userId = req.user.id;

    if(!comment) throw new ApiError('User Comment input is required', 400);

    if(!id) throw new ApiError('Blog ID is required',400);

    const blogComment = await blogService.comment(id, userId, comment);

    if(!blogComment) throw new ApiError('error whiling processing your request to post a comment', 400);

    res.json(new ApiResponse(200, 'Commnt posted Successfully', comment));
})

const editComment = asyncHandler(async(req, res)=>{
    const {comment} = req.body;
    const userId = req.user.id;
    const commentId = req.params.id;

    if(!comment) throw new ApiError('Updated Comment is required', 406);

    if(!commentId) throw new ApiError('Comment Id is required, cannot proceed without it', 406);

    const edited = await blogService.editComment(userId, commentId, comment);

    res.json(new ApiResponse(200, 'Comment edited successfully', edited))
})

const deleteComment = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const commentId = req.params.id;

    if(!commentId) throw new ApiError('Comment Id is required, cannot proceed without it', 406);

    const deleted = await blogService.deleteComment(userId, commentId);

    res.json(new ApiResponse(200, 'Comment Deleted Successfully'));
})

const likeComment = asyncHandler(async(req, res)=>{
    const commentId = req.params.id;
    const userId = req.user.id;

    if(!commentId) throw new ApiError('Comment ID is required', 400);

    const likeComment = await blogService.likeComment(commentId, userId);

    if(!likeComment) throw new ApiError('Internl error faced while processing your request to like the comment, try again', 400);
    
    res.json(new ApiResponse(200, 'Comment liked Successfully', likeComment))
})

const getComment = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const blogId = req.params.id;

    if(!blogId) throw new ApiError('Blog ID is required', 400);

    const comment = await blogService.getComment(userId, blogId);

    res.json(new ApiResponse(200, 'Comment data successfully returned', comment));
})

const removeCommentLike = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const commentId = req.params.id;

    if(!commentId) throw new ApiError('Comment ID is required', 400);

    const removed = await blogService.removeCommentLike(userId, commentId);

    res.json(new ApiResponse(200,'Successfully removed like from commeny'));
})


export default {
    bookmark,
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