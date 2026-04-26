import { User } from "../models/user.model.js";
import { ApiResponce } from "../utils/api-responce.js";
import { ApiError } from "../utils/api-erro.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Somthing went wrong while generating access token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists", []);
  }

  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "Please verify yout email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -emailVerificationExpairy -emailVerificationToken -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Somthing went wrong while registering user");
  }

  return res
    .status(200)
    .json(
      new ApiResponce(
        200,
        { user: createdUser },
        "User verified successfully and a verification email has been sent.",
      ),
    );
});

export { registerUser };
