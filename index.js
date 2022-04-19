const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
// monogoDB connection method
const uri =
  "mongodb+srv://organicUser:nIuMzNKTnto5mxvF@cluster0.cihuk.mongodb.net/usersdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// mongodb connect
client.connect((err) => {
  const collection = client.db("usersdb").collection("users");
  // perform actions on the collection object

  //   show all user data
  app.get("/users", (req, res) => {
    collection.find({}).toArray((err, data) => {
      res.send(data);
    });
  });
  //   create user data
  app.post("/addUser", (req, res) => {
    collection.insertOne(req.body, (err, result) => {
      res.redirect("/");
    });
  });
});

// run the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
