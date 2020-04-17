const bodyParser = require("body-parser");
const express = require('express');
const date = require(__dirname + "/date.js");
const app = express();

const workItems = ["code", "exercise"];
const etcItems = ["shower Brian with love"];
const today = date.getDate();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/etc", (req, res) => {
  res.render("list", {
    itemsList: etcItems,
    day: today,
    category: "etc"
  });
});

app.get("/", (req, res) => {
  res.render("list", {
    itemsList: workItems,
    day: today,
    category: "work"
  });
});

app.get("/work", (req, res) => {
  res.redirect("/")
});

app.post("/work", (req, res) => {
  console.log(req.body);
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.post("/etc", (req, res) => {
  console.log(req.body);
  const item = req.body.newItem;
  etcItems.push(item);
  res.redirect("/etc");
});

app.listen(3000, function() {
  console.log("Server is up and running on port 3000.");
});

function getAllItems(list1, list2) {
  const newList = []
  for (var i=0; i<list1.length; i++) {
    newList.push(list1[i]);
  }
  for (var i=0; i<list2.length; i++) {
    newList.push(list2[i]);
  }
  return newList;
}
