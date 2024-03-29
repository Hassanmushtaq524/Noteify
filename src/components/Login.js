import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/AlertContext';


const Login = () => {

  let { showAlert } = useContext(AlertContext);
  let navigate = useNavigate();

  // handles submission of form
  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = { email: e.target.email.value, password: e.target.password.value };
    // API call to login with email and password
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (json.success) {
      // redirect and save auth token
      
      localStorage.setItem("token", json.jwtToken);
      showAlert("Logged In!", "success");
      navigate("/");
    } else {
      showAlert("Invalid", "danger");
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2 className="my-3">Login</h2>
      <div className="form-group my-3">
        <label htmlFor="formEmail">Email address</label>
        <input type="email" className="form-control" id="formEmail" aria-describedby="emailHelp" name="email" placeholder="Enter email" />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formPassword">Password</label>
        <input type="password" className="form-control" id="formPassword" name="password" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-secondary my-3">Submit</button>
    </form>
  )
}

export default Login
