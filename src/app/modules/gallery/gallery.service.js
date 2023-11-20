import ApiError from '../../../errors/ApiError.js';
import { GalleryImage } from '../../middlewares/uploader/galleryFileUploader.js';
import { Gallery } from './gallery.model.js';

const addImage = async payload => {
  const result = await Gallery.create(payload);
  return result;
};

const getImages = async () => {
  const result = await Gallery.find();
  return result;
};

const deleteImage = async id => {
  const gallery = await Gallery.findById({ _id: id });

  if (!gallery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }

  if (gallery.image) {
    GalleryImage.deleteImage(gallery.image);
  }

  const result = await Gallery.findByIdAndDelete({ _id: id });
  return result;
};

export const GalleryService = {
  addImage,
  getImages,
  deleteImage,
};
