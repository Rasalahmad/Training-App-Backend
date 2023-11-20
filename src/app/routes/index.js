import express from 'express';
import { NoticeRoutes } from '../modules/notice/notice.route.js';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/notice',
    routes: NoticeRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.routes));
export default routes;
