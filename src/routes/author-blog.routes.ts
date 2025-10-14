import { Router } from "express";
import {auth} from "../middlewares/auth.middleware.js"
import blogController from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(auth)

router.route('/').post(auth, blogController.createBlog);  //create blog without content

router.route('/drafts').get(auth, blogController.getAllDraft); //get all draft blogs under author

// when author gets all publihed or unlisted blogs then the result should contain blogs content like title only with user interaction details like: no. of comments,likes ,etc

router.route('/publish').get(auth, blogController.getAllPublished); //get all published blog by author

router.route('/unlisted').get(auth, blogController.getUnlistedBlogs); //get all unlisted blog by author

router.route('/:id')
    .get(blogController.getBlogById) // when author gets publihed or unlisted blogs by id then the result should contain blogs content with user interaction details like: comments, no. of likes ,etc
    .patch(auth, blogController.saveChanges) //update draft blogs
    .delete(auth, blogController.deleteBlog); //delete blog by id


router.route('/:id/edit').get(blogController.editBlog);

router.route('/:id/unlist').patch(blogController.unlistBlog) //unlist a published blog

router.route('/:id/saveAndPublish').patch(auth, blogController.saveAndPublish) //save the edit publish blog and publish

//can upload more than one image change single to array
router.route('/:id/upload').post(auth, upload.single('blogImage'), blogController.uploadImage); //upload media

router.route('/:id/publish').post(auth, blogController.publishBlog); //publish draft blog

// I have to create another route to handle edit it will be a get route

export default router;