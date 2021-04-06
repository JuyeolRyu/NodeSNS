const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password',
    }, async(userId,password,done) => {
        try{
            const user = await db.User.findOne({where: {userId}});
            if(!user){//사용자가 없으면
                //done(서버쪽에러,성공했을 경우에는 사용,로직에서 에러가 발생할경우)
                return done(null,false, {reason: '존재하지 않는 사용자입니다.'});
            }
            const result = await bcrypt.compare(password,user.password);
            if(result){
                return done(null,user);
            }
            return done(null,false,{reason:'비밀번호가 틀립니다.'});
        }catch(e){
            console.error(e);
            return done(e);
        }
    }));
}