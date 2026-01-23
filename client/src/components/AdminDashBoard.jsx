import { Navigate } from "react-router-dom";
import '../styles/AdminDashBoard.css'
import {useQuery} from "@tanstack/react-query"
import { fetchUsers } from "../services/apiClient";
import { Loader } from "./Loader.jsx"
import { Error } from "./Error.jsx"
import UserRoleSelect from "./UserRoleSelect.jsx";
import AddUserRow from "./AddUserRow.jsx";
import { DeleteUserButton, PlaceHolderDeleteUserButton } from "./DeleteUserButton.jsx";

const AdminDashBoard = () => {
  const admin = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  console.log(token)
  if (!admin || !token) <Navigate to="/login" replace />;
  if (admin.role !== "Admin") {
     return (
    <div className="not-admin-container">
      <div className="not-admin-content">
        <h1 className="not-admin-title">Admin Dashboard</h1>
        <p className="not-admin-forbidden">FORBIDDEN</p>
      </div>
    </div>
  );
  }

   const {
    isLoading: isLoadingCards,
    isError: isErrorCards,
    data: users,
 } = useQuery({
   queryKey: ['users'],
   queryFn: () => fetchUsers(),
 });

 if (isLoadingCards) { return (
      <div className="loader_container">
       <Loader />
     </div>
     );
   }
    
   if (isErrorCards) {
     return (
       <div className="error_container">
         <Error />
       </div>
     )
   }
  return (

    <div className="admin_container">
      <div className="admin-content">
        <h1 className="shop_title">AdminDashBoard</h1>
        <p className="access-granted">ACCESS GRANTED</p>
      </div> 

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td className="">{user.email}</td>
                <td className="">
                  <UserRoleSelect userId={user.id} role={user.role} />
                </td>
                <td className="">
                  {user.role === 'Admin' || user.id === admin.id ? (
                    <PlaceHolderDeleteUserButton />
                  ) : (
                    <DeleteUserButton userId={user.id} />
                  )}
                </td>
              </tr>
            ))}
            
              
          </tbody>
        </table>
        <AddUserRow/>
      </div>
    </div>
  )
}

export default AdminDashBoard