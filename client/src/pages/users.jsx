import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Users = () => {
  const [users,setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllUsers();
  },[])

  const [newUser, setNewUser] = useState({
    USERID: null,
    FIRSTNAME:'',
    LASTNAME:'',
    EMAIL:'',
    ADDRESS:'',
    PHONE: null,
    USERNAME:'',
    PASSWORD:'',
  });

  const [updateUser,setUpdateUser] = useState({
    USERID: null,
    FIRSTNAME:'',
    LASTNAME:'',
    EMAIL:'',
    ADDRESS:'',
    PHONE: null,
    USERNAME:'',
    PASSWORD:'',
  })

  const handleChange = (e) => {
    setNewUser((prev) => ({...prev, [e.target.name]:e.target.value}));
  }

  const handleUpdateChange = (e) => {
    setUpdateUser((prev) => ({...prev, [e.target.name]:e.target.value}));
  }


  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8800/users",newUser)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }

  const handleUpdateClick = async (e) => {
    try {
      await axios.put("http://localhost:8800/users",updateUser)
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost:8800/users/"+id)
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  const enableUpdate = (user) => {
    let inputs = document.querySelectorAll(".userUpdateForm input");
    for(let input of inputs){
      input.removeAttribute("disabled")
    }
    inputs[0].value = user.USERID;
    inputs[1].value = user.FIRSTNAME;
    inputs[2].value = user.LASTNAME;
    inputs[3].value = user.EMAIL;
    inputs[4].value = user.ADDRESS;
    inputs[5].value = user.PHONE;
    inputs[6].value = user.USERNAME;
    inputs[7].value = user.PASSWORD;
    inputs[0].setAttribute("disabled","");
    setUpdateUser({
      USERID:inputs[0].value,
      FIRSTNAME:inputs[1].value,
      LASTNAME:inputs[2].value,
      EMAIL:inputs[3].value,
      ADDRESS:inputs[4].value,
      PHONE:inputs[5].value,
      USERNAME:inputs[6].value,
      PASSWORD:inputs[7].value
    })
  }
  return <div>
      <h1><a className='btnHome' href='/'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="2rem" height="2rem"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg></a>Users</h1>
      <h2>Table</h2>
      <div className="user">
            <div>UserID</div>
            <div>Full Name</div>
            <div>Email</div>
            <div>Phone No.</div>
            <div>Address</div>
            <div>Username</div>
            <div>Password</div>
      </div>
      {users.map(user => (
        <div className="user" key={user.USERID}>
          <div>{user.USERID}</div>
          <div>{user.FIRSTNAME} {user.LASTNAME}</div>
          <div>{user.EMAIL}</div>
          <div>{user.PHONE}</div>
          <div>{user.ADDRESS}</div>
          <div>{user.USERNAME}</div>
          <div>{user.PASSWORD}</div>
          <div>
            <span className='delete' onClick={()=>handleDelete(user.USERID)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
            </span>
            <span className='update' onClick={() => enableUpdate(user)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M21.04 12.13C21.18 12.13 21.31 12.19 21.42 12.3L22.7 13.58C22.92 13.79 22.92 14.14 22.7 14.35L21.7 15.35L19.65 13.3L20.65 12.3C20.76 12.19 20.9 12.13 21.04 12.13M19.07 13.88L21.12 15.93L15.06 22H13V19.94L19.07 13.88M19 3C20.1 3 21 3.9 21 5V9L11 19V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9.18C9.6 1.84 10.7 1 12 1C13.3 1 14.4 1.84 14.82 3H19M12 3C11.45 3 11 3.45 11 4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4C13 3.45 12.55 3 12 3Z" /></svg>
            </span>
          </div>
        </div>
      ))}
    <div className="userForm">
      <h3>Add New User</h3>
      <input type="number" placeholder='UserID' onChange={handleChange} name='USERID'/>
      <input type="text" placeholder='FirstName' onChange={handleChange} name='FIRSTNAME'/>
      <input type="text" placeholder='LastName' onChange={handleChange} name='LASTNAME'/>
      <input type="text" placeholder='Email' onChange={handleChange} name='EMAIL'/>
      <input type="text" placeholder='Address' onChange={handleChange} name='ADDRESS'/>
      <input type="number" placeholder='Phone' onChange={handleChange} name='PHONE'/>
      <input type="text" placeholder='Username' onChange={handleChange} name='USERNAME'/>
      <input type="text" placeholder='Password' onChange={handleChange} name='PASSWORD'/>
      <button onClick={handleClick}>Add</button>
    </div>
    <div className="userUpdateForm">
      <h3>Update User</h3>
      <input type="number" placeholder='UserID' disabled onChange={handleUpdateChange} name='USERID'/>
      <input type="text" placeholder='FirstName' disabled onChange={handleUpdateChange} name='FIRSTNAME'/>
      <input type="text" placeholder='LastName' disabled onChange={handleUpdateChange} name='LASTNAME'/>
      <input type="text" placeholder='Email' disabled onChange={handleUpdateChange} name='EMAIL'/>
      <input type="text" placeholder='Address' disabled onChange={handleUpdateChange} name='ADDRESS'/>
      <input type="number" placeholder='Phone' disabled onChange={handleUpdateChange} name='PHONE'/>
      <input type="text" placeholder='Username' disabled onChange={handleUpdateChange} name='USERNAME'/>
      <input type="text" placeholder='Password' disabled onChange={handleUpdateChange} name='PASSWORD'/>
      <button onClick={handleUpdateClick}>Update</button>
    </div>
    
  </div>;
}
export default Users