const express = require('express') ;
const cors = require('cors') ;
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config() ;
const app = express() ;
const port = process.env.PORT || 5000 ;

//middleWare 
app.use(cors()) ;
app.use(express.json()) ;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tg0ohza.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

    const allProducts =client.db("productDB").collection("products");

    app.post('/addProduct', async(req, res) => {
       const newProduct = req.body ;
       console.log(newProduct)
       const result = await allProducts.insertOne(newProduct);
       res.send(result) ;
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// middleware
app.use(cors()) ;
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Coffee making server running')
})

app.listen(port, () => {
    console.log(`Coffee server is running on port: ${port}`)
})
