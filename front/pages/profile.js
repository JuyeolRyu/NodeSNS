import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
const Profile = () => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.13.0/antd.compact.min.css" integrity="sha512-1hNNMQk/NM85FLhT2Rxal0CPnh0nw5hD12uXml/dS6APxgUXEHpZY6UN8XJ3lTvssxNAjf2vGnqsnLwEtwaJyA==" crossorigin="anonymous" />
            </Head>
            <AppLayout>
                <div>프로필</div>
            </AppLayout>
        </>
    );
    
};

export default Profile;