import { useState } from "react";
import axios from 'axios';
URL = 'http://localhost:8000/users/getdetails';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const userReg = /^[a-zA-Z]+$/;
  const passReg = /^[a-zA-Z0-9]+$/;

  function validateUsername(username){
    if(!userReg.test(username)){
      setError('invalid username (regex)');
      return false;
    }
    return true;
  }

  function validatePassword(password){
    if(!passReg.test(password)){
      setError('invalid password (regex)');
      return false;
    }
    return true;
  }

  const handleCheck = async () => {
    try {
      const response = await axios.post(URL, {
        username,
        password,
      });

      setUserDetails(response.data);
      setError('');
    } catch (err) {
      setUserDetails(null);
      setError('Invalid credentials. Please try again.');
    }
  }

  return (
    <div>
      <h1>SQL Injection Demonstration</h1>
      <h2>Group 16</h2>
      <div className="inblock">
      <div>
        <label>Username:  </label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            // if(validateUsername(e.target.value)) 
            setUsername(e.target.value)
          }}
        />
      </div>
      <div>
        <label>Password:  </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            // if(validatePassword(e.target.value)) 
            setPassword(e.target.value)
          }}
        />
      </div>
      <div>
        <button onClick={handleCheck}>
          Get User Details
        </button>
      </div>
      </div>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {userDetails && (
        <div>
          <h2>User Details</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>      
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>  
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;