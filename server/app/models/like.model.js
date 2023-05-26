module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {
        idpost: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        }
    });

    return Like;
};