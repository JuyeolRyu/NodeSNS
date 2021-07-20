import React,{useState,useCallback,useEffect} from 'react';
import Link from 'next/link';
import {Card,Button,Avatar, Input,Form,List,Comment} from 'antd';
import { RetweetOutlined, HeartTwoTone,HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';
import propTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {ADD_COMMENT_REQUEST,LOAD_COMMENTS_REQUEST,LIKE_POST_REQUEST,UNLIKE_POST_REQUEST, RETWEET_REQUEST} from '../reducers/post';
import {FOLLOW_USER_REQUEST,UNFOLLOW_USER_REQUEST} from '../reducers/user';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';

const PostCard = ({post}) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me} = useSelector(state=>state.user);
    const {CommentAdded,isAddingComment} = useSelector(state=>state.post);
    const dispatch = useDispatch();

    const liked = me && post.Likers && post.Likers.find(v=> v.id ===me.id);
    setTwoToneColor('#eb2f96');
    getTwoToneColor(); // #eb2f96

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

    const onToggleLike = useCallback(() => {
        if(!me){
            return alert('로그인이 필요합니다');
        }
        if(liked){//좋아요 누른 상태
            dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id,
            });
        }else{//누르지 않은 상태
            dispatch({
                type: LIKE_POST_REQUEST,
                data: post.id,
            });
        }
    },[me && me.id, post && post.id,liked]);

    const onRetweet = useCallback(()=>{
        if(!me){
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        })
    },[me && me.id, post.id]);

    const onFollow = useCallback(userId => () => {
        dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId
        })
    },[]); 
    const onUnfollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId
        })
    },[]);
    return(
        <div>
        <Card
            key={+post.createdAt}
            cover={post.Images && post.Images[0] && <PostImages images={post.Images}/>}
            actions={[ 
                <RetweetOutlined key="retweet" onClick={onRetweet}/>,
                liked
                ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                : <HeartOutlined key="heart" onClick={onToggleLike} />,
                <MessageOutlined key="message" onClick={onToggleComment}/>,
                <EllipsisOutlined key="eclipsis" />,
            ]}
            title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
            extra={!me || post.User.id === me.id //로그인을 안했거나 나의 게시물일 경우
                ? null
                : me.Followings && me.Followings.find(v=>v.id === post.User.id)//이미 팔로잉 하고 있는 경우
                ?<Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
                :<Button onClick={onFollow(post.User.id)}>팔로우</Button>
            }
        >
            {post.RetweetId && post.Retweet
            ? (
                <Card
                    cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
                >
                    <Card.Meta
                        avatar={(
                            <Link href={{pathname: '/user', query: {id: post.Retweet.User.id}}} as={`user/${post.Retweet.User.id}`}>
                                <a><Avatar>{post.Retweet.User.nickname}</Avatar></a>
                            </Link>
                        )}
                        title={post.User.nickname}
                        description={<PostCardContent postData={post.Retweet.content}/>}
                    />
                </Card>
            )
            : (
                <Card.Meta
                    //href={'user/${post.User.id}'} ==> 이건 서버딴에서 렌더링 되므로 전체 페이지가 렌더링 된다.
                    //프론트에서 처리 가능하도록 아래처럼 변경
                    avatar={(
                        <Link href={{pathname: '/user', query: {id: post.User.id}}} as={'user/${post.User.id}'}>
                            <a><Avatar>{post.User.nickname}</Avatar></a>
                        </Link>
                    )}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content}/>}
                />
            )}
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
                                    avatar={(
                                        <Link href={{pathname:'/user', query:{id:item.User.id}}} as={`/user/${item.User.id}`}>
                                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                                        </Link>
                                    )}
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
        createdAt: propTypes.string,
    })
}
export default PostCard;