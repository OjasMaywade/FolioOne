import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/register').post(userController.register);

router.route('/login').post(userController.login);

router.route('/updateProfile').patch(auth, userController.updateProfile);

router.route('/deleteUser').delete(auth, userController.deleteUser);

router.route('/logoutUser').patch(auth, userController.logoutUser);

router.route('/refreshAccessToken').post(userController.refreshAccessToken);

router.route('/resetPassword').post(auth, userController.resetPassword);

router.route('/me').get(auth, userController.me);

router.route('/updateProfilePic').patch();

router.route('/verifyEmail').post();

router.route('/forgotPassword').post();

router.route('/bookmarks').get();

router.route('/activity').get();


export default router;