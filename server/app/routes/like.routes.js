const { authJwt } = require("../middleware");
const controller = require("../controllers/like.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/like/list", [authJwt.verifyToken], controller.list);
    app.post("/api/like/likepost", [authJwt.verifyToken], controller.likepost);
    app.post("/api/like/delete", [authJwt.verifyToken], controller.delete);
};