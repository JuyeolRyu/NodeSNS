import React, { useEffect,useCallback } from 'react';
import NicknameEditForm from '../components/NicknameEditForm';
import { Card, List,Input,Form,Button } from 'antd';
import { StopOutlined, UserDeleteOutlined } from '@ant-design/icons';
import {useDispatch,useSelector} from 'react-redux';
import { LOAD_FOLLOWERS_REQUEST,LOAD_FOLLOWINGS_REQUEST, REMOVE_FOLLOWER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Profile = () => {
    const dispatch = useDispatch();
    const {me,followerList,followingList} = useSelector(state => state.user);
    const {mainPosts} = useSelector(state => state.post);

    useEffect(()=>{
        if(me){
            dispatch({
                type:LOAD_FOLLOWERS_REQUEST,
                data: me.id,
            });
            dispatch({
                type:LOAD_FOLLOWINGS_REQUEST,
                data: me.id,
            });
            dispatch({
                type:LOAD_USER_POSTS_REQUEST,
                data: me.id,
            });
        }
    },[me && me.id]);

    const onUnfollow = useCallback(userId=>()=>{
        dispatch({
            type:UNFOLLOW_USER_REQUEST,
            data: userId,
        })
    },[]);
    const onRemoveFollower = useCallback(userId=>()=>{
        dispatch({
            type:REMOVE_FOLLOWER_REQUEST,
            data: userId,
        })
    },[]);
    return (
        <div>
            <NicknameEditForm/>
            
            <List
                style ={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button style={{width:'100%'}}>더보기</Button></div>}
                bordered
                dataSource= {followingList}
                renderItem={ (item)=>(
                    <List.Item style={{marginTop: '20px'}}>
                        <Card actions={[<StopOutlined key="stop" onClick={onUnfollow(item.id)}/>]}>
                            <Card.Meta description={item.nickname}/>
                        </Card>
                    </List.Item>
                )}
            />
            <List
                style ={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button style={{width:'100%'}}>더보기</Button></div>}
                bordered
                dataSource= {followerList}
                renderItem={ (item)=>(
                    <List.Item style={{marginTop: '20px'}}>
                        <Card actions={[<StopOutlined key="stop" onClick={onRemoveFollower(item.id)}/>]}>
                            <Card.Meta description={item.nickname}/>
                        </Card>
                    </List.Item>
                )}
            />
            <div>
                {mainPosts.map(c=> (
                    <PostCard key={+c.createdAt} post={c}/>
                ))}
            </div>
        </div>
    );
    
};

export default Profile;