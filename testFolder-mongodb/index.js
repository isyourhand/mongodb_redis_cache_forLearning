import "dotenv/config";

// ------------------- use mongodb module ----------------------

import { MongoClient, MongoServerError } from "mongodb";
const url = process.env.DATABASE;
const client = new MongoClient(url);

const dbName = "Test";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");

  //   const insertResult = await collection.insertMany([
  //     { a: 1 },
  //     { a: 2 },
  //     { a: 3 },
  //   ]);
  //   console.log(("Inserted documents =>", insertResult));

  // Add a query that returns all the documents.
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  // Add a query filter to find only documents which meet the query criteria.
  const filteredDocs = await collection.find({ a: 3 }).toArray();
  console.log("Found documents filtered by { a:3 } =>", filteredDocs);

  // The following operation updates a document in the documents collection.
  const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
  console.log("Updated documents =>", updateResult);

  // Remove the document where the field a is equal 2.
  const deleteResult = await collection.deleteMany({ a: 2 });
  console.log("Deleted documents =>", deleteResult);

  // Indexes can improve your application's performance.

  try {
    await collection.insertOne({ _id: 1 });
    await collection.insertOne({ _id: 1 });
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error} -----|||||-----`); // special case for some reason
    }
    throw error; // still want to crash
  }

  return "done.";
}

// execute

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

// ------------------- use mongoose module ----------------------

import mongoose from "mongoose";

main_mongoose()
  .then(console.log)
  .catch((err) => console.log(err));

async function main_mongoose() {
  await mongoose.connect(process.env.DATABASE);
  console.log("Connected successfully to server");

  const kittySchema = new mongoose.Schema({
    name: String,
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model("Kitten", kittySchema);

  // won't save into database.
  const fluffy = new Kitten({ name: "fluffy" });
  console.log(fluffy);
  // save into database
  // await fluffy.save();
  fluffy.speak();

  const kittens = await Kitten.find();
  console.log(kittens);

  const kittens_fluffy = await Kitten.find({ name: /^fluf/ });
  console.log(`kittens_fluffy->${kittens_fluffy}`);

  return "done.";
}

// For more detail, go to see the official document.
