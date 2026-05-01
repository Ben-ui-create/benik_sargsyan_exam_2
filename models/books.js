import { v4 as uuidV4 } from 'uuid';
import {getDataPath, readJSON, writeJSON } from './users.js';

const booksFile = getDataPath('books.json');

export async function findAll(userId, page = 1, limit = 10) {
  const books = await readJSON(booksFile);

  const userBooks = books.filter(b => b.userId === userId);

  const total = userBooks.length;

  const skip = (page - 1) * limit;

  const paginated = userBooks.slice(skip, skip + limit);

  return {
    books: paginated,
    total
  };
}

export async function findById(id) {
  const books = await readJSON(booksFile);
  return books.find(b => b.id === id) || null;
}

export async function create(data) {
  const books = await readJSON(booksFile);

  const newBook = {
    ...data,
    id: uuidV4(),
  };

  books.push(newBook);

  await writeJSON(booksFile, books);

  return newBook;
}

export async function update(id, userId, data) {
  const books = await readJSON(booksFile);

  const index = books.findIndex(b => b.id === id);

  if (index === -1) return null;

  const book = books[index];

  if (book.userId !== userId) return null;

  const updatedBook = {
    ...book,
    ...data
  };

  books[index] = updatedBook;

  await writeJSON(booksFile, books);

  return updatedBook;
}

export async function deleteBook(id, userId) {
  const books = await readJSON(booksFile);

  const index = books.findIndex(b => b.id === id);

  if (index === -1) return false;

  const book = books[index];

  if (book.userId !== userId) return false;

  books.splice(index, 1);

  await writeJSON(booksFile, books);

  return true;
}

export default {
  findAll,
  findById,
  create,
  update,
  deleteBook
};

