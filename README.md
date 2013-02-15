# Project Manager

This is not a real project manager tool destined to be used in a production
environment, this is more like an experimentation zone used like a pretext to
test some libraries/technologies

This application is only build with HTML5/CSS/Javascript

## Libraries

The following libraries are used on the client side

 * Twitter Bootstrap for design
 * jQuery (because of Twitter Bootstrap)
 * AngularJS

## Server

The client use a REST API to get the data, different services are availables

 * roService A read only service using static files defined in the `rest`
   directory
 * mongoService A service calling the rest server build in the `rest-api`
   directory

## The Rest-api

The rest server is build in nodejs using

 * mongoose
 * restify

This server handle CORS requests

## Run ...

### ... using your web server

Just clone into a directory accessible by your web server and go to
app/index.html

### ... using the node server

cd to your local copy and launch the server then open
http://localhost:8000/app/index.html in a web browser

    node scripts/web-server.js

## .. using the mongo rest api

launch the REST API server (see the rest-api/README.md for detail about the
server)

    node rest-api/app.js

update the app/js/app.js file to replace the roService dependency by
mongoService, launch the server and browse http://0.0.0.0:4242/api/clients
