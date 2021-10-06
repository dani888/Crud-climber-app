const express = require("express")
const classRouter = express.Router()
const classes = require('../models/classes');
const schedule = require('../models/scheduler');
const seed = require('../models/seed');

// INDEX ROUTE
classRouter.get('/', (req, res) => {
    classes.find({}, (err, classes) => { 
        res.render("index.ejs", {
            allClasses: classes,
          })
        // res.json(products);
    })   
});
classRouter.get('/scheduler', (req, res) => {
    schedule.find({}, async (err, schedules) => { 
        let usedClasses = await Promise.all(schedules.map(schedule=>classes.findById(schedule.classId).exec()))
        res.render("indexschedule.ejs", {
            usedClasses: usedClasses,
            schedules: schedules
        })
    })   
});
classRouter.delete("/scheduler/:id", (req, res) => {
    schedule.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/classes/scheduler")
    })
  })
// route seed database
classRouter.get('/seed', (req, res) => {
    classes.deleteMany({}, (error, classes) => {})
    classes.create(seed, (error, data) => {
    res.redirect("/classes")
    // res.send(seed);
    })
})
// classRouter.get('/classes/scheduler/seed', (req, res) => {
//     schedule.deleteMany({}, (error, classes) => {})
//     schedule.create(seed, (error, data) => {
//     res.redirect("/classes/scheduler")
//     // res.send(seed);
//     })
// })
classRouter.get("/scheduler/:id/edit", (req, res) => {
    schedule.findById(req.params.id, (err, schduler) => {
        classes.findById(schduler.classId, (err, classe) => {
            res.render("edit.ejs", { 
                clas:classe,
                schedule:schduler
            })
        })
    })
})
classRouter.put("/scheduler/:id", (req, res) => {
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
classRouter.post('/:id', (req, res) => {
    req.body.completed = !!req.body.completed; // !!'on' -> true or !!undefined -> false
    schedule.create(req.body, (err, book) => {
        res.redirect('/classes/scheduler'); // tells the browser to make another GET request to /books
    });
});
// SHOW ROUTE
classRouter.get("/scheduler/:id", (req, res) => {
    schedule.findById(req.params.id, (err, schduler) => {
        classes.findById(schduler.classId, (err, classe) => {
            res.render("showsched.ejs", { 
                clas:classe,
                schedule:schduler
            })
        })
    })
})

classRouter.get("/:id", (req, res) => {
    classes.findById(req.params.id, (err, classe) => {
      res.render("show.ejs", { classe })
    })
  })

module.exports = classRouter