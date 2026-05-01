import { Router } from 'express';
import controller from '../controllers/book.js';
import authorization from '../middlewares/authorization.js';
import validator from '../middlewares/validation.js';
import schema from '../middlewares/schemas/books.schema.js';

const router = Router();

router.get(
  '/',
  authorization,
  controller.getAll
);

router.post(
  '/',
  authorization,
  validator(schema.create, 'body'),
  controller.create
);

router.put(
  '/:id',
  authorization,
  validator(schema.update, 'body'),
  controller.update
);

router.delete(
  '/:id',
  authorization,
  controller.delete
);

export default router;