import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const updateData = {
      username,
      email,
      password: password || undefined,
    };

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/users/profile",
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Full response from server:", res);
      console.log("Response data:", res.data);

      if (res.data.success) {
        console.log("Update successful, new user data:", res.data.user);
        setUser(res.data.user);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setPassword("");
        setMessage("Profile updated successfully");

        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Clear success message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } else {
        console.log("Update failed:", res.data.message);
        setMessage(
          "Failed to update profile: " + (res.data.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      setMessage(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            New Password (leave blank to keep current)
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
