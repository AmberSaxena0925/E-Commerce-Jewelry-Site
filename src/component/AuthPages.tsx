import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// ✨ Floating and glowing animations
const float = keyframes`
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-8px) scale(1.03); }
`;

const glowPulse = keyframes`
  0% { transform: scale(0.8); filter: blur(20px); opacity: 1; }
  50% { transform: scale(0.9); filter: blur(30px); opacity: 0.85; }
  100% { transform: scale(0.8); filter: blur(20px); opacity: 1; }
`;

// ✨ Card styling — sleek and golden
const AnimatedCard = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  background: linear-gradient(to bottom, #0b0b0b, #121212);
  border: 1px solid rgba(203, 203, 203, 0.1);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  animation: ${float} 400ms ease forwards paused;

  &::after {
    content: "";
    position: absolute;
    top: 28px;
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    transform: scale(0.8);
    filter: blur(35px);
    background: linear-gradient(90deg, rgba(79, 79, 79, 0.25), rgba(243, 243, 243, 0.32));
    transition: opacity 0.5s;
    transform-origin: center;
    animation: ${glowPulse} 2.8s ease-in-out infinite paused;
    border-radius: inherit;
  }

  &:hover {
    animation-play-state: running;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 1);
  }

  &:hover::after {
    animation-play-state: running;
    opacity: 1;
  }

  @media (max-width: 420px) {
    padding: 1.25rem;
  }
`;

// ✨ Login & Signup pages
export const AuthPages = {
  LoginPage({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`Welcome back, ${email}`);
        navigate("/");
      }, 1000);
    }

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
        <div className="w-full max-w-md">
          <AnimatedCard>
            <button onClick={() => navigate("/")} className="text-sm text-gray-400 mb-4">
              ← Back to Home
            </button>

            <h2 className="text-3xl font-serif font-bold text-yellow-400">Sign In</h2>
            <p className="text-gray-300 mt-2">
              Welcome back — step into elegance with your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md bg-black border border-yellow-400/20 px-3 py-2 outline-none text-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md bg-black border border-yellow-400/20 px-3 py-2 outline-none text-gray-100"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <label>
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <button type="button" className="underline hover:text-yellow-400">
                  Forgot?
                </button>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-2 rounded-md bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-all"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-gray-300">
              Don’t have an account?{" "}
              <button onClick={onSwitchToSignup} className="underline text-yellow-400">
                Sign Up
              </button>
            </div>
          </AnimatedCard>
        </div>
      </div>
    );
  },

  SignupPage({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState(""); // ✅ Confirm Password
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`Account created for ${name || email}`);
        navigate("/");
      }, 1000);
    }

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
        <div className="w-full max-w-md">
          <AnimatedCard>
            <button onClick={() => navigate("/")} className="text-sm text-gray-400 mb-4">
              ← Back to Home
            </button>

            <h2 className="text-3xl font-serif font-bold text-yellow-400">
              Create an Account
            </h2>
            <p className="text-gray-300 mt-2">
              Join <span className="text-yellow-400">Sai Naman Pearls</span> for exclusive
              offers and a seamless experience.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-md bg-black border border-yellow-400/20 px-3 py-2 outline-none text-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md bg-black border border-yellow-400/20 px-3 py-2 outline-none text-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md bg-black border border-yellow-400/20 px-3 py-2 outline-none text-gray-100"
                />
              </div>

              {/* ✅ Confirm Password */}
              <div>
                <label className="text-sm text-gray-400">Confirm Password</label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full rounded-md bg-black border border-yellow-400/20 px-3 py-2 outline-none text-gray-100"
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-2 rounded-md bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-all"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-gray-300">
              Already have an account?{" "}
              <button onClick={onSwitchToLogin} className="underline text-yellow-400">
                Sign In
              </button>
            </div>
          </AnimatedCard>
        </div>
      </div>
    );
  },
};
