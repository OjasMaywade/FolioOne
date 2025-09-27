import blogQuery from "../db/queries/blog.query.js";

const createBlog = async(id)=>{
    // if(!(title || content)) throw new Error (`Blog Title, Content is required`);

    if(!id) throw new Error (`User Id is required`);

    const blogCreated = await blogQuery.createBlog(id);

    if(!blogCreated) throw new Error (`Issue while saving your Blog, Try Again`);

    return blogCreated;
}

export default {
    createBlog
}