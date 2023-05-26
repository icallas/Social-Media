const { authJwt } = require("../middleware");
const controller = require("../controllers/comment.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/comment/list", [authJwt.verifyToken], controller.list);
    app.post("/api/comment/create", [authJwt.verifyToken], controller.create);
    app.post("/api/comment/delete", [authJwt.verifyToken], controller.delete);
};