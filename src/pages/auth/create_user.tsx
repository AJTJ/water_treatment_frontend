// import React, { useState } from "react";

// const AddUserForm = () => {
//   const [email, setEmail] = useState<string>("");
//   const [role, setRole] = useState<string>("operator");
//   const [message, setMessage] = useState<string>("");

//   const handleCreateUser = async () => {
//     try {
//       const response = await createUser(email, role);
//       setMessage("User created successfully. An email has been sent.");
//     } catch (error) {
//       setMessage("Error creating user: " + error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Create New User</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="User email"
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="operator">Operator</option>
//         <option value="admin">Admin</option>
//       </select>
//       <button onClick={handleCreateUser}>Create User</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AddUserForm;
