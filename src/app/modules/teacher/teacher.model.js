import { Schema, model } from 'mongoose';

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    teacherId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Teacher = model('Teacher', teacherSchema);
