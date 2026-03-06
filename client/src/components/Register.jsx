import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/apiClient.js';

export const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const data = await registerUser(username, email, password)
      navigate("/login");
    } catch (error){
      alert(error.message);

      setUsername('');
      setEmail('')
      setPassword('');
    }
  }

  return (
    <div className='loginRegister_bg light'>
      <div className="loginRegister_container" id="myForm">
        <h1>Register</h1>
        <form className="form_container" id="form" onSubmit={handleRegister}>
          <div className="txt_field">
            <input type="text" id="username" value={username} required onChange={(e) => {setUsername(e.target.value)}}/>
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
                <input type="text" id="email" required value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <span></span>
                <label>Email</label>
            </div>
          <div className="txt_field">
            <input type="password" id="password" required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <span></span>
            <label>Password</label>
          </div>
          <button className="loginRegister_btn" type='submit'>Register</button>
          <div className="loginRegister_link">
            Already registered? 
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </form>
    </div>
  </div>
  )
}
