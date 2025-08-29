import { Router } from "express";
import { login, register, logoutUser, updateProfile, me} from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/updateProfile').patch(auth, updateProfile);

router.route('/deleteUser').delete();

router.route('/logoutUser').patch(auth, logoutUser);

router.route('/refreshAccessToken').post();

router.route('/resetPassword').post();

router.route('/me').get(auth, me);

router.route('/updateProfilePic').patch();

router.route('/verifyEmail').post();

router.route('/forgotPassword').post();

router.route('/bookmarks').get();

router.route('/activity').get();


export default router;