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



app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`);
});