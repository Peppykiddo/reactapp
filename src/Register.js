import React, {useState} from "react";

import Navbar from "./Navbar";
export function Register(props) {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventdefault();
    console.log(email);
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} id="name"></input>

        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"></input>
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"></input>
        <button type="Submit">Register</button>
      </form>
      <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>

  );
}
