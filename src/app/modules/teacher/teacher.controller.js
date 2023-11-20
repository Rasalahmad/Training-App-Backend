import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { teacherFilterableField } from './teacher.constant.js';
import { paginationFields } from '../../../constants/pagination.js';
import { TeacherService } from './teacher.service.js';

const addTeacher = catchAsync(async (req, res) => {
  const image = req.image;
  const { ...teacherData } = req.body;
  const data = { ...teacherData, image };
  const result = await TeacherService.addTeacher(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher added successful',
    data: result,
  });
});

const getTeacher = catchAsync(async (req, res) => {
  const filters = pick(req.query, teacherFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await TeacherService.getTeacher(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teachers fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTeacher = catchAsync(async (req, res) => {
  const result = await TeacherService.getSingleTeacher(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher fetched successfully',
    data: result,
  });
});

const updateTeacher = catchAsync(async (req, res) => {
  const image = req.image;
  const payload = image ? { ...req.body, image } : req.body;

  const result = await TeacherService.updateTeacher(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher updated successfully',
    data: result,
  });
});

const deleteTeacher = catchAsync(async (req, res) => {
  const result = await TeacherService.deleteTeacher(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher deleted successfully',
    data: result,
  });
});

export const TeacherController = {
  addTeacher,
  getTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
