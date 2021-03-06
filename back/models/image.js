module.exports = (sequelize, DataTypes)=> {
    const Image = sequelize.define('Image',{
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    },{
        charset: 'utf8',
        clooate: 'utf8_general_cli',
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
};