import { Router } from "express";
import {auth} from "../middlewares/auth.middleware.js"
import blogController from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/').post(auth, blogController.createBlog);

router.route('/:id').get(auth);

router.route('/:id').patch(auth, blogController.saveChanges);

router.route('/:id').delete(auth);

//can upload more than one image change single to array
router.route('/:id/upload').post(auth, upload.single('blogImage'), blogController.uploadImage);

router.route('/:id/publish').post(auth, blogController.publishBlog);


export default router;