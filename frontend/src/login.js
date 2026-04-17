import { useState } from "react";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dash.css';
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("");
  const [role, setRole] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigate = (path) => {
    window.location.href = path;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !username || !password || !role) {
      alert("Please enter email, username, password, and select a role to sign up.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Account created successfully. You can now log in.");
          setIsSignup(false);
          setEmail("");
          setUsername("");
          setPassword("");
          setRole("");
        } else {
          alert(data.message || "Sign up failed.");
        }
      })
      .catch(() => {
        alert("Sign up failed. Please try again.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      handleSignup(e);
      return;
    }

    if (!username || !password || !loginAs) {
      alert("Please select an existing user role and enter username/password to log in.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, loginAs }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role) {
          localStorage.setItem("user", JSON.stringify(data));

          if (data.role === "student") {
            navigate("/student");
          } else if (data.role === "academic_supervisior") {
            navigate("/academic");
          } else if (data.role === "workplace_supervisior") {
            navigate("/workplace");
          } else if (data.role === "Internship_admin") {
            navigate("/admin");
          }
        } else {
          alert("Login failed");
        }
      })
      .catch(() => {
        alert("Login failed. Please try again.");
      });
  };

  return (
    <div className="login-page">
      <div className="container">
        <h2 className="login-heading">Internship Logging & Evaluation System (ILES)</h2>
        <div className="login-form-container">
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

        {isSignup && (
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {isSignup && (
          <div className="mb-3">
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="workplace_supervisior">Workplace Supervisor</option>
              <option value="academic_supervisior">Academic Supervisor</option>
            </select>
          </div>
        )}

        {!isSignup && (
          <div className="login-select-row mb-3">
            <label htmlFor="loginAs" className="dropdown-label">
              Existing User Role
            </label>
            <select
              id="loginAs"
              value={loginAs}
              onChange={(e) => setLoginAs(e.target.value)}
              className="form-select"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="workplace_supervisior">Workplace Supervisor</option>
              <option value="academic_supervisior">Academic Supervisor</option>
            </select>
          </div>
        )}

        <Button type="submit" className="custom-button">
          {isSignup ? 'Create Account' : 'Login'}
        </Button>

        <div className="login-footer">
          <a href="#" className="forgot-link">Forgot Password</a>
          <button type="button" className="link-button" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Back to login' : 'Sign Up'}
          </button>
        </div>
      </form>
        </div>
    </div>
  </div>
  );
}

export default Login;