import React from 'react';
import {Card,Button,Avatar} from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
const dummy={
    isLoggedIn: true,
    imagePaths:[],
    mainPosts:[{
        User:{
            id:1,
            nickname:'코몽',
        },
        content:'첫번째 게시물',
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8o9EBlf1ZD0lBbJfUcC6wRJDcMZTw8oVQA&usqp=CAU',
    }],
}
const PostCard = ({post}) => {
    return(
        <Card
            key={+post.createdAt}
            cover={post.img && <img alt="example" src={post.img} />}
            actions={[
                <RetweetOutlined key="retweet" />,
                <HeartOutlined key="heart" />,
                <MessageOutlined key="message" />,
                <EllipsisOutlined key="eclipsis" />,
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={post.content}
            />
        </Card>
    )
}

PostCard.propTypes = {
    post: propTypes.shape({
        User: propTypes.object,
        content: propTypes.string,
        img: propTypes.string,
        createdAt: propTypes.object,
    })
}
export default PostCard;