const express = require("express");
// deepcode ignore DisablePoweredBy: open source
const app = express();

var blacklisted = [];
var banned_ip = [];

app.all("*", function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (banned_ip.includes(ip)) {
    res.status(403);
    res.type('txt').send('Forbidden');
    return;
  }
  if (blacklisted.includes(req.baseUrl)) {
    res.status(403);
    res.type('txt').send('Forbidden');
    return;
  } else {
    console.log(ip + " > " + req.method + " : " + req.baseUrl);
    next();
  }
})

app.use('/public', express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(__dirname + "/404.html")
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(8080);
console.log("Live @ 8080");