const express = require('express');
const mongoose = require('mongoose');

const passRouter = require('./routes/users')


const app = express();
const cors = require('cors');
const port = 3000;


mongoose.connect("mongodb://localhost:27017/passwordHashing", {
  useNewUrlParser: true,
});
app.use(cors());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/hash',passRouter);

app.listen(port,(req,res)=>{
console.log(`server is runnig on: ${port}`)
})