const bodyParser = require("body-parser");
let express = require('express');
let app = express();

var items = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  const today = new Date();
  const currentDay = today.getDay();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  res.render('list', {
    day: today.toLocaleDateString("en-US", options),
    itemsList: items
  });
});

app.post("/", (req, res) => {
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is up and running on port 3000.");
});
