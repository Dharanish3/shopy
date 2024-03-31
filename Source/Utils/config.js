
import cloudinary from "./ImageUpload.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "shopy",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};

// const uploadToCloudinary = (file) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(file.path, (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//         });
//     });
// };





export default uploadToCloudinary
