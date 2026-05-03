import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgotPassword,
  getCurrentUser,
  changeCurrentPassword,
  resendEmailVerification,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  userChangeCurrentPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

//unsecured routes
router.route("/register").post(userRegisterValidator(), validate, registerUser); // verified
router.route("/login").post(userLoginValidator(), validate, loginUser); // verified
router.route("/verify-email/:verificationToken").get(verifyEmail); // verified
router.route("/refresh-token").post(refreshAccessToken); // verified
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest); // verified
router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword); // verified

//secured routes
router.route("/logout").post(verifyJWT, logoutUser); // verified
router.route("/current-user").post(verifyJWT, getCurrentUser); // verified
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  ); // verified
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification); // verified

export default router;
