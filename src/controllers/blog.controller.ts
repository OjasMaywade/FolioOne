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

const getAllDraft = asyncHandler(async(req, res)=>{
    const {id} = req.user;

    const allDraft = await blogService.getAllDrafts(id);

    if(!allDraft) throw new Error(`Error while fetching the drafts: ${allDraft}`);

    res.status(200).json(allDraft);

})

const getDraftByID = asyncHandler(async(req, res)=>{
    const {id} = req.user;
    const blogId = req.params.id;

    const draft = await blogService.getDraftByID(id, blogId);

    if(!draft) throw new Error (`Try Again, can't get your draft`);

    res.status(200).json(draft)
    
})

const getPublishedByID = asyncHandler(async(req, res)=>{
    
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

    const published = await blogService.publishBlog(status, isPrivate, id, blogId);

    if(!publishBlog) throw new Error (`Error while publishing the blog, please try again`);

    res.status(200).send(`blog successfully published!`);
})

const getBlogByID = asyncHandler(async(req, res)=>{
    
})


export default {
    createBlog,
    saveChanges,
    publishBlog,
    uploadImage,
    getAllDraft,
    getAllPublished,
    getDraftByID
}