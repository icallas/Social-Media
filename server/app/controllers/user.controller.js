const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content")
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content");
};

exports.adminBoard = async (req, res) => {
  const user = await User.findAll({
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["name"],
        through: {
          attributes: [],
        }
      }
    ]
  });
  res.send(JSON.stringify(user))
};

exports.getUser = async (req, res) => {
  const user = await User.findAll({
    where: {
      username: req.body.username
    }
  });
  res.send(JSON.stringify(user))
}

exports.getUserList = async (req, res) => {
  const user = await User.findAll(
    {
      attributes: ["username", "picture"]
    }
  );
  res.send(JSON.stringify(user))
}

exports.updateUser = async (req, res) => {
  const user = User.update(
    {
      picture: req.body.picture
    },
    {
      where: { username: req.body.username }
    }
  )
  res.send("user updated")
}