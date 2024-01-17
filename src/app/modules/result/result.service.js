import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { ResultImage } from '../../middlewares/uploader/resultFileUploader.js';
import { resultSearchableField } from './result.constant.js';
import { Result } from './result.model.js';

const addResult = async payload => {
  const result = await Result.create(payload);
  return result;
};

const getResult = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: resultSearchableField.map(field => ({
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

  const result = await Result.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('courseName')
    .populate('batchNo');

  const total = await Result.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleResult = async id => {
  const result = await Result.findById(id);
  return result;
};

const updateResult = async (id, payload) => {
  const data = await Result.findById({ _id: id });

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Result not found');
  }

  if (payload.file && data.file) {
    ResultImage.deleteImage(data.file);
  }

  const result = await Result.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteResult = async id => {
  const data = await Result.findById({ _id: id });

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Result not found');
  }

  if (data.image) {
    ResultImage.deleteImage(data.image);
  }

  const result = await Result.findByIdAndDelete({ _id: id });
  return result;
};

export const ResultService = {
  addResult,
  getResult,
  getSingleResult,
  updateResult,
  deleteResult,
};
