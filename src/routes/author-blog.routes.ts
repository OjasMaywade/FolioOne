import { Router } from "express";
import {auth} from "../middlewares/auth.middleware.js"
import blogController from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/').post(auth, blogController.createBlog);  //create blog without content

router.route('/:id').patch(auth, blogController.saveChanges); //update draft blogs

//can upload more than one image change single to array
router.route('/:id/upload').post(auth, upload.single('blogImage'), blogController.uploadImage); //upload media

router.route('/:id/publish').post(auth, blogController.publishBlog); //publish draft blog

router.route('/drafts').get(auth, blogController.getAllDraft); //get all draft blogs under author

router.route('/publish').get(auth, blogController.getAllPublished); //get all published blog by author

router.route('/:id').delete(auth); //delete blog by id

router.route('/:id/unlist').patch(auth) //unlist a published blog

router.route('/:id/save&publish').patch(auth) //save the edit publish blog and publish


router.route('/')


export default router;