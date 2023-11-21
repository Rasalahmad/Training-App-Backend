import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { CourseService } from './course.service.js';
import { courseFilterableField } from './course.constant.js';

const addCourse = catchAsync(async (req, res) => {
  const image = req.image;
  const { ...courseData } = req.body;
  const data = { ...courseData, image };
  const result = await CourseService.addCourse(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course added successful',
    data: result,
  });
});

const getCourse = catchAsync(async (req, res) => {
  const filters = pick(req.query, courseFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await CourseService.getCourse(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getSingleCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const image = req.image;
  const payload = image ? { ...req.body, image } : req.body;

  const result = await CourseService.updateCourse(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await CourseService.deleteCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const CourseController = {
  addCourse,
  getCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
