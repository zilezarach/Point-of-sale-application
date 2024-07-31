import clientPromise from "./db";
import bcrypt from "bcrypt";

export const registerUser = async (username, password) => {
  const client = await clientPromise;
  const db = client.db("pos");
  const hashedPassword = bcrypt.hashSync(password, 8);
  const result = await db
    .collection("employees")
    .insertOne({ username, password: hashedPassword });
  return result;
};

export const authenticateUser = async (username, password) => {
  const client = await clientPromise;
  const db = client.db("pos");
  const user = await db.collection("employees").findOne({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    return { token, user: { id: user._id, username: user.username } };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export const getCurrentUser = async (id) => {
  const client = await clientPromise;
  const db = client.db("pos");
  const user = await db
    .collection("employees")
    .findOne({ _id: new ObjectId(id) });
  if (!user) {
    throw new Error("User not found");
  }
  return { id: user._id, username: user.username };
};
