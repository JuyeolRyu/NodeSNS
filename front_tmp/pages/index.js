import React, {useEffect} from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch,useSelector} from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const {me} = useSelector((state)=> {return state.user});
    const {mainPosts} = useSelector((state) => {return state.post});
    const dispatch = useDispatch();

    return (
        <div>
            {me ? <div> {me.nickname}님이 접속중입니다.</div> : <div>로그아웃 했습니다.</div>}
            {me && <PostForm/>}
            {mainPosts.map((c)=>{
                //console.log(c);
                return(
                    <PostCard key={c} post={c}/>
                )
            })}
        </div>
    );
};
Home.getInitialProps = async (context) => {//app.js에서 넣어주는 ctx === context
    console.log(Object.keys(context));
    context.store.dispatch({
        type:LOAD_MAIN_POSTS_REQUEST,
    });
}
export default Home;