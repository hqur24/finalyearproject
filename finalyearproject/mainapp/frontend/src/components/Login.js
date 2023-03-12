import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      const response = await fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: { 
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username, 
        password,
      })
      });
      if (response.ok) {
        setIsLoggedIn(true);
      }
    const data = await response.json();
    console.log(data); 
  }
  ;

  if (isLoggedIn) {
    return <p>You are logged in!</p>;
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
export default Login;

