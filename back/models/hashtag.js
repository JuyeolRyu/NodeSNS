module.exports = (sequelize, DataTypes)=> {
    const HashTag = sequelize.define('HashTag',{
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },{
        charset: 'utf8mb4',
        clooate: 'utf8mb4_general_cli',
    });
    HashTag.associate = (db) => {
        //다대다 관계 중간에 테이블이 하나 생긴다.
        db.HashTag.belongsToMany(db.Post,{through: 'PostHashTag'});
    };
    return HashTag;
};