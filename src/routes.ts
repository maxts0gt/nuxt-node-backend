import { Router } from 'express';
import {
  AuthenticatedUser,
  Login,
  Logout,
  Register,
} from './controller/auth.controller';

export const routes = (router: Router) => {
  router.post('/api/admin/register', Register);
  router.post('/api/admin/login', Login);
  router.post('/api/admin/user', AuthenticatedUser);
  router.post('/api/admin/logout', Logout);
};
