import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { GalleryService } from './gallery.service.js';

const addImage = catchAsync(async (req, res) => {
  const image = req.image;
  const result = await GalleryService.addImage({ image });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image upload successful',
    data: result,
  });
});

const getImages = catchAsync(async (req, res) => {
  const result = await GalleryService.getImages();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Images fetched successfully',
    data: result,
  });
});

const deleteImage = catchAsync(async (req, res) => {
  const result = await GalleryService.deleteImage(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image deleted successfully',
    data: result,
  });
});

export const GalleryController = {
  addImage,
  getImages,
  deleteImage,
};
