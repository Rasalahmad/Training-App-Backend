import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import uploader from '../../utils/fileUpload.js';
import ApiError from '../../../errors/ApiError.js';

function uploadImage(req, res, next) {
  const upload = uploader(
    'gallery',
    ['image/jpeg', 'image/jpg', 'image/png'],
    1000000,
    'Only .jpg, jpeg, or .png format allowed!'
  );

  // call the middleware function with two file fields
  upload.fields([{ name: 'image', maxCount: 1 }])(req, res, err => {
    if (err) {
      console.log(err);
      throw new ApiError(500, err.message);
    } else {
      const image = req.files['image'];

      if (!image) {
        next();
      }
      req.image = image[0].filename;
      next();
    }
  });
}

// Middleware to delete an image
function deleteImage(image) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // Check if req.image exists and is a valid image filename
  if (image) {
    const imagePath = path.join(
      __dirname,
      '../../..',
      './uploads/gallery/',
      image
    );
    fs.unlink(imagePath, err => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });
  }
}

export const GalleryImage = { uploadImage, deleteImage };