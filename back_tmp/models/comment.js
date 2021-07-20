module.exports = (sequelize, DataTypes)=> {
    const Comment = sequelize.define('Comment',{
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },{
        charset: 'utf8mb4',
        clooate: 'utf8mb4_general_cli',
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
};