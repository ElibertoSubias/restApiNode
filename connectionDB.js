// Connect to DB
const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');

const uri = "mongodb+srv://elisuor:madonna-22@Cluster0.wqqma.mongodb.net/posts?retryWrites=true&w=majority";

const connectDB = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(err => {
        const collection = client.db("Cluster0").collection("posts");
        console.log(collection);
        console.log('DB Connected!')
        // perform actions on the collection object
        client.close();
    });
}

module.exports = connectDB;