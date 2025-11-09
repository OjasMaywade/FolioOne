import { Router } from "express";
import { topTenTracks, nowPlaying, startPlaying, stopPlayback, followed } from "../controllers/spotify.controllers.js";

const router = Router();

router.route('/').get(topTenTracks);

router.route('/now-playing').get(nowPlaying);

router.route('/stop-playback').get(stopPlayback);

router.route('/start-playing/:trackNo').get(startPlaying)

router.route('/followed-artist').get(followed);




export default router;