import React,{useState,useCallback,useEffect} from 'react';
import Link from 'next/link';
import {Card,Button,Avatar, Input,Form,List,Comment} from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS,ADD_COMMENT_FAILURE} from '../reducers/post';

const PostCard = ({post}) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me} = useSelector(state=>state.user);
    const {CommentAdded,isAddingComment} = useSelector(state=>state.post);
    const dispatch = useDispatch();

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
    });

    const onSubmitComment =useCallback((e) => {
        //e.preventDefault();
        if(!me){
            return alert('로그인이 필요합니다.');
        }
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data: {
                postId:post.id,
            }
        });
    },[me && me.id]);

    useEffect(()=>{
        setCommentText('');
    },[CommentAdded === true])

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value)
    },[]);

    return(
        <div>
        <Card
            key={+post.createdAt}
            cover={post.img && <img alt="example" src={post.img} />}
            actions={[
                <RetweetOutlined key="retweet" />,
                <HeartOutlined key="heart" />,
                <MessageOutlined key="message" onClick={onToggleComment}/>,
                <EllipsisOutlined key="eclipsis" />,
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname}</Avatar>}
                title={post.User.nickname}
                description={
                    <div>
                        {post.content.split(/(#[^\s]+)/g).map((v) => {
                            if(v.match(/(#[^\s]+)/g)){
                                return(
                                    <Link href={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                                )
                            }
                            return v;
                        })}
                    </div>
                }//해시태그 링크는 Link태그로 사용
            />
        </Card>
            {/* 댓글 입력창 댓글리스트 */}
            {commentFormOpened && (
                <>
                    <Form onFinish={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={`${post.Comments ? post.Comments.length: 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
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