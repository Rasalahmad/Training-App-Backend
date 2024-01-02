import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { BatchService } from './batch.service.js';
import { batchFilterableField } from './batch.constant.js';

const addBatch = catchAsync(async (req, res) => {
  const { ...batchData } = req.body;
  const result = await BatchService.addBatch(batchData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch created successful',
    data: result,
  });
});

const getAllBatch = catchAsync(async (req, res) => {
  const filters = pick(req.query, batchFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await BatchService.getAllBatch(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batches fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBatch = catchAsync(async (req, res) => {
  const result = await BatchService.getSingleBatch(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch fetched successfully',
    data: result,
  });
});

const updateBatch = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await BatchService.updateBatch(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch updated successfully',
    data: result,
  });
});

const deleteBatch = catchAsync(async (req, res) => {
  const result = await BatchService.deleteBatch(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch deleted successfully',
    data: result,
  });
});

export const BatchController = {
  addBatch,
  getAllBatch,
  getSingleBatch,
  updateBatch,
  deleteBatch,
};
