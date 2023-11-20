import express from 'express';
import { GalleryController } from './gallery.controller.js';
import { GalleryImage } from '../../middlewares/uploader/galleryFileUploader.js';

const router = express.Router();

router.post('/add-image', GalleryImage.uploadImage, GalleryController.addImage);

router.get('/', GalleryController.getImages);

router.delete('/:id', GalleryController.deleteImage);

export const GalleryRoutes = router;
