import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../App.css';

    const Appheader = () => {
        const [displayusername, setDisplayusername] = useState('');
        const [showmenu, setShowmenu] = useState(false);
        const usenavigate = useNavigate();
        const location = useLocation();
        useEffect(() => {
            if (location.pathname === '/login' || location.pathname === '/register') {
                setShowmenu(false);
            } else {
                setShowmenu(true);
                let username = sessionStorage.getItem("username");
                if (username === '' || username === null) {
                    usenavigate('/login');
                } else {
                    setDisplayusername(username);
                }
            }

        }, [location])

        useEffect(() => {
            if (displayusername) {
                toast.success(`Welcome ${displayusername}!`);
            }
        }, [displayusername]);
        return (
            <>
                <div>
                {showmenu && 
                    <div className="header">
                        <div className="header-name">
                            <h2>Job Tracker</h2>
                            <hr />
                        </div>
                        <div className="header-links">  
                            <Link to={'/'} className="header-link">Home</Link>
                            <Link to={'/postjob'} className="header-link">Post Job</Link>
                            <Link to={'/findjob'} className="header-link">Find Job</Link>
                            <Link to={'/login'} className="header-link logout">Logout</Link>
                        </div>
                        <div className="header-welcome">
                            <FaUser/>
                            <p>{displayusername}</p>
                        </div>
                    </div>
                }
            </div>
            </>
        );
    }

    export default Appheader;