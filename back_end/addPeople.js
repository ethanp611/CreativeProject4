const axios = require("axios");

const people = require("./people.js");

const baseURL = "http://localhost:3000";

people.forEach(async (person) => {
  const response = await axios.post(`${baseURL}/api/people`, person);
  if (response.status != 200)
    console.log(`Error adding ${person.firstName} ${person.lastName}, code ${response.status}`);
});