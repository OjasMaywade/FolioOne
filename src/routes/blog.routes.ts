import { Router } from "express";
import {auth} from "../middlewares/auth.middleware.js"
import blogController from "../controllers/blog.controller.js";

const router = Router();

router.route('/').post(auth, blogController.createBlog);

router.route('/:id').get();

router.route('/:id').patch();

router.route('/:id').delete();

export default router;