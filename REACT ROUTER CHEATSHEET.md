# REACT ROUTER CHEATSHEET

## TABLE OF CONTENTS

* [Version](#version)
* [React Router Introduction](#react-router-introduction)
  * [Description](#description)
  * [Installation](#installation)
  * [Express Setup](#express-setup)
  * [Hello World](#hello-world)
* [Routes](#routes)
  * [Adding Routes](#adding-routes)
  * [Parameterizing Based on Path](#parameterizing-based-on-path)
  * [Getting the Path with useLocation](#getting-the-path-with-uselocation)
  * [Child Paths and the Outlet Component](#child-paths-and-the-outlet-component)
  * [Loaders](#loaders)
  * [Actions](#actions)
  * [Error Handling](#error-handling)
* [State and Context](#state-and-context)
  * [State Persistence and Scope](#state-persistence-and-scope)
  * [Passing Context to Outlets](#passing-context-to-outlets)
* [Navigating Paths](#navigating-paths)
  * [Using the Link Component](#using-the-link-component)
  * [Using the useNavigate Hook](#using-the-usenavigate-hook)
  * [Using the redirect function](#using-the-redirect-function)

## VERSION

This document is up-to-date as of:

* ```react``` version 18.3.1.
* ```react-dom``` version 18.3.1.
* ```react-router-dom``` version 6.27.0.
* ```express``` version 4.21.1.

## REACT ROUTER INTRODUCTION

### DESCRIPTION

React Router, also referred to by its package name ```react-router-dom```, is a JavaScript library that allows client-side routing in ```react```. What is client-side routing? Usually, when we serve a web page, the endpoints are defined in the backend (server-side) and said backend decides how to handle every endpoint. With client-side routing, we serve our application with every endpoint and it decides in the frontend (client-side) what to render based on the endpoint.

### INSTALLATION

To install ```react-router-dom``` simply enter the node project for your web application and run the following command. This will simultaneously install ```react-router-dom``` in your project (adding it to the ```node_modules``` directory) and edit ```package.json``` to list ```react-router-dom``` as a dependency.

```sh
npm i react-router-dom
```

### EXPRESS SETUP

Below is a very simple ```express``` application that serves our ```react``` application.

```javascript
'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../react-frontend/dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../react-frontend/dist/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
  console.log('Press CTRL+C to quit.');
});
```

This assumes that our ```react``` application is in a directory at the path ```../react-frontend``` relative to our ```express``` application. Assuming our ```react``` frontend was created from the ```vite``` template, it will publish all the public files to the ```dist``` directory when we build it. What this ```express``` app does is:

1. Serves as static files all the files in ```../react-frontend/dist```.
2. For any other request, serve our ```react``` application at ```../react-frontend/dist/index.html```.

Essentially this serves every single endpoint (that does not match a static file) directly to our react web application for it to process client-side.

### HELLO WORLD

From the ```vite``` ```react``` template, create and/or edit the following files with the following contents.

```javascript
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
```

```src/main.jsx``` typically injects our ```App``` component into our ```index.html```. Instead, what we do here is serve the ```RouterProvider``` component. The ```RouterProvider``` component is a ```react-router-dom``` component that changes its contents based on the URL as defined by the router we pass to it. In this case we pass ```router``` which is defined in ```src/router.jsx```.

```javascript
// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  }
]);

export default router;
```

```src/router.jsx``` is a new file we have created that defines our router, which is called ```router``` and is created from the ```react-router-dom``` function ```createBrowserRouter```. What we pass as the parameter to ```createBrowserRouter``` is a list of ```Route``` objects. Here we pass only one, which creates an ```App``` component and designates it was what to serve at the ```/``` endpoint.

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

```src/App.jsx``` is relatively unchanged.

## ROUTES

### ADDING ROUTES

It is extremely important to understand how ```react-router-dom``` picks which path best matches the URL. Since ```react-router-dom``` version 6, the ordering does not matter. ```react-router-dom``` will find all the paths that match and then pick the most specific one.

```javascript
// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';

function Home() {
  return (
    <div>Home page.</div>
  );
}

function Other() {
  return (
    <div>Other page.</div>
  );
}

function User() {
  return (
    <div>User page.</div>
  );
}

function About() {
  return (
    <div>About page.</div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/*",
    element: <Other/>,
  },
  {
    path: "/user/:userId",
    element: <User/>,
  },
  {
    path: "/about",
    element: <About/>,
  }
]);

export default router;

// localhost:5173 => "Home page."
// localhost:5173/about => "About page."
// localhost:5173/user/123 => "User page."
// localhost:5173/foo/bar => "Other page."
```

In the above example, even though the endpoint ```/about``` matches ```/about``` and ```/*```, it will match ```/about``` first because that is the most specific match. Similarly, ```/user/123``` matches ```/user/:userId``` first because it is more specific than ```/*```.

### PARAMETERIZING BASED ON PATH

In the below example, we can use the ```useParams``` hook inside a component to get the parameters pulled from the path. In this case, we use the ```"*"``` parameter, which returns everything that matched the ```"*"``` in the path.

```javascript
// src/router.jsx
import { createBrowserRouter, useParams } from 'react-router-dom';

function UseSplatParam() {
  const path = useParams()["*"];
  return (
    <div>The path is: {path}</div>
  );
}

function UseNamedParam() {
  const id = useParams()["id"];
  return (
    <div>The id is: {id}</div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/*",
    element: <UseSplatParam/>,
  },
  {
    path: "/id/:id",
    element: <UseNamedParam/>,
  }
]);

export default router;

// localhost:5173 => "Home"
// localhost:5173/hello/world => "The path is: hello/world"
// localhost:5173/id/123 => "The id is: 123"
```

### GETTING THE PATH WITH USELOCATION

Just like how ```useParams``` is a hook that gives us the parameters parsed from this path, ```useLocation``` is a hook that gives us the path itself in any component in our application. Its usage is demonstrated below.

```javascript
// src/router.jsx
import { createBrowserRouter, useLocation } from 'react-router-dom';

function SayPath() {
  const path = useLocation().pathname;
  return (
    <div>Path: {path}</div>
  );
}

const router = createBrowserRouter([
  {
    path: "*",
    element: <SayPath/>,
  }
]);

export default router;
```

### CHILD PATHS AND THE OUTLET COMPONENT

Routes passed to ```createBrowserRouter``` can have children. Just like the parameter to ```createBrowserRouter```, the value of ```children``` is a list of Route objects. The child will be rendered inside the parent in the case where both the parent and the child match the path sequentially. In order to render the child element within the parent element, the parent element needs to have an ```Outlet``` component. This component will be replaced 

```javascript
// src/router.jsx
import { createBrowserRouter, Outlet, useParams } from 'react-router-dom';

function Parent() {
  return (
    <div>
      <div>Rendering the parent.</div>
      <Outlet/>
    </div>
  );
}

function Child() {
  const path = useParams()["*"];
  return (
    <div>Rendering the child with path: {path}.</div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Parent/>,
    children: [
      {
        path: "*",
        element: <Child/>,
      },
    ],
  }
]);

export default router;

// localhost:5173 => "Rendering the parent."
// localhost:5173/hello/world => "Rendering the parent. Rendering the child with path: hello/world."
```

It is a little complicated to describe how matching and rendering happens when a route has children. To illustrate how it happens, consider the example below:

```javascript
// src/router.jsx
import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';

function SayPath() {
  const location = useLocation();
  return (
    <div>
      <div>Path: {location.pathname}</div>
      <div>Child:</div>
      <Outlet/>
    </div>
  );
}

const router = createBrowserRouter([
  {
    // This will match only the path below as well as any paths matched by its children.
    // "/"
    path: "/",
    element: <SayPath/>,
    children: [
      {
        // This will only match the paths below.
        // "/home"
        // "/home/"
        path: "home",
        element: <SayPath/>,
      },
      {
        // This will match the paths below as well as any paths matched by its children.
        // "/products"
        // "/products/"
        path: "products",
        element: <SayPath/>,
        children: [
          {
            // This will only match the paths below.
            // "/products/shirts"
            // "/products/shirts/"
            path: "shirts",
            element: <SayPath/>
          },
          {
            // This will only match the paths below.
            // "/products/pants"
            // "/products/pants/"
            path: "pants",
            element: <SayPath/>
          },
          {
            // This will only match the paths below.
            // "/products/shoes"
            // "/products/shoes/"
            path: "shoes",
            element: <SayPath/>
          },
        ]
      },
      {
        // This will match the paths below as well as any paths matched by its children.
        // "/countries"
        // "/countries/"
        path: "countries",
        element: <SayPath/>,
        children: [
          {
            // This will only match the paths below.
            // "/countries/usa"
            // "/countries/usa/"
            path: "usa",
            element: <SayPath/>
          },
          {
            // This will only match the paths below.
            // "/countries/china"
            // "/countries/china/"
            path: "china",
            element: <SayPath/>
          },
          {
            // This will only match the paths below.
            // "/countries/russia"
            // "/countries/russia/"
            path: "russia",
            element: <SayPath/>
          },
        ]
      },
    ],
  }
]);

export default router;
```

Essentially, you can arrange all the routes in a tree with parents towards the top and children towards the bottom. Draw a line along the tree downward from the top node down to any other node, be it a leaf node (without children) or not. The path that matches the line you have drawn will be any path that matches the concatenation of paths for routes down the line from top to bottom (note that in our example above we exclude the ```"/"``` between subpaths, however). The element that will be rendered will start with the element for the uppermost parent, with its ```Outlet``` replaced with the elemenet for its child down the line, with its ```Outlet``` replaced with the element for ITS child down the line, etc., until you reach the bottom, in which case if you stop at Route with children, its ```Outlet``` will be empty (since the line has stopped).

This tells us what paths match, but it is also important to note what paths do not match. For example, in the above example ```"/countries/russia"``` matches the child with ```"russia"``` as its path, but ```"/countries/finalnd"``` will not match anything, not even ```"/"``` or ```"/countries"```. It will simply 404.

### LOADERS

We can pass data to a component using the ```useLoaderData``` hook. The primary purpose of a loader is to load data that the element of a path uses. They can be asynchronous but they do not need to be.

```javascript
// src/router.jsx
import { createBrowserRouter, useLoaderData } from 'react-router-dom';

function UseLoader() {
  const path = useLoaderData();
  return (
    <div>The path is: {path}</div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <UseLoader/>,
    loader: ({params}) => {
      return "THERE IS NO PATH";
    }
  },
  {
    path: "/*",
    element: <UseLoader/>,
    loader: ({params}) => {
      return params["*"];
    }
  }
]);

export default router;

// localhost:5173 => "The path is: THERE IS NO PATH"
// localhost:5173/hello/world => "The path is: hello/world"
```

Loaders are useful in that they can be asynchronous. When they are asynchronous, the element will not be rendered until the function is complete. Below is a nonfunctional example demonstrating how it might be used to load data from a database or from a static file.

```javascript
const router = createBrowserRouter([
  {
    element: <Products/>,
    path: "/products",
    loader: async () => {
      return fakeDb.from("teams").select("*");
    }
  },
  {
    element: <Locations/>,
    path: "/locations/:locationId",
    loader: async ({params}) => {
      return fetch(`/api/locations/${params.locationId}.json`);
    }
  }
]);
```

### ACTIONS

Actions are the opposite of loaders. Whereas loaders load data asynchronously, actions mutate data asychronously. They are only called whenever the app sends a non-get submission request to your route (post, put, patch, delete). The return value of actions are returned by the ```useActionData``` hook.

See https://reactrouter.com/en/main/route/action for more details.

### ERROR HANDLING

Lets face it: You write bad code with lots of errors! So you need an error handler. Luckily this is built into ```react-router-dom```. We simply use the ```errorElement``` attribute of the route objects we pass to ```createBrowserRouter```. To get the error in a component you want to display in the case of an error, use the ```useRouteError``` hook.

```javascript
// src/router.jsx
import { createBrowserRouter, useRouteError } from 'react-router-dom';

function GoodPage() {
  return (
    <div>The page rendered without errors.</div>
  );
}

function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <div>An error occurred.</div>
      <div>Error message: {error.message}</div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <GoodPage/>,
    errorElement: <ErrorPage/>
  },
]);

export default router;
```

In this case, ```ErrorPage``` will be rendered if there is any error along the ```"/"``` path. Because ```"/"``` is the root, this will render on any path in the application that results in an error. Errors can be 404s, if the path matches nothing, or can result from JavaScript errors when rendering the component itself.

## STATE AND CONTEXT

### STATE PERSISTENCE AND SCOPE

In normal ```react``` applications you use the ```useState``` hook to keep, maintain, and update a component's state. That state belongs to that *instance* of the component, meaning 1) if there are other instances of the same component, they have their own state, and 2) if the component is no longer rendered, it will lose its state.

This similarly applies within ```react-router-dom```. However there are some unintuitive effects. Consider the router below.

```javascript
// src/router.jsx
import { useState } from 'react';
import { createBrowserRouter, Link, useParams } from 'react-router-dom';

// A component with a button that uses useState to keep track of how many times it has been clicked.
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

// A component that says what the current path is from the URL.
function SayPath() {
  const path = useParams()["*"];
  return (
    <div>Path: '{path}'</div>
  );
}

// A component that allows navigation to different paths.
function Navigation() {
  return (
    <div>
      <div><Link to="/">Go to Home.</Link></div>
      <div><Link to="/buttonOne">Go to Button One</Link></div>
      <div><Link to="/buttonTwo">Go to Button Two</Link></div>
      <SayPath/>
    </div>
  );
}

// A component to render at the "/" path.
function HomePage() {
  return (
    <div>
      <div>Home.</div>
      <Navigation/>
    </div>
  );
}

// A component to render at the "/buttonOne" and "/buttonTwo" paths.
function ButtonPage() {
  return (
    <div>
      <ButtonCounter/>
      <Navigation/>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/buttonOne",
    element: <ButtonPage/>,
  },
  {
    path: "/buttonTwo",
    element: <ButtonPage/>,
  },
]);

export default router;
```

As you can see in the above example, there are three paths that are handled: the home path (```"/"```) which just displays text and two button paths (```"/buttonOne"``` and ```"/buttonTwo"```) which each displays a button that keeps track of how many times it has been clicked.

When you enter either of the button paths, a ```ButtonCounter``` is created. You can click it to increment its count. If you navigate to the home path the ```ButtonCounter``` will be destroyed along with its state such that if you then revisit that button path the counter will be 0.

HOWEVER, if you go from ```/buttonOne``` to ```/buttonTwo``` or vice versa, ```react``` knows to sync up the components, so the state is maintained and not reset.

This may or may not be desirable behavior. If you don't want the two buttons to be synced up (I.E. you want them to be distinct and have their own states) you can use the ```key``` attribute which will tell ```react``` that elements are distinct.

The below example demonstrates how the usage of the ```key``` attribute indicates to ```react``` that the elements should be distinct. In this example, navigating between ```/buttonOne``` and ```/buttonTwo``` will reset the count.

```javascript
function ButtonPage({useKey}) {
  return (
    <div key={useKey}>
      <ButtonCounter/>
      <Navigation/>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/buttonOne",
    element: <ButtonPage useKey={1}/>,
  },
  {
    path: "/buttonTwo",
    element: <ButtonPage useKey={2}/>,
  },
]);
```

Note that the manner of state persistence only applies if you navigate to different paths in the application using the various navigation methods within the ```react-router-dom```. If you have the web application open and manually enter an address it triggers a reloading of the document which overrides all existing states in all components. The same logic applies if at any time the user hits refresh. This is actually a fundamental downside of ```react``` applications and client-side rendering in general.

### PASSING CONTEXT TO OUTLETS

If you want to pass states or other props down to components rendered using child paths and the ```Outlet``` component, you can use context via ```useOutletContext```.

```javascript
// src/router.jsx
import { useState } from 'react';
import { createBrowserRouter, Link, Outlet, useOutletContext } from 'react-router-dom';

function ButtonContainer() {
  const [count, setCount] = useState(0);
  function onClick(e) {
    e.stopPropagation();
    setCount(count + 1);
  }
  return (
    <div>
        <div><Link to="/">Home</Link></div>
        <div><Link to="/saycount">Say Count</Link></div>
        <div><button onClick={onClick}>Increment Count</button></div>
        <Outlet context={count}/>
    </div>
  );
}

function SayCount() {
  const count = useOutletContext();
  return (
    <div>Count: {count}</div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ButtonContainer/>,
    children: [
      {
        path: "saycount",
        element: <SayCount/>,
      },
    ],
  },
]);

export default router;
```

In this example, the state of ```count``` is passed down from the ```ButtonContainer``` component rendered at the ```"/"``` path down to the ```SayCount``` component rendered at the ```"/saycount"``` path via the context attribute passed to the ```Outlet```. As you navigate to the different pages using the ```Link```s, the state persists.

## NAVIGATING PATHS

There are three ways to actually change the URL from inside the app using React Router:
* ```Link```: A component that acts as a text link that when clicks goes to a URL.
* ```useNavigate```: A hook that is best used in functional components.
* ```redirect```: Used best in loaders and actions to redirect under certain conditions.

### USING THE LINK COMPONENT

Import Link and create a component where the "to" attribute is set to the path to go to. The component will render as an ```<a>``` tag where the ```href``` will point to the actual link. Note that the transition is client side, it does not actually reload the document. If you want to actually reload the document, pass the ```reloadDocument``` attribute. Links can also have relative paths but that is not shown here.

```javascript
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/news">News</Link>
      <Link to="/about">About</Link>
      <Link to="/Contact" reloadDocument>Contact</Link>
    </div>
  );
}
```

### USING THE USENAVIGATE HOOK

Simply import and use the ```useNavigate``` hook in a component. It returns a function that you pass the path you want to navigate to. Note that you can also pass to the navigate function a delta you want to go in the history stack.

```javascript
import { useNavigate } from "react-router-dom";

// A button that navigates to the path '/Contact'.
function ContactButton() {
  const navigate = useNavigate();
  function onClick(e) {
    e.stopPropagation();
    navigate('/Contact');
  }
  return (
    <button onClick={onClick}>Contact</button>
  );
}

// A button that navigates to the previous path.
function BackButton() {
  const navigate = useNavigate();
  function onClick(e) {
    e.stopPropagation();
    navigate(-1);
  }
  return (
    <button onClick={onClick}>Back</button>
  );
}
```

### USING THE REDIRECT FUNCTION

The ```redirect``` method: Import and use ```redirect``` in a loader or action function. Redirect is a function that you should call with one parameter, the path you want to redirect to, and then return the result of the function from the action or loader.

```javascript
import { redirect } from "react-router-dom";

// Redirects to the login page if it cannot get the user.
async function loader() {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  return null;
};
```