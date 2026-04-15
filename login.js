import { useState } from "react";
import { Button } from 'react-bootstrap';
import './loginstyle.css';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("");

  const navigate = (path) => {
    window.location.href = path;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, loginAs }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.role) {
        localStorage.setItem("user", JSON.stringify(data));

        if (data.role === "student") {
          navigate("/student");
        } 
        else if (data.role === "academic_supervisior") {
          navigate("/academic");
        } 
        else if (data.role === "workplace_supervisior") {
          navigate("/workplace");
        } 
        else if (data.role === "Internship_admin") {
          navigate("/admin");
        }
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="login-heading">(ILES)</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow login-card">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-select-row mb-3">
          <label htmlFor="loginAs" className="dropdown-label">
            <button type="submit" className="custom-button">Login as </button>
          </label>
          <select
            id="loginAs"
            value={loginAs}
            onChange={(e) => setLoginAs(e.target.value)}
            className="form-select"
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="workplace_supervisior">Workplace Supervisor</option>
            <option value="academic_supervisior">Academic Supervisor</option>
          </select>
        </div>

        <button type="submit" className="custom-button">
          Sign Up 
        </button>
        <div className="login-footer">
                <a href="#" className="forgot-link">Forgot Password</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
