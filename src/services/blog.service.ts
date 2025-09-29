import { id } from "zod/v4/locales";
import blogQuery from "../db/queries/blog.query.js";

const createBlog = async(id)=>{
    // if(!(title || content)) throw new Error (`Blog Title, Content is required`);

    if(!id) throw new Error (`User Id is required`);

    const blogCreated = await blogQuery.createBlog(id);

    if(!blogCreated) throw new Error (`Issue while saving your Blog, Try Again`);

    return blogCreated;
}

const saveChanges = async(title, content, blogId, id)=>{
    if(!(title && content)) throw new Error (`Title and Content is required, please provide`);

    if(!blogId) throw new Error (`Blog Id is required, please provide`)

    const searchBlog = await blogQuery.searchBlog(blogId);

    if(!searchBlog) throw new Error(`Blog not found with blogID: ${blogId}`);

    if(!(id === searchBlog.author_id)) throw new Error(`Author ID doesnot match with login user id, cannot update the blog`)

    const blogSaved = await blogQuery.saveBlog(title, content, blogId, id);

    if(!blogSaved) throw new Error (`Issue while saving changed to DB`);

    return blogSaved;
}

const publishBlog = async(status, private_blog, id, blogId)=>{
    if(!status || !private_blog) throw new Error(`info about status and private is required`);

    if(status === "draft") throw new Error (`Blog status can't be draft while publishing the blog`);

    if(private_blog === true) throw new Error (`Blog can't be private when publishing the blog`);

    if(!id) throw new Error (`User ID of authenticated user is missing, can't proceed with the request`);

    const updateStatus = await blogQuery.updateStatus(status, private_blog, id, blogId);

    if(!updateStatus) throw new Error(`Error while updating the status in db`);

    return updateStatus

}
export default {
    createBlog,
    saveChanges,
    publishBlog
}