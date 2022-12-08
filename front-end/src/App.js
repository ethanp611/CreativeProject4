import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Popup from './Popup';

function App() {
  // setup state
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [popup, setPopup] = useState(false);
  const [currHobby, setCurrHobby] = useState("")
  const [currPrice, setCurrPrice] = useState("")
  const [currDesc, setCurrDesc] = useState("")

  const fetchPeople = async() => {
    try {      
      const response = await axios.get("/api/people");
      setPeople(response.data.people);
    } catch(error) {
      setError("error retrieving tasks: " + error);
    }
  }
  const fetchHobbies = async() => {
    try {      
      const response = await axios.get("/api/hobbies");
      setHobbies(response.data.hobbies);
    } catch(error) {
      setError("error retrieving tasks: " + error);
    }
  }
  /*const createTask = async() => {
    try {
      await axios.post("/api/todo", {task: item, completed: false});
    } catch(error) {
      setError("error adding a task: " + error);
    }
  }
  const deleteOneTask = async(task) => {
    try {
      await axios.delete("/api/todo/" + task.id);
    } catch(error) {
      setError("error deleting a task" + error);
    }
  }
  const toggleOneTask = async(task) => {
    try {
      if(task.completed === true) {
        task.completed = false;
      } else {
        task.completed = true;
      }
      await axios.put("/api/todo/" + task.id, task);
    } catch(error) {
      setError("error modifying a task" + error);
    }
  }*/

  // fetch ticket data
  useEffect(() => {
    fetchPeople();
    fetchHobbies();
  },[]);

  function getHobby(name) {
    //fetchHobbies();
    return hobbies.filter(hobby => hobby.name == name).at(0);
  }

  const onButtonClickHandler = async(hobbyName) => {
    fetchHobbies();
    setCurrHobby(hobbyName);
    var hobby = getHobby(hobbyName);
    setCurrPrice(hobby.priceRange);
    setCurrDesc(hobby.description);
    setPopup(true);
  };

  
  // render results
  return (
    <div className="App">
      {error}
      <div class="title2">Check out these creative people!</div>
      <div class="item-body2">And find cool new hobby ideas from them</div>
      <div class="item">
        {people.map( person => (
          <div class="item-container">
            <div key={person.id} class="item-body">
              {person.firstName} {person.lastName}
            </div>
            <div key={person.id} class="item-body2">
              Favorite color is
            </div>
            <div key={person.id} class="item-body">
              {person.favColor}
            </div>
            <div key={person.id} class="item-body2">
              Favorite hobby is
            </div>
            <div key={person.id} class="item-body">
              {person.hobby} 
            </div>
            <div key={person.id} class="item-body"> 
              <button onClick={() => {onButtonClickHandler(person.hobby)}}>View Hobby Details</button>
            </div>
          </div>
        ))}
   
      </div>
        <Popup trigger={popup} setTrigger={setPopup}>
            <div class="title">{currHobby}</div>
            <div class="item-body2">{currPrice}</div>
            <div class="item-body2">{currDesc}</div>
        </Popup>  
    </div>
  );
}

export default App;