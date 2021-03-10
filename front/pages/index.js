import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

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

const Home = () => {
    return (
        <div>
            {dummy.isLoggedIn && <PostForm/>}
            {dummy.mainPosts.map((c)=>{
                return(
                    <PostCard key={c} post={c}/>
                )
            })}
        </div>
    );
};

export default Home;