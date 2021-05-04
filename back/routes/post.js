const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');
const { isLoggedIn } = require('./middleware');
const router = express.Router();

router.post('/', isLoggedIn, async (req,res,next) => {
    try{
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag=>db.HashTag.findOrCreate({//없으면 만들고 있으면 찾고
                where:{ name : tag.slice(1).toLowerCase() },//slice ==> #때기, 영어는 소문자로
            })));
            console.log(result);
            await newPost.addHashTags(result.map(r=>r[0]));//addHashtags ==> 시퀄라이저가 만들어줌
        }
        console.log('post 했음');

        const fullPost = await db.Post.findOne({
            where: {id: newPost.id},
            include: [{
                model:db.User,
            }],
        });
        res.json(fullPost);
    }catch(e){
        console.error(e);
        next(e);
    }
});
//multer 미들웨어 업로드 설정
const upload = multer({
    storage: multer.diskStorage({//저장 위치 설정하는 속성 diskStorage===디스크, 이외에도 클라우드도 있다
        destination(req,file,done){//저장위치 설정
            done(null,'uploads');
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname,ext); //img.png 일 경우 ext === png, basename===img
            done(null,basename+new Date().valueOf() + ext);
        },
    }),
    limits: {fileSize: 20*1024*1024},//파일 크기 제한(공격방지)
})
router.post('/images', upload.array('image'), (req,res) => {//이미지 여러장 올릴 경우를 위해 .array사용
    console.log(req.files);
    res.json(req.files.map(v => v.filename));
});

router.get('/:id/comments', async(req,res,next) => {
    try{
        const post = await db.Post.findOne({where: {id: req.params.id}});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
            },
            order: [['createdAt','ASC']],
            include: [{
                model: db.User,
                attributes:['id', 'nickname'],
            }],
        });
        console.log(comments);
        res.json(comments);
    }catch(e){
        console.error(e);
        next(e);
    }
})

router.post('/:id/comment', isLoggedIn, async(req,res,next) => {
    try{
        const post = await db.Post.findOne({where: {id: req.params.id}});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        await post.addComment(newComment.id);//댓글과 post 이어 주기
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },
            include: [{
                model: db.User,
                attributes:['id','nickname'],
            }],
        });
        return res.json(comment);
    }catch(e){
        console.log("err");
        console.error(e);
        return next(e);
    }
})

module.exports = router;