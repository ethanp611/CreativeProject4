const axios = require("axios");

const hobbies = require("./hobbies.js");

const baseURL = "http://localhost:3000";

hobbies.forEach(async (hobbie) => {
  const response = await axios.post(`${baseURL}/api/hobbies`, hobbie);
  if (response.status != 200)
    console.log(`Error adding ${hobbie.name}, code ${response.status}`);
});