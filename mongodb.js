const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const URL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const db = client.db(databaseName);

    // Send a ping to confirm a successful connection
    await db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const usersCollection = db.collection("users");
    const taskCollection = db.collection("tasks");

    // userslist = await usersCollection.find({
    //   _id: "641d83814ae755f4241f2e8b",
    // });
    // console.log(userslist, "userslist");

    const updated = await taskCollection.updateMany(
      { _id: new ObjectId("641d866c7981925f36746572") },
      {
        $set: {
          name: {
            firstName: "Adeel",
            lastName: "Akram",
          },
        },
      }
    );

    console.log(updated, "updated");

    // db.collection("users").insertOne({
    //   name: "Adeel",
    //   age: 24,
    // });

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "first Task",
    //       completed: false,
    //     },
    //     {
    //       description: "Second Task",
    //       completed: false,
    //     },
    //     {
    //       description: "Third Task",
    //       completed: true,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Cannot send data");
    //     }
    //     console.log(result);
    //   }
    // );
  } catch (error) {
    console.log("Error Occured", error);
  }
}
run();
