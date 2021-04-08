const express = require('express');
const bycrypt = require('bcrypt');
const db = require('../models');
const passport = require('passport');

const router = express.Router();

router.get('/', async (req,res) => {
    if(!req.user){
        return res.status(401).send('로그인이 필요합니다.')
    }
    const fullUser = await db.User.findOne({
        where: {id: req.user.id},
        include:[{
            model:db.Post,
            as: 'Posts',
        },{//비밀번호 빼고 보내기
            model:db.User,
            as: 'Followings',
            attributes: ['id'],
        },{
            model: db.User,
            as: 'Followers',
            attributes: ['id'],
        }],
        attributes:['id','nickname','userId'],
    });
    // const filtereduser = Object.assign({},user.dataValues);
    // console.log(filtereduser);
    // delete filtereduser.password;//패스워드가 프론트에 보여지면 안되므로 제거해준다.
    return res.json(fullUser);//프론트에 사용자 정보 보내줌

    const user = Object.assign({},req.user);
    delete user.password;
    return res.json(req.user);
});
router.post('/', async (req,res,next) => {//회원가입
    try{
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.userId,
            }
        });

        if(exUser){
            return res.send('이미 사용중인 아이디입니다.')
        }

        const hashedPassword = await bycrypt.hash(req.body.password,12);
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        console.log(newUser);
        //서버로 리턴
        return res.json(newUser);
    }catch(e){
        console.error(e);
        //에러처리
        return next(e);
    }
});
router.get('/:id', (req,res)=> {//:id는 req.params.id 로 가져올수 있다
    
})
router.post('/login',(req,res, next) => {
    passport.authenticate('local',(err,user,info)=> {//done의 첫번째,두번째,세번째 인자
        console.log(err,user,info)
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr)=> {
            try{
                if(loginErr){
                    return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where: {id: user.id},
                    include:[{
                        model:db.Post,
                        as: 'Posts',
                    },{//비밀번호 빼고 보내기
                        model:db.User,
                        as: 'Followings',
                        attributes: ['id'],
                    },{
                        model: db.User,
                        as: 'Followers',
                        attributes: ['id'],
                    }],
                    attributes:['id','nickname','userId'],
                });
                // const filtereduser = Object.assign({},user.dataValues);
                // console.log(filtereduser);
                // delete filtereduser.password;//패스워드가 프론트에 보여지면 안되므로 제거해준다.
                return res.json(fullUser);//프론트에 사용자 정보 보내줌
            }catch(e){
                next(e);
            }
            
        });
    })(req,res,next);
});
router.post('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.send('logout성공');
});
router.get('/:id/follow', (req,res) => {

});
router.post('/:id/follow', (req,res) => {

})
router.delete('/:id/follower', (req,res) => {
    
})
router.get('/:id/posts', (req,res) => {
    
})
module.exports = router;