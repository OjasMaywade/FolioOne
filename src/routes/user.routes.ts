import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/register').post(userController.register);

router.route('/login').post(userController.login);

router.route('/updateProfile').patch(auth, userController.updateProfile);

router.route('/deleteUser').delete(auth, userController.deleteUser);

router.route('/logoutUser').patch(auth, userController.logoutUser);

router.route('/refreshAccessToken').post(userController.refreshAccessToken);

router.route('/resetPassword').post(auth, userController.resetPassword);

router.route('/me').get(auth, userController.me);

router.route('/updateProfilePic').patch(auth, upload.single('profilepic'), userController.updateProfilePic);

router.route('/verifyEmail').post(auth, userController.verifyEmail);

router.route('/forgotPassword').post();

router.route('/bookmarks').get();

router.route('/activity').get();


export default router;