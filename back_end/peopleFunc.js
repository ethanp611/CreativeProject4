const crypto = require('crypto');
const express = require('express');
const bodyParser = require("body-parser");
//const peopleAdd = require('./people');
//const hobbies = require('./hobbies');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  favColor: String,
  hobby: String
});

personSchema.set('toJSON', {
  virtuals: true
});

personSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

const Person = mongoose.model('Person', personSchema);

const hobbySchema = mongoose.Schema({
  name: String,
  priceRange: String,
  description: String
});

hobbySchema.set('toJSON', {
  virtuals: true
});

const Hobby = mongoose.model('Hobby', hobbySchema);

hobbySchema.set('toJSON', {
  virtuals: true
});

app.use(express.static('public'));

app.get('/api/people', async (req, res) => {
  console.log("In get people");
  try {
    let people = await Person.find();
    res.send({people: people});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/people/:id', async (req, res) => {
  console.log("In get person");
  try {
    let id = req.params.id;
    var found = await Person.findById(id);
    console.log(found);
    res.send(found);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/people', async (req, res) => {
  console.log("in person post");
  const person = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    favColor: req.body.favColor,
    hobby: req.body.hobby
  });
  try {
    await person.save();
    res.send({person: person});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/people/id', async (req, res) => {
  console.log("Delete person");
  try {
    await Person.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/hobbies', async (req, res) => {
  console.log("In get hobbies");
  try {
    let hobbies = await Hobby.find();
    res.send({hobbies: hobbies});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/hobbies/:id', async (req, res) => {
  console.log("In get specific hobbie");
  try {
    let id = req.params.id;
    var found = await Hobby.findById(id);
    console.log(found);
    res.send(found);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/hobbies', async (req, res) => {
  console.log("in hobbie post");
  const hobby = new Hobby ({
    name: req.body.name,
    priceRange: req.body.priceRange,
    description: req.body.description
  });
  try {
    await hobby.save();
    res.send({hobby: hobby});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/hobbies/id', async (req, res) => {
  console.log("Delete hobbie");
  try {
    await Hobby.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));