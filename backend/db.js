const mongoose = require("mongoose");
require('dotenv').config();  // Load environment variables from .env file


// Retrieve the MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Database connection successful. Database created.');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const todo = mongoose.model('todos',todoSchema);

module.exports = {
    todo
}