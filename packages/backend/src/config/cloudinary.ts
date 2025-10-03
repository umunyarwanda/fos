import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "umunyarwanda",
  api_key: process.env.CLOUDINARY_API_KEY || "668765665624185",
  api_secret: process.env.CLOUDINARY_API_SECRET || "hXWabLXFkqiH--_dMPivRTj9imU",
});

export default cloudinary;