import clientPromise from "./db";

export const getEmployees = async () => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("employees").find().toArray();
};

export const getEmployeeById = async (id) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("employees").findOne({ id });
};

export const createEmployee = async (employee) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("employees").insertOne(employee);
};

export const removeEmployee = async (id) => {
  const client = await clientPromise;
  const db = client.db("pos");
  return db.collection("employees").deleteOne({ _id: new ObjectId(id) });
};
