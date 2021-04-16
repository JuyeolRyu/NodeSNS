const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  console.log(decodeURIComponent(req.params.tag));
  try {
    const posts = await db.Post.findAll({
      include: [{
        model: db.HashTag,
        where: { name: decodeURIComponent(req.params.tag) },//한글,특수문자 주소를 표현해 주기 decodeURIComponent 사용
      },{ //게시글 작성자 정보
        model: db.User,
      }],
    });
    console.log(posts)
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;