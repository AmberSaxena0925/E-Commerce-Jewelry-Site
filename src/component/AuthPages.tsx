import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-8px) scale(1.03); }
`;

const glowPulse = keyframes`
  0% { transform: scale(0.8); filter: blur(20px); opacity: 1; }
  50% { transform: scale(0.9); filter: blur(30px); opacity: 0.85; }
  100% { transform: scale(0.8); filter: blur(20px); opacity: 1; }
`;

const AnimatedCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;


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
      <div className="min-h-[80vh] flex items-center justify-center bg-white text-gray-800 px-4 py-12 pt-32">
        <div className="flex justify-center w-full  max-w-md">
          <AnimatedCard>
            <h1 className="nanum-myeongjo-regular font-light text-[3rem] text-[#002642] mb-12">
  Login
</h1>


            <form onSubmit={handleSubmit} className="w-[120%] flex flex-col space-y-6">
<div className="flex flex-col">
  <input
    required
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-[#002742a2] hover:border-gray-300 font-serif shadow-md hover:shadow-lg transition-all placeholder:text-gray-500"
    placeholder="Email"
  />
</div>

<div className="flex flex-col">
  <input
    required
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-[#002742a1] hover:border-gray-300 font-serif shadow-md hover:shadow-lg transition-all  placeholder:text-gray-500"
    placeholder="Password"
  />
</div>


              <div className="flex justify-start">
                <button type="button" className="text-[#002642] hover:underline text-sm font-extralight" >
                  Forgot your password?
                </button>
              </div>

              <div className="flex justify-center w-full">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-[27%] py-3 px-6 bg-[#1A3C5A] text-white rounded-full font-serif hover:bg-[#003666] transition-all text-center"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button onClick={onSwitchToSignup} className="text-[#002642] underline font-extralight text-sm">
                Create account
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
      <div className="min-h-[80vh] flex items-center justify-center bg-white text-gray-800 px-4 py-12 pt-32">
        <div className="flex justify-center w-full max-w-md">
          <AnimatedCard>
            <h1 className="nanum-myeongjo-regular font-light text-[3rem] text-[#002642] mb-12">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="w-[120%] flex flex-col space-y-6">
              <div className="flex flex-col">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#002742a2] hover:border-gray-300 font-serif shadow-md hover:shadow-lg transition-all placeholder:text-gray-500"
                  placeholder="Full Name"
                />
              </div>

              <div className="flex flex-col">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#002742a2] hover:border-gray-300 font-serif shadow-md hover:shadow-lg transition-all placeholder:text-gray-500"
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col">
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#002742a2] hover:border-gray-300 font-serif shadow-md hover:shadow-lg transition-all placeholder:text-gray-500"
                  placeholder="Password"
                />
              </div>

              <div className="flex flex-col">
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#002742a2] hover:border-gray-300 font-serif shadow-md hover:shadow-lg transition-all placeholder:text-gray-500"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="flex justify-center w-full">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-1/3 py-3 px-6 bg-[#002642] text-white rounded-full font-serif hover:bg-[#003666] transition-all text-center"
                >
                  {loading ? "Creating..." : "Sign up"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button onClick={onSwitchToLogin} className="text-[#002642] underline font-extralight text-sm">
                Already have an account?
              </button>
            </div>
          </AnimatedCard>
        </div>
      </div>
    );
  },
};
