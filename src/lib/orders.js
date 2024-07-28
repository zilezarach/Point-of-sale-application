import clientPromise from "./db";

export const getOrders = async () => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("orders").find().toArray();
};

export const createOrder = async (order) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("orders").insertOne(order);
};
