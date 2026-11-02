import express from 'express';
import { getBooksHandler, getSingleBookHandler } from './controllers/books.js';

const router = express.Router();

router.get('/books', getBooksHandler);
router.get('/books/:id', getSingleBookHandler);

export default router;