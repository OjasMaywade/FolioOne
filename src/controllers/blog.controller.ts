import blogService from "../services/blog.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(async(req, res)=>{
    const {id} = req.user;

    const created = await blogService.createBlog(id);

    if(!created) throw new Error (`Error Faced at Business logic Level, Please try again`);

    res.status(201).send('Blog Draft is successfully created')
})

const uploadImage = asyncHandler(async(req,res)=>{
    const {id} = req.user;
    const description = req.body.description;
    const blogId = req.params.id;
    const {path, filename} = req.file;

    const uploaded = await blogService.uploadImages(id, blogId, path, filename, description);

    if(!uploaded) throw new Error (`Error while adding image, try again`);

    res.status(200).json({
        message: `Image uploaded successfuly`,
        link:  uploaded.mediaURL
    })
})

const saveChanges = asyncHandler(async(req, res)=>{
    const {title, content} = req.body;
    const {id} = req.user;
    const blogId = req.params?.id;

    const changeSaved = await blogService.saveChanges(title, content, blogId, id);

    if(!changeSaved) throw new Error (`Try Again, Changes not saved`);

    res.status(201).send(`Changes Saved!`);
})

const editBlog = asyncHandler(async(req, res)=>{
    const {id} = req.user;
    const blogId = req.params.id;

    const blogContent = await blogService.getBlogById(id, blogId);

    if(!blogContent) throw new Error (`Error while processing your request, try again`);

    res.status(200).json(blogContent);
})

const getAllDraft = asyncHandler(async(req, res)=>{
    const {id} = req.user;

    const allDraft = await blogService.getAllDrafts(id);

    if(!allDraft) throw new Error(`Error while fetching the drafts: ${allDraft}`);

    res.status(200).json(allDraft);

})

// Update this controller and return blog content with user interaction details like comments, views, etc
const getBlogById = asyncHandler(async(req, res)=>{
    const {id} = req.user;
    const blogId = req.params.id;

    const blog = await blogService.getBlogById(id, blogId);

    if(!blog) throw new Error (`Error while processing your request, try again`);

    res.status(200).json(blog);    
})

const getAllPublished = asyncHandler(async(req, res)=>{
    const {id} = req.user;

    const allPublished = await blogService.getAllPubished(id);

    if(!allPublished) throw new Error(`Error while fetching the published blogs`);

    res.status(200).json(allPublished);
})

const publishBlog = asyncHandler(async(req, res)=>{
    const {status, isPrivate} = req.body;
    const {id} = req.user;
    const blogId = req.params.id;

    const published = await blogService.publishBlog(status, id, blogId);

    if(!published) throw new Error (`Error while publishing the blog, please try again`);

    res.status(200).send(`blog successfully published!`);
})

const getUnlistedBlogs = asyncHandler(async(req, res)=>{
    const {id} = req.user;
    
    const unlistedBlogs = await blogService.getAllUnlisted(id);

    if(!unlistedBlogs) throw new Error (`Error while processing request to get unlisted blogs`);

    res.status(200).json(unlistedBlogs);
})

const deleteBlog = asyncHandler(async(req, res)=>{
    const {id} = req.user;
    const blogId = req.params.id;

    const deleted = await blogService.deleteBlog(id, blogId);

    if(!deleted) throw new Error (`Error while deleting the blog, please try again`);

    res.status(200).json({
        message: `Blog with ID: ${blogId}, deleted successfully`
    })
})

const unlistBlog = asyncHandler(async(req,res)=>{
    const {id} = req.user;
    const blogId = req.params.id;
    const {status} = req.body;

    if(!blogId) throw new Error ('Blog ID is required');

    if(!status) throw new Error(`status is not provided, cannot proceed`);

    const unlisted = await blogService.unlistBlog(id, blogId, status);

    if(!unlisted) throw new Error (`Internal Error While unlisting the blog`);

    res.status(200).json({
        message: `This Blog is now unlisted`
    })

})

// const saveAndPublish = asyncHandler(async(req, res)=>{
//     const {id} = 
// })

export default {
    createBlog,
    saveChanges,
    publishBlog,
    uploadImage,
    getAllDraft,
    getAllPublished,
    getBlogById,
    getUnlistedBlogs,
    deleteBlog,
    editBlog,
    unlistBlog
}