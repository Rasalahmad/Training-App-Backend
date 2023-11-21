import express from 'express';
import { NoticeRoutes } from '../modules/notice/notice.route.js';
import { TeacherRoutes } from '../modules/teacher/teacher.route.js';
import { GalleryRoutes } from '../modules/gallery/gallery.route.js';
import { ResultRoutes } from '../modules/result/result.route.js';
import { BannerRoutes } from '../modules/banner/banner.route.js';

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
  {
    path: '/gallery',
    routes: GalleryRoutes,
  },
  {
    path: '/result',
    routes: ResultRoutes,
  },
  {
    path: '/banner',
    routes: BannerRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.routes));
export default routes;
