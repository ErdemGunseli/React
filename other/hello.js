/* Data Types:
Undefined: Variable has been declared but not assigned a value.
Null: Variable has been assigned to not have a value.
Symbol: A unique identifier (like a key) used to access properties in an object. No two symbols are the same even if they have the same description.
Boolean, String, Number (can be integer or float), Object (like a dictionary)
*/

let num1 = 10; // Number
let str = "Hello"; // String
let bool = true; // Boolean
let obj = {name: "John", age: 30}; // Object
let nothing = null; // Null
let undef; // Undefined


// When declaring variables, var is not recommended as it is function-scoped - accessible within the entire function in which it is declared.
// In JS, this can lead to unexpected results. Other reasons include hoisting, and that it allows re-declaration.
var name1;  
name1 = "Bob";

// let and const are block-scoped, only accessible within the code block in which they are defined:
let name2 = "Rob";
name2 = "Robert";

const name3 = 'Dan';
// This would not work:
// name3 = "Daniel";

console.log(name1, name2, name3);

// Declaring multiple variables in a single line:
let firstName = "John", lastName = "Doe", age = 35;



/* Conditions */
let num2 = 13
if (num1 > num2) {
    console.log("num1 is greater than num2");
} else if (num1 < num2) {
    console.log("num1 is less than num2");
} else {
    console.log("num1 is equal to num2");
}

switch(num1 % 2) {
    case 0: 
        console.log("num1 is even"); 
        // Similarly to Java, the break keyword prevents the code from running into the next case automatically.
        break;
    case 1:
        console.log("num1 is odd");
        break;
    
    // The default keyword specifies the code to run if there is no case match. 
    // No need for break here since it is the last case tested.
    default:
        console.log("num1 is not a number");
}

// Ternary Operator:
age = 15;
// Condition ? <Expression if true> : <Expression if false>
let type = age >= 18 ? 'Adult' : 'Minor';
console.log(type); // Outputs: 'Minor'



/* Loops */

// For Loop:
for (let i=0; i<5; i++) {
    console.log(i);
}

// While Loop:
let i = 0;

while (i < 5){
    console.log(i);
    i++;
}


// Do While Loop (Condition checked at the end):
i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);


// For Each Loop (Array iteration):
let names = ["John", "Bob", "Rob", "Dan"];
names.pop()
names.push("Daniel")

names.forEach(function(name) { // 'name' takes the value of each element in the array
    console.log(name);
});

// Alternative Syntax:
for (name of names) {
    console.log(name + "...")
}

// String templates use backticks instead of quotes, and allow for the use of variables within the string:
console.log(`The Names Array ${names} has ${names.length} elements.)`)

// List Comprehension Equivalent:
names = names.map(function(name){
    return name + "!";
});

// Arrow Functions (Exact same logic as above, but more concise):
names = names.map(name => name + "!");

console.log(names);


/* Functions */
function add(x, y) {return x + y;}

// Arrow Function Equivalent:
add = (x, y) => x + y;

// Default parameter values:
function add(x, y, z=0) {return x + y + z;}


/* Classes */
// Classes are primarily syntactic sugar for the prototypal inheritance model.
// There are no explicit access modifiers like public, private, protected (can be accessed from a subclass).
class Rectangle {
    constructor(height, width){
        this.height = height;
        this.width = width;
    }

    area() {return this.height * this.width;}
}

class Square extends Rectangle {
    constructor(side){super(side, side);}
}

const mySquare = new Square(10);
console.log(mySquare.area());