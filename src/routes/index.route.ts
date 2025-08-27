import { Router } from "express";
import userRoutes from "./user.routes.js";
import blogRouter from "./blog.routes.js";
import financeRouter from "./finance.routes.js";
import resumeRouter from "./resume.routes.js";
import todoRouter from "./todo.routes.js";
import spotifyRoutes from "./spotify.routes.js";
import oAuthRouter from "./oauth.routes.js";
const router = Router();


router.use('/user', userRoutes)
router.use('/blog', blogRouter)
router.use('/finance', financeRouter)
router.use('/todo', todoRouter)
router.use('/resume',resumeRouter)
router.use('/spotify', spotifyRoutes)
router.use('/auth',oAuthRouter)

export default router
