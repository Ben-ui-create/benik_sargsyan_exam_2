import { Router } from 'express';
import controller from '../controllers/auth.js';
import authorization from '../middlewares/authorization.js';
import validator from '../middlewares/validation.js';
import schema from '../middlewares/schemas/auth.schema.js';

const router = Router();

router.post(
  '/register',
  validator(schema.register, 'body'),
  controller.register
);

router.post(
  '/login',
  validator(schema.login, 'body'),
  controller.login
);

router.get(
  '/profile',
  authorization,
  controller.profile
);

export default router;