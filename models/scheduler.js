// require mongoose first 
const mongoose = require('mongoose');
// set up shortcut variable 
const Schema = mongoose.Schema;
const User = require("../models/user.js")
// define our schema
const schedulerSchema = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: 'climbing' },
    completed: {type: Boolean, default: false},
    note: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {timestamps: true}
);

// const scheduleSchema = new Schema({
//     classes: { type: schedulerSchema },
//     user: { type: User },
// });
// export our schema after we compile it into a model


// A model allows us to create data using the schema for reference
// A model also includes all
const schedulerModel = mongoose.model('scheduler', schedulerSchema);

// model.create
// model.findById()
// model.findByIdAndUpdate()
// model.findByIdAndDelete()
// model.findOne()
// model.find()
module.exports = schedulerModel;


