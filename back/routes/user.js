const express = require('exoress');
const db = require('../models');
const router = express.Router();

router.get('/', (req,res) => {

});
router.post('/', async (req,res) => {
    try{
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.id,
            }
        });
    }catch(e){
        console.error(e);
    }
});
router.get('/:id', (req,res)=> {//:id는 req.params.id 로 가져올수 있다
    
})
router.post('/login', (req,res) => {

});
router.post('/logout', (req,res) => {

});
router.get('/:id/follow', (req,res) => {

});
router.post('/:id/follow', (req,res) => {

})
router.delete('/:id/follower', (req,res) => {
    
})
router.get('/:id/posts', (req,res) => {
    
})
module.exports = Router;