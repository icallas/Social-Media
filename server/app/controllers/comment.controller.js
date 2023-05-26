const db = require("../models");
const Comment = db.comment;

exports.create = async (req, res) => {
    try {
        const comment = await Comment.create({
            idpost: req.body.idpost,
            username: req.body.username,
            content: req.body.content
        });

        if (req.body.content) {
            res.send({ message: req.body.content })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.list = async (req, res) => {
    const comment = await Comment.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    res.send(JSON.stringify(comment))
};

exports.delete = async (req, res) => {
    Comment.destroy({
        where : { id: req.body.id }
    })
    res.send("post deleted")
}