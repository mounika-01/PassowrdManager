import React, {useState} from 'react'
import './index.css'

// Use your own image URLs here
const logoUrl =
  'https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'
const websiteImageUrl =
  'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
const usernameImageUrl =
  'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
const passwordImageUrl =
  'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'

const PasswordManager = () => {
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwords, setPasswords] = useState([])

  const handleAddPassword = e => {
    e.preventDefault()
    if (website && username && password) {
      const newPassword = {
        id: passwords.length + 1,
        website,
        username,
        password,
      }
      setPasswords(prevPasswords => [...prevPasswords, newPassword])
      setWebsite('')
      setUsername('')
      setPassword('')
    }
  }

  const handleDeletePassword = id => {
    const updatedPasswords = passwords.filter(password => password.id !== id)
    setPasswords(updatedPasswords)
  }

  return (
    <div className="password-manager">
      <img src={logoUrl} alt="app logo" className="app-logo" />
      <h1>Add New Password</h1>
      <form onSubmit={handleAddPassword}>
        <div className="input-group">
          <img src={websiteImageUrl} alt="website" />
          <input
            type="text"
            placeholder="Enter Website"
            value={website}
            onChange={e => setWebsite(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <img src={usernameImageUrl} alt="username" />
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <img src={passwordImageUrl} alt="password" />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {passwords.length > 0 ? (
        <ul className="password-list">
          {passwords.map(({id, website, username}) => (
            <li key={id} className="password-item">
              <p>Website: {website}</p>
              <p>Username: {username}</p>
              <button onClick={() => handleDeletePassword(id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Passwords</p>
      )}
    </div>
  )
}

export default PasswordManager
