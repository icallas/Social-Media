const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
require("dotenv").config();

global.__basedir = __dirname;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "icallas-cookie-session",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true
  })
);

/*
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
*/

app.get("/", (req, res) => {
  res.json({ message: "Welcome to icallas application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/like.routes')(app);
require('./app/routes/comment.routes')(app);
require('./app/routes/file.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}
*/