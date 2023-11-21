import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { BannerService } from './banner.service.js';

const addBanner = catchAsync(async (req, res) => {
  const image = req.image;
  const { ...bannerData } = req.body;
  const data = { ...bannerData, image };
  const result = await BannerService.addBanner(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner added successful',
    data: result,
  });
});

const getBanner = catchAsync(async (req, res) => {
  const result = await BannerService.getBanner();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banners fetched successfully',
    data: result,
  });
});

const updateBanner = catchAsync(async (req, res) => {
  const image = req.image;
  const payload = image ? { ...req.body, image } : req.body;

  const result = await BannerService.updateBanner(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner updated successfully',
    data: result,
  });
});

const deleteBanner = catchAsync(async (req, res) => {
  const result = await BannerService.deleteBanner(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner deleted successfully',
    data: result,
  });
});

export const BannerController = {
  addBanner,
  getBanner,
  updateBanner,
  deleteBanner,
};
