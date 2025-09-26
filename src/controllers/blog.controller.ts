import blogService from "../services/blog.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(async(req, res)=>{
    const {title, content, status, private_blog } = req.body;
    const {id} = req.user;

    const created = await blogService.createBlog(title, content, status, private_blog, id);

    if(!created) throw new Error (`Error Faced at Business logic Level, Please try again`);

    res.status(201).send('Blog is successfully Saved')
})


export default {
    createBlog
}