import express from 'express';
import { CourseImage } from '../../middlewares/uploader/courseFileUploader.js';
import { CourseController } from './course.controller.js';

const router = express.Router();

router.post('/add-course', CourseImage.uploadImage, CourseController.addCourse);

router.get('/', CourseController.getCourse);

router.get('/:id', CourseController.getSingleCourse);

router.patch('/:id', CourseImage.uploadImage, CourseController.updateCourse);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
