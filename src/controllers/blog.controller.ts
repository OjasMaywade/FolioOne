import blogService from "../services/blog.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(async(req, res)=>{
    const {id} = req.user;

    const created = await blogService.createBlog(id);

    if(!created) throw new Error (`Error Faced at Business logic Level, Please try again`);

    res.status(201).send('Blog Draft is successfully created')
})

const uploadImage = asyncHandler(async()=>{

})

const saveChanges = asyncHandler(async(req, res)=>{
    const {title, content} = req.body;
    const {id} = req.user;
    const blogId = req.params?.id;

    const changeSaved = await blogService.saveChanges(title, content, blogId, id);

    if(!changeSaved) throw new Error (`Try Again, Changes not saved`);

    res.status(201).send(`Changes Saved!`);

})

export default {
    createBlog,
    saveChanges
}