import { Schema, model } from 'mongoose';

const resultSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    batchNo: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Result = model('Result', resultSchema);
