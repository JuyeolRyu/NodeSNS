export const initialState = {
    mainPosts: [{
        User:{
            id:1,
            nickname:'코몽',
        },
        content:'첫번째 게시물',
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8o9EBlf1ZD0lBbJfUcC6wRJDcMZTw8oVQA&usqp=CAU',
    }],
    imagePaths:[],
};

const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

export const addPost = {
    type:ADD_POST,
};
const dummyPost = {
    content: 'HELLO',
    userID: 1,
    User: {
        nickname: '코몽',
    },
}
/*
const addDummy = {
    type:ADD_DUMMY,
    data: {
        content: 'HELLO',
        userID: 1,
        User: {
            nickname: '코몽',
        },
    },
};
*/
const reducer = (state = initialState,action) => {
    switch(action.type){
        case ADD_POST:{
            return{
                /* 스프레드 문법
                리액트는 state가 변화한것을 기준으로 리렌더링하게 된다. 하지만 참조하는 객체가 같으면 리렌더링하지 않음
                따라서 새롭게 객체를 만들어줘서 리렌더링 될수있도록 하는 것
                너무 많이 쓰면 가독성 떨어짐
                */
                ...state,
                mainPosts:[dummyPost, ...state.mainPosts],
                postAdded: true,
            };
        }/*
        case ADD_DUMMY:{
            return{
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            }
        }*/
        default:{
            return{
                ...state,
            };
        }
    }
}

export default reducer;