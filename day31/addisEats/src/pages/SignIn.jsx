import { Form, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    localStorage.setItem("isAuthenticated", "true");

    navigate(from, {
      replace: true,
    });
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
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
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
