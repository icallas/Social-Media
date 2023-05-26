const db = require("../models");
const Like = db.like;

exports.likepost = async (req, res) => {
    try {
        const like = await Like.create({
            idpost: req.body.idpost,
            username: req.body.username
        });
        res.send(JSON.stringify(like))
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.list = async (req, res) => {
    const like = await Like.findAll({
        attributes: ['id', 'idpost', 'username']
    });
    res.send(JSON.stringify(like))
};

exports.delete = async (req, res) => {
    Like.destroy({
        where: { id: req.body.id }
    })
    res.send("like removed")
}