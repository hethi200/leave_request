import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem("username", username);

        if (res.data.role === "admin") {
  navigate("/admin");
} else {
  navigate("/student"); // 👈 YOUR PAGE
}
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid gray",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h2>Login Page</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;