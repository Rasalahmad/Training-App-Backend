import express from 'express';
import { StatisticController } from './statistic.controller.js';

const router = express.Router();

router.get('/', StatisticController.getDashboardData);

export const StatisticRoutes = router;
