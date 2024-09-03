const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/pos"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

const saltRounds = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const createDummyData = async () => {
  await client.connect();
  const database = client.db("pos");

  const employeesCollection = database.collection("employees");
  const productsCollection = database.collection("products");
  const customersCollection = database.collection("customers");
  const transactionsCollection = database.collection("transactions");
  const ordersCollection = database.collection("orders");

  const employees = [
    {
      id: "1",
      name: "Alice Johnson",
      role: "admin",
      email: "alice@company.com",
      username: "alicej",
      password: await hashPassword("password123"),
    },
    {
      id: "2",
      name: "Bob Brown",
      role: "employee",
      email: "bob@company.com",
      username: "bobb",
      password: await hashPassword("password123"),
    },
  ];

  const products = [
    {
      id: "1",
      name: "AMD Ryzen 7 5800X",
      category: "CPU",
      description:
        "8 cores, 16 threads, 3.8 GHz base clock, 4.7 GHz boost clock",
      price: 399.99,
      stock: 50,
      image: "/public/uploads/image1.png",
    },
    {
      id: "2",
      name: "NVIDIA GeForce RTX 3080",
      category: "GPU",
      description: "10 GB GDDR6X, 8704 CUDA cores, 1.71 GHz boost clock",
      price: 699.99,
      stock: 20,
      image: "/public/uploads/image2.png",
    },
    {
      id: "3",
      name: "Samsung 970 EVO Plus 1TB",
      category: "SSD",
      description:
        "NVMe M.2, up to 3500 MB/s read speed, 3300 MB/s write speed",
      price: 149.99,
      stock: 100,
      image: "/public/uploads/image3.png",
    },
    {
      id: "4",
      name: "Corsair Vengeance LPX 16GB (2 x 8GB)",
      category: "RAM",
      description: "DDR4 3200 MHz, C16, XMP 2.0 support",
      price: 89.99,
      stock: 75,
      image: "/public/uploads/image4.png",
    },
    {
      id: "5",
      name: "ASUS ROG Strix B550-F Gaming",
      category: "Motherboard",
      description: "AMD AM4, ATX, PCIe 4.0, Dual M.2 slots",
      price: 189.99,
      stock: 40,
      image: "/public/uploads/image5.png",
    },
  ];

  const customers = [
    {
      id: "1",
      name: "John Doe",
      phoneNumber: "+1234567890",
      memberSince: "2021-05-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      phoneNumber: "+0987654321",
      memberSince: "2022-01-20",
    },
  ];

  const transactions = [
    {
      id: "1",
      customerId: "1",
      amount: 549.99,
      date: "2024-08-01",
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "2",
      customerId: "2",
      amount: 699.99,
      date: "2024-08-03",
      paymentMethod: "Mobile Money",
      status: "Pending",
    },
  ];

  const orders = [
    {
      id: "1",
      customerId: "1",
      productId: "2",
      quantity: 1,
      date: "2024-08-01",
      status: "Completed",
    },
    {
      id: "2",
      customerId: "2",
      productId: "3",
      quantity: 2,
      date: "2024-08-03",
      status: "Pending",
    },
  ];

  await employeesCollection.insertMany(employees);
  await productsCollection.insertMany(products);
  await customersCollection.insertMany(customers);
  await transactionsCollection.insertMany(transactions);
  await ordersCollection.insertMany(orders);

  console.log("Dummy data inserted successfully.");
  await client.close();
};

createDummyData().catch(console.error);
