import { Router } from "express";
import userRoutes from "./user.routes.js";
import publicBlogRouter from "./public-blog.routes.js";
import authorBlogRouter from "./author-blog.routes.js"
import financeRouter from "./finance.routes.js";
import resumeRouter from "./resume.routes.js";
import todoRouter from "./todo.routes.js";
import spotifyRoutes from "./spotify.routes.js";
import oAuthRouter from "./oauth.routes.js";
const router = Router();


router.use('/users', userRoutes)
router.use('/blogs', publicBlogRouter)
router.use('/me/blogs', authorBlogRouter)
router.use('/finances', financeRouter)
router.use('/todos', todoRouter)
router.use('/resume',resumeRouter)
router.use('/spotify', spotifyRoutes)
router.use('/auth',oAuthRouter)

export default router
