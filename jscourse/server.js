import dotenv from 'dotenv';
// Loading the environment variables into this file:
dotenv.config();


// Importing the required classes from the OpenAI SDK:
import {Configuration, OpenAIApi} from 'openai';

// Instantiating the configuration class to interact with the API:
const config = new Configuration({
    // Accessing the API key from the environment file:
    apiKey: process.env.OPENAI_API_KEY,
});


// Using our configuration to instantiate OpenAI:
// This object can be used to interact with the API:
const openai = new OpenAIApi(config);

/*
    Express.js is a web framework for Node.js that provides a set of features for web and mobile applications.
    It is similar to FastAPI:
    Both are RESTful web frameworks that allow creating web APIs:
    REST stands for Representational State Transfer, which maps CRUD operations to HTTP methods:

    Features of RESTful APIs:
        1) Stateless: The server does not store any state about the client session on the server side. 
                Each request from the client contains all the information necessary to service the request.
                This is good for scalability and manageability.

        2) Client-Server Architecture: The client and the server are independent of each other and can be replaced or updated without affecting the other.

        3) Cacheable: The server must indicate to the client if the response can be cached or not.

        4) Uniform Interface: The client and the server must agree on a common set of rules for communication.

        5) Layered System: The client should not be able to tell whether it is connected directly to the server or to an intermediary along the way.
*/
import express from 'express';

// CORS is a mechanism that allows resources on a web page to be requested from outside the domain from which the first resource was served.
import cors from 'cors';

// Instantiating the express application:
const app = express();

// Adding the CORS middleware to the express application, enabling CORS for all routes:
app.use(cors());

// Adding the JSON middleware to the express application, enabling parsing of JSON bodies:
app.use(express.json());


/* Explaining the async keyword:
    Some functions in JavaScript are asynchronous, meaning that they do not run immediately after they are called.
    This includes fetching data from a server, reading a file from a disk, or waiting for a timer to finish.
    Asynchronous functions run in the background and return a promise that resolves when the function is done executing.
    A promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    The async keyword is used to mark a function as asynchronous.
    The await keyword can be used to pause the execution of a function until a promise is resolved or rejected.

*/

// req (request) is an object that contains information about the incoming HTTP request:
// res (response) is an object that can be used to send a response to the client:
app.post('/dream', async (req, res) => {
    // Wrapping in try catch, in case something goes wrong:
    try {
    // Extracting the prompt from the request body (assuming the request body is a JSON object with a prompt property):
    const prompt = req.body.prompt;

    // Using the prompt to create an image using the OpenAI API:
    const aiResponse = await openai.createImage({
        prompt,
        n: 1, // Number of images to create
        size: '1024x1024', 
    });

    // This is the URL of the generated image:
    const image = aiResponse.data.data[0].url;

    // Sending the URL of the generated image to the client in the form of a JSON object:
    res.send({image});

    } catch (error) {
        console.error(error);
        // Using optional chaining to access the error message, and the nullish coalescing operator to provide a default message:
        res.status(500).send(error?.response.data.error.message ?? 'Something went wrong');
    }
});

// Listening for connections on port 8080, outputs the URL to the console when the server is ready:
app.listen(8080, () => console.log('http://localhost:8080/dream'));


/* 
    We are using Thunder Client, which is a lightweight REST API testing tool for VS code, similar to Postman. 
    It allows sending HTTP requests and viewing the responses directly inside the editor.
    */
