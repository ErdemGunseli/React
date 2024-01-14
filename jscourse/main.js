import './style.css'

// Grabbing the form from the DOM (Document Object Model, a programming interface for web documents):
const form = document.querySelector('form');

// Adding an event listener to the form, and a callback function that runs when the form is submitted:
form.addEventListener('submit', async (event) => {
  // Preventing the default behavior of the form when a submit event is detected (which is to refresh the page):
  event.preventDefault(); 

  // Showing a spinner while the image is being generated:
  showSpinner();


  // We can access the data from the form by instantiating a new FormData object:
  const data = new FormData(form);

  // The fetch function is used to send HTTP requests to a server.
  // The first argument is the URI of the server.
  // The second argument is an object that contains the request method, headers, and body.
  // Sending a POST request to the server (to the argument URI) with the prompt from the form:
  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers: {
      // The Content-Type header is used to indicate the media type of the resource:
      'Content-Type': 'application/json'
    },

    // The body of the request is a JSON string that contains the prompt from the form:
    // The stringify method converts a JavaScript object or value to a JSON string, similar to toString() in Java:
    body: JSON.stringify({
      prompt: data.get('prompt')
    }),
  });
  
  // response.ok is a boolean that indicates whether the response was successful (status 2XX) or not:

  if (response.ok) {
  // The response from the server is a JSON string that contains the URL of the generated image:
  const {image} = await response.json();

  // Grabbing the result div from the HTML:
  const result = document.querySelector('#result');

  // Setting the innerHTML of the result div to an image tag with the URL of the generated image:
  result.innerHTML = `<img src="${image}" width="512" />`;
  } else {
    // Obtaining the error message from the response body:
    const error = await response.text();
    // Logging the error to the console:
    console.error(error);
    // Displaying the error message to the user:
    alert(`Something went wrong: ${error}`);
  }
  // Hiding the spinner:
  hideSpinner();
});


// A spinner will be shown when the image is being generated:
function showSpinner() {
  const button = document.querySelector('button');
  // Disabling the button so that the user cannot make multiple request at once:
  button.disabled = true;
  // The span tag is used to add styling and/or functionality in-line with something else:
  // Here, we are adding a spinner to the button:
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  // Enabling the button so that the user can make another request:
  button.disabled = false;
  // Changing the text of the button back to "Dream":
  button.innerHTML = 'Dream';
}


/*  Terminal Session 1:
    node jscourse/server.js

    Terminal Session 2:
    cd jscourse
    npm run dev
*/

