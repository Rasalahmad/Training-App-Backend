import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { StudentRegistrationService } from './studentRegistration.service.js';
import { registerStudentFilterableField } from './studentRegistration.constant.js';

const studentRegistration = catchAsync(async (req, res) => {
  const image = req.image;
  const { ...studentRegistrationData } = req.body;
  const data = { ...studentRegistrationData, image };
  const result = await StudentRegistrationService.studentRegistration(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student registered successful',
    data: result,
  });
});

const getRegisteredStudents = catchAsync(async (req, res) => {
  const filters = pick(req.query, registerStudentFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentRegistrationService.getRegisteredStudents(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleRegisteredStudent = catchAsync(async (req, res) => {
  const result = await StudentRegistrationService.getSingleRegisteredStudent(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const updateRegisteredStudent = catchAsync(async (req, res) => {
  const image = req.image;
  const payload = image ? { ...req.body, image } : req.body;

  const result = await StudentRegistrationService.updateRegisteredStudent(
    req.params.id,
    payload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteRegisteredStudent = catchAsync(async (req, res) => {
  const result = await StudentRegistrationService.deleteRegisteredStudent(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentRegistrationController = {
  studentRegistration,
  getRegisteredStudents,
  getSingleRegisteredStudent,
  updateRegisteredStudent,
  deleteRegisteredStudent,
};
