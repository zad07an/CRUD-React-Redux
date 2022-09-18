import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addUser, deleteUser, updateUsername } from './features/Users'
import uuid from 'react-uuid'
import './App.css'

function App() {

  const userList = useSelector((state) => state.users.value)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [newUserName, setNewUserName] = useState('')

  const onAddUser = () => {
    dispatch(addUser({id: uuid(), name, userName}))
    setName('')
    setUserName('')
  }

  const disabledAddButton = name.length === 0 ? true : userName.length === 0 ? true : false;
  const disabledButton = newUserName.length === 0 ? true : false;
  const disabledStyle = newUserName.length === 0 ? {background: 'gray', cursor: 'default'} : null

  return (
    <div className="container">
      {" "}
      <div className="addUsers">
        <input type="text" className="nameInput" value={name} placeholder='Name...' onChange={(e) => setName(e.target.value)} required/>
        <input type="text" className="userNameInput" value={userName} placeholder='Username...' onChange={(e) => setUserName(e.target.value)} required />
        <button className='addButton' onClick={onAddUser} disabled={disabledAddButton}>
        {" "}Add User</button>
      </div>
      <div className="displayUsers">
        {userList.map((user, idx) => {
          return ( 
            <div key={user.id} className="userBox">
              <div className="userNameBox">
                <h1 className='name'>{user.name}</h1>
                <h2 className='userName'>@{user.userName}</h2>
              </div>
              <div className="userEditBox" >
                <input type="text" className='updateInput' placeholder='New Username...' onChange={(e) => {
                  setNewUserName(e.target.value)
                }} />
                <button style={disabledStyle} disabled={disabledButton} 
                  onClick={() => dispatch(updateUsername({id: user.id, userName: newUserName}))} className="updateButton">Update Username</button>
                <button onClick={() => dispatch(deleteUser({id: user.id}))} className="deleteButton">Delete User</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
