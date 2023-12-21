import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { CourseImage } from '../../middlewares/uploader/courseFileUploader.js';
import { courseSearchableField } from './course.constant.js';
import { Course } from './course.model.js';

const addCourse = async payload => {
  const result = await Course.create(payload);
  return result;
};

const getCourse = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: courseSearchableField.map(field => ({
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

  const result = await Course.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('instructor');

  const total = await Course.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCourse = async id => {
  const result = await Course.findById(id);
  return result;
};

const updateCourse = async (id, payload) => {
  const course = await Course.findById({ _id: id });

  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }

  if (payload.image && course.image) {
    CourseImage.deleteImage(course.image);
  }
  const result = await Course.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCourse = async id => {
  const course = await Course.findById({ _id: id });

  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }

  if (course.image) {
    CourseImage.deleteImage(course.image);
  }

  const result = await Course.findByIdAndDelete({ _id: id });
  return result;
};

export const CourseService = {
  addCourse,
  getCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
