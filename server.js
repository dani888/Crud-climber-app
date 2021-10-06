// require our dependencies
const express = require('express');
const mongoose = require('mongoose');
const classes = require('./models/classes');
const schedule = require('./models/scheduler');
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
    classes.find({}, (err, classes) => { 
        res.render("index.ejs", {
            allClasses: classes,
          })
        // res.json(products);
    })   
});
app.get('/classes/scheduler', (req, res) => {
    schedule.find({}, async (err, schedules) => { 
        let usedClasses = await Promise.all(schedules.map(schedule=>classes.findById(schedule.classId).exec()))
        res.render("indexschedule.ejs", {
            usedClasses: usedClasses,
            schedules: schedules
        })
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
// app.get('/classes/scheduler/seed', (req, res) => {
//     schedule.deleteMany({}, (error, classes) => {})
//     schedule.create(seed, (error, data) => {
//     res.redirect("/classes/scheduler")
//     // res.send(seed);
//     })
// })
app.get("/classes/scheduler/:id/edit", (req, res) => {
    schedule.findById(req.params.id, (err, schduler) => {
        classes.findById(schduler.classId, (err, classe) => {
            res.render("edit.ejs", { 
                clas:classe,
                schedule:schduler
            })
        })
    })
})
app.put("/classes/scheduler/:id", (req, res) => {
    req.body.completed = !!req.body.completed;
    schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProducts) => {
        res.redirect(`/classes/scheduler/${req.params.id}`)
      }
    )
})
app.post('/classes/:id', (req, res) => {
    req.body.completed = !!req.body.completed; // !!'on' -> true or !!undefined -> false
    schedule.create(req.body, (err, book) => {
        res.redirect('/classes/scheduler'); // tells the browser to make another GET request to /books
    });
});
// SHOW ROUTE
app.get("/classes/scheduler/:id", (req, res) => {
    schedule.findById(req.params.id, (err, schduler) => {
        classes.findById(schduler.classId, (err, classe) => {
            res.render("showsched.ejs", { 
                clas:classe,
                schedule:schduler
            })
        })
    })
})

app.get("/classes/:id", (req, res) => {
    classes.findById(req.params.id, (err, classe) => {
      res.render("show.ejs", { classe })
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

*/
// tell the server to listen for requests from the client
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`); 
});