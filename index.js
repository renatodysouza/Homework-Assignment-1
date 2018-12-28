/*
*
* Primary file for the api
*
*/


// Dependencies

const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const path = require('path');


// server respost

const server = http.createServer(function (req, res) {

    // Get url and parse it
    const parsedUrl = url.parse(req.url, true);
    
    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    
    // Get query string as an object
      const queryString = parsedUrl.query;

    // Get http method
      const method = req.method.toLowerCase();

    // Get header as an object
    const headers = req.headers;

    // Get payload, if any
    const decoder = new stringDecoder('utf-8');
    var buffer = '';

    req.on('data', function(data) {
        buffer += decoder.write(data);

    });

    req.on('end', function() {
        buffer += decoder.end();
    
        // choose the handlers, if not found, use notFound handler
          const chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
         
        // constructing objects to send to the handler   
        const data = {
            'trimmedPath': trimmedPath,
            'queryString': queryString,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        
        // Route the request specified in the router
        
        chooseHandler(data, function(statusCode, payload) {
              // use status code the handler, or default 200
               statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

              // use payload code the handler, or default to empty object
                payload = typeof(payload) == 'object' ? payload : {};

              // convert payload to a string
                const payloadString = JSON.stringify(payload);

              // return json
              res.setHeader('Content-Type', 'application/json');
              // return the reponse
              res.writeHead(statusCode);
              res.end(payloadString);
          });
       
    });
  
});

server.listen(config.httpPort, function () {

    console.log('The server is listening on port:', config.httpPort);

});

// Define the handlers
   const handlers = {};

// Sampler handlers   
   handlers.hello = function(data, callback) {
       // callback a http status code, and a payload object
       callback(406, {'message': 'welcome to node Api'});
   }

// Not found handlers
   handlers.notFound = function(data, callback) {
      // callback a http status code, and a payload object
      callback(404);
   }  

// Define a request router
   const router = {
      'hello': handlers.hello,


   }
   