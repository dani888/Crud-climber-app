// require mongoose first 
const mongoose = require('mongoose');
// set up shortcut variable 
const Schema = mongoose.Schema;
// define our schema
const classSchema = new Schema({
    name: String,
    description: String,
    instructor: String,
    img: String,
    price: Number,
    day: String,
    },
    {timestamps: true}
);
// export our schema after we compile it into a model


// A model allows us to create data using the schema for reference
// A model also includes all
const classModel = mongoose.model('climbing', classSchema);

// model.create
// model.findById()
// model.findByIdAndUpdate()
// model.findByIdAndDelete()
// model.findOne()
// model.find()
module.exports = classModel;


