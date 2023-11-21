import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { ResultService } from './result.service.js';
import { resultFilterableField } from './result.constant.js';

const addResult = catchAsync(async (req, res) => {
  const file = req.file;
  const { ...resultData } = req.body;
  const data = { ...resultData, file };
  const result = await ResultService.addResult(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result added successful',
    data: result,
  });
});

const getResult = catchAsync(async (req, res) => {
  const filters = pick(req.query, resultFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await ResultService.getResult(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Results fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleResult = catchAsync(async (req, res) => {
  const result = await ResultService.getSingleResult(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result fetched successfully',
    data: result,
  });
});

const updateResult = catchAsync(async (req, res) => {
  const file = req.file;
  const payload = file ? { ...req.body, file } : req.body;

  const result = await ResultService.updateResult(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result updated successfully',
    data: result,
  });
});

const deleteResult = catchAsync(async (req, res) => {
  const result = await ResultService.deleteResult(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result deleted successfully',
    data: result,
  });
});

export const ResultController = {
  addResult,
  getResult,
  updateResult,
  getSingleResult,
  deleteResult,
};
