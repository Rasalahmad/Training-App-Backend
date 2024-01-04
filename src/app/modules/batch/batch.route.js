import express from 'express';
import { BatchController } from './batch.controller.js';

const router = express.Router();

router.post('/add-batch', BatchController.addBatch);

router.get('/', BatchController.getAllBatch);

router.get('/:id', BatchController.getSingleBatch);

router.patch('/:id', BatchController.updateBatch);

router.delete('/:id', BatchController.deleteBatch);

export const BatchRoutes = router;
