import clientPromise from "../lib/db";
import { registerUser } from "../lib/auth";

const addUsers = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("pos");

    const admin = await registerUser("admin", "adminpassword", "admin");
    const employee = await registerUser(
      "employee",
      "employeepassword",
      "employee",
    );

    console.log("Admin and employee added successfully:", admin, employee);

    await client.close();
  } catch (error) {
    console.error("Error adding users:", error);
  }
};

addUsers();
