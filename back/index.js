const express = require('express');
const morgan = require('morgan');
const cors = require('cors');//다른 서버에서 들어온 요청을 처리할수 있도록 해주는 모듈
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

const passportConfig = require('./passport');
const db = require('./models');

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();//passport 전략 여기서 연결

app.use(morgan('dev'));//요청 들어오면 동작
app.use('/',express.static('uploads'));//uploads 폴더 안에 서버가 접근해서 가져갈수 있도록 함(uploads == 루트폴더로 생각하겠다)
app.use(express.json());//json 형식의 본문 처리
app.use(express.urlencoded({extended: true}));//form으로 넘어온 데이터 처리
app.use(cors({
    origin: true,//이 주소에서의 접근 허락(true 이면 모두 허락)
    credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    //위의 두가지 속성은 무조건 포함
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,//쿠키 암호화
    cookie: {
        httpOnly: true,//쿠키에 자바스크립트로 접근 못하게
        secure: false,//https를 사용할때 true로 바꿔준다
    },
    name:'rnbck',
}));
app.use(passport.initialize());//passport 는 express-session보다 아래에 적어줘야 한다.
app.use(passport.session());//passport 내부에서 express-session을 사용하기 때문에

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/hashtag',hashtagAPIRouter);

app.get('/', (req,res)=> {
    res.send('hello server realtime');
});
app.get('/about',(req,res)=> {
    res.send('hello i am about');
});
app.listen(3065,()=>{
    console.log('server is running on localhost:8080');
});