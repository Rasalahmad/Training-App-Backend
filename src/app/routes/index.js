import express from 'express';
import { NoticeRoutes } from '../modules/notice/notice.route.js';
import { TeacherRoutes } from '../modules/teacher/teacher.route.js';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/notice',
    routes: NoticeRoutes,
  },
  {
    path: '/teacher',
    routes: TeacherRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.routes));
export default routes;
