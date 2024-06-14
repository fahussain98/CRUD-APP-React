
import React, { useState, useEffect } from 'react';

const UserForm = ({ formType, user, saveUser, cancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (formType === 'edit' && user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [formType, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser({ id: user ? user.id : null, name, email });
  };

  return (
    <div className="form-container">
      <h2>{formType === 'edit' ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">{formType === 'edit' ? 'Update' : 'Save'}</button>
        <button type="button" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
