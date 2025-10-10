import blogQuery from "../db/queries/blog/blog.query.js";
import fs from "fs";
import awsS3 from "../utils/awsS3.js";
import mediaQuery from "../db/queries/blog/media.query.js";
import { all } from "axios";
import { ApiError } from "../utils/apiError.js";

const createBlog = async(id)=>{
    // if(!(title || content)) throw new Error (`Blog Title, Content is required`);

    if(!id) throw new Error (`User Id is required`);

    const blogCreated = await blogQuery.createBlog(id);

    if(!blogCreated) throw new Error (`Issue while saving your Blog, Try Again`);

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
    if(!id || ! blogId) throw new Error (`user and blog id is required`);

    const fileData = fs.readFileSync(path);

    if(!fileData) throw new Error(`unable to read file data from path`);

    const uploadToS3 = await awsS3.uploadFile(fileData, filename);

    if(!uploadToS3) throw new Error(`Error while uploading image to cloud, try again: ${uploadToS3}`);

    const mediaURL = process.env.URL + filename;

    const insertBlogMedia = await mediaQuery.addBlogMedia(id, blogId, mediaURL, description);

    if(!insertBlogMedia) throw new Error(`Error while saving image in db, try again`);

    return {insertBlogMedia, mediaURL};
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
    if(!id && !blogId) throw new Error (`user id and blogId is required, try again`);

    const blogContent = await blogQuery.getBlogById(id, blogId);

    if(blogContent === undefined) throw new Error (`No publish blog with blog Id: ${blogId} under user: ${id}`);
    
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
    unlistBlog
}