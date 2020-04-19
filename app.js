const bodyParser = require("body-parser");
const express = require('express');
const date = require(__dirname + "/helper_functions/date.js");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const today = date.getDate();

/* ------------------------------------ Set up database ------------------------------------ */

mongoose.connect("mongodb+srv://elinaluaming:test123@todolist-r7x81.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const workSchema = {
  name: String,
  checklist: Boolean
};

const etcSchema = {
  name: {
    type: String,
    required: true
  },
  checklist: {
    type: Boolean,
    required: true
  }
};

const Work = mongoose.model("workItem", workSchema);

const Etc = mongoose.model("etcItem", etcSchema);

/* ------------------------------------ APIs ------------------------------------ */

app.route("/")
  .get((req, res) => {
    res.redirect("/work");
  });

app.route("/:itemCategory")
  .get((req, res) => {
    const category = req.params.itemCategory;

    if ( category === "work") {
      const etc = Work.find((err, foundItems) => {
        res.render("list", {
          itemsList: foundItems,
          day: today,
          category: category
        });
      })
    } else if (category === "etc"){
      const etc = Etc.find((err, foundItems) => {
        res.render("list", {
          itemsList: foundItems,
          day: today,
          category: category
        });
      })
    }
  })

  .post((req, res) => {
    const category = req.params.itemCategory;

    if (category === "work") {
      const newItem = new Work({
        name: req.body.newItem,
        checklist: false
      })

      newItem.save((err, item) => {
        if (!err) { console.log("Successfully posted " + item.name + "!");}
          else { console.error(err);}
      })

      res.redirect("/work");
    } else if (category === "etc") {
      const newItem = new Etc({
        name: req.body.newItem,
        checklist: false
      })

      newItem.save((err, item) => {
        if (!err) { console.log("Successfully posted " + item.name + "!");}
          else { console.error(err);}
      })

      res.redirect("/etc");
    }
  });

app.route("/delete/:itemCategory")

  .post((req, res) => {
    const checkedItemID = req.body.checkbox;
    const itemCategory = req.params.itemCategory;

    if (itemCategory === "work") {
      Work.findByIdAndDelete(checkedItemID, (err, item) => {
        if (!err) { console.log("Successfully deleted \"" + item.name + "\"!");}
      })
    } else {
      Etc.findByIdAndDelete(checkedItemID, (err, item) => {
        if (!err) { console.log("Successfully deleted \"" + item.name + "\"!");}
      })
    }

    res.redirect("/" + itemCategory);

  });
/* ------------------------------------ Others ------------------------------------ */

app.listen(3000, function() {
  console.log("Server is up and running on port 3000.");
});
