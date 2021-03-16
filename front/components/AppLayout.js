import React from 'react';
import Link from 'next/link';
import propTypes from 'prop-types';
import {Menu,Input,Row,Col} from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import {useSelector} from 'react-redux';
const AppLayout = ({children}) =>{
    const {isLoggedIn} = useSelector((state)=>{return state.user});
    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{verticalAlign: 'middle'}}/>
                </Menu.Item>
            </Menu>
            <Row gutter={10}>
                {/* 반응형 디지안 xd==작은화면 md==넓은 화면
                    24면 한칸 전부 차지, 12면 절반, 6이면 1/4
                */}
                <Col xs={24} md={6}>
                    {isLoggedIn
                        ?<UserProfile/>
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