import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.13.0/antd.compact.min.css" integrity="sha512-1hNNMQk/NM85FLhT2Rxal0CPnh0nw5hD12uXml/dS6APxgUXEHpZY6UN8XJ3lTvssxNAjf2vGnqsnLwEtwaJyA==" crossorigin="anonymous" />
            </Head>
            <AppLayout>
                <div>Hello, Next!</div>
            </AppLayout>
        </>
    );
};

export default Home;