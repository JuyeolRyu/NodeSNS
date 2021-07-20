module.exports = (sequelize, DataTypes)=> {
    const Post = sequelize.define('Post',{
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },{
        //한글 저장 가능하게 해준다
        charset: 'utf8mb4',
        clooate: 'utf8mb4-_general_cli',
    });
    Post.associate = (db) => {
        db.Post.hasMany(db.Image);
        db.Post.hasMany(db.Comment);
        db.Post.belongsTo(db.User);
        db.Post.belongsTo(db.Post, {as: 'Retweet'});
        db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'});
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    };
    return Post;
};