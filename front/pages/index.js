import React, {useEffect} from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch,useSelector} from 'react-redux';
import {loginAction,logoutAction} from '../reducers/user';

const Home = () => {
    /* 액션을 dispatch 해보는 코드 
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loginAction);
        dispatch(logoutAction);
        dispatch(loginAction);
    },[]);*/
    const {me,isLoggedIn} = useSelector((state)=> {return state.user});
    const {mainPosts} = useSelector((state) => {return state.post});
    const dispatch = useDispatch();
    /*
    useEffect(()=>{
        dispatch({
            type: 'HELLO_SAGA',
        })
        dispatch({
            type: 'HELLO_SAGA',
        })
        dispatch({
            type: 'HELLO_SAGA',
        })
    },[]);*/
    return (
        <div>
            {isLoggedIn ? <div> {me.nickname}님이 접속중입니다.</div> : <div>로그아웃 했습니다.</div>}
            {isLoggedIn && <PostForm/>}
            {mainPosts.map((c)=>{
                return(
                    <PostCard key={c} post={c}/>
                )
            })}
        </div>
    );
};

export default Home;