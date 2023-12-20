import { Schema, model } from 'mongoose';

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    duration: {
      type: String,
    },
    image: {
      type: String,
    },
    module: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model('Course', courseSchema);
