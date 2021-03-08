import React from 'react';
import Link from 'next/link';
import propTypes from 'prop-types';
import {Menu,Input,Button,Row, Col,Card,Avatar} from 'antd';
import LoginForm from './LoginForm';

const dummy = {
    nickname:'코몽',
    Post:[],
    Followings:[],
    Followers:[],
    isLoggedIn:false,
}
const AppLayout = ({children}) =>{
    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{verticalAlign: 'middle'}}/>
                </Menu.Item>
            </Menu>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            <Row gutter={10}>
                {/* 반응형 디지안 xd==작은화면 md==넓은 화면
                    24면 한칸 전부 차지, 12면 절반, 6이면 1/4
                */}
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn
                    ?<Card
                        actions={[
                            <div key="twit">짹짹<br />{dummy.Post.length}</div>,
                            <div key="following">팔로잉<br />{dummy.Followings.length}</div>,
                            <div key="follower">팔로워<br />{dummy.Followers.length}</div>,
                        ]}
                    >
                        <Card.Meta
                            avatar = {<Avatar>{dummy.nickname[0]}</Avatar>}
                            title = {dummy.nickname} 
                        />
                    </Card>
                    :<LoginForm/>
                    }
                </Col>
                <Col xs={24} md={12}>
                {children}
                </Col>
                <Col xs={24} md={6}>
                   
                </Col> 
            </Row>
        </div>
    );
};
AppLayout.propTypes= {
    children: propTypes.node,
}
export default AppLayout;