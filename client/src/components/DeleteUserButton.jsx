import '../styles/deleteButton.css';
import { trashCan } from '../assets';
import { deleteUser } from '../services/apiClient';

export const DeleteUserButton = ({ userId }) => {

  const handleUserDeletion = async () => {
    try {
      await deleteUser(userId);
      alert("User deleted successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to delete user: " + err.message);
    }
  };

  return (
    <button
      className="delete-button"
      aria-label="Delete User"
      onClick={handleUserDeletion} 
    >
      <span className="sr-only">Delete User</span>
      <img src={trashCan} alt="trash icon" />
    </button>
  );
};

export const PlaceHolderDeleteUserButton = () => {
  return (
    <button
      className="delete-button"
      aria-label="Delete User"
      disabled
    >
      <span className="sr-only">Delete User</span>
      <img src={trashCan} alt="trash icon" />
    </button>
  );
};
