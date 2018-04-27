// Global execution context creates a global object 'this', which in the browser is the object 'window'

console.log(this);
console.log(window);

// Global means Not Inside a Function

var a = 'Hello world';

function b() {}
