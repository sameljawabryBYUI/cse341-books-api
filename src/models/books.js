import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');
  const books = await collection.find({}).toArray();
  return books;
};

const getBookById = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const book = await collection.findOne({ id });
  return book;
};

const createBook = async (book) => {
  const db = getDb();
  const collection = db.collection('books');
  await collection.insertOne(book);
  return book;
};

const updateBook = async (id, book) => {
  const db = getDb();
  const collection = db.collection('books');
  await collection.updateOne({ id }, { $set: book });
  return { id, ...book };
};

const deleteBook = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const result = await collection.deleteOne({ id });
  return result;
};

const authorExists = async (authorId) => {
  const db = getDb();
  const collection = db.collection('authors');
  const count = await collection.countDocuments({ id: authorId });
  return count > 0;
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists
};