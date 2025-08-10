import { Router } from "express";
import {redirectFunction, callback} from "../controllers/spotify.oauth.js"

const router = Router();

router.route('/spotify').get(redirectFunction);
router.route('/spotify/callback').get(callback);

export default router;