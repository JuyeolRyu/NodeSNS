const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
    //프론트에서 쿠키를 보내면 서버에서 메모리 검사해서 쿠키와 연관된 id가있는지 보고 유저정보를 디비로 불러옴
    passport.serializeUser((user,done) => {//서버쪽에 [[id:3, cookie:'asdasda']] 를 서버에 저장(프론트에서는 쿠기사용)
        return done(null, user.id);
    });
    passport.deserializeUser(async(id,done)=> {
        try{
            const user = await db.User.findOne({
                where: {id},
            });
            return done(null,user);//req.user에 저장됨
        }catch(e){
            console.error(e);
            return done(e);
        }
    });

    local();//전략연결
}