const encoder = new TextEncoder("utf-8");
const decoder = new TextDecoder("utf-8");
const server = require('uWebSockets.js');
/* Non-SSL is simply App() vs SSLApp() */
const app = server.App({
  /* There are more SSL options, cut for brevity */
  // key_file_name: 'misc/key.pem',
  // cert_file_name: 'misc/cert.pem',
})
const socket = app.ws('/*', {
  /* There are many common helper features */
  idleTimeout: 30,
  maxBackpressure: 1024,
  maxPayloadLength: 512,
  // compression: DEDICATED_COMPRESSOR_3KB,
  
  /* Handlers */
  upgrade: (res, req, context) => {
    console.log('An Http connection wants to become WebSocket, URL: ' + req.getUrl() + '!');

    /* This immediately calls open handler, you must not use res after this call */
    res.upgrade({
        myData: req.getUrl() /* First argument is UserData (see WebSocket.getUserData()) */
      },
      /* Spell these correctly */
      req.getHeader('sec-websocket-key'),
      req.getHeader('sec-websocket-protocol'),
      req.getHeader('sec-websocket-extensions'),
      context
    );
  },
  open: (ws) => {
    console.log('A WebSocket connected with URL: ' + ws.myData);
  },
  /* For brevity we skip the other events (upgrade, open, ping, pong, close) */
  message: (ws, message, isBinary) => {
    const decoded = decoder.decode(message);
    console.log('received message', decoded);
    /* You can do app.publish('sensors/home/temperature', '22C') kind of pub/sub as well */
    
    /* Here we echo the message back, using compression if available */
    const recoded = encoder.encode(decoded);
    let ok = ws.send(recoded, isBinary, true);
  }
})
const router = socket.get('/*', (res, req) => {
  /* It does Http as well */
  res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there!');
})
router.listen(9001, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port 9001');
  }
});