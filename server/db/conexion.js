const mongoose = require('mongoose')


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://luis:f0g5KVqXhRLJzERB@@tfc-cluster-ihvzc.mongodb.net/tfc?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("tfc").collection("devices");
  // perform actions on the collection object
  client.close();
});
