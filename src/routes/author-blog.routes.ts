import { Router } from "express";
import {auth} from "../middlewares/auth.middleware.js"
import blogController from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(auth)

router.route('/').post(auth, blogController.createBlog);  //create blog without content

router.route('/drafts').get(auth, blogController.getAllDraft); //get all draft blogs under author

router.route('/publish').get(auth, blogController.getAllPublished); //get all published blog by author

router.route('/unlisted').get(auth, blogController.getUnlistedBlogs); //get all unlisted blog by author

router.route('/:id').delete(auth, blogController.deleteBlog); //delete blog by id

router.route('/:id/unlist').patch(auth, ) //unlist a published blog

router.route('/:id/save&publish').patch(auth, ) //save the edit publish blog and publish

router.route('/:id').patch(auth, blogController.saveChanges); //update draft blogs

//can upload more than one image change single to array
router.route('/:id/upload').post(auth, upload.single('blogImage'), blogController.uploadImage); //upload media

router.route('/:id/publish').post(auth, blogController.publishBlog); //publish draft blog

router.route('/:id').get(blogController.getBlogById);

// router.route('/:id').get(blogController.getPublishedByID)


export default router;