const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// 🔹 Upload Function
const Uploader = async (imgPath, id, isProfile) => {
    try {
        const results = await cloudinary.uploader.upload(imgPath, {
            folder: "lets-talk",
            public_id: id,
            transformation: isProfile
                ? [
                      { effect: "enhance" },
                      { effect: "improve" },
                  ]
                : []
        });
        return results;
    } catch (error) {
        console.log("Error in Uploader -", error);
        throw error;
    }
};

// 🔹 Delete Function
const DeleteFile = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Deleted from Cloudinary:", result);
        return result;
    } catch (error) {
        console.log("Error in DeleteFile -", error);
        throw error;
    }
};

module.exports = { Uploader, DeleteFile };
