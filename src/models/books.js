import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');
  const books = await collection.find({}).toArray();
  return books;
};

const getSingleBook = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const book = await collection.findOne({ _id: new ObjectId(id) });
  return book;
};

export { getAllBooks, getSingleBook };