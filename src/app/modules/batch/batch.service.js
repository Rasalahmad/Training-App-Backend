import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { batchSearchableField } from './batch.constant.js';
import { Batch } from './batch.model.js';

const addBatch = async payload => {
  const result = await Batch.create(payload);
  return result;
};

const getAllBatch = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: batchSearchableField.map(field => ({
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

  const result = await Batch.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Batch.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBatch = async id => {
  const result = await Batch.findById(id);
  return result;
};

const updateBatch = async (id, payload) => {
  const result = await Batch.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBatch = async id => {
  const result = await Batch.findByIdAndDelete({ _id: id });
  return result;
};

export const BatchService = {
  addBatch,
  getAllBatch,
  getSingleBatch,
  updateBatch,
  deleteBatch,
};
