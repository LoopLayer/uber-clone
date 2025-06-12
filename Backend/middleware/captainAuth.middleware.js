import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyCaptain = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
     

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access token is missing or invalid" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const captain = await Captain.findById(decoded._id).select(
      "-password -refreshToken"
    );

    if (!captain) {
      throw new ApiError(401, "Captain not found or unauthorized");
    }

    req.captain = captain; // Attach Captain info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    throw new ApiError(
      401,
      "Unauthorized access, please login again",
      error
    );
  }
});
