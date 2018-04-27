// Global execution context creates a global object 'this', which in the browser is the object 'window'

console.log(this);
console.log(window);

// Global means Not Inside a Function

var a = 'Hello world'; // can be found at this.a

function b() {
    console.log('Called b!');
}

// Hoisting

// Setup memory space for variables and functions - "Hoisting"
// All variables are initialized to 'undefined', but functions in its entirety

add();           // this will be called normally
console.log(s);  // this will output 'undefined'

var s = 'Hello There'; // the assignment happens at runtime

function add() {
    console.log("Called add!");
}

// 'Undefined' vs 'not defined'
var fruit; // undefined, a special value
console.log(fruit);

// console.log(not_defined); // error


// Single threaded: one command at a time
// Synchronous execution: one at a time and in order


// Function invocation and the execution stack
// Each function call will cause a new execution context to be created and put on the stack

function x() {} // x() execution context (create and execute)
                // -------------------------------------------
function y() {  // y() execution context (create and execute)
    x();        //
}               // -------------------------------------------
                //
y();            // global execution context
                // -------------------------------------------

// Scope chain
// The reference to outer environment of a execution context is determined lexically

function log() { // outer environment is global execution context
    console.log(myVar); // 1
}

function hugo() { // outer environment is global execution context
    var myVar = 2;
    log();
}

var myVar = 1;
hugo();

// another exmample

function g() {
    var myVar = 3;
    function inner() {
        console.log(myVar); // 3
    }

    inner();
}

g();

// 'let' in ES6 is block scoped, more later

// Asynchronous callbacks
// When the execution context stack is empty, JS engine will look at the Event Queue and handle events one by one. The browser asynchronously putting events into the event queue, but JS engine is running synchronously.

function waitThreeSeconds() {
    var ms = 3000 + new Date().getTime();
    while (new Date() < ms) {}
    console.log('finished function');
}

function clickHandler() {
    console.log('click event!');
}

document.addEventListener('click', clickHandler);

waitThreeSeconds();
console.log('finished execution');

