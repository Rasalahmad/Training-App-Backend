import express from 'express';
import { BannerController } from './banner.controller.js';
import { BannerImage } from '../../middlewares/uploader/bannerFileUploader.js';

const router = express.Router();

router.post('/add-banner', BannerImage.uploadImage, BannerController.addBanner);

router.get('/', BannerController.getBanner);

router.patch('/:id', BannerImage.uploadImage, BannerController.updateBanner);

router.delete('/:id', BannerController.deleteBanner);

export const BannerRoutes = router;
