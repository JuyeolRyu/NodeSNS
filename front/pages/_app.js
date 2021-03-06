import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import withRedux from "next-redux-wrapper";
import createSagaMiddleware from 'redux-saga';

import AppLayout from '../components/AppLayout'
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers';
import rootSaga from '../sagas';
import { initialState } from '../reducers/user';
/*헤더와 AppLayout 부분은 중복되는 부분이므로 렌더링을 줄이기 위해 next에서 제공하는 _app.js를 사용한다.
   _app.js 는 props로 Component를 받는데 이부분에 각각의 페이지 마다 다르게 적용될 부분이 들어간다.
*/

const NodeBird = ({Component,pageProps }) => {
    return (
        <>
            <Head>
                <link
                rel="stylesheet"
                type="text/css"
                charset="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.13.0/antd.compact.min.css" integrity="sha512-1hNNMQk/NM85FLhT2Rxal0CPnh0nw5hD12uXml/dS6APxgUXEHpZY6UN8XJ3lTvssxNAjf2vGnqsnLwEtwaJyA==" crossOrigin="anonymous" />
            </Head>
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </>
    );
};
NodeBird.propTypes = {
    Component: propTypes.elementType.isRequired,
    store: propTypes.object,
    pageProps: propTypes.object.isRequired,
}
NodeBird.getInitialProps = async(context) => {
    //Component ==> pages 폴더에있는 페이지들
    const {ctx, Component} = context;
    let pageProps = {};
    //만약 Component에 getInitialProps가 있으면 실행해주겠다
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx);
    }
    return {pageProps};
};
const configureStore = (initialState,options)=>{
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
    );
    
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga)
    //여기에 store 커스터마이징
    return store;
}
/* withRedux() ==> NodeBird에 store를 컴포넌트로 넣어주는 역할 */
export default withRedux(configureStore)(NodeBird);