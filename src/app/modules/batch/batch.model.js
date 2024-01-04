import { Schema, model } from 'mongoose';

const batchSchema = new Schema(
  {
    batchName: {
      type: String,
      required: true,
    },
    batchNo: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    totalStudent: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Batch = model('Batch', batchSchema);
