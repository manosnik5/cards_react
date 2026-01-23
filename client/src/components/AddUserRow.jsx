import '../styles/addUserRow.css'
import { useState } from 'react';
import { add } from '../assets';
import { addUser } from '../services/apiClient';

const AddUserRow = () => {
    const [isAddUserButtonPressed, setIsAddUserButtonPressed] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); 

    const handleAddUser = async() => {
      try {
        await addUser(name, email, password, role);
        alert("User added successfully!");
        window.location.reload();
      } catch (err) {
        alert("Failed to add user: " + err.message);
      }
    };
    
    
  return (
    <div className="add-user-row-container">
        {isAddUserButtonPressed ? (
            <div className="add-user-row">
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            minLength={8}
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <select className="input-field" onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="actions-group">
          <button className="btn btn-green" onClick={handleAddUser}>Add</button>
          <button className="btn btn-gray" onClick={() => {
                                setName('');
                                setEmail('');
                                setPassword('');
                                setRole('User');                  
                                setIsAddUserButtonPressed(false);
                            }}>Cancel</button>
        </div>
      </div>
        ) : (
             <div className="add-user-button-container">
            <button onClick={() => setIsAddUserButtonPressed((e) => !e)} className="add-user-button">
                 <img src={add} alt="" />
            </button>
           
        </div>
        )}
      
    </div>
  );
};

export default AddUserRow;
