import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './index';
//import AppLayout from '../components/AppLayout';
const App = ({Component}) => {
    return(
        <>
            <head>
                <title>NodeStaGram</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
            </head>
            <Index style ={{backgroundColor:"#dcdcdc"}} />
        </>
    );
}

export default App;