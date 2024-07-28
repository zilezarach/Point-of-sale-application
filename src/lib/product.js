import clientPromise from "./db";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("products").find().toArray();
};

export const getProductById = async (id) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("products").findOne({ _id: new ObjectId(id) });
};

export const createProduct = async (product) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("products").insertOne(product);
};

export const deleteProduct = async (id) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("products").deleteOne({ _id: new ObjectId(id) });
};

export const updateProduct = async (id, update) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: update });
};
