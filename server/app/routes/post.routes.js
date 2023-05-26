const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/api/post/create", [authJwt.verifyToken], controller.create);
    app.post("/api/post/delete", [authJwt.verifyToken], controller.delete);
    app.get("/api/post/list", [authJwt.verifyToken], controller.list);
    app.post("/api/post/userlist", [authJwt.verifyToken], controller.userlist);
  };