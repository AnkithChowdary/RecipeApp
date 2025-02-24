import { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
export const Auth = () => {
  return (
    <div className="auth">
      <div>
        <Register />
        <Login/>
      </div>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [,setCookies]=useCookies(["acess_token"])
  const navigate=useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", { username, password });
  
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("usrID", response.data.userID);
      navigate("/");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };
  
  return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit} />

};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const onSubmit=async(event)=>{
    event.preventDefault();
    try{
      await axios.post("http://localhost:3001/auth/register",{username,password});
      alert("Registration completed");
    }catch(err){
      alert("registration failed")
     console.error(err)
    }
};
 return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>
};

const Form=({username,setUsername,password,setPassword,label,onSubmit})=>{
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
      <h2>{label}</h2>
      
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} required/>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
      </div>
      <button type="submit">{label}</button>
      </form>
    </div>
  );
};
