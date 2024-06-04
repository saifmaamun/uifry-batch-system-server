const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;


// 
app.use(cors());
app.use(express.json());
require('dotenv').config();



// 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogqtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// 
async function run() {
    try {
        console.log('from function')
        await client.connect();
        const database = client.db("batchSystem");
        const featuresCollection = database.collection("features");
        const testimonialsCollection = database.collection("testimonials");

        // GET features API
        app.get('/features', async (req, res) => {
            const cursor = featuresCollection.find({});
            const features = await cursor.toArray();
            // console.log('hitted features')
            res.send(features);
        })
        // GET testimonials API
        app.get('/testimonials', async (req, res) => {
            const cursor = testimonialsCollection.find({});
            const testimonials = await cursor.toArray();
            res.send(testimonials);
        })





    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




// 
app.get('/', (req, res) => {
    console.log('response from get')
    res.send('Hello from Batch System')
})

app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`)
})




// npm install express cors mongodb dotenv