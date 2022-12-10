import React,{useState} from 'react'
import './Admin.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {

        e.preventDefault();

        const res = await fetch("http://localhost:5000/login",{
            method:"POST",
            body:JSON.stringify({username, password}),
            headers: {
                "content-type": "application/json"
            }
        });
        const result = await res.json();
        if(result.auth) // if auth token is present
        {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/admindashboard"); 
        }
        else
        {
            alert("please enter correct details");
        }
        setUserName("");
        setPassword("");
    }

    return (
        <>
            <div className="container-flued login-page">
                <form className="login-form" onSubmit={(e) => login(e)}>
                    <h1>Login</h1>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={ (e) => setUserName(e.target.value) } required />
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={ (e) => setPassword(e.target.value) } required />
                    <input type="submit" value="LOGIN"  />
                </form>
            </div>
        </>
    )
}

export default Admin