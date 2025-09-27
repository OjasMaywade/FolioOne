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

export default {
    createBlog
}