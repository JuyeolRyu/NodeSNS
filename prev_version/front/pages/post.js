import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import {LOAD_POST_REQUEST} from '../reducers/post';
import Helmet from 'react-helmet';
import { backurl } from '../config/config';

const Post = ({ id }) => {
    const { singlePost } = useSelector(state => state.post);
    return(
        <>
            {/* 검색엔진이 가져갈수 있도록 Helmet사용 */}
            <Helmet
                title={`${singlePost.User.nickname}님의 글`}
                description={singlePost.content}
                meta={[{
                    name: 'description', content: singlePost.User.content,
                },{
                    property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`,
                },{
                    property: 'og:description', content: singlePost.content,
                },{
                    property: 'og: image', content: singlePost.Images[0] ? singlePost.Images[0].src : 'http://homedev.ml/favicon.ico',
                },{
                    property: 'og:url', content: `http://homedev.ml/post/${id}`,
                }]}
            />
            <div>{singlePost.content}</div>
            <div>{singlePost.User.nickname}</div>
            <div>
                {singlePost.Images[0] && <img src={singlePost.Images[0].src} />}
            </div>
        </>
    );
};
Post.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.query.id,
    });
    return { id:parseInt(context.query.id, 10)};
};

Post.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Post;