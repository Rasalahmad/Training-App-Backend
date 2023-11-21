import express from 'express';
import { ResultController } from './result.controller.js';
import { ResultImage } from '../../middlewares/uploader/resultFileUploader.js';

const router = express.Router();

router.post('/add-result', ResultImage.uploadImage, ResultController.addResult);

router.get('/', ResultController.getResult);

router.get('/:id', ResultController.getSingleResult);

router.patch('/:id', ResultImage.uploadImage, ResultController.updateResult);

router.delete('/:id', ResultController.deleteResult);

export const ResultRoutes = router;
