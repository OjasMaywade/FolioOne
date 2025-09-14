import { Router } from "express";
import {redirectFunction, callback} from "../controllers/oauth.controller.js"

const router = Router();

router.route('/:provider').get(redirectFunction);
router.route('/:provider/callback').get(callback);

export default router;