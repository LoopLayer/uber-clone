import { User } from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const generateAccessAndRefereshTokens= async (userId) => {
    try {
        const user= await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken,refreshToken};

    } catch (error) {
        throw new ApiError(500, "Error generating tokens", error);
        
    }
}

const registerUser= asyncHandler(async(req,res)=>{
    const {firstName,lastName,email,password}= req.body

    if(
        [firstName,email,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All Field Are Required")
    }

    const existedUser= await User.findOne({email})

    if(existedUser){
        throw new ApiError(400,"User Already Registered")
    }

  const user= await User.create({
        fullName:{
            firstName,
            lastName,
        },
        email,
        password,
    })

    const createdUser= await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(401,"Issue while registering the user")
    }

    return res.status(200).json(

        new ApiResponse(200,createdUser,"User registered successfully")
    )

})

const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}= req.body

    if(
        [email,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All Field Are Required")
    }

    const user= await User.findOne({email})

    if(!user){
        throw new ApiError(401,"Invalid Credentials")
    }

    const isPasswordCorrect= await user.isPasswordCorrect(password)

    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid Passsword")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    if (!loggedInUser) {
        throw new ApiError(401, "Issue while logging in the user");
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
}