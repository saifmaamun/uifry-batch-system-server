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
            res.send(features);
        })
        // GET testimonials API
        app.get('/testimonials', async (req, res) => {
            const cursor = testimonialsCollection.find({});
            const testimonials = await cursor.toArray();
            res.send(testimonials);
        })

        // // for booking
        // // GET API
        // app.get('/orders', async (req, res) => {
        //     const cursor = bookedTour.find({});
        //     const booked = await cursor.toArray();
        //     console.log("showing from booked", booked)
        //     res.send(booked);
        // })

        // // GET A SINGEL API
        // app.get('/destinationDetails/:id', async (req, res) => {
        //     const id = req.params.id;
        //     console.log('specific id',id)
        //     const query = { _id: ObjectId(id) };
        //     const destination = await tourCollaction.findOne(query);
        //     res.json(destination)
        // })

        // // POST API
        // app.post('/destinations', async (req, res) => {
        //     const destination = req.body;
        //     console.log('hitting', destination)

        //     const result = await tourCollaction.insertOne(destination);
        //     console.log(result)
        //     res.json(result)
        // })

        // // for booking
        // // POST API
        // app.post('/orders', async (req, res) => {
        //     const booked = req.body;
        //     console.log('hitting', booked)

        //     const result = await bookedTour.insertOne(booked);
        //     console.log(result)
        //     res.json(result)
        // })
        // // for booking
        // //DELETE API
        // app.delete('/booked/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await bookedTour.deleteOne(query)
        //     console.log(result)
        //     res.json(result)
        // })
        // //DELETE API
        // app.delete('/destinations/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await tourCollaction.deleteOne(query)
        //     console.log(result)
        //     res.json(result)
        // })


        // //UPDATE API
        // app.put('/books/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const updatedBook = req.body;
        //     const filter = { _id: ObjectId(id) };
        //     const updateDoc = {
        //         $set: {
        //             name: updatedBook.name,
        //             writer: updatedBook.writer,
        //             hints: updatedBook.hints,
        //             img: updatedBook.img,
        //             price: updatedBook.price,
        //         },
        //     };
        //     const result = await booksCollaction.updateOne(filter, updateDoc)
        //     console.log('updating', id)
        //     res.json(result)
        // })



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