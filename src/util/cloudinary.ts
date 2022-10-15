import * as Cloudinary from 'cloudinary';
import * as dotenv from 'dotenv'
import { IFile } from './types';
dotenv.config()

export const cloudinary = Cloudinary.v2;

const options: Cloudinary.ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(options);

export const cloudinaryUpload = async (image: any) => {
  try {
    const res = await cloudinary.uploader.upload(image, {
      fetch_format: 'auto',
      crop: 'scale',
      quality: 'auto',
    });
    return res.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
