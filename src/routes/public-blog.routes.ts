import {Router} from "express";

const router = Router();

router.route('/').get() // get all the published blogs

router.route('/:id').get() //get blog ny id

router.route('/?').get() //get blog by title, content, tags, category, etc

router.route('/')

/*
POST /api/blogs/:id/bookmark - bookmark a blog
9. POST /api/blogs/:id/link - like a blog
10. POST /api/blogs/comments/:id/link - like a comment
11. POST /api/blogs/:id/comments - post a comment, reply to comment
12. GET /api/blogs/:id/comments - get all comments
*/

export default router;