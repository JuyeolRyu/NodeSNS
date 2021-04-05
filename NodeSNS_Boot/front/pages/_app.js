import Head from 'next/head';
import AppLayout from '../components/AppLayout';
const NodeBird = ({Component}) => {
    return(
        <>
            <Head>
                <title>NodeStarGram</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                {/* <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script> */}
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </>
    );
}

export default NodeBird;