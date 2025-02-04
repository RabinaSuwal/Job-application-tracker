import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:8000/users/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid username');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('userrole', resp.role);
                        usenavigate('/')
                    } else {
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj = {
                "username": username,
                "password": password
            };
            fetch("https://localhost:44308/User/Authenticate", {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(inputobj),
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('jwttoken', resp.jwtToken);
                    usenavigate('/')
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    return (
        <div className="login-container">
            <form onSubmit={ProceedLogin} className="login-form">
                <div className="form-header">
                    <h2>User Login</h2>
                </div>
                <div className="form-body">
                    <div className="form-group">
                        <label>User Name <span className="errmsg">*</span></label>
                        <input
                            value={username}
                            onChange={e => usernameupdate(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password <span className="errmsg">*</span></label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => passwordupdate(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-footer">
                    <button type="submit" className="btn-primary">Login</button>
                    <span>|</span>
                    <Link className="btn-secondary" to={'/register'}>New User</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
