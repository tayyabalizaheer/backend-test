const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/your-db";

const connectToMongo = () => {
    mongoose.connect(mongoUrl, ()=>{
        console.log('Mongo Connection successfully');
    });
}

module.exports = connectToMongo;