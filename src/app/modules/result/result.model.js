import { Schema, model } from 'mongoose';

const resultSchema = new Schema(
  {
    courseName: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    batchNo: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
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
