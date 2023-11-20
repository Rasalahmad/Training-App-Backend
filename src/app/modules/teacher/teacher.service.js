import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { TeacherImage } from '../../middlewares/uploader/teacherFileUploader.js';
import { teacherSearchableField } from './teacher.constant.js';
import { Teacher } from './teacher.model.js';

const addTeacher = async payload => {
  const result = await Teacher.create(payload);
  return result;
};

const getTeacher = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: teacherSearchableField.map(field => ({
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

  const result = await Teacher.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Teacher.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTeacher = async id => {
  const result = await Teacher.findById(id);
  return result;
};

const updateTeacher = async (id, payload) => {
  const teacher = await Teacher.findById({ _id: id });

  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }

  if (payload.image && teacher.image) {
    TeacherImage.deleteImage(teacher.image);
  }

  const result = await Teacher.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteTeacher = async id => {
  const teacher = await Teacher.findById({ _id: id });

  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }

  if (teacher.image) {
    TeacherImage.deleteImage(teacher.image);
  }

  const result = await Teacher.findByIdAndDelete({ _id: id });
  return result;
};

export const TeacherService = {
  addTeacher,
  getTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
