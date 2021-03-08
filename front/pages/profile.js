import React from 'react';
import { Card, List,Input,Form,Icon,Button } from 'antd';

const Profile = () => {
    return (
        <div>
            <Form style ={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}}>
                <Input addonBefore="닉네임"/>
                <Button type="primary">수정</Button>
            </Form>
            <List
                style ={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{width:'100%'}}>더보기</Button>}
                bordered
                dataSource={['코몽','몽키','노드SNS']}
                renderItem={item=>{
                    <List.Item style={{marginTop: '20px'}}>
                        <Card action={[<Icon type="stop"/>]}><Card.Meta description={item}/></Card>
                    </List.Item>
                }}
            />
            <List
                style ={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{width:'100%'}}>더보기</Button>}
                bordered
                dataSource={['코몽','몽키','노드SNS']}
                renderItem={item=>{
                    <List.Item style={{marginTop: '20px'}}>
                        <Card action={[<Icon type="stop"/>]}><Card.Meta description={item}/></Card>
                    </List.Item>
                }}
            />
            <div>프로필</div>
        </div>
    );
    
};

export default Profile;