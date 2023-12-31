import express from 'express';
import { registeredStudentImage } from '../../middlewares/uploader/studentRegistrationFileUploader.js';
import { StudentRegistrationController } from './studentRegistration.controller.js';

const router = express.Router();

router.post(
  '/add-course',
  registeredStudentImage.uploadImage,
  StudentRegistrationController.studentRegistration
);

router.get('/', StudentRegistrationController.getRegisteredStudents);

router.get('/:id', StudentRegistrationController.getRegisteredStudents);

router.patch(
  '/:id',
  registeredStudentImage.uploadImage,
  StudentRegistrationController.updateRegisteredStudent
);

router.delete('/:id', StudentRegistrationController.deleteRegisteredStudent);

export const RegisterStudentRoutes = router;
