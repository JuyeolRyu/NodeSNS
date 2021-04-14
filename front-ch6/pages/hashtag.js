import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST} from '../../front/reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({tag}) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state=> state.post);
    useEffect(() => {
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag,
        })
    },[]);
    return(
        <div>
            {mainPosts.map(c=> (
                <PostCard key={+c.createdAt} post={c}/>
            ))}
        </div>
    );
};
Hashtag.PropTypes = {
    tag: PropTypes.string.isRequired,
};
Hashtag.getInitialProps = async(context) => {//가장 먼저 실행된다. 서버와 프론트 둘다에서 실행된다.
    console.log('hashtag getInitialProps', context.query.tag);
    return {tag: context.query.tag};
};
export default Hashtag;