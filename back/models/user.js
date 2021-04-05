module.exports = (sequelize, DataTypes)=> {
    const User = sequelize.define('User',{
        nickname:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique:true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull:false,
        }
    },{
        //한글 저장 가능하게 해준다
        charset: 'utf8',
        clooate: 'utf_general_cli',
    });
    User.associate = (db) => {
        //as 는 여러 관계를 구분할때 사용한다.
        db.User.hasMany(db.Post, {as: 'Post'});
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'});
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followers'});
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings'});
    };
    return User;
};
