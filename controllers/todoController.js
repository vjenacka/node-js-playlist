const bodyParser = require("body-parser");
let data = [
  { item: "buy milk" },
  { item: "make bed" },
  { item: "one more item" }
];
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get("/todo", (req, resp) => {
    resp.render("todo", { todos: data });
  });
  app.post("/todo", urlencodedParser, (req, resp) => {
    data.push(req.body);
    resp.json(data).send();
  });
  app.delete("/todo/:item", (req, resp) => {
    data = data.filter(
      todo => todo.item.replace(/ /g, "-") !== req.params.item
    );
    resp.json(data);
  });
};
