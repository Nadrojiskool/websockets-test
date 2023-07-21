const encoder = new TextEncoder("utf-8");
const decoder = new TextDecoder("utf-8");

exports.allHandler = {
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
};