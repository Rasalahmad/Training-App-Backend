import { Schema, model } from 'mongoose';

const studentRegistrationSchema = new Schema(
  {
    admissionNo: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    phoneNumber1: {
      type: String,
      required: true,
    },
    phoneNumber2: {
      type: String,
    },
    nidNo: {
      type: String,
    },
    passportNo: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    paid: {
      type: Number,
      default: 0,
    },
    due: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentRegistration = model(
  'StudentRegistration',
  studentRegistrationSchema
);
