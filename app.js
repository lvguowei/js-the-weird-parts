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

add(); // this will be called normally
console.log(s); // this will output 'undefined'

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
function y() { // y() execution context (create and execute)
    x(); //
} // -------------------------------------------
//
y(); // global execution context
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

// Object
// can have primitive "property", object "property", "function" method.

var person = new Object(); // not the best way to create objects

person["firstname"] = "Guowei";
person["lastname"] = "Lv";

var firstNameProperty = "firstname";

console.log(person.firstname);
console.log(person[firstNameProperty]);

// object literal
var obj = {
    "name": "Bob",
    "age": 10
};

// Faking namespaces, a container for variables and functions

var english = {};
var spanish = {};
english.greet = "hello";
spanish.greet = "Hola";

// JSON and object literals
var objectLiteral = {
    firstname: "Jane",
    isFemale: true
};

// XML has a lot of extra chars, not efficient to send across Internet
// JSON is smaller, properties have to be wrapped in quotes

console.log(JSON.stringify(objectLiteral));

console.log(JSON.parse('{"firstname": "Jane", "isFemale": true}'));

// Functions are objects
// Two special properties: name, code(invocable).

function greeting() {
    console.log("hi");
}

greeting.language = 'english';

console.log(greeting.language);

// Function statements and function expressions

// Expression: a unit of code that results in a value
var i = 4; // = returns a value 4
1 + 2

// if is a statement, not returning a value
if (i === 4) {}

function statement() {
    console.log("hi");
}

var functionExpression = function() {
    console.log("hi");
};

functionExpression();

// Objects, functions, and this
// When a new function is envoked, a new execution context is created

console.log(this); // the global window object

function temp() {
    console.log(this);
};

temp();

var employee = {
    name: 'Mike',
    log: function() {
        var self = this;
        var setname = function(newname) {
            self.name = newname; // BUG in JS: 'this' in nested functions are pointing to global object, so need to use 'self' explicitly
        };

        setname('another name');
        console.log(this);
    }
};

employee.log();

// Array of anything

var arr = [
    1,
    false,
    {
        name: 'Amy',
        age: 3
    },
    function(name) {
        console.log(name);
    },
    "hello"
];

console.log(arr);

// 'arguments'(will be depracated) and SPREAD

function print(a, b, c) {
    // default params
    a = a || 0;
    b = b || 0;
    c = c || 0;

    console.log(a);
    console.log(b);
    console.log(c);
}

print();
print(1);
print(1, 2);
print(1, 2, 3);

function testArguments() {
    console.log(arguments);
}

testArguments(1, 2, 3, 4);

function print2(a, b, c) {
    if (arguments.length !== 3) {
        console.log("wrong number of arguments");
        return;
    }
    console.log(a);
    console.log(b);
    console.log(c);
}
print2(1, 2);

function testSpread(a, b, c, ...other) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(other);
}

testSpread(1, 2, 3, 4, 5, 6, 7, 8);

// Immediately invoked function expressions (IIFE)

(function(name) {
    var greeting = 'Hello '; // inside the function's execution context, not accessible from global
    console.log(greeting + name);
})('Jake');

// How to access global objects
(function(global) {
    global.globalObject = "I'm global object!";
})(window);

console.log(globalObject);

// Understanding closures

function say(whatToSay) {
    return function(name) {
        // Even though the execution context of the outer function is popped out when this line is executed, it still has a link to the data in the outer execution context. This is called closure.
        console.log(whatToSay + ' ' + name);
    };
}

var sayHi = say('Hi');
sayHi("Bob");

function buildFunctions() {
    var arr = [];
    // all 3 functions has a link to the var i in the buildFunctions execution context.
    // To fix this, use let instead of var. It will create a new variable each time.
    for (var i = 0; i < 3; i++) {
        arr.push(function() {
            console.log(i);
        });
    }
    return arr;
}
var fs = buildFunctions();
fs[0](); // 3
fs[1](); // 3
fs[2](); // 3

// The old way to fix this is to use IIFE
function buildFunctions2() {
    var arr = [];
    // all 3 functions has a link to the var i in the buildFunctions execution context.
    // To fix this, use let instead of var. It will create a new variable each time.
    for (var i = 0; i < 3; i++) {
        (function(n) {
            arr.push(function() {
                console.log(n);
            });
        })(i);
    }
    return arr;
}

fs = buildFunctions2();
fs[0]();
fs[1]();
fs[2]();

// Function factory

function makeGreeting(language) {
    return function(firstname, lastname) {
        if (language === 'en') {
            console.log('Hello ' + firstname + ' ' + lastname);
        }

        if (language === 'es') {
            console.log('Hola ' + firstname + ' ' + lastname);
        }
    };
}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('Foo', 'Bar');
greetSpanish('Foo', 'Bar');

// Closure and callbacks

function sayHiLater() {
    var greeting = 'Hi!';
    setTimeout(function() {
        // can access the greeting because of closure
        console.log(greeting);
    }, 1000);
}

sayHiLater();

// call() apply() and bind()
var people = {
    firstname: 'Guowei',
    lastname: 'Lv',
    getFullName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var logName = function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
};

// create a new function in which the 'this' is bound to people
var logPeopleName = logName.bind(people);

logPeopleName('en', 'es');

logName.call(people, 'en', 'es');
logName.apply(people, ['en', 'es']);

// function currying

function multiply(a, b) {
    return a * b;
}

var multiplyByTwo = multiply.bind(this, 2);

console.log(multiplyByTwo(3));

// Functional programming
// Learn from underscore JS source code
var arr1 = [1, 2, 3];

var arr2 = _.map(arr1, function(x) {
    return 2 * x;
});

var arr3 = _.filter([1, 2, 3, 4, 5], function(x) {
    return x % 2 === 0;
});

console.log(arr2);
console.log(arr3);

// Understanding prototype

var human = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function() {return this.firstname + ' ' + this.lastname;}
};

var john = {firstname: 'John', lastname: 'Doe'};

// Don't do this EVER! For Demo purpose only!
john.__proto__ = human;
console.log(john.getFullName());

var jane = {firstname: 'Jane'};
jane.__proto__ = human;

console.log(jane.getFullName());

// Reflection:
// An object can look at itself, listing and changing its properties and methods.

for (var prop in john) {
    if (john.hasOwnProperty(prop)) {
        console.log(prop + ': ' + john[prop]);
    }
}

var joe = {
    address: 'some street',
    getFormalFullName: function() {
        return this.lastname + ', ' + this.firstname;
    }
};

var jim = {
    getFirstName: function() {
        return firstName;
    }
};

_.extend(john, joe, jim);

console.log(john);
