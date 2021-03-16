import React, { useCallback } from 'react';
import {Card,Avatar, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
    const {user} = useSelector((state)=>{return state.user});
    const dispatch = useDispatch();
    //자식 컴포넌트에 props로 전달하기 위해 useCallback 사용
    const onLogout = useCallback(()=>{
        dispatch(logoutAction);
    },[]);
    return(
        <Card
            actions={[
                <div key="twit">짹짹<br />{user.Posts.length}</div>,
                <div key="following">팔로잉<br />{user.Followings.length}</div>,
                <div key="follower">팔로워<br />{user.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar = {<Avatar>{user.nickname[0]}</Avatar>}
                title = {user.nickname} 
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;