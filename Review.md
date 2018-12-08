# Review Questions

## What is Node.js?
/*
Node.js is a runtime environment for JavaScript that runs on the server. In short, it executes Javascript ourside the browser.
*/
## What is Express?
/*
Express is one of the most simple yet powerful ways to create a webserver. It is a framework for node.js which makes it easy to build web apps, APIs and features such as middleware and routing.
*/
## Mention two parts of Express that you learned about this week.
/*
I learned the concepts actual coding with middleware and routing in express this week.
*/
## What is Middleware?
/*
Middleware is a part of Express which are array of functions that get executed in the order in which they are introduced to the server code.
*/
## What is a Resource?
/*
A Resouce in Node.js can be any object or item where you interact with. It is accessible through URL or HTTP methods.It is the the JSON data we use for CRUD operations in case of building APIs.
*/
## What can the API return to help clients know if a request was successful?
/*
HTTP status codes and res.status codes(200)
*/
## How can we partition our application into sub-applications?
/*
We can partition it by separating route handlers into different files. Then turning them to as middleware to be utilized main file like index.js or server.js
*/
## What is express.json() and why do we need it?
/*
Express.jason is a built-in express middleware that parses incoming requests with JSON. We need it as a built-in parser of jason data unlike the old method of installing a bodyparser first.
*/