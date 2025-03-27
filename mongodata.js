require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // Securely load URI from .env

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db("CRM");
        const collection = database.collection("users");

        const customers = await collection.find().toArray();
        console.table(customers); // Print users in a table format
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

run();
