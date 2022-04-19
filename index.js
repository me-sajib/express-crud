const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
// monogoDB connection method
const uri =
  "mongodb+srv://products:vDMB6oaIVDgU3m6s@cluster0.p0jku.mongodb.net/productsdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// mongodb connect
client.connect((err) => {
  const collection = client.db("productsdb").collection("products");
  // perform actions on the collection object
  console.log("Connected to MongoDB");
  client.close();
});

// run the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
