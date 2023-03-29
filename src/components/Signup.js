import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/AlertContext';

const Signup = () => {  

  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  let [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  // handles submission of form
  const handleSubmit = async (e) => {

    e.preventDefault();
    // API call to sign up
    const data = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password
    };
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();

    if (json.success) {
      // signed up successfully
      setCredentials({ name: "", email: "", password: "" });
      localStorage.setItem("token", json.jwtToken);
      navigate("/");
    } else {
      // unsuccessful
      showAlert("Invalid", "danger");
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2 className="my-3">Sign up</h2>
      <div className="form-group my-3">
        <label htmlFor="formEmail">Name</label>
        <input type="text" className="form-control" id="formName" aria-describedby="nameHelp" value={credentials.name} name="name" placeholder="Enter email" onChange={onChange} />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formEmail">Email address</label>
        <input type="email" className="form-control" id="formEmail" aria-describedby="emailHelp" value={credentials.email} name="email" placeholder="Enter email" onChange={onChange} />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formPassword">Password</label>
        <input type="password" className="form-control" id="formPassword" value={credentials.password} name="password" placeholder="Password" onChange={onChange} />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formCPassword">Confirm Password</label>
        <input type="password" className="form-control" id="formCPassword" value={credentials.cpassword} name="cpassword" placeholder="Password" onChange={onChange} />
      </div>
      <button disabled={credentials.password !== credentials.cpassword || credentials.password === "" || credentials.email === "" || credentials.name === ""} type="submit" className="btn btn-secondary my-2">Submit</button>
    </form>
  )
}

export default Signup
