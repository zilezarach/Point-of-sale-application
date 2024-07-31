import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import getDb from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const db = await getDb();
      const result = await db
        .collection("employees")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Employee deleted successfully" });
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
