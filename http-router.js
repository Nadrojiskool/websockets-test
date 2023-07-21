
exports.allHandler = (res, req) => {
  /* It does Http as well */
  res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there!');
}

exports.ballsHandler = (res, req) => {
  /* It does Http as well */
  res.writeStatus('200 OK').writeHeader('IsBalls', 'Yes').end('Hello balls!');
}