import React,{useEffect} from 'react';
import propTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import { LOAD_USER_POSTS_REQUEST} from '../../front/reducers/post';
import PostCard from '../components/PostCard';
import {Card,Avatar} from 'antd';
import { LOAD_USER_REQUEST } from '../reducers/user';

const User = ({id}) => {
    const {mainPosts} = useSelector(state=> state.post);
    const {userInfo} = useSelector(state=> state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
            data: id,
        })
        dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: id,
        })
    },[]);
    return(
        <div>
            {userInfo
                ? (
                    <Card
                    actions={[
                        <div key="twit">짹짹<br/>{me.Posts.length}</div>,
                        <div key="following">팔로잉<br/>{me.Followings.length}</div>,
                        <div key="follower">팔로워<br/>{me.Followers.length}</div>,
                    ]}>
                        <Card.Meta 
                            avatar = {<Avatar>{userInfo.nickname[0]}</Avatar>}
                            title={userInfo.nickname}
                        />
                    </Card>
                )
                : null}
            {mainPosts.map(c=> (
                <PostCard key={+c.createdAt} post={c}/>
            ))}
        </div>
    );
};
User.propTypes = {
    id: propTypes.number.isRequired,
}
User.getInitialProps = async(context) => {//가장 먼저 실행된다. 서버와 프론트 둘다에서 실행된다.
    console.log('User getInitialProps', context.query.id);//서버에서 데이터 받아오기
    return {id: parseInt(context.query.id, 10)};//현재 컴포넌트의 User = ({id}) props 로 넘어가게 된다
}
export default User;