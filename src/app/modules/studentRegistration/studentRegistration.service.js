import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { registeredStudentImage } from '../../middlewares/uploader/studentRegistrationFileUploader.js';
import { registerStudentSearchableField } from './studentRegistration.constant.js';
import { StudentRegistration } from './studentRegistration.model.js';

const studentRegistration = async payload => {
  const result = await StudentRegistration.create(payload);
  return result;
};

const getRegisteredStudents = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: registerStudentSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filteredData).length) {
    andConditions.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await StudentRegistration.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('Course');

  const total = await StudentRegistration.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleRegisteredStudent = async id => {
  const result = await StudentRegistration.findById(id);
  return result;
};

const updateRegisteredStudent = async (id, payload) => {
  const registeredStudent = await StudentRegistration.findById({ _id: id });

  if (!registeredStudent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  if (payload.image && registeredStudent.image) {
    registeredStudentImage.deleteImage(registeredStudent.image);
  }
  const result = await StudentRegistration.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteRegisteredStudent = async id => {
  const registeredStudent = await StudentRegistration.findById({ _id: id });

  if (!registeredStudent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  if (registeredStudent.image) {
    registeredStudentImage.deleteImage(registeredStudent.image);
  }

  const result = await StudentRegistration.findByIdAndDelete({ _id: id });
  return result;
};

export const StudentRegistrationService = {
  studentRegistration,
  getRegisteredStudents,
  getSingleRegisteredStudent,
  updateRegisteredStudent,
  deleteRegisteredStudent,
};
