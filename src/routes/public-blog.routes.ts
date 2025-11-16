import {Router} from "express";
import blogController from "../controllers/blog.controller.js";
import {auth} from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/').get(blogController.getAllPublishedBlogs) // get all the published blogs

router.route('/search').get(blogController.search) //get blog by title, content, tags, category, etc

router.route('/:id').get(blogController.getBlog) //get blog by id

router.route('/:id/bookmark').post(auth, blogController.bookmark)

/*router.route('/:id/like').post(auth, blogController.)

router.route('/:id/comment').post(auth, blogController);

router.route('/comment/:id/like').post(auth, blogController);*/

/*
POST /api/blogs/:id/bookmark - bookmark a blog
9. POST /api/blogs/:id/like - like a blog
10. POST /api/blogs/comments/:id/like - like a comment
11. POST /api/blogs/:id/comments - post a comment, reply to comment
12. GET /api/blogs/:id/comments - get all comments
*/

export default router;