import React, { useState } from "react";
import axios from "axios"; // Import axios

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // For success message
  const [loading, setLoading] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      // Send login request to backend
      setLoading(true);
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      setLoading(false);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      // You might want to save the token in localStorage or context here
      // localStorage.setItem("token", JSON.stringify(response.data.token));
      window.location.href = "/";

      setSuccess("Logged in successfully");
      setError("");

      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle error response from backend
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5">
      {loading && <p>Loading...</p>}
      <h1 className="text-2xl text-center mb-4">Login</h1>
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
