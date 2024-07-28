import clientPromise from "./db";

export const getSales = async () => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("sales").find().toArray();
};

export const createSale = async (sale) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("sales").insertOne(sale);
};
