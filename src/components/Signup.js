import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Sucessfully", "success");
      history.push("/");
    }
    else {
      props.showAlert("Invalid Dertails", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container mt-3 body">
      <h2>Signup to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" placeholder='name' className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <input type="email" placeholder='email address' className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <input type="password" placeholder='password' className="form-control" id="password" name="password" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <input type="password" placeholder='confirm password' className="form-control" id="cpassword" name="cpassword" onChange={onChange} required />
        </div>
        <button type="submit" className="btn button">Submit</button>
      </form>
    </div>
  )
}

export default Signup
