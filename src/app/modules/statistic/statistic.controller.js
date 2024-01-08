import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import { StatisticService } from './statistic.service.js';
import sendResponse from '../../../shared/sendResponse.js';

const getDashboardData = catchAsync(async (req, res) => {
  const result = await StatisticService.getDashboardData();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Statistic fetched successfully',
    data: result,
  });
});

export const StatisticController = {
  getDashboardData,
};
