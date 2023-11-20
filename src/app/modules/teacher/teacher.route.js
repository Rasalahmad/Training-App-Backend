import express from 'express';
import { TeacherImage } from '../../middlewares/uploader/teacherFileUploader.js';
import { TeacherController } from './teacher.controller.js';

const router = express.Router();

router.post(
  '/add-teacher',
  TeacherImage.uploadImage,
  TeacherController.addTeacher
);

router.get('/', TeacherController.getTeacher);

router.get('/:id', TeacherController.getSingleTeacher);

router.patch('/:id', TeacherImage.uploadImage, TeacherController.updateTeacher);

router.delete('/:id', TeacherController.deleteTeacher);

export const TeacherRoutes = router;
