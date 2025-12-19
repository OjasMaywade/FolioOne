import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {Validator} from   "../middlewares/validation.middleware.js"
import userValidator from "../validators/user.validator.js";

const router = Router();

router.route('/register').post(Validator(userValidator.register, "body"), userController.register);

router.route('/login').post(Validator(userValidator.login, "body"), userController.login);

router.route('/updateProfile').patch(auth, Validator(userValidator.updateProfile, "body"), userController.updateProfile);

router.route('/deleteUser').delete(auth, userController.deleteUser);

router.route('/logoutUser').patch(auth, userController.logoutUser);

router.route('/refreshAccessToken').post(userController.refreshAccessToken);

router.route('/resetPassword').post(auth, Validator(userValidator.resetPassword, "body"), userController.resetPassword);

router.route('/me').get(auth, userController.me);

router.route('/updateProfilePic').patch(auth, upload.single('profilepic'), Validator(userValidator.updateProfilePic, "file"), userController.updateProfilePic);

router.route('/verifyEmail').post(auth, userController.verifyEmail);

router.route('/forgotPassword').post();

router.route('/bookmarks').get();

router.route('/activity').get();


export default router;