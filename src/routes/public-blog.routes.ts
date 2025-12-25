import {Router} from "express";
import blogController from "../controllers/blog.controller.js";
import {auth} from "../middlewares/auth.middleware.js";
import blogEngagementController from "../controllers/blog-engagement.controller.js";

const router = Router();

router.route('/').get(blogController.getAllPublishedBlogs) // get all the published blogs

router.route('/search').get(blogController.search) //get blog by title, content, tags, category, etc

router.route('/explore-topic').get();

router.route('/tag/:tag').get(); //check can we pass alphabets/string in :tag through params

router.route('/:id').get(blogController.getBlog) //get blog by id

router.route('/:id/bookmark')
    .post(auth, blogEngagementController.bookmark)
    .delete(auth, blogEngagementController.removeBookmark) //- remove the bookmark

router.route('/:id/like')
    .post(auth, blogEngagementController.likeBlog)
    .delete(auth, blogEngagementController.removeLike) //- remove the like

router.route('/:id/comments')
    .get(auth, blogEngagementController.getComment)
    .post(auth, blogEngagementController.comment)

router.route('/comments/:id')
    .patch(auth, blogEngagementController.editComment)
    .delete(auth, blogEngagementController.deleteComment)

router.route('/comments/:id/like')
    .post(auth, blogEngagementController.likeComment)
    .delete(auth, blogEngagementController.removeCommentLike);

/*
20. /api/v1/blogs/explore-topic - return all the topics like: life, self-improvement, etc with sub-topics and also allow to search a tag/topic and this will get them to /api/v1/blogs/tag/topics(career, etc) route.
21. /api/v1/blogs/tag/topics(career, etc) - return all the blogs under this category/tag
22. /api/v1/blogs/tag/topics(career, etc) - add a option to follow the tag/topics/category
*/

/*
router.route('/:id/comment').delete(auth, blogController);
router.route('/:id/comment').patch(auth, blogController);

router.route('/:id/like').delete(auth, blogController) - remove the like

router.route('/:id/bookmark').delete(auth, blogController) - remove the bookmark


*/

/*
POST /api/blogs/:id/bookmark - bookmark a blog
9. POST /api/blogs/:id/like - like a blog
10. POST /api/blogs/comments/:id/like - like a comment
11. POST /api/blogs/:id/comments - post a comment, reply to comment
12. GET /api/blogs/:id/comments - get all comments
*/

export default router;