const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running");
})


// MongoDB
const uri = `mongodb+srv://${process.env.DATA_USER}:${process.env.DATA_PASSWORD}@cluster1.sxrfbem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    const allUsers = client.db("userCollection").collection("users");

    try {
        app.get("/user/:email", async (req, res) => {
            const email = req.params.email;
            const query = {email: email};
            const users = await allUsers.findOne(query);
            res.send(users);
        });

        app.post("/add-user", async (req, res) => {
            const userInfo = req.body;
            const result = await allUsers.insertOne(userInfo);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));


app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`);
});