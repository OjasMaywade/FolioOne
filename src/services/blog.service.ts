import blogQuery from "../db/queries/blog/blog.query.js";
import fs from "fs";
import awsS3 from "../utils/awsS3.js";
import mediaQuery from "../db/queries/blog/media.query.js";
import { ApiError } from "../utils/apiError.js";
import { id } from "zod/v4/locales";

const get = async (filter)=>{
    const {authorId, blogId, status} = filter;

    if(blogId){
        if(authorId){
        return await blogQuery.getBlogById(blogId, authorId);
        }else {
            return await blogQuery.getBlog(blogId);
        }
    }

    if(authorId && status === 'draft'){
        return await blogQuery.getBlogByStatus(authorId, status);
    }

    if(authorId && status === 'published'){
        return await blogQuery.getBlogByStatus(authorId, status);
    }

    if(authorId && status === 'unlisted'){
        return await blogQuery.getBlogByStatus(authorId, status);
    }

    if(!authorId && status === 'published'){
        return await blogQuery.getPublishedBlogs();
    }

    return [];
}

const createBlog = async(id)=>{

    const blogCreated = await blogQuery.createBlog(id);

    if(!blogCreated) throw new ApiError (`Issue while creating your Blog, Try Again`, 500);

    return blogCreated;
}

const saveChanges = async(title, content, blogId, id)=>{
    if(!(title && content)) throw new Error (`Title and Content is required, please provide`);

    if(!blogId) throw new Error (`Blog Id is required, please provide`);

    const searchBlog = await blogQuery.searchBlog(blogId);

    if(!searchBlog) throw new Error(`Blog not found with blogID: ${blogId}`);

    if(!(id === searchBlog.author_id)) throw new Error(`Author ID doesnot match with login user id, cannot update the blog`)
    
    const blogSaved = await blogQuery.saveBlog(title, content, id, blogId);

    if(!blogSaved.numChangedRows) throw new Error (`Issue while saving changed to DB`);

    return blogSaved;
}

const publishBlog = async(status, id, blogId)=>{
    if(!status) throw new Error(`info about status is required`);

    if(status === "draft") throw new Error (`Blog status can't be draft while publishing the blog`);

    // if(isPrivate === true) throw new Error (`Blog can't be private when publishing the blog`);

    if(!id) throw new Error (`User ID of authenticated user is missing, can't proceed with the request`);

    const updateStatus = await blogQuery.updateStatus(status, id, blogId);

    if(!updateStatus.numUpdatedRows) throw new Error(`Error while updating the status in db`);

    return updateStatus
}

const uploadImages = async(id, blogId, path, filename, description)=>{

    const fileData = fs.readFileSync(path);

    if(!fileData) throw new ApiError(`unable to read file data from path`, 500);

    const uploadToS3 = await awsS3.uploadFile(fileData, filename);

    if(uploadToS3.$metadata.httpStatusCode !== 200) throw new ApiError(`Error while uploading image to cloud, try again: ${uploadToS3}`, 500);

    const mediaURL = process.env.URL + filename;

    const insertBlogMedia = await mediaQuery.addBlogMedia(id, blogId, mediaURL, description);

    if(!insertBlogMedia.insertId || !insertBlogMedia.numInsertedOrUpdatedRows) throw new ApiError(`Error while saving image in db, try again`, 500);

    return {mediaURL};
}

const deleteBlog = async(id, blogId)=>{
    if(!id && !blogId) throw new Error (`user id and blog id is required`);

    const deleteBlog = await blogQuery.deleteBlog(id, blogId);

    if(!deleteBlog.numDeletedRows) throw new Error (`blog not deleted from db, try again`);

    return deleteBlog;
}

const getAllDrafts = async(id)=>{
    if(!id) throw new Error(`User id not available, please provide`);

    const allDrafts = await blogQuery.getAllDrafts(id);

    if(!allDrafts) throw new Error(`Error while fetching drafts, please try again`);

    return allDrafts;
}

const getAllPubished = async(id)=>{
    if(!id) throw new Error(`User Id is required, please provide`)

    const published = await blogQuery.getAllPubished(id);

    if(!published) throw new Error(`Error while fetching all published for user: ${id}`)

    if(Array.isArray(published) && published.length === 0) throw new Error (`User does not have a published blog`)

    return published;
}

const getAllUnlisted = async(id)=>{
    if(!id) throw new Error (`User id is required`);

    const unlistedBlogs = await blogQuery.getUnlistedBlogs(id);

    if(Array.isArray(unlistedBlogs) && unlistedBlogs.length === 0) throw new Error (`No Unlisted blog available with user: ${id}`);

    if(!unlistedBlogs) throw new Error (`Error while fetching unlisted blogs from db, try again`);

    return unlistedBlogs;
}

const getBlogById = async(id, blogId)=>{

    const blogContent = await blogQuery.getBlogById(id, blogId);

    if(blogContent === undefined) throw new ApiError (`No publish blog with blog Id: ${blogId} under user: ${id}`, 404);
    
    return blogContent;
}

const unlistBlog = async(id, blogId, status)=>{
    const findBlog = await blogQuery.searchBlog(blogId);

    if(!findBlog) throw new ApiError(`Blog not available with Id: ${blogId}`, 404);

    if(!(findBlog.author_id === id)) throw new ApiError (`Blog Doesn't belongs to User: ${id}, unauthorized to make changes`, 401);

    const unlist = await blogQuery.unlistBlog(id, blogId, status);
    
    if(!unlist.numChangedRows) throw new ApiError (`Internal Error faced while unlisting Blog ${blogId}, please try again`, 500);
    
    return unlist;
}

const saveAndPublish = async(id, blogId, title, content, status)=>{
    const getBlog = await blogQuery.searchBlog(blogId);

    if(!getBlog) throw new ApiError(`Blog not available with blog id: ${blogId}`,400);

    if(getBlog.author_id !== id) throw new ApiError('Blog doesnot belong to author, unauthorized access', 401);

    const saveInDb = await blogQuery.saveAndPublish(id, blogId, title, content);
    console.log(saveInDb)
    if(!saveInDb[0].numChangedRows || !saveInDb[0].numUpdatedRows) throw new ApiError('Error while saving changes in db', 500);

    return saveInDb;
}

const getAllPublishedBlogs = async()=>{
    const blogs = await get({status: 'published'});

    if(!blogs) throw new ApiError('Error while fetching the data from DB', 400);

    return blogs;
}

const getBlog = async(blogId)=>{
    const blog = await get({blogId});

    if(!blog) throw new ApiError('Error while fetching the blog from DB', 400);

    return blog;
}

const search = async(searchParams)=>{
    console.log(searchParams);
}

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
    createBlog,
    saveChanges,
    publishBlog,
    uploadImages,
    getAllDrafts,
    getAllPubished,
    getBlogById,
    getAllUnlisted,
    deleteBlog,
    unlistBlog,
    saveAndPublish,
    getAllPublishedBlogs,
    getBlog,
    search,
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