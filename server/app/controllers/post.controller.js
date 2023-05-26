const db = require("../models");
const Post = db.post;

exports.create = async (req, res) => {
    try {
        const post = await Post.create({
            username: req.body.username,
            content: req.body.content,
            filename: req.body.filename
        });

        if (req.body.content) {
            res.send({ message: req.body.content })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    Post.destroy({
        where : { id: req.body.id }
    })
    res.send("post deleted")
}

exports.list = async (req, res) => {
    const post = await Post.findAll({
        order:[
            ['id', 'DESC']
        ]
    });
    res.send(JSON.stringify(post))
};

exports.userlist = async (req, res) => {
    const post = await Post.findAll({
        where: { username: req.body.username },
        order:[
            ['id', 'DESC']
        ]
    });
    res.send(JSON.stringify(post))
};