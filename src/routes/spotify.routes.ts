import { Router } from "express";
import { topTenTracks, nowPlaying, stopPlayback } from "../controllers/spotify.controllers.js";

const router = Router();

router.route('/').get(topTenTracks);

router.route('/now-playing').get(nowPlaying);

router.route('/stop-playback').get(stopPlayback)




export default router;