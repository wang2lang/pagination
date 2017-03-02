 /**
  * http://tapiov.net/live-server/
  */
 var liveServer = require('live-server')
 var history = require('connect-history-api-fallback')()

 var params = {
   port: 8181, // Set the server port. Defaults to 8080.
   watch: 'example/dist',
   host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
   root: 'example',
   open: true, // When false, it won't load your browser by default.
   wait: 0, // Waits for all changes, before reloading. Defaults to 0 sec.
   logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
   middleware: [ history ] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
 }

 liveServer.start(params)
