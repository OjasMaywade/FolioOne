import { Router } from "express";
const router = Router();


router.use('/v1/user', require("./"))

export default {router}
