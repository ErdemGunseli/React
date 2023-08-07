/* React is a JavaScript library for building user interfaces.
It is used to build single page applications (SPAs).
To get started with React, first go to the directory in which you want to create the app.
Then run the following command:
  npx create-react-app <app-name>

The following files are created:
  package.json: contains the dependencies of the project
  package-lock.json: contains the exact version of the dependencies
  node_modules: contains the actual code for dependencies
  public: contains the static files
  src: contains the source code
  README.md: contains the information about the app

Inside the src folder, the following files are created:
  App.js: contains the main code of the app - add your components here and use them in the 'App' function
  App.css: contains the styling of the app
  index.js: contains the code to render the app
  index.css: contains the styling of the app
  logo.svg: contains the logo of React
  reportWebVitals.js: contains the code to report the performance of the app
  setupTests.js: contains the code to set up the tests for the app
  App.test.js: contains the code to test the app

To run the app, navigate to the app directory and run the following command:
  npm start
*/
import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useReducer } from 'react';





/* Each React function (can be declarations or expressions) corresponds to a UI component.
Components return JSX (JavaScript XML or JavaScript Syntax Extension) to describe the appearance of the UI.
JSX looks like HTML (uses tags), and can include JavaScript expressions within curly braces.
Having different components in different files is a common practice.
Component identifiers should start with a capital letter.
*/
function MyComponent() {
  // Using parenthesis allows the JSX to span multiple lines:
  return ( 
    <h1>
      Hi There {1 + 2 + 3}!
    </h1>);
}


const MyComponent2 = () => {
  /* The JSX return statement must be exactly one parent element.
  A fragment, which is like a placeholder, can be used to wrap multiple elements. 
  The reason these are not wrapped in a div is because divs are block elements, which take up the entire width of the page.
  The parent element here is a fragment: 
  */
  return (
        <>
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Click Me!</button>
        </>);
}

/* Originally, React components were created using classes. This still works but is not recommended
due to the extra code required. Furthermore, hooks allowed functional components to have state.
*/
class MyComponent3 extends React.Component {
  render() {return <h1>Hello World!</h1>;}
}


/* Components can receive props (properties) as input, and return JSX elements as output.
Props can be primitive values, objects, or functions (can even be other React components).
*/
function OutputMessage(props) {
  return <h1>{props.message}</h1>;
}

/* It is common to use destructuring to extract values from props.
When destructuring, the name of the variable must match the name of the prop.
The spaces around the curly braces are optional, but recommended.
Using this alongside default values allows for more flexibility:
*/
function OutputMessage2({ message = "Default Message" }) {
  return <h1>{message}</h1>;
}

/* Components can have children, which are other components nested within them.
This component accepts a special prop called 'children', which is a reserved keyword 
that represents all the content between the opening and closing tags of the component.
Look inside the 'App' function to see how this component is used. 
*/
function ParentComponent({ children }) {
  // This component returns a div with the children inside:
  return <div>{children}</div>;
}

/*
In React, data (props) flows in one direction: from parent to child. 
A parent component can pass data to a child component through props, 
but the child cannot send data back up to the parent through the same mechanism. 
This ensures that data management remains predictable and consistent throughout the application.
*/
function ChildComponent({ message }) {
  return <p>{message}</p>;
}

function ParentComponent2() {
  const text = "Hello from the parent!";
  return <ChildComponent message={text} />;
}


/* What happens here is that when the App function is called,
a card is created with the attribute 'icon = <Icon />', which calls the Icon component.
The icon component returns an i tag with the fire emoji.
Then, the Card component is called with the icon as a prop, and the children as the body of the card.
The children are the paragraph tag and its contents.
*/
function Card(props) {
  return (
    <div>
      <h2>{props.icon}</h2>
      {props.children}
    </div>
  );
}

function Icon() {
  return <i>🔥</i>
}


// To render a component depending on a condition, we can simply use if-else:
function Conditional({ count }){
  if (count > 5) {
    return <h1>Count is greater than 5</h1>
  } else {
    return <h1>Count is less than or equal to 5</h1>
  }
}

