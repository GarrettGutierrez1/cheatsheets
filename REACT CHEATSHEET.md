# REACT CHEATSHEET

## TABLE OF CONTENTS

* [Version](#version)
* [React Introduction](#react-introduction)
  * [Description](#description)
  * [JSX](#jsx)
  * [Hello World](#hello-world)
  * [App](#app)
* [Function Components](#functional-components)
  * [Creating and Invoking Functional Componenets](#creating-and-invoking-functional-components)
  * [Parameterizing Functional Components](#parameterizing-functional-components)
  * [The Style Attribute](#the-style-attribute)
  * [The Children Parameter](#the-children-parameter)
  * [Components with Multiple Tags](#components-with-multiple-tags)
  * [Creating a Dynamic List of Components](#creating-a-dynamic-list-of-components)
  * [Event Handling](#event-handling)
* [Implementing Statehood](#implementing-statehood)
  * [Statehood with useState](#statehood-with-usestate)
    * [Example: Button with Counter](#example-button-with-counter)
  * [Statehood with useReducer](#statehood-with-usereducer)
    * [Example: Multiple Buttons with Their own Counters](#example-multiple-buttons-with-their-own-counters)
  * [State Scope and Persistence](#state-scope-and-persistence)
    * [State is Attached to Components](#state-is-attached-to-components)
    * [State Does Not Survive Reloading the Document](#state-does-not-survive-reloading-the-document)
  * [Using localStorage and sessionStorage to Maintain State](#using-localstorage-and-sessionstorage-to-maintain-state)

## VERSION

This document is up-to-date as of:

* ```react``` version 18.3.1.
* ```react-dom``` version 18.3.1.

## REACT INTRODUCTION

### DESCRIPTION

```react``` is a frontend framework for writing web applications. At a lower level, it is a JavaScript library that utilizes JSX to render web page content in real time on the client-side.

### JSX

```react``` applications are written in JSX which is a syntax extension of JavaScript that supports XML as a type of data that can be stored in variables, passed as parameters, returned by functions, etc. Because we write in JSX, our JavaScript files will have the ```.jsx``` extension instead of the ```.js``` extension.

### HELLO WORLD

There are many ways to create a ```react``` "Hello World" application. Using ```create-react-app```, a ```Node``` package, is a common way, but that package is outdated. The ideal way is to use ```vite```, another ```Node``` package. Use any way that works.

### APP

The entry point for a ```react``` application is a single component exported by a JavaScript file. The component can be named anything, but it is named ```App``` by default.

```javascript
// src/App.jsx
import './App.css';

function App() {
  return (
    <div>Hello world.</div>
  );
}

export default App;
```

The JavaScript file below injects the ```App``` into our html file, at an element with an id of 'root'.

```javascript
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
```

And below is our html file that is served with our app. Note the element with 'root' as its id. This is where our ```App``` is injected.

```html
<!--- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Playground</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## FUNCTIONAL COMPONENTS

### CREATING AND INVOKING FUNCTIONAL COMPONENTS

A functional component is simply a function that begins with a capital letter and returns XML. For example, our ```App``` is a functional component named ```App``` that simply returns "Hello world." in a ```<div>```.

Below is an absurdly simple functional component that returns an empty ```<div>```.

```javascript
function EmptyDiv() {
  return (
    <div></div>
  );
}
```

When invoking the functional component, simply use an XML tag with the same name as the functional component.

```javascript
function UsesEmptyDiv() {
  return (
    <EmptyDiv></EmptyDiv>
  );
}
```

### PARAMETERIZING FUNCTIONAL COMPONENTS

To parameterize a functional component you pass it a single parameter that is an object where the attributes are the parameters. In the example below, our component has the parameters ```useClass``` and ```useId``` which it uses as the class and id (respectively) for a ```<div>``` it creats.

The brackets around ```{useClass}``` and ```{useId}``` inside the ```div``` here serve as a special JSX construction that invokes JavaScript within an XML tag. You can put any JavaScript within the brackets and it will resolve it.

```javascript
function DivWithClass({useClass, useId}) {
  return (
    <div className={useClass} id={useId}></div>
  );
}
```

When invoking parameterized functional components, you pass the parameters as attributes to the tag as you would with an HTML tag.

```javascript
function UsesDivWithClass() {
  return (
    <DivWithClass useClass="myClass" useId="myId"></DivWithClass>
  );
}
```

### THE STYLE ATTRIBUTE

The style attribute is a special case as you need two pairs of brackets: the outer one to invoke JavaScript and the inner one to set the attribute to a JavaScript object. That object should have attributes that match the style attributes. Note that you will need to add units if necessary, as is done in the below example.

```javascript
function DivWithStyle({color, paddingPx}) {
  return (
    <div style={{color: color, padding: paddingPx + "px"}}></div>
  );
}
```

### THE CHILDREN PARAMETER

You can create components that have children, with children just being any elements that go between the tags of the component, by using a special parameter called 'children'. The below example simply puts the children between two ```<div>``` tags.

```javascript
function DivWithContent({children}) {
  return (
    <div>{children}</div>
  );
}
```

When invoking the component that uses children, anything put between the tags will be assigned to the parameter called ```children```.

```javascript
function UseDivWithContent() {
  return (
    <DivWithContent>HELLO WORLD!</DivWithContent>
  );
}
```

### COMPONENTS WITH MULTIPLE TAGS

Functional components cannot return multiple tags. If you want to return multiple tags, wrap them in a single empty tag (```<></>```). This tag will be ignored when the component is rendered and it will be as if you returned multiple tags.

```javascript
function MultipleDivs() {
  return (
    <>
      <div></div>
      <div></div>
      <div></div>
    </>
  );
}
```

### CREATING A DYNAMIC LIST OF COMPONENTS

You can dynamically create and render any number of components by putting them in a list and then putting the list in brackets as content in the return value of a functional component, as is done below with the list of XML tags ```elements```. Note that if you do this, every tag in the list must have a unique ID. This is done so React can keep track of which tag is which when updating the DOM on state change.

```javascript
function DynamicList({length}) {
  const elements = new Array(length);
  for (let i = 0; i < length; i++) {
    elements[i] = <li key={i}>This is list element {i}.</li>
  }
  return (
    <ul>
      {elements}
    </ul>
  );
}
```

### EVENT HANDLING

In React, every tag can have an onClick callback function. When you click an element, such as a button, it will call its onClick, then its parent's onClick, then its parent's parent's onClick, etc. To stop this propagation, you use the 'stopPropagation' method of the event parameter passed to onClick. The first element to stop propagation will be the last onClick called on that click event (none of the onClick callbacks of its ancestors will be invoked).

```javascript
function SpeakingButton() {
  // This button puts up an alert when clicked. It stops propagation of the event.
  return (
    <button onClick={(e) => {
      e.stopPropagation();
      alert('The button was clicked.');
    }}>Click this button.</button>
  );
}

function SpeakingDiv() {
  // This div puts up an alert when clciked. It stops propagation of the event.
  // It holds an instance of the SpeakingButton component defined above. Because that component stops propagation, the
  // div's onClick callback will not be called if the button is clicked, only if an area in the div outside the button
  // is clicked.
  return (
    <div onClick={(e) => {
      e.stopPropagation();
      alert('The div was clicked.');
    }}>
      <SpeakingButton/>
    </div>
  );
}
```

## IMPLEMENTING STATEHOOD

### STATEHOOD WITH USESTATE

One way to maintain and update state is with ```useState```. ```useState``` is a hook. It can only be called within a functional component, and not within other functions or class methods etc. It has the following signature:

```javascript
const [state, setState] = useState(initialValue);
```

Where:
* ```state```: The variable that will hold the current state.
* ```setState```: A callback function that updates the state and triggers a rendering of the component owning the state.
* ```initialValue```: The initial value of the state.

To update the state, you invoke ```setState``` with the value you want to set the state to, for example:

```javascript
setState(newValue);
```

When you set the state using ```setState```, it triggers an update of the component that has the state. Its ```state``` variable will hold the new state.

#### EXAMPLE: BUTTON WITH COUNTER

In this simple example, we have a button with a counter. The counter starts at 0. As you click the button, the counter increments. The button displays the current value of the counter.

```javascript
import { useState } from 'react';

function ButtonCounter() {
  const [count, setCount] = useState(0);
  function handleClick(e) {
    e.stopPropagation();
    setCount(count + 1);
  }
  return (
    <button onClick={handleClick}>Count: {count}.</button>
  );
}
```

### STATEHOOD WITH USEREDUCER

A reducer is another way to handle maintaing and updating state. A reducer can be good for states that are complex. The main advantage of a reducer is that it keeps all of the state updating logic in one place, that place being a function called the reducer.

```useReducer``` has the following signature.

```javascript
const [state, dispatch] = useReducer(reducer, initialValue);
```

Where:
* ```state```: The variable that will hold the current state.
* ```dispatch```: A callback function for dispatching actions to the reducer which updates the state.
* ```reducer```: A callback function that handles actions sent by dispatch to update the state.
* ```initialValue```: The initial value of the state.

You can dispatch an action to ```reducer``` by invoking ```dispatch``` as follows:

```javascript
dispatch(action);
```

```action``` can be any type, but it is typically a JavaScript object with attributes that indicate what kind of action it is. For example if your state is a counter, you might have an action that increments the count by a certain value, as follows:

```javascript
dispatch({
  type: 'increment',
  amount: 5.
});
```

The reducer has the following signature.

```javascript
function reducer(state, action) {
  // Create a new state from state based on action.
  return newState;
}
```

Where:
* ```state```: The state of the state variable when dispatch was called.
* ```action```: The action sent by ```dispatch```.
* ```newState```: The reducer should always return an updated version of ```state``` depending on the ```action```.

#### EXAMPLE: MULTIPLE BUTTONS WITH THEIR OWN COUNTERS

In the following example, our state in ```ReducerMultiButtonCounter``` is a ```Map``` that maps button ids to their counts indicating how many times they have been clicked. We have two kinds of actions that can be dispatched by ```dispatch``` as indicated by the ```type``` attribute. One is ```increment``` which increments the count mapped to by ```id``` by 1. The other is ```reset``` which resets all counts to 0.

```javascript
import { useReducer } from 'react';

function ReducerButtonCounter({id, counts, dispatch}) {
  let count = 0;
  if (counts.has(id)) {
    count = counts.get(id);
  }
  function onClick(e) {
    e.stopPropagation();
    dispatch({type: 'increment', id: id});
  }
  return (
    <button id={id} onClick={onClick}>Count: {count}</button>
  );
}

function ReducerButtonReset({dispatch}) {
  function onClick(e) {
    e.stopPropagation();
    dispatch({type: 'reset'});
  }
  return (
    <button onClick={onClick}>Reset</button>
  );
}

function ReducerMultiButtonCounter() {
  const [counts, countsDispatch] = useReducer(countsReducer, new Map());
  return (
    <div>
      <ReducerButtonCounter id={0} counts={counts} dispatch={countsDispatch}/>
      <ReducerButtonCounter id={1} counts={counts} dispatch={countsDispatch}/>
      <ReducerButtonCounter id={2} counts={counts} dispatch={countsDispatch}/>
      <ReducerButtonCounter id={3} counts={counts} dispatch={countsDispatch}/>
      <ReducerButtonCounter id={4} counts={counts} dispatch={countsDispatch}/>
      <ReducerButtonReset dispatch={countsDispatch}/>
    </div>
  );
}

function countsReducer(counts, action) {
  switch (action.type) {
    case 'increment': {
      counts = new Map(counts);
      if (!counts.has(action.id)) {
        counts.set(action.id, 0);
      }
      counts.set(action.id, counts.get(action.id) + 1);
      return counts;
    }
    case 'reset': {
      counts = new Map(counts);
      [...counts.keys()].forEach(key => counts.set(key, 0));
      return counts;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

### STATE SCOPE AND PERSISTENCE

#### STATE IS ATTACHED TO COMPONENTS

One extremely important thing you should note is that a component's state only persists so long as that component is being rendered. Say the ```App``` component renders a ```Game``` component, which keeps track of a game's state. When you navigate to the About page, the ```Game``` component is no longer rendered, and instead the ```About``` component is rendered instead. When you navigate back to the Game page, the ```About``` component is no longer rendered, and the ```Game``` component is rendered again. When you navigate back and forth like this, what happens to the ```Game``` component's state? When you revisit it after visitng the About page, its state will be its initial state, that state passed to ```useState```. In other words, the state of your game is completely lost.

To avoid this, you will need to do what is what is called "lifting" the state. This just means putting the state at a higher level component that will persist even when you navigate away from the Game page and to the About page. For example you could put the game's state in the ```App``` component, which is always rendered. In this case, the Game's state will not be lost so long as the player stays on the page rendering the ```App``` component.

Another thing to note is that multiple instances of the same component do not share state. They all have their own version of the state variable.

#### STATE DOES NOT SURVIVE RELOADING THE DOCUMENT

If the user either refreshed the application, or manually enters a url into their address bar to navigate elsewhere within the application, this will trigger a reloading of the document. For all intents and purposes it will be like the user is opening the web application for the first time at the url. No state survives this. This can be seen as a fundamental limitation of ```react``` and perhaps client-side applications in general. However, it can be worked around. Consider the following methods for working around this limitation:

* Keep state simple. If your application only has very simple states then it should not be too much of a big deal for the user to lose their state. For example if the only state kept track of is what page the user is currently on it should not be a big deal for the user to navigate back to that page.
* Keep the state server-side. This will make your application considerably more complex, but if you keep statehood server-side then the user will not lose their state when they navigate away from the page. For example, consider a user who uploads their profile picture. This should be a PUT request that updates the user's profile picture somewhere in the backend. When the user closes and reloads the application, their profile picture should persist.
* Use either ```localStorage``` or ```sessionStorage```. These are both properties in JavaScript that allow you to save data. With ```localStorage```, data never expires. It persists across sessions, meaning even if the user closes their browser and reopens it the data will persist. ```sessionStorage``` however expires when the page session expires. The long-story-short on a page session is that it is created when the user opens your web application on a tab and ends when they close that tab. It survives over page reloads and restores within the tab.

### USING LOCALSTORAGE AND SESSIONSTORAGE TO MAINTAIN STATE

First, keep in mind the difference between ```localStorage``` and ```sessionStorage```:
* ```localStorage```: Data never expires. It persists across sessions, or until the user deletes their cookies.
* ```sessionStorage```: Data expires when the page session expires. The page session is created whenever the user opens your application in one of their browser tabs and it ends when the user closes that browser tab.

Both will persist across reloads and restores which makes using them advantageous compared to ```react```'s default handling of state. Both are instances of the ```Storage``` interface and so have the following methods:

```javascript
// Returns the value assigned to the key, or null if it does not exist.
const value = Storage.getItem('key');

// Assigns the value to the key.
Storage.setItem('key', 'value');

// Removes the key from the storage. No-ops if it does not exist.
Storage.remove('key');

// Empies all keys in the storage.
Storage.clear();

// How to check if Storage has a key.
let value = Storage.getItem('key');
if (value === null) {
  // The key did not exist, so assign a default value.
  value = 0;
  Storage.setItem('key', value);
}
```

```javascript
import { useState } from 'react';

/* This function is a hook that, like useState, returns a state variable and a callback for updating it. There difference is as follows: 1) if the key exists in localStorage, the associated value will be used as the initial state, 2) when setting the state, it is also updated in the localStorage, 3) localStorage will only be used if the localStorageUsed state is true, and 4) if at any time accessing localStorage fails due to a SecurityError, the passed localStorageUsed state will be set to false using the passed setLocalStorageUsed callback. You can also pass this function two optional callbacks, fromString and toString that convert the value from and to a string when it is read from and entered into storage, respectively. This may be necessary because values are always stored in storage as strings anyways. If the state is a number, then fromString should be Number. If the state is an object, then fromString should be JSON.parse and toString should be JSON.stringify. If the state is a string, neither are needed. You probably should not use more complex states such as class instances. TODO: What do I do if boolean?*/
function useLocalStorageState(key, initial, localStorageUsed, setLocalStorageUsed, fromString, toString) {
  if (localStorageUsed) {
    let foundInitial = null;
    try {
      foundInitial = localStorage.getItem(key);
    } catch (SecurityError) {
      setLocalStorageUsed(false);
    }
    if (foundInitial !== null) {
      if (typeof fromString !== 'undefined') {
        foundInitial = fromString(foundInitial);
      }
      initial = foundInitial;
    }
  }
  const [state, setState] = useState(initial);
  function setLocalStorageState(value) {
    if (localStorageUsed) {
      let storageValue = value;
      if (typeof toString !== 'undefined') {
        storageValue = toString(value);
      }
      try {
        localStorage.setItem(key, storageValue);
      } catch (SecurityError) {
        setLocalStorageUsed(false);
      }
    }
    setState(value);
  }
  return [state, setLocalStorageState];
}

function ButtonCounter() {
  const [localStorageUsed, setLocalStorageUsed] = useState(true);
  const [count, setCount] = useLocalStorageState('count', 0, localStorageUsed, setLocalStorageUsed, Number);
  function onClick(e) {
    e.stopPropagation();
    setCount(count + 1);
  }
  return (
    <button onClick={onClick}>Count: {count}</button>
  );
}

function App() {
  function onClick(e) {
    e.stopPropagation();
    localStorage.clear();
  }
  return (
    <div>
      <ButtonCounter/>
      <button onClick={onClick}>Reset</button>
    </div>
  );
}

export default App;

/* One limitation of this hook is that you cannot use it to store localStorageUsed in localStorage, because it depends on itself. In this case you would just use the following hook that does not depend on a localStorageUsed state. It will simply always attempt to use localStorage.*/

function useLocalStorageStateSimple(key, initial, fromString, toString) {
  let foundInitial = null;
  try {
    foundInitial = localStorage.getItem(key);
  } catch (SecurityError) {
    // Do nothing.
  }
  if (foundInitial !== null) {
    if (typeof fromString !== 'undefined') {
      foundInitial = fromString(foundInitial);
    }
    initial = foundInitial;
  }
  const [state, setState] = useState(initial);
  function setLocalStorageState(value) {
    let storageValue = value;
    if (typeof toString !== 'undefined') {
      storageValue = toString(value);
    }
    try {
      localStorage.setItem(key, storageValue);
    } catch (SecurityError) {
      // Do nothing.
    }
    setState(value);
  }
  return [state, setLocalStorageState];
}

/* Optionally, we can use a reducer. Note that these both assume that the state object is and will always be an object that can be JSON serialized.*/

import { useReducer } from 'react';

function useLocalStorageReducerSimple(reducer, key, initial) {
  let foundInitial = null;
  try {
    foundInitial = localStorage.getItem(key);
  } catch (SecurityError) {
    // Do nothing.
  }
  if (foundInitial !== null) {
    initial = JSON.parse(foundInitial);
  }
  function reducerWrapper(state, action) {
    result = reducer(state, action);
    try {
      localStorage.setItem(key, JSON.stringify(result));
    } catch (SecurityError) {
      // Do nothing.
    }
    return result;
  }
  const [state, dispatch] = useReducer(reducerWrapper, initial);
}

function useLocalStorageReducer(reducer, key, initial, localStorageUsed, setLocalStorageUsed) {
  if (localStorageUsed) {
    let foundInitial = null;
    try {
      foundInitial = localStorage.getItem(key);
    } catch (SecurityError) {
      setLocalStorageUsed(false);
    }
    if (foundInitial !== null) {
      initial = JSON.parse(foundInitial);
    }
  }
  function reducerWrapper(state, action) {
    result = reducer(state, action);
    if (localStorageUsed) {
      try {
        localStorage.setItem(key, JSON.stringify(result));
      } catch (SecurityError) {
        setLocalStorageUsed(false);
      }
    }
    return result;
  }
  const [state, dispatch] = useReducer(reducerWrapper, initial);
}

/* Note that localStorage can be completely replaced with sessionStorage. Or we can use both, some using localStorage and some using sessionStorage. */
```