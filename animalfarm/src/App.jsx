import { useEffect, useState } from "react"



function App() {

  // We need to fetch the data from the client and send it to the server.
  const [animals, setAnimals] = useState([])

  
  /* Normally, when we refresh the page, the text input is gone. 
  We can use the useEffect hook to save the text input to the local storage.

  The empty array as the dependency list means that the effect will only run once, 
  equivalent to componentDidMount:
  */
  useEffect(() => {
    /* localStorage allows us to store arbitrary key value pairs.
    When the page refreshes (i.e. when this component mounts),
    we are obtaining the last query and searching it, 
    preventing the query from being when the page is refreshed.
    */
    const lastQuery = localStorage.getItem('lastQuery');
    searchAnimals(lastQuery)
  }, []);

  const searchAnimals = async (q) => {
    const response = await fetch('http://localhost:8080?' + new URLSearchParams({ q }));
    const animals = await response.json();

    // Saving the query to the local storage when the user types in the input:
    localStorage.setItem('lastQuery', q);
    
    // Setting the data retrieved from the server as the state of the component:
    setAnimals(animals);
  }

  return (
    <main>
      <h1>Animal Farm</h1>

      {/* Adding a form input for the animal type */}
      <input 
        type="text"
        placeholder="Animal Type"
        // We want to fetch data from the server any time the text changes. 
        // We can do this by listening to the onChange event.
        // We can access the value of the input using event.target.value
        onChange={(event) => searchAnimals(event.target.value)}
      />

    <ul>
      {animals.map((animal) => (
        // Using the spread operator to pass the animal object as props:
       <Animal key={animal.id} {...animal} />
      ))}

      {animals.length === 0 && 'No animals found'}
    </ul>

    </main>
  )
}

export default App


function Animal({ type, name, age}) {
  return (
    <li>
      <strong>Type:{type}</strong>, Name: {name}, Age: {age}
    </li>
  )
}


// This project is using Vite, so use the command 'npm run dev' to run the app in development mode.
