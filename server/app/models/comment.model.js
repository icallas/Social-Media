module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        idpost: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        }
    });

    return Comment;
};