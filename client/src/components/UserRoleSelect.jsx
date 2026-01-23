import '../styles/UserRoleSelect.css'
import { updateUserRole } from '../services/apiClient';

const UserRoleSelect = ({ userId, role}) => {
  const handleChange = async (e) => {
    const newRole = e.target.value;

     try {
          await updateUserRole(userId, newRole);
          alert("User role updated successfully!");
          window.location.reload();
        } catch (err) {
          alert("Failed to update user role: " + err.message);
        }
  }
  return (
    <select
      value={role}
      onChange={handleChange}
      disabled={role === 'Admin'}
      className="user-role-select"
    >
      <option value="Admin">Admin</option>
      <option value="User">User</option>
    </select>
  );
};

export default UserRoleSelect;