/* In some cases, we may have some initial UI, like a wrapper, and we may want to render a smaller element or UI within it.
If-else statements would result in a lot of repeated JSX code, and we cannot use if statements within JSX, only expressions.
Instead, we can use the ternary operator, which is a one-line if-else statement.
(condition ? expressionIfTrue : expressionIfFalse)
*/
function Conditional2({ count }) {
  // React will re-render whenever the props change, so the correct expression will be returned:
  return (
    <article>
      <nav>Navbar</nav>
      {/* The correct expression is returned depending on the condition:*/}
      {count % 2 === 0 ? <h1>Count is even</h1> : <h1>Count is odd</h1>}

      {/* Ternary operators are great if we want to show one component or another. 
      If we want to show nothing, we can use the && operator: 
      (condition && expressionIfTrue) 
      count > 5 && <h1>Count is greater than 5</h1>

      We can also use a ternary operator where the second expression is null:
      */}
      {count > 5 ? <h1>Count is greater than 5</h1> : null}
    </article>
  );
}


/* In many situations, it is necessary to render a collection of values, such as the items in an array.
Loops can be used in these situations, but they cannot be embedded in JSX.
Instead, we can use the map method, which takes a function as an argument and returns a new array.

The props is expected to have an items property, which is an array of objects:
*/
function List({ items }) {
  return (
    <ul>
      {/* Each item is expected to be an object with name and id properties.
      The key attribute of an HTML element helps React optimise the rendering on the list, 
      allowing an individual item to be re-rendered (instead of the whole array) if the value changes in the future. 
      However, DO NOT use the index of the array entry as a key. This will suppress the error provided by React,
      but won't allow React to properly optimise the performance. 
      

      {items.map(({ id, name }) => (<li key={id}>{name}</li>))}
      */}

      {/* When working with loops, the syntax will look neater if the loop is extracted into a separate component. 
      Select the return value of the map function, and copy it into a different component. */}
      {items.map(({ id, name }) => (<ListItem key={id} name={name} />))}


    </ul>
  );
}

// Return value of the map function extracted here:
function ListItem({ id, name }) {
  return <li key={id}>{name}</li>;
}


/* An event is a signal from the browser that an interaction has occurred, such as a mouse click or a key press.
In vanilla Javascript, we would likely grab a component from the DOM (Document Object Model 
a tree-like representation of the components within a web page) and add an event listener to it:
  const button = document.getElementById('button');
  button.addEventListener('click', (event) => console.log(event));

In React, we can add event callbacks directly to the JSX elements:
*/

// This is a React component that renders a button:
function Button() {

  // In most cases, it is beneficial to define the event handler outside of the JSX element:
  const handleClick = (event) => console.log(event);

  /* The onClick attribute takes a callback function as an argument (inside curly braces).
  The arrow syntax can be used pass the event object to the callback function.
  */
  return <button onClick={/*(event) => console.log(event)*/ (event) => handleClick(event)}>Click Me!</button>;
}

/* Since in React, functions are first-class objects, we can pass functions as props to child components:

  function Events() {

    const handleClick = (event) => {console.log(event)};

    return <ChildComponent onclick={handleClick} />;
  }

  function ChildComponent({ onclick }) {
    return <button onClick={onclick}>Click Me!</button>;
  }


*/


/* State is data that changes throughout the lifecycle of the application. We use props to share data between components,
but props are immutable, so we can't change their value and expect the UI to update. For data that changes, React provides
a hook called 'useState'. 

A hook is a function that can only be called at the top level of the component (i.e. cannot be called inside loops, conditions...)
and allows us to use state and other React features without utilising classes.
*/ 

function StatefulComponent() {
  /* The useState hook takes an initial value as an argument, and returns an array with two elements:
    1) The current value of the state
    2) A function to update the state
  The argument of 'useState' is the initial value of the state.

  Destructuring allows us to extract the elements of the array into separate variables.
  So here, the count variable is set to 0, and the setCount function can be used to update the value of count.
  */
  const [count, setCount] = useState(0);

  /* This component returns a paragraph with the current value of count, and a button that increases the count by 1.
  Since we are using the 'useState' hook, the value of count will be updated automatically when the button is clicked.
  */
  return (
    <>
      <p>{count}</p>

      <button onClick={() => setCount(count + 1)}>Increase Count!</button>
    </>
  )
}

