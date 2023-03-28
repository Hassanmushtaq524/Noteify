import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

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
      setCredentials({ name: "", email: "", password: "" });
      console.log(json);
      localStorage.setItem("token", json.jwtToken);
      navigate("/");
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="formEmail">Name</label>
        <input type="text" className="form-control" id="formName" aria-describedby="nameHelp" value={credentials.name} name="name" placeholder="Enter email" onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="formEmail">Email address</label>
        <input type="email" className="form-control" id="formEmail" aria-describedby="emailHelp" value={credentials.email} name="email" placeholder="Enter email" onChange={onChange} />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="formPassword">Password</label>
        <input type="password" className="form-control" id="formPassword" value={credentials.password} name="password" placeholder="Password" onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="formCPassword">Confirm Password</label>
        <input type="password" className="form-control" id="formCPassword" value={credentials.cpassword} name="cpassword" placeholder="Password" onChange={onChange} />
      </div>
      <button disabled={credentials.password !== credentials.cpassword || credentials.password === "" || credentials.email === "" || credentials.name == ""} type="submit" className="btn btn-primary my-2">Submit</button>
    </form>
  )
}

export default Signup
