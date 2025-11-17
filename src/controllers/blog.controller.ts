import blogService from "../services/blog.service.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createBlog = asyncHandler(async(req, res)=>{
    const {id} = req.user;

    if(!id) throw new ApiError (`User Id is required`, 400);

    const created = await blogService.createBlog(id);

    if(!created) throw new ApiError (`Error Faced at Business logic Level, Please try again`, 500);

    res.json(new ApiResponse(201, 'Blog Draft is successfully created',{}))
})

const uploadImage = asyncHandler(async(req,res)=>{
    const {id} = req.user;
    const description = req.body.description;
    const blogId = req.params.id;

    const {path, filename} = req.file;

    if(!blogId) throw new ApiError (`user and blog id is required`, 400);

    const uploaded = await blogService.uploadImages(id, blogId, path, filename, description);

    if(!uploaded) throw new ApiError (`Error while adding image, try again`, 500);

    res.json(new ApiResponse(200, `Image uploaded successfuly`, uploaded))
})

const saveChanges = asyncHandler(async(req, res)=>{
    const {title, content} = req.body;
    const {id} = req.user;
    const blogId = req.params?.id;

    const changeSaved = await blogService.saveChanges(title, content, blogId, id);

    if(!changeSaved) throw new ApiError ('Try Again, Changes not saved',500);

    res.json( new ApiResponse(202,`Changes Saved!`,{}));
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

    if(!blogId) throw new ApiError (`blogId is required, try again`, 400);

    const blog = await blogService.getBlogById(id, blogId);

    if(!blog) throw new ApiError (`Error while processing your request, try again`, 500);

    res.json(new ApiResponse(200, 'blog provided by id', blog));    
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

    if(!blogId) throw new ApiError ('Blog ID is required', 400);

    if(!status) throw new ApiError(`status is not provided, cannot proceed`, 400);

    const unlisted = await blogService.unlistBlog(id, blogId, status);

    if(!unlisted) throw new ApiError (`Internal Error While unlisting the blog`, 500);

    res.json(new ApiResponse(200,'This Blog is now unlisted', {}))
})

const saveAndPublish = asyncHandler(async(req, res)=>{
    const {id} = req.user;
    const blogId = req.params.id;
    const {title, content, status} = req.body;

    if(!blogId) throw new ApiError('blogId is required, cannot proceed with blogId', 400);
    if(!title || !content) throw new ApiError('Title and content is required', 400);

    const save = await blogService.saveAndPublish(id, blogId, title, content, status);

    if(!save) throw new ApiError('Error while processing your request, try again', 500);

    res.json(new ApiResponse(200, 'Blog saved and published successfully', save));
})

//Controller for public routes

const getAllPublishedBlogs = asyncHandler(async(req, res)=>{
    
    const blogs = await blogService.getAllPublishedBlogs();

    if(!blogs) throw new ApiError("Can't fetch the blogs", 400);

    res.json(new ApiResponse(200, 'Returned all publshed blogs', blogs));

})

// this will be deprecated for public route as we will shift from id to title, or other unique thing
const getBlog = asyncHandler(async(req, res)=>{
    const {id} = req.params;

    if(!id) throw new ApiError('Blog ID is required to fetch the blog', 400);

    const blog = await blogService.getBlog(id);

    res.json(new ApiResponse(200, 'Blog with Id fetched successfully', blog));
})

const search = asyncHandler(async(req, res)=>{
    const searchParam = req.query.q;

    if(!searchParam) throw new ApiError('Cannot get result without the params', 400);

    const result = await blogService.search(searchParam);

})

const bookmark = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const {id} = req.params;

    if(!id) throw new ApiError('Blog ID is required',400);

    const bookmark = await blogService.blogBookmark(id, userId);

    if(!bookmark) throw new ApiError('Blog not bookmarked, try again', 400);

    res.json(new ApiResponse(200, 'Blog bookmarked successfully', bookmark));
})

const likeBlog = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const {id} = req.params;

    if(!id) throw new ApiError('Blog ID is required',400);

    const like = await blogService.likeBlog(id, userId);

    res.json(new ApiResponse(200, 'User liked the blog successfully', like))

})

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
    unlistBlog,
    saveAndPublish,
    getAllPublishedBlogs,
    getBlog,
    search,
    bookmark,
    likeBlog
}