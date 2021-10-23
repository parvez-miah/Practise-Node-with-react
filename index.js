const express = require('express')
const { MongoClient } = require('mongodb');
var cors = require('cors')
const app = express();
const port = 5000;
const ObjectId = require('mongodb').ObjectId;


app.use(cors());
app.use(express.json());

// XwpDExtL07Qat96E



const uri = "mongodb+srv://practiseDb:XwpDExtL07Qat96E@cluster0.9z7i3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("insertDB");
        const usersCollection = database.collection("user");


        //post

        app.post('/users', async (req, res) => {
            const users = req.body;
            console.log(users)
            const result = await usersCollection.insertOne(users);
            console.log(result)
            res.json(result);
        });

        //POST API

        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        //Find

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

        //UPDATE

        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                },
            };

            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result)

        })

        //DELETE

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            console.log(result)
            res.json(result);
        });

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('HomePage')
})

app.listen(port, (req, res) => {
    console.log("listen from", port);
})