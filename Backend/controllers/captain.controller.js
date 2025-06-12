import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (captainId) => {
  try {
    const captain = await Captain.findById(captainId);
    if (!captain) {
      throw new ApiError(404, "Captain not found");
    }
    const accessToken = captain.generateAccessToken();
    const refreshToken = captain.generateRefreshToken();

    captain.refreshToken = refreshToken;
    await captain.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

const registerCaptain = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    color,
    plateNumber,
    capacity,
    type,
  } = req.body;

  if (
    [firstName, email, password, color, plateNumber, capacity, type].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedCaptain = await Captain.findOne({ email });

  if (existedCaptain) {
    throw new ApiError(400, "Captain already registered");
  }

  const newCaptain = await Captain.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color,
      plateNumber,
      capacity,
      type,
    },
  });

  const createdCaptain = await Captain.findById(newCaptain._id).select(
    "-password -refreshToken"
  );

  if (!createdCaptain) {
    throw new ApiError(401, "Issue while registering the captain");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, createdCaptain, "Captain registered successfully")
    );
});

const loginCaptain = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const captain = await Captain.findOne({ email });

  if (!captain) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await captain.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    captain._id
  );

  const loggedInCaptain = await Captain.findById(captain._id).select(
    "-password -refreshToken"
  );
  if (!loggedInCaptain) {
    throw new ApiError(401, "Issue while logging in the captain");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { captain: loggedInCaptain, accessToken, refreshToken },
        "Captain logged in successfully"
      )
    );
});

const getCaptainProfile = asyncHandler(async (req, res) => {
  const captain = await Captain.findById(req.captain._id).select(
    "-password -refreshToken"
  );
  if (!captain) {
    throw new ApiError(404, "Captain Not Found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, captain, "Captain profile retrieved successfully")
    );
});

const logoutCaptain = asyncHandler(async (req, res) => {
  const captain = await Captain.findById(req.captain._id);
  if (!captain) {
    throw new ApiError(404, "Captain Not Found");
  }

  captain.refreshToken = null;
  await captain.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, null, "Captain logged out successfully"));
});

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
