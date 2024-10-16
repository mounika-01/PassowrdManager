import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordsList, setPasswordsList] = useState([]);
  const [showPasswords, setShowPasswords] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPassword = () => {
    if (website && username && password) {
      const newPassword = {
        id: new Date().getTime(),
        website,
        username,
        password,
      };
      setPasswordsList([...passwordsList, newPassword]);
      setWebsite('');
      setUsername('');
      setPassword('');
    }
  };

  const handleDeletePassword = (id) => {
    setPasswordsList(passwordsList.filter(item => item.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPasswords = passwordsList.filter((passwordItem) =>
    passwordItem.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Password Manager</h1>

      {/* Input Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Enter Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAddPassword}>Add</button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Website"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Show Passwords Toggle */}
      <div className="show-passwords">
        <input
          type="checkbox"
          id="show-passwords"
          checked={showPasswords}
          onChange={() => setShowPasswords(!showPasswords)}
        />
        <label htmlFor="show-passwords">Show Passwords</label>
      </div>

      {/* Passwords List */}
      <div className="passwords-list">
        {filteredPasswords.length > 0 ? (
          filteredPasswords.map((passwordItem) => (
            <div key={passwordItem.id} className="password-item">
              <p>{passwordItem.website}</p>
              <p>{passwordItem.username}</p>
              <p>{showPasswords ? passwordItem.password : '******'}</p>
              <button
                data-testid="delete"
                onClick={() => handleDeletePassword(passwordItem.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No Passwords</p>
        )}
      </div>
    </div>
  );
};

export default App;
