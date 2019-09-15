module.exports = function(app) {
  app.get("/todo", (req, resp) => {
    resp.render("todo");
  });
  app.post("/todo", (req, resp) => {});
  app.delete("/todo", (req, resp) => {});
};
