import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import withRedux from "next-redux-wrapper";

import AppLayout from '../components/AppLayout'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
/*헤더와 AppLayout 부분은 중복되는 부분이므로 렌더링을 줄이기 위해 next에서 제공하는 _app.js를 사용한다.
   _app.js 는 props로 Component를 받는데 이부분에 각각의 페이지 마다 다르게 적용될 부분이 들어간다.
*/
const NodeBird = ({Component, store}) => {
    return (
        <>
        <Provider store = {store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.13.0/antd.compact.min.css" integrity="sha512-1hNNMQk/NM85FLhT2Rxal0CPnh0nw5hD12uXml/dS6APxgUXEHpZY6UN8XJ3lTvssxNAjf2vGnqsnLwEtwaJyA==" crossorigin="anonymous" />
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </Provider>
        </>
    );
};
NodeBird.propTypes = {
    Component: propTypes.node,
    store: propTypes.object,
}

/* withRedux() ==> NodeBird에 store를 컴포넌트로 넣어주는 역할 */
export default withRedux((initialState, options) => {
    const store = createStore(reducer, initialState);
    //여기에 store 커스터마이징
    return store;
})(NodeBird);