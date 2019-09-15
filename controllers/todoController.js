const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//connecting to database
mongoose.connect(
  "mongodb+srv://test:test@cluster0-cda8f.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
//creating a schema
const todoSchema = new mongoose.Schema({
  item: String
});
//creating a database model from a schema
const Todo = mongoose.model("Todo", todoSchema);

/* let data = [
  { item: "buy milk" },
  { item: "make bed" },
  { item: "one more item" }
]; */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get("/todo", (req, resp) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      resp.render("todo", { todos: data });
    });
  });
  app.post("/todo", urlencodedParser, (req, resp) => {
    let newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      resp.json(data);
    });
  });
  app.delete("/todo/:item", (req, resp) => {
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).deleteOne(function(
      err,
      data
    ) {
      if (err) throw err;

      res.json({ todos: data });
    });
  });
};
