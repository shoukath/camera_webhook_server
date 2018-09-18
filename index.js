const express = require('express')
const app = express()
const port = 3000
let motionFlag = '0';
let setTimeoutId;

app.all('*', (req, res, next) => {
  const origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (request, response) => {
  response.send('Hello from Express!')
});

app.get('/motion-detected', (request, response) => {
  motionFlag = '1';
  clearTimeout(setTimeoutId);
  setTimeoutId = setTimeout(function () {
    motionFlag = '0';
  }, 10000);
  response.send(motionFlag)
})

app.get('/motion-status', (request, response) => {
  response.send(motionFlag)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
