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


    app.get('/brands/Toyota', async(req, res) => {
      const cursor = allProducts.find({'brandName' : 'Toyota'})
      const result = await cursor.toArray() ;
      res.send(result)
    })


    app.get('/brands/Ford', async(req, res) => {
      const cursor = allProducts.find({'brandName' : 'Ford'})
      const result = await cursor.toArray() ;
      res.send(result)
    })

    app.get('/brands/BMW', async(req, res) => {
      const cursor = allProducts.find({'brandName' : 'BMW'})
      const result = await cursor.toArray() ;
      res.send(result)
    })

    app.get('/brands/Mercedes-Benz', async(req, res) => {
      const cursor = allProducts.find({'brandName' : 'Mercedes-Benz'})
      const result = await cursor.toArray() ;
      res.send(result)
    })

    app.get('/brands/Tesla', async(req, res) => {
      const cursor = allProducts.find({'brandName' : 'Tesla'})
      const result = await cursor.toArray() ;
      res.send(result)
    })

    app.get('/brands/Honda', async(req, res) => {
      const cursor = allProducts.find({'brandName' : 'Honda'})
      const result = await cursor.toArray() ;
      res.send(result)
    })

    app.get('/allProducts', async (req, res) => { 
      const cursor = allProducts.find();
      const result = await cursor.toArray();
      res.send(result);
  })

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
