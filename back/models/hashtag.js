module.exports = (sequelize, DataTypes)=> {
    const Hashtag = sequelize.define('Hashtag',{
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },{
        charset: 'utf8mb4',
        clooate: 'utf8mb4_general_cli',
    });
    Hashtag.associate = (db) => {
        //다대다 관계 중간에 테이블이 하나 생긴다.
        db.Hashtag.belongsToMany(db.Post,{through: 'PostHashtag'});
    };
    return Hashtag;
};