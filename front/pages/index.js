import { Input,Form,Button, Card,Icon,Avatar} from 'antd';
import React from 'react';

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
            {dummy.isLoggedIn && <Form style={{marginBottom: 20}} encType="multipart/form-data">
                <Input.TextArea maxLength={140} placeholder="어떤일이 있었나요?" />
                <div>
                    <Input type="file" multiple hidden />
                    <Button>이미지 업로드</Button>
                    <Button type="primary" style={{float: 'right'}} htmlType="submit">짹짹</Button>
                </div>
                <div>
                    {dummy.imagePaths.map((v,i)=>{
                        return(
                            <div key={v} style={{display: 'inline-block'}}>
                                <img src={'http://localhost:3000/'+v} style={{width:'200px'}} alt={v} />
                                <div>
                                    <Button>제거</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Form>}
            {dummy.mainPosts.map((c)=>{
                return(
                    <Card
                        key={+c.createdAt}
                        cover={c.img && <img alt="example" src={c.img} />}
                        actions={[
                            <Icon type="retweet" key="retweet" />,
                            <Icon type="heart" key="heart" />,
                            <Icon type="message" key="message" />,
                            <Icon type="eclipsis" key="eclipsis" />,
                        ]}
                        extra={<Button>팔로우</Button>}
                    >
                        <Card.Meta
                            avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                            title={c.User.nickname}
                            description={c.content}
                        />
                    </Card>
                )
            })}
        </div>
    );
};

export default Home;