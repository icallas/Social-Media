module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        username: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        }
    });

    return Post;
};