import { useState } from "react";
import { Button } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
      <h2 className="text-center">Login</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-100" variant="primary">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;