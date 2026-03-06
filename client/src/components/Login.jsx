import { useState } from 'react';
import '../styles/loginRegister.css'
import { loginUser } from '../services/apiClient.js';
import { Link, useNavigate  } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const data = await loginUser(username, password);
   
      const { token, user } = data.data;

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
      navigate("/");
    }catch (error){
      alert(error.message);
      setUsername('');
      setPassword('');
    }
  }
  return (
      <div className='loginRegister_bg light'>
      <div className="loginRegister_container" id="myForm">
        <h1>Login</h1>
        <form className="form_container" id="form" onSubmit={handleLogin}>
          <div className="txt_field">
            <input type="text" id="username" value={username} required onChange={(e) => setUsername(e.target.value)}/>
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input type="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            <span></span>
            <label>Password</label>
          </div>
           <button className="loginRegister_btn" type='submit'>Login</button>
          <div className="loginRegister_link">
            Not a member? 
            <Link to="/register">
              <span>Register</span>
            </Link>
          </div>
        </form>
    </div>
  </div>

    
    
    
  )
}
