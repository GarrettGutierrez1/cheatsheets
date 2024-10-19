# VITE CHEATSHEET

## VERSION

This document is up-to-date as of:

* ```vite``` version 5.4.8.

## DESCRIPTION

```vite``` is a tool in the form of a node package that assists in front-end development. It has templates for multiple project types, including React projects written in JavaScript and TypeScript.

## CREATING A PROJECT FROM TEMPLATE

Creating a new project from a a template is simple. Run the commands below.

```sh
# Create a project:
npm create vite@latest

# cd into the project you created:
cd project-name

# Install all the necessary packages:
npm install

# Begin serving the application in develop mode:
npm run dev

# Build your application so you can deploy it:
npm run build
```

With your project running using 'npm run dev' you should open your application at localhost with the appropriate port. Changes you make to your files should be reflected automatically in your browser. For some errors, the cause will be displayed in the browser. Sometimes, however, you will need to check the JavaScript console using your browser. With React, it is also useful to install the React Development Tools extension for your browser to assist in development.

## FILE STRUCTURE

How a ```vite``` react template is structured:

```
node_modules/
public/
    vite.svg
src/
    assets/
        react.svg
    App.css
    App.jsx
    index.css
    main.jsx
.gitignore
eslint.config.js
index.html
package.json
vite.config.js
```

Description of some main files:

* ```src/App.css```: The stylesheet for your application.
* ```src/App.jsx```: The JavaScript file that defines your react application.
* ```src/index.css```: A stylesheet for index.html. Can probably be deleted.
* ```src/main.jsx```: A JavaScript file that injects your application into index.html.
* ```index.html```: The entry point for your application. main.jsx injects the app into it.

The project is initialized as a git repository, so there will also be a .git folder in the project folder that is hidden. You can either delete that folder or push your project to GitHub. This is the way to develop React projects or any project in node. DO NOT UNDER ANY CIRCUMSTANCE put these projects in OneDrive, since there are way too many files in ```node_modules``` after you run ```npm install```.

## WHEN FIRST CREATING A REACT PROJECT

Perform the following modifications to the files initially generated by ```vite``` when generating a React project to get to an effective "Hello World" state.

* Delete:
  * ```public/vite.svg```.
  * ```src/assets/react.svg```.
  * ```index.css```.
* Modify:
  * ```src/App.css```: Delete contents (and fill in as necessary).
  * ```src/App.jsx```: Delete most contents.
  * ```src/main.jsx```: Delete reference to index.css.
  * ```index.html```: Delete reference to vite.svg and change the page title.

The modified files should look as follows.

```css
/* src/App.css */
/* This file is empty. Add styles as necessary. */
```

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

```javascript
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```