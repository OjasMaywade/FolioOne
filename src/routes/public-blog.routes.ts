import {Router} from "express";

const router = Router();

router.route('/').get() // get all the published blogs

router.route('/:id').get() //get blog ny id

router.route('/?').get() //get blog by title, content, tags, category, etc

router.route('/')

export default router;