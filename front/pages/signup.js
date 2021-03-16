import React,{useState,useCallback} from 'react';
import Head from 'next/head';
import {Form,Input,Checkbox,Button} from 'antd';
import AppLayout from '../components/AppLayout';
import { useDispatch } from 'react-redux';
const dispatch = useDispatch();

/* 반복되는 useState와 이벤트리스너를 줄여주기 위해서 커스텀 훅 사용한다. 
    다른 곳에서 재사용하기 위해서 export
*/
export const useInput = (initValue=null) => {
    const [value,setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    },[]);
    return [value,handler];
}
const SingUp = () => {
    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    /* 커스텀훅으로 처리 안되는 useState */
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);

    const onSubmit = useCallback((e) =>{
        /* 제출 버튼 클릭시 실행되는 이벤트리스너 
           password와 passwordCheck가 일치하지 않을 경우 패스워드 에러 반환
           동의 체크안했을 경우 에러 반환
        */
        e.preventDefault();
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        /* useCallback을 사용하면 아래의 dependency들이 변경될때  이벤트리스너함수가 재생성된다
           함수 내부에서 사용되는 state를 dependency에 넣어주면 된다.
        */
       dispatch(signUpAction({
           id,
           password,
           nick,
       }));
    },[password,passwordCheck,term]);

    const onChangePasswordCheck = useCallback((e) =>{
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value)
    },[password]);
    const onChangeTerm = useCallback((e) =>{
        setTermError(false);
        setTerm(e.target.checked)
    },[]);

    return(
        <Form onSubmit={onSubmit} style={{padding:10}}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} required onChange={onChangeId}></Input>
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label>
                <br/>
                <Input name="user-nick" value={nick} required onChange={onChangeNick}></Input>
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" type="password" value={password} required onChange={onChangePassword}></Input>
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호체크</label>
                <br/>
                <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}></Input>
                {passwordError && <div style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>}
            </div>
            <div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                {termError && <div style={{color: 'red'}}>약관에 동의하셔야 합니다.</div>}
            </div>
            <div>
                <div style={{marginTop:10}}></div>
                <Button type="primary" htmlType="submit">가입하기</Button>
            </div>
        </Form>
    )
};

export default SingUp;