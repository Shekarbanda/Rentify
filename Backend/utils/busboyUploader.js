const Busboy = require('busboy'); // ✅ Correct import
const cloudinary = require('./cloudinary');

const busboyUploader = (req) => {
    return new Promise((resolve, reject) => {
        if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
            return reject(new Error('Invalid content-type. Use multipart/form-data.'));
        }

        const bb = new Busboy({ headers: req.headers, limits: { files: 5, fileSize: 10 * 1024 * 1024 } });

        let fields = {};
        let imageUrls = [];
        let fileUploadPromises = [];

        bb.on('file', (fieldname, file, info) => {
            const { filename, mimeType } = info;
            if (!filename) {
                console.warn("Empty file field detected");
                file.resume();
                return;
            }

            const uploadPromise = new Promise((resolve, reject) => {
                const cloudinaryStream = cloudinary.uploader.upload_stream(
                    { folder: 'rentify-images' },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            reject(error);
                        } else {
                            imageUrls.push(result.secure_url);
                            resolve(result.secure_url);
                        }
                    }
                );

                file.pipe(cloudinaryStream);
            });

            fileUploadPromises.push(uploadPromise);
        });

        bb.on('field', (name, val) => {
            fields[name] = val;
        });

        bb.on('finish', async () => {
            try {
                await Promise.all(fileUploadPromises);
                resolve({ fields, imageUrls });
            } catch (error) {
                reject(error);
            }
        });

        bb.on('error', (error) => {
            console.error("Busboy error:", error);
            reject(new Error("File upload error"));
        });

        req.pipe(bb);
    });
};

module.exports = busboyUploader;
