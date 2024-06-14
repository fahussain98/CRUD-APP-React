import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [formType, setFormType] = useState(null); // null, 'create', or 'edit'
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const saveUser = (user) => {
    let updatedUsers;
    if (formType === 'edit') {
      updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    } else {
      user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      updatedUsers = [...users, user];
    }
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setFormType(null);
    setCurrentUser(null);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="container">
      <h1>Login Form</h1>
      <button onClick={() => setFormType('create')}>Add New User</button>
      {formType && (
        <UserForm
          formType={formType}
          user={currentUser}
          saveUser={saveUser}
          cancel={() => setFormType(null)}
        />
      )}
      <UserList users={users} editUser={(user) => { setFormType('edit'); setCurrentUser(user); }} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
