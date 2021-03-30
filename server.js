const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var fs = require('fs')
var https = require('https')

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
    initial();
  });
  function initial() {
    Role.create({
      id: 1,
      name: "professionnel"
    });
    Role.create({
      id: 2,
      name: "developpeur"
    });
    Role.create({
      id: 3,
      name: "admin"
    });
  }
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
              //==============================
              //===   Import route ===========
              //==============================
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/tutorial.routes")(app);
require("./app/routes/posts.routes")(app);
require("./app/routes/testimony.routes")(app);
require("./app/routes/comments.routes")(app);


app.get('/', function (req, res) {
  res.send('hello world')
})
// set port, listen for requests
https.createServer({
  key: fs.readFileSync('HSSL-5fb797450b072.key'),
  cert: fs.readFileSync('lenid-back_online.crt')
}, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})