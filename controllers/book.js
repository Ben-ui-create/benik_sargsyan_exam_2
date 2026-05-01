import HttpErrors from 'http-errors';
import Book from '../models/books.js';

export default {
  async getAll(req, res, next) {
    try {
      let {page, limit} = req.query;

      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const {books, total} = await Book.findAll(req.userId, page, limit);

      const totalPages = Math.ceil(total / limit);

      res.json({
        books,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const {title, author, year, genre} = req.body;

      const book = await Book.create({
        title,
        author,
        year,
        genre,
        userId: req.userId
      });

      res.json({
        message: 'Book added successfully',
        book
      });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const {id} = req.params;
      const {title, author, year, genre} = req.body;

      const book = await Book.update(id, req.userId, {
        title,
        author,
        year,
        genre
      });

      if (!book) {
        throw HttpErrors(404, 'Book not found');
      }

      res.json({
        message: 'Book updated successfully',
        book
      });
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const {id} = req.params;

      const deleted = await Book.deleteBook(id, req.userId);

      if (!deleted) {
        throw HttpErrors(404, 'Book not found');
      }

      res.json({
        message: 'Book deleted successfully'
      });
    } catch (e) {
      next(e);
    }
  }
}
