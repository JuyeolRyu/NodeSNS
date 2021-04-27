import React,{useState,useCallback,useEffect} from 'react';
import Link from 'next/link';
import {Card,Button,Avatar, Input,Form,List,Comment} from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS,ADD_COMMENT_FAILURE, LOAD_COMMENTS_REQUEST} from '../reducers/post';

const PostCard = ({post}) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me} = useSelector(state=>state.user);
    const {CommentAdded,isAddingComment} = useSelector(state=>state.post);
    const dispatch = useDispatch();

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
        if(!commentFormOpened){
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: post.id,
            });
        }
    },[]);

    const onSubmitComment =useCallback((e) => {
        //e.preventDefault();
        if(!me){
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type:ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content:commentText,
            }
        });
    },[me && me.id, commentText]);

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
                //href={'user/${post.User.id}'} ==> 이건 서버딴에서 렌더링 되므로 전체 페이지가 렌더링 된다.
                //프론트에서 처리 가능하도록 아래처럼 변경
                avatar={(
                    <Link href={{pathname: '/user', query: {id: post.User.id}}} as={'user/${post.User.id}'}>
                        <a><Avatar>{post.User.nickname}</Avatar></a>
                    </Link>
                )}
                title={post.User.nickname}
                description={
                    <div>
                        {post.content.split(/(#[^\s]+)/g).map((v) => {
                            if(v.match(/(#[^\s]+)/g)){
                                return(
                                    //href={`/hashtag/${v.slice(1)}`}
                                    <Link href={{pathname:'/hashtag', query: {tag:v.slice(1)}}} as={`/hashtag/${v.slice(1)}`} key={v}>
                                        <a>{v}</a>
                                    </Link>
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
                        renderItem={item => {
                            console.log(item);
                            (
                            
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={(
                                        <Link href={{pathname:'/user', query:{id:item.User.id}}} as={`/user/${item.User.id}`}>
                                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                                        </Link>
                                    )}
                                    content={item.content}
                                />
                            </li>
                        )}}
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
        createdAt: propTypes.string,
    })
}
export default PostCard;