import clientPromise from "./db";

export const getTransactions = async () => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("transactions").find().toArray();
};

export const createTransaction = async (transaction) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("transactions").insertOne(transaction);
};
