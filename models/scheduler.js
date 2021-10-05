// require mongoose first 
const mongoose = require('mongoose');
// set up shortcut variable 
const Schema = mongoose.Schema;
// define our schema
const schedulerSchema = new Schema({
    classId: String,
    day: String,
    completed: {type: Boolean, default: false},
    note: String
    },
    {timestamps: true}
);
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


