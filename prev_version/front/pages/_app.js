import React from 'react';
import Helmet from 'react-helmet';

import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import {LOAD_USER_REQUEST} from '../reducers/user';
import axios from 'axios';

const NodeBird = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Helmet
        title="NodeBird"
        htmlAttributes = {{ lang: 'ko'}}
        meta={[{
          charset: 'UTF-8',
        },{
          name: 'viesport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
        },{
          'http-equiv': 'X-UA-Compatible', content: 'IE-edge',
        },{
          name: 'description', content: 'co_mong NodeSNS',
        },{
          name: 'og:title', content: 'NodeSNS'
        },{
          name: 'og:description', content: 'co_mong NodeSNS',
        },{
          property: 'og:type', content: 'website',
        },{
          property: 'og.image', content: 'http://homedev.ml/favicon.icon',
        }]}
        link ={[{
          rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css",
        },{
          rel:"stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
        },{
          rel:"stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
        }]}
        script={[{
          src: ''
        }]}
      />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if(!state.user.me){
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  
  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));