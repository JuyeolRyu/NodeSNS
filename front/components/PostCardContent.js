import React from 'react';
import Link from 'next/link';
import propTypes from 'prop-types';

const PostCardContent = ({postData}) => {
    return (
        <div>
            {postData.split(/(#[^\s]+)/g).map((v) => {
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
    )
}

PostCardContent.propTypes = {
    postData: propTypes.string.isRequired,
};
export default PostCardContent;