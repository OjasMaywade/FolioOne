import blogService from "../services/blog.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(async(req, res)=>{
    const {title, content, status, private_blog } = req.body;
    // const {id} = req.user;
    // console.log(id)
    console.log(req.user)

    const created = await blogService.createBlog(title, content, status, private_blog)
})


export default {
    createBlog
}