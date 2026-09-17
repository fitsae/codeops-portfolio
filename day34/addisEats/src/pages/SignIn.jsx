// src/pages/SignIn.jsx
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  if (isAuthenticated) return <Navigate to={from} replace />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    signIn(email);
    navigate(from, { replace: true });
  }

  return (
    <section className="signin-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}

export default SignIn;
