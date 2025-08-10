import { Router } from "express";
import { topTenTracks } from "../controllers/spotify.controllers.js";

const router = Router();

router.route('/').get(topTenTracks)


export default router;