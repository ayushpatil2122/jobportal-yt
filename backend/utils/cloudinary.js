import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name:"deqql0ixv",
    api_key:"473936535187182",
    api_secret:"RwhlQD6GZ3U5aM-V99yMv8WOnnc"
});
export default cloudinary;