"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "umunyarwanda",
    api_key: process.env.CLOUDINARY_API_KEY || "668765665624185",
    api_secret: process.env.CLOUDINARY_API_SECRET || "hXWabLXFkqiH--_dMPivRTj9imU",
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map