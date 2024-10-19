/*----------------------------------------------------------------------------------------------------------------------
DIFFERENCE BETWEEN var, let, AND const:
- var:
    - Has global scope when declared outside a function and function scope when declared inside a function.
    - Can be redeclared and updated without error.
    - Combining a declaration with a value assignment, such as with "var myVar = 5;" does two separate things:
        - Declares the var.
        - Sets its value.
    - When declarations are always hoisted to the front of a their scope before execution. This means, for example, if
    you write "var myVar = 5;" then myVar will exist for the scope of the entire function. Note, however, that its value
    assignment is NOT hoisted, so it will be undefined until the line is reached.
    - THE WEAKENESS WITH var:
        - If you declare a new var within a function's scope, it overwrites the var with the same name in global scope.
        - Because of this, you should basically never use var. You might overwrite a variable being used elsewhere
        without knowing it.
- let:
    - Its scope is whatever block it is in. It dies when the block ends.
    - It CANNOT be redeclared WITHIN THE SAME BLOCK SCOPE.
    - It can be redeclared within a block's scope if it exists in a higher block's (or global) scope. In this case, it
    referring to the variable will use the one in the block's scope, and not affect the one in the higher scope.
    - Declaration is hoisted, but it is not assigned an undefined value, so will cause an error if used.
- const:
    - Has block scope, just like let.
    - Cannot be assigned a different value. Must be assigned a value on declaration.
    - However, if it is an object ({}) its attributes can be updated.

TYPING AND TYPES:
    - JavaScript is dynamically typed, meaning any variable can be assigned a value of any type.
    - All types, except Object, are immutable. These types are:
        - Undefined.
        - Null. E.G. "let x = null;"
        - Boolean. E.G. "let x = new Boolean(true);"
        - Number. E.G. "let x = 5;" or "let x = 3.14;"
        - BigInt. E.G. "let x = 5n;"
        - String. E.G. "let x = "hello world";"
    - Variables can also be objects. These include your custom defined objects (using {}), as well as build in objects.

IMPORTANT BUILT-IN OBJECTS:
    - Dates.
    - Arrays.
    - Sets.
    - Maps.
    - JSON.
----------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------
IF, IF ELSE, AND IF ELSE IF...
----------------------------------------------------------------------------------------------------------------------*/

let x = true;

if (x === true) {
    console.log('x === true');
}

if (x === true) {
    console.log('x === true');
} else {
    console.log('!(x === true)');
}

if (x === true) {
    console.log('x === true');
} else if (x === false) {
    console.log('x === false');
} else {
    console.log('!(x === true) && !(x === false)');
}

/*----------------------------------------------------------------------------------------------------------------------
SWITCH STATEMENTS
----------------------------------------------------------------------------------------------------------------------*/

switch (x) {
    case 0:
        console.log('x is 0');
        break;
    case 1:
        console.log('x is 1');
        break;
    case 2:
        console.log('x is 2');
        break;
    case 3:
        console.log('x is 3');
        break;
    default: 
        console.log('x is something else');
        break;
}

/*----------------------------------------------------------------------------------------------------------------------
LOOPS
----------------------------------------------------------------------------------------------------------------------*/

for (let i = 0; i < 10; i++) {
    console.log(i);
}

/*----------------------------------------------------------------------------------------------------------------------
ARRAYS
----------------------------------------------------------------------------------------------------------------------*/

// CREATING
const exampleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// PUSH
exampleArray.push(10);
// POP
let lastElement = exampleArray.pop();
// SLICE
let lastFour = exampleArray.slice(6);
let middleThree = exampleArray.slice(4, 3);
let shallowCopy = exampleArray.slice(0);

// ITERATING AN ARRAY EXAMPLE
for (let i = 0; i < exampleArray.length; i++) {
    console.log(exampleArray[i]);
}

// ITERATING AN ARRAY USING A FOR...OF LOOP
for (const element of exampleArray) {
    console.log(element);
}

// ITERATING AN ARRAY USING FOREACH
exampleArray.forEach((element) => {
    console.log(element);
});

// ITERATING USING MAP (W/O FUNCTION BLOCK)
exampleArray.map((element) => Math.sqrt(element));

// ITERATING USING MAP (W/ FUNCTION BLOCK)
exampleArray.map((element) => {
    return Math.sqrt(element);
});

// FOREACH AND MAP CALLBACK CAN HAVE MORE ARGUMENTS
exampleArray.forEach((element, index, array) => {/* ... */});
exampleArray.map((element, index, array) => {/* ... */});

// COPYING AN ARRAY
// NOTE: This is a shallow copy.
const copyArray = [...exampleArray];

/*----------------------------------------------------------------------------------------------------------------------
MAP
----------------------------------------------------------------------------------------------------------------------*/

// INITIALIZE FROM ARRAY
const exampleMap = new Map([
    ['foo', 'bar'],
    ['hello', 'world'],
    ['mind', 'numb'],
]);