/* The 'useState' hook will override the previous state and replace it with the new one.
If we want to merge the new state with the previous one, we could use the spread operator:
  const [state, setState] = useState({ count: 0, theme: 'blue' });
  state = { ...state, count: state.count + 1 }; // count: 1, theme: 'blue'

This may be useful when we want to add an element to an array, or add a property to an object.


The syntax can get complicated when we have nested objects, so it is recommended to use the 'useReducer' hook instead.
This is used for managing more complicated logic - similar to useState but gives more control over the state updates. 
*/

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };

    case 'decrement':
      return { count: state.count - 1 };

    default:
      throw new Error();
  }
}

function StatefulComponent2() {
  /* The 'useReducer' hook takes a reducer function (which decides how the state should change based on an action)
  and an initial state as arguments, and returns an array with two elements:
    1) The current state
    2) A dispatch function that can be called to send actions to the reducer function

  (Accessing the initial state from outer scope makes this function a closure.)
  */
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}


/* Every component in React has a lifecycle, which is the sequence of stages that it goes through during its lifetime.
  Mounting: when the component is created and inserted into the DOM
  Updating: when the component is updated as a result of changes to props or state
  Unmounting: when the component is removed from the DOM

For class-based components, React provides lifecycle methods that we can override to run code at particular times in the lifecycle.
For functional components, we can use the 'useEffect' hook to run code at particular times in the lifecycle.
*/

function LifecycleComponent() {
  // We can omit the second destructured element if we don't need it:
  const [count] = useState(0);

  /* The 'useEffect' hook takes a callback function as an argument.
  Optionally, it can also take an array of dependencies as a second argument, 
  which will run the callback function when the values in the array change.
  (Equal to componentDidUpdate in class-based components.)

  If the array is empty, the callback function will only run after mounting.
  (Equal to componentDidMount in class-based components.)

  Normally, there is no return value from the callback function, 
  but if we want to run some code when the component is unmounted,
  we can return an unmounting function from the callback function.
  (Equal to componentWillUnmount in class-based components.)
  */
  useEffect(() => {
    return () => console.log('Unmounting...');
  }, [count]);
}


/* The Context API is a way to share values and data between components 
without explicitly passing props down every level of the component tree.
Without this, we would need to pass props down through many layers of components,
even if the intermediate components do not need to use that data (this is called 'prop drilling').
Context is especially useful when we have a global value that many components need to use.

The Context API allows us to place some data somewhere within the component tree, and 
every child component can have access to that data without needing props.

The argument of the createContext function is the default value of the context.
*/
const CountContext = React.createContext(0);

function PropDrillingComponent() {

  const [count] = useState(0);

  return (
    <CountContext.Provider value={count}>
      <Child />
    </CountContext.Provider>
  );
}

function Child() {
  return <Grandchild />;
}

function Grandchild() {
  /* Then, any child component can access the context value using the useContext hook.
  All components using the context will automatically re-render if the data changes.
  */
  const count = useContext(CountContext);

  return <div>{count}</div>
}


/* An error boundary is a React component that catches JavaScript errors anywhere in its child component tree,
logs those errors, and displays a fallback UI instead of the component tree that crashed.
Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

An error boundary is a class component that defines either or both of the following lifecycle methods:
  1) static getDerivedStateFromError() - used to render a fallback UI after an error has been thrown
  2) componentDidCatch() - used to log error information
*/
class ErrorBoundary extends React.Component {
  constructor(props) {
    // Calling the constructor of React.Component:
    super(props);
    
    // Setting up the initial state of the component:
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error: ", error, errorInfo);
  }

  render() {
    /* If the state has an error, we will render the fallback UI. 
    Otherwise, we will render the default children of the component.
    */

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}


/* The contents of the 'App' function will be inserted within the 'root' div in the 'index.html' file. 
The code that does this is in the 'index.js' file.
Whatever is within this function (using custom React components) will be what shows up when the app is bundled and ran.
*/
function App() {
  return (
    /* Replace the pre-existing code here with your own:
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */

    // Once components are defined, they can be used just like regular HTML tags. Props can be passed in as attributes.
    <div>
      <OutputMessage
        message="Test Message!" 
      />

      {/* Here, the children of the ParentComponent are the paragraph and its contents. 
      These are passed in as children props. 
      */}
      <ParentComponent>
        <p>I'm a child!</p>
      </ParentComponent>


      <Card icon={<Icon />}>
        <p>The body of the card...</p>
      </Card>
    </div>
  );
}


/* Each JavaScript file can have one default export and multiple named exports.
The default export is imported (by another file) if a name is not specified.
The app function is the default export of this file, imported by index.js.
*/
export default App;
