/* (1) Prototype Chain */

// Object is the class that everything that is not primitive inherits from, such as arrays and functions.
// Typical syntax to define an object - a collection of key value pairs which themselves can point to other objects or functions:
const animal = {
    dna: 123,
    legs: {front: 2, back: 2},
    // This is a method:
    sleep() {console.log("zzz");}
};

// A prototype in JS is like a parent class. When the prototype of something is null, 
// it is a primitive - i.e. we have reached the end of the prototype chain.
const p1 = Object.getPrototypeOf(animal); // Object
const p2 = Object.getPrototypeOf(p1); // null

const dog = {
    name: "Fido",
    age: 3,
    bark() {console.log("woof");}
};
// We can have this dog object inherit the properties of the animal by extending the prototype chain.
// This is called prototypal inheritance:
Object.setPrototypeOf(dog, animal); // dog now inherits from animal

const p3 = Object.getPrototypeOf(dog); // animal



/* (2) Destructuring */
// We can use the typical syntax to access the properties of an object:
// const name = dog.name;
// const name = dog.age;

// Or we can use the spread operator to access all the properties of an object:
const {name, age} = dog; // This assigns the property values to the variables. The identifiers must match the property names.

// If we want to have different variable names, we can use this syntax:
const {name: dogName, age: dogAge} = dog;

// Destructuring can also be used on arrays:
const arr = [1, 2, 3];
//const {first, second, third} = arr; // Obviously, there are no property names, so the variables are assigned the values in order.

// If we do not want a variable for an item of a certain index, we can leave it blank:
let [first, , third] = arr; 

// If we only want a few items, it is better to access the array elements directly instead of using destructuring:
first = arr[0];



/* (3) Spread Operator */
// Used when we want to copy the properties of an object into another object:
const firstHalf = {a: 1, b: 2, c: 3};
const secondHalf = {c: 4, d: 5};
const combined = Object.assign({}, firstHalf, secondHalf); // The last argument passed has the highest priority, so the c property will be 4.

// The above line can be implemented in a more concise way using the spread operator:
const combined2 = {...firstHalf, ...secondHalf}; // Again, the last argument passed has the highest priority.

// Alternatively, we can have one object in the definition of the other object, which has the same effect:
const combined3 = {...firstHalf, c: 4, d: 5};
// If the object comes at the top, properties defined afterwards will be overridden. If it comes at the bottom, it will override the properties defined before it.



/* (4) Optional Chaining */
// A common problem is that we may want to access a property of an object, but the object may be null or undefined, resulting in an error.
const obj = undefined;

// Previously, the following syntax was used::
if (obj) {obj.someProperty;}

// Using a question mark after the object name will check if the object is null or undefined before trying to access the property:
obj?.someProperty; // If obj is null or undefined, the expression will evaluate to undefined instead of throwing an error.
// This syntax can also be used when accessing items of an array:
arr?.[0];

// Can also be used when calling a function:
function foo(a, b) {}
foo?.(1, 2); 



/* (5) Nullish Coalescing
Truthy Values:
    1) true
    2) object (can be empty)
    3) array (can be empty)
    4) non-empty string
    5) any number except 0

Falsy Values:
    1) false
    2) null
    3) undefined
    4) empty string
    5) 0
*/

// The nullish coalescing operator (??) returns the right-hand side operand if the left-hand side operand is null or undefined.
const x = ""; // This is falsy
const val = x ?? "default value"; // This will evaluate to "default value" since x is falsy.



/* (6) Higher Order Functions */
// Functions are first-class objects in JS.

// Defining functions using the function keyword is a declaration. 
// Declarations are hoisted to the top of the file, so they can be called before they are defined.
sayHello()
function sayHello() {console.log("Hello");}

// Creating a function expression is setting the value of a variable (or constant) as the function:
// This is not hoisted, so it must be defined before it is called.
const sayGoodbye = function() {console.log("Goodbye");}
// Generally, declarations should be used for global functions, and expressions should be used for local functions.


/* Higher Order Functions 
    1) Functions that take in other functions as arguments
    2) Functions that return other functions
*/
function functionWrapper(func) {
    return func('Hello');
}
functionWrapper(sayHello); // This will call the sayHello function with the argument 'Hello'.

// In many cases, it is not necessary to name the function that is going in as the argument:
functionWrapper(m => console.log(m)); // This is an anonymous (or 'arrow') function.


// A function that returns another function:
function functionCreator() {
    return function() {console.log("Hello again");}
}
const fn = functionCreator();
fn(); // This will output "Hello again".



/* (7) Closures */
// A closure is a function that accesses a variable defined in the parent scope.
// When there is a function that references an identifier in the parent scope, 
// it creates a closure to save the value in memory so that it can be accessed later.
let b = 3; // This is captured by the closure.
function closure(a){return a + b;}

console.log(closure(2)); // This will output 5.


/* (8) Array Tricks */
const array = [1, 2, 3, 4, 5, 4, 3, 2, 1]; // Literal syntax
// If we wanted an array with 100 0s, the Array class could be used:
const array2 = new Array(100).fill(0);

// The map method creates a new array by applying a function to each element of an existing array:
// Using map to obtain range functionality similar to Python:
// The first argument is the value, the second is the index.
const array3 = Array(100).fill(0).map((_, i) => i + 1); // The first argument (the value at the index) is not used (similar syntax to Python).

// This can also be done using the spread syntax:
// The keys method returns the indices of the array, so we are replacing the array with its indices, resulting in a range of values:
// The reason we don't use keys directly is because it returns an array iterator, which does not directly provide the values.
const array4 = [...Array(100).keys()];

// We can also use the spread syntax to get all the unique values from an array:
// This method uses the fact that sets can only contain unique values.
const array5 = [...new Set(array)];
console.log(`Original Array: ${array}`);
console.log(`Unique Array: ${array5}`);

// Easiest way to loop over an array is the for of loop:
// Optional let or const keyword, use generally recommended:
for (/*let*/item of array) {console.log(item);}

// If we also need the index, we can loop over the array entries.
// Each entry itself is also an array, and contains the index and the value (this was used for the first 'range' implementation above).
for (const [i, item] of array.entries()) {
    console.log(`Index: ${i}, Value: ${item}`);
}

