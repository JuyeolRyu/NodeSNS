import React,{useState,useCallback} from 'react';
import Link from 'next/link';
const path = require('path');
const AppLayout = ({children}) => {
    const [home,setChangeHome] = useState(false);
    const [message,setChangeMessage] = useState(false);
    const [heart,setChangeHeart] = useState(false);
    const [compass,setChangeCompass] = useState(false);
    const [profile,setChangeProfile] = useState(false);

    const onChangeHome = useCallback((e)=>{
        console.log(e);
    });
    const onChangeMessage = useCallback((e)=>{
        console.log(e);
    });
    const onChangeHeart = useCallback((e)=>{
        console.log(e);
    });
    const onChangeCompass = useCallback((e)=>{
        console.log(e);
    });
    const onChangeProfile = useCallback((e)=>{
        console.log(e);
    });
    const onChangeActivate = (e)=>{
        console.log(e.target);
    }

    return(
        <div>
        <div className="row">
            <nav className="navbar navbar-inverse navbar-fixed-top navbar-expand-sm">
                <div className="container-fluid" style={{paddingLeft:"30%", paddingRight:"30%"}}>
                    <Link href="/" ><a className="navbar-brand">NodeStargram</a></Link>

                    <form className="navbar-form navbar-left" role="search" >
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="🔎 검색" style={{textAlign:"center"}}/>
                        </div>
                    </form>

                    <ul className="nav navbar-nav navbar-right" >
                        <li className="active"><Link href="/" className="nav-link"><a name="home"><span className="glyphicon glyphicon-home" aria-hidden="true"></span></a></Link></li>
                        <li onClick = {onChangeActivate}><Link href="/message"><a name="message"><span className="glyphicon glyphicon-send" aria-hidden="true"></span></a></Link></li>
                        <li><Link href="/heart"><a name="heart"><span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span></a></Link></li>
                        <li><Link href="/compass"><a name="compass"><span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span></a></Link></li>
                        <li><Link href="/profile"><a name="profile"><span className="glyphicon glyphicon-log-in"></span> Login</a></Link></li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="row" style={{paddingTop:"70px"}}>
            <div className="col-md-3"></div>
            <div className="col-md-6">{children}</div>
            <div className="col-md-3"></div>
        </div>
        </div>
    )
}

export default AppLayout