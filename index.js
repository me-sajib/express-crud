const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// monogoDB connection method
const uri =
  "mongodb+srv://organicUser:nIuMzNKTnto5mxvF@cluster0.cihuk.mongodb.net/usersdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const app = express();
// use middleware
app.use(cors());

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

  // deleted user data
  app.delete("/userRemove/:id", (req, res) => {
    const userId = ObjectId(req.params.id);

    collection.deleteOne({ _id: userId }, (err, result) => {
      res.redirect("/");
    });
  });

  // find user
  app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: ObjectId(id) }, (err, result) => {
      res.send(result);
    });
  });
  //   create user data
  app.post("/addUser", (req, res) => {
    collection.insertOne(req.body, (err, result) => {
      res.redirect("/");
    });
  });

  // end of collection
});

// run the server
app.listen(5000, () => {
  console.log("Server is running on port 3000");
});
