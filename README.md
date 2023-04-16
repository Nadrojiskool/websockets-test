# websockets-test

start your websocket server with: node index.js

connect from a client with WebSocket (example):
// should only run on client
if (typeof window !== 'undefined') {
  const server = new WebSocket('ws://' + 'localhost' + ':9001');
  
  server.onmessage = function (event) {
    const message = event.data;
    console.log('received message', message);
  };
  
  server.onopen = function (event) {
    console.log("connection open!");
    server.send('first');
  };
}