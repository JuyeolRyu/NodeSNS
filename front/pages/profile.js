import React from 'react';
import NicknameEditForm from '../components/NicknameEditForm';
import { Card, List,Input,Form,Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const Profile = () => {
    return (
        <div>
            <NicknameEditForm/>
            
            <List
                style ={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button style={{width:'100%'}}>더보기</Button></div>}
                bordered
                dataSource= {[{nickname:'코몽'},{nickname:'몽키'},{nickname:'노드SNS'}]}
                renderItem={ (item)=>(
                    <List.Item style={{marginTop: '20px'}}>
                        <Card actions={[<StopOutlined key="stop"/>]}>
                            <Card.Meta description={item.nickname}/>
                        </Card>
                    </List.Item>
                )}
            />
            <List
                style ={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button style={{width:'100%'}}>더보기</Button></div>}
                bordered
                dataSource= {[{nickname:'코몽'},{nickname:'몽키'},{nickname:'노드SNS'}]}
                renderItem={ (item)=>(
                    <List.Item style={{marginTop: '20px'}}>
                        <Card actions={[<StopOutlined key="stop"/>]}>
                            <Card.Meta description={item.nickname}/>
                        </Card>
                    </List.Item>
                )}
            />
            <div>프로필</div>
        </div>
    );
    
};

export default Profile;