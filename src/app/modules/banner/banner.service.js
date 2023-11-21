import ApiError from '../../../errors/ApiError.js';
import { BannerImage } from '../../middlewares/uploader/bannerFileUploader.js';
import { Banner } from './banner.model.js';

const addBanner = async payload => {
  const result = await Banner.create(payload);
  return result;
};

const getBanner = async () => {
  const result = await Banner.find();
  return result;
};

const updateBanner = async (id, payload) => {
  const banner = await Banner.findById({ _id: id });

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }

  if (payload.image && banner.image) {
    BannerImage.deleteImage(banner.image);
  }

  const result = await Banner.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBanner = async id => {
  const banner = await Banner.findById({ _id: id });

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }

  if (banner.image) {
    BannerImage.deleteImage(banner.image);
  }

  const result = await Banner.findByIdAndDelete({ _id: id });
  return result;
};

export const BannerService = {
  addBanner,
  getBanner,
  updateBanner,
  deleteBanner,
};
