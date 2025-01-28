import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
    //remove password and refresh token from response
    //check for user creation
    //return response 
    
    //get user details from frontend
    const {username, email, password, fullname} = req.body;
    console.log(email);

    //validations-not empty
    if(fullname == ""){
        throw new ApiError(400, "Fullname is required");
    }else if(username == ""){
        throw new ApiError(400, "Username is required");
    }else if(email == ""){
        throw new ApiError(400, "Email is required");
    }else if(password == ""){
        throw new ApiError(400, "Password is required");
    }else if(!email.includes("@")){
        throw new ApiError(400, "Invalid email");
    }else if(password.length < 8){
        throw new ApiError(400, "Password must be atleast 8 characters");
    }else if(username.length < 5){
        throw new ApiError(400, "Username must be atleast 5 characters");
    }else if(fullname.length < 5){
        throw new ApiError(400, "Fullname must be atleast 5 characters");
    }

    //check if user exists: username, email
    const existedUser =  User.findOne({$or: [{username}, {email}]});
    if(existedUser){
        throw new ApiError(400, "User already exists");
    }

    //check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }

    //upload images to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar || !coverImage){
        throw new ApiError(500, "Error uploading images");
    }

    //create user object - save in db 
    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage.url
    })




});

export {registerUser};