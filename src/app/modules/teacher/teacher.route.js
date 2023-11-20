import express from 'express';
import { TeacherImage } from '../../middlewares/uploader/teacherFileUploader';
import { TeacherController } from './teacher.controller';

const router = express.Router();

router.post(
  '/add-teacher',
  TeacherImage.uploadImage,
  TeacherController.addTeacher
);

router.get('/', TeacherController.getTeacher);

router.get('/:id', TeacherController.getSingleTeacher);

router.patch('/:id', NoticeImage.uploadImage, TeacherController.updateTeacher);

router.delete('/:id', TeacherController.deleteTeacher);

export const NoticeRoutes = router;
