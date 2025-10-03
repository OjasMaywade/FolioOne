import { Router } from "express";
import {auth} from "../middlewares/auth.middleware.js"
import blogController from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/').post(auth, blogController.createBlog);  //create blog without content

router.route('/drafts').get(auth, blogController.getAllDraft); //get all draft blogs under author

router.route('/').get(auth, );

router.route('/:id').patch(auth, blogController.saveChanges); //update draft blogs

router.route('/:id').delete(auth); //delete blog by id

//can upload more than one image change single to array
router.route('/:id/upload').post(auth, upload.single('blogImage'), blogController.uploadImage); //upload media

router.route('/:id/publish').post(auth, blogController.publishBlog); //publish draft blog

router.route('/:id/')


export default router;