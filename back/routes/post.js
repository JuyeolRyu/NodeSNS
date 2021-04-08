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
                where:{name:tag.slice(1).toLowerCase},//slice ==> #때기, 영어는 소문자로
            })));
            console.log(result);
            await newPost.addHashtags(result.map(r=>r[0]));//addHashtags ==> 시퀄라이저가 만들어줌
        }
        //const User = await newPost.getUser();
        //newPost.User = User;
        //res.json(newPost);
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

module.exports = router;