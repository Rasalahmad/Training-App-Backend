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
      type: String,
    },
    duration: {
      type: String,
    },
    image: {
      type: String,
    },
    module: [
      {
        title: {
          type: String,
        },
        desc: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Course = model('Course', courseSchema);
