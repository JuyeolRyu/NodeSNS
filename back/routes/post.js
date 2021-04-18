const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/', async (req,res,next) => {
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
router.post('/images', (req,res) => {

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
        res.json(comments);
    }catch(e){
        console.error(e);
        next(e);
    }
})

router.post('/:id/comment', async(req,res,next) => {
    try{
        if(!req.user){
            return res.status(401).send('로그인이 필요합니다.');
        }
        const post = await db.Post.findOne({where: {id: req.params.id}});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            User: req.user.id,
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