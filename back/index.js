const express = require('express');
const db = require('./models');
const app = express();
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
db.sequelize.sync();

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.get('/', (req,res)=> {
    res.send('hello server realtime');
});
app.get('/about',(req,res)=> {
    res.send('hello i am about');
});
app.listen(8080,()=>{
    console.log('server is running on localhost:8080');
});