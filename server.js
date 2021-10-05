// require our dependencies
const express = require('express');
const mongoose = require('mongoose');
const classes = require('./models/classes');
const seed = require('./models/seed');
const bodyParser = require('body-parser');
const methodOverride = require("method-override")
// initialize the express app
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"))
// configure server settings
require('dotenv').config();
// establish a connection to MongoDB

// connection to .env database url
const DATABASE_URL = process.env.DATABASE_URL;

// client connection method
mongoose.connect(DATABASE_URL);

// connection instance shortcut variable
const db = mongoose.connection;

// connection message
db.on('connected', () => console.log(`Connected to the ${db.name} database on port:${db.port}`));
db.on('error', () => console.log(`Uh Oh! Mongodb had and error ${error.message}`));

// mount middleware
// app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded());


// mount our routes
// WELCOME PAGE
app.get('/' , (req, res) => {
    res.render("welcome.ejs");
});
// INDEX ROUTE
app.get('/classes', (req, res) => {
    // the callback function inside our model methods is used for mongoose to call back to
    // when MongoDB is done doing what we ask it
    classes.find({}, (err, classes) => { 
        res.render("index.ejs", {
            allClasses: classes,
          })
        // res.json(products);
    })   
});
// route seed database
app.get('/classes/seed', (req, res) => {
    classes.deleteMany({}, (error, classes) => {})
    
    classes.create(seed, (error, data) => {
        res.redirect("/classes")
    // res.send(seed);
    })
})
/*



app.get("/products/new", (req, res) => {
    res.render("new.ejs")
  })

app.delete("/products/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/products")
    })
  })

app.get("/products/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, product) => {
      res.render("edit.ejs", {
        editProduct: product,
      })
    })
  })
  // buy button
app.put("/products/:id/buy", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        { $inc: { qty: -1} },
        {
          new: true,
        },
        (error, updatedProduct) => {
          res.redirect(`/products/${req.params.id}`)
        }
      )
  })
app.put("/products/:id", (req, res) => {
    if (req.body.completed === "on") {
      req.body.completed = true
    } else {
      req.body.completed = false
    }
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProducts) => {
        res.redirect(`/products/${req.params.id}`)
      }
    )
})
// post
app.post("/products", (req, res) => {
    if (req.body.completed === "on") {
      //if checked, req.body.completed is set to 'on'
      req.body.completed = true
    } else {
      //if not checked, req.body.completed is undefined
      req.body.completed = false
    }

    Product.create(req.body, (error, product) => {
    res.redirect('/products')
    //  res.send(product)
    })
  })
//
// SHOW ROUTE
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, products) => {
        console.log(products)
        res.render("show.ejs", {
            productDetail: products,
        })
    })
})
*/
// tell the server to listen for requests from the client
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`); 
});