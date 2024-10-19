# EXPRESS CHEATSHEET

## VERSION

This document is up-to-date as of:

* ```express``` version 4.21.1.

## DESCRIPTION

express is a JavasScript library that allows for very simple but robust backends written in JavaScript.

## HELLO WORLD

First create a new npm package and install express in it.

```sh
# Create the directory to hold your npm package.
mkdir package-name

# Enter the directory.
cd package-name

# Initialize the directory as an npm package.
npm init

# Install express.
npm i express

# Create the entry point, index.js.
touch index.js
```

Then, in the package's directory, create index.js and add the following.

```javascript
// index.js
/* This indicates that the JavaScript in this file should be executed in strict mode. This is a feature of JavaScript. */ 
'use strict';

/* Imports express. */
import express from 'express';

/* Creates your express application. */
const app = express();

/* Registers a middleware for handling requests on the server. In every case, 'Hello World!' is returned with status 200. */
app.use((req, res) => {
    res.status(200).send('Hello World!');
});

/* Sets the app to listen on port 8080. */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`);
    console.log('Press CTRL+C to quit.');
});
```

Next add the following to the package.json file.

```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js",
  },
}
```

This allows you to run your application via the following command.

```sh
npm start
```

## ROUTING

### ROUTING METHODS

Lets assume you named your express app ```app``` with the following:

```javascript
const app = express();
```

All methods of ```app``` that define a route have the following format:

```javascript
app.METHOD(HANDLER);
app.METHOD(PATH, HANDLER);
```

Where METHOD is the HTTP request method, in lowercase, PATH is the PATH on the server (the endpoint) and HANDLER is the function executed when the route is matched. If you ignore the path parameter, the handler will be executed for every request of the type matching METHOD. You can look up the HTTP requests if you want to know which ones there are, but the most common are as follows:

* GET: Requests the specified resource. Use ```app.get(PATH, HANDLER)```.
* POST: Requests the creation of new state / data server side. Use ```app.post(PATH, HANDLER)```.
* PUT: Requests state / data server side be updated or replaced. Use ```app.put(PATH, HANDLER)```.
* HEAD: Requests state / data server side be deleted. Use ```app.delete(PATH, HANDLER)```.

You can also use the ```app``` method ```use```. This registers a handler that is executed on every request.

```javascript
app.use(PATH, HANDLER);
app.use(HANDLER);
```

If you ignore path, the handler will execute for every request. If you enter a path, it will execute for every request of every type, but only for that path.

### SERVING STATIC FILES

You can also use ```use``` to serve static files.

```javascript
app.use(express.static('public'));
```

In this case, ```public``` is a directory relatively to the entry point (```index.js```). Files in this directory will be served as static files, recursively, with their paths relative to the path argument to ```static``` being their endpoint. So for example if you have a file ```public/images/dog.jpg```, and you are serving your application on port ```3000```, then it will be served on the endpoint ```http://localhost:3000/images/dog.jpg```. If you register multiple directories in this manner with multiple files that match an endpoint, the first one that matches will be used (in the order you registered them using ```use```).

HANDLER is always a method that takes, as arguments ```req```, ```res```, and ```next```.

### HOW ROUTING IS DETERMINED

When you register callbacks for endpoints using method functions such as ```use```, ```get```, ```post```, etc., they are registered in order. The first registered handler with a path that matches the endpoint will be executed. A path "matches" if the path, in the url, BEGINS WITH the path registered to the method.

If the handler callback that first matches an endpoint does not utilize ```next```, then processing for that endpoint will stop and no other hanlders with paths matching the endpoint after it will be called. If you want to continue execution, the invoke ```next``` as follows.

```javascript
/* This hanlder will be called for every single request. It will log to the console and then pass the request off to the next handler with a matching path. */

app.use((req, res, next) => {
    console.log('A request was received.');
    next()
});
```

### PARAMETERIZING A PATH

To parameterize a path, put a ```:``` before the name for the parameter. You will then be able to access it from the ```req.params``` object, with the attribute having the same name as the parameter, as below. A path can have multiple parameters.

```javascript
app.get('/group/:groupId/user/:userId', (req, res, next) => {
    console.log('Getting data for user ' + req.params.userId + ' in group ' + req.params.groupId + '.');
    res.status(200).send('Getting data for user ' + req.params.userId + ' in group ' + req.params.groupId + '.');
});
```

## SETTING UP EXPRESS W/ REACT

When you build a react project, it should generate a directory containing the resulting files that should be served as static files. Let us say for example that the our express project is in a directory called ```express-backend``` and our react project is in a directory called ```react-frontend``` and they are both in the same directory, as below.

```
web-application/
    express-backend/
        index.js
        package-lock.json
        package.json
    react-frontend/
        dist/
            *
        public/
            *
        src/
            App.css
            App.jsx
            main.jsx
        index.html
        package-lock.json
        package.json
```

In this case, when we build ```react-frontend``` it puts the resulting files that should be served as static files in the ```react-frontend/dist``` directory. Inside ```express-backend/index.js```, which is the entry point for our express backend, we can serve those files as follows:

```javascript
'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

/* Set __dirname to be the path to the current directory of execution, which should be express-backend. */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Serve the contents of the directory at the path ../react-frontent/dist, relative to __dirname, as static files. */
app.use(express.static(path.join(__dirname, '../react-frontend/dist')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`);
    console.log('Press CTRL+C to quit.');
});
```

This effectively serves your react app without any additional setup needed.