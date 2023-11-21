import { Schema, model } from 'mongoose';

const bannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Banner = model('Banner', bannerSchema);
