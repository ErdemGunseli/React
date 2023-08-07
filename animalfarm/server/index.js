/* The server is technically a different application than the client.
So after creating the server directory and index.js file, we need to use the command 'npm init -y'
while inside the server directory, to create a package.json file.

Run the command 'npm i express cors chance' to install these modules.
    1) Express is like FastAPI, it's a web framework for Node.js.
    2) Cors (Cross-Origin Resource Sharing) is a middleware that allows us to make requests from our React app to our Express server.
    3) Chance is a library that allows us to generate random data, which we will use to demonstrate our app.

Then, inside the package.json file, change type to "type": "module" to use ES6 modules. 
This will allow us to use modern syntax import statements.
*/

import express from "express";
import cors from "cors";

// Initialising the express app:
const app = express();
app.use(cors());

// Creating some random animal data:
import Chance from 'chance';
const chance = new Chance();

// Using the spread operator to create an array of integers from 0 to 249 (which will be the IDs of our animals):
const animals = [...Array(250).keys()].map(id => {
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name(),
    }
});


/* Creating an API endpoint to make this data accessible
The argument is the URL of the endpoint, but we can leave it blank since we only have 1 endpoint.

'req' is the request object, and 'res' is the response object.
*/
app.get('', (req, res) => {
    /* Obtaining the query parameters from the request (key-value pairs in the URL after the '?'):
        req.query.q : Accessing the value of the 'q' parameter from the query string.
        req.query.q?.toLowerCase() : Converting the query parameter to lowercase to make it case insensitive
                                        and using the optional chaining operator to avoid errors if the query parameter is not provided.
         req.query.q?.toLowerCase() || "" : If no query parameter is provided, the left expression will be undefined, so we use the OR operator
                                            to return an empty string instead.
    */
    const q = req.query.q?.toLowerCase() || "";

    /* The filter method returns a new array with the elements of an array that meet the condition specified in the callback function.
    We want all animals the type of which (converted to lowercase for case insensitive search) to include the query parameter.
    */
    const results = animals.filter(animal => animal.type.toLowerCase().includes(q));

    // Sending the data back to the frontend application:
    res.send(results);

});

// Starting the server on port 8080:
app.listen(8080, () => console.log('http://localhost:8080'));

// To start the server, inside the server directory, run the command 'node index.js'.