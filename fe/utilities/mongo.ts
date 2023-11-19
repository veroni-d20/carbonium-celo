const { MongoClient } = require("mongodb");
require("dotenv").config();

// Connection URL
const client = new MongoClient(process.env.MONGO_URI);

const db = client.db(process.env.MONGODB_NAME || "refi");

// Export db and client
export { db, client };