// INITIALIZE FROM OBJECT
const exampleMap2 = new Map(Object.entries({
    foo: 'bar',
    hello: 'world',
    mind: 'numb',
}));

// CHECKING IF IT HAS OR DOESN'T HAVE A KEY
if (exampleMap.has('key')) {
    //...
}
if (!exampleMap.has('key')) {
    //...
}

// SETTING A KEY, VALUE PAIR
exampleMap.set('newKey', 'newValue');

// GETTING A VALUE FROM ITS KEY
// NOTE: Returns undefined if key does not exist.
const mapValue = exampleMap.get('key');

// ITERATING OVER KEYS
[...exampleMap.keys()].forEach((element, index, array) => {/* ... */});
[...exampleMap.keys()].map((element, index, array) => {/* ... */});

// ITERATING OVER VALUES
[...exampleMap.values()].forEach((element, index, array) => {/* ... */});
[...exampleMap.values()].map((element, index, array) => {/* ... */});

// ITERATING OVER THE KEY, VALUE PAIRS USING FOREACH
exampleMap.forEach((value, key) => {
    console.log('key ' + key + ' maps to value ' + value + '.');
});

// FOREACH CALLBACK CAN HAVE MORE ARGUMENTS
exampleMap.forEach((value, key, map) => {/* ... */});

// COPYING A MAP
// NOTE: This is a shallow copy.
const mapCopy = new Map(exampleMap);

/*----------------------------------------------------------------------------------------------------------------------
OBJECTS
----------------------------------------------------------------------------------------------------------------------*/

const exampleObject = {
    foo: 'bar',
    hello: 'world',
    mind: 'numb',
};

// CHECKING IF IT HAS OR DOESN'T HAVE A KEY
if (exampleObject.hasOwnProperty('key')) {
    // ...
}
if (!exampleObject.hasOwnProperty('key')) {
    // ...
}

// SETTING A KEY, VALUE PAIR
exampleObject.foo = bar;
exampleObject['hello'] = 'world';

// GETTING A VALUE FROM ITS KEY
// NOTE: Raises an exception if the key does not exist.
let objectValue = exampleObject.foo;
objectValue = exampleObject['hello'];

// ITERATING OVER KEYS
Object.keys(exampleObject).forEach((element, index, array) => {/* ... */});
Object.keys(exampleObject).map((element, index, array) => {/* ... */});

// ITERATING OVER VALUES
Object.values(exampleObject).forEach((element, index, array) => {/* ... */});
Object.values(exampleObject).map((element, index, array) => {/* ... */});

// ITERATING OVER THE KEY, VALUE PAIRS USING OBJECT.ENTRIES ARRAY FOREACH
Object.entries(exampleObject).forEach(([key, value]) => {
    console.log('key ' + key + ' maps to value ' + value + '.');
});

// FOREACH AND MAP CALLBACK CAN HAVE MORE ARGUMENTS
Object.entries(exampleObject).forEach(([key, value], index, array) => {/* ... */});
Object.entries(exampleObject).map(([key, value], index, array) => {/* ... */});

// COPYING AN OBJECT
// NOTE: This is a shallow copy.
const copyObject = {...exampleObject};

/*----------------------------------------------------------------------------------------------------------------------
SET
----------------------------------------------------------------------------------------------------------------------*/

const exampleSet = new Set([1, 2, 3]);

// ADD
exampleSet.add(0);

// DELETE
// NOTE: Does nothing if it doesn't exist.
exampleSet.delete(4);

// CHECKING IF IT HAS OR DOESN'T HAVE A KEY
if (exampleSet.has(4)) {
    // ...
}
if (!exampleSet.has(4)) {
    // ...
}

// ITERATING OVER THE VALUES OF A SET USING FOREACH
// NOTE: value and key are always the same.
exampleSet.forEach((value, key, set) => {/* ... */});

// USING MAP ON SET
// NOTE: You have to turn it into an array first.
[...exampleSet].map((element, index, array) => {/* ... */});

// COPYING A SET
// NOTE: This is a shallow copy.
const copySet = [...exampleSet];

/*----------------------------------------------------------------------------------------------------------------------
CLASSES
----------------------------------------------------------------------------------------------------------------------*/

class Rectangle {
    // Private variable. It must be declared inside the class.
    #msg
    constructor(height, width) {
        this.height = height;
        this.width = width;
        // The hashtag indicates a private varaible.
        this.#msg = "hello world";
    }
    // Getter
    get area() {
        return this.calcArea();
    }
    // Getter
    get message() {
        return this.#msg;
    }
    // Setter
    set message(nMsg) {
        this.#msg = nMsg;
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
    // STATIC METHOD
    static createSquare(size) {
        return new Rectangle(size, size);
    }
}

const myRectangle = new Rectangle(10, 10);

// Using a Getter:
console.log(myRectangle.area);

// Using a Setter:
myRectangle.message = "foo bar";
console.log(myRectangle.message);

// Using a Method:
console.log(myRectangle.calcArea());

// Using a Static Method:
console.log(Rectangle.createSquare(4).area);

/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
*/