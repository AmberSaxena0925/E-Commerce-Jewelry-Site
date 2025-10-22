import React from "react";
import { AuthPages } from "../component/AuthPages"; 

export default function Signup() {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <>
      {showLogin ? (
        <AuthPages.LoginPage onSwitchToSignup={() => setShowLogin(false)} />
      ) : (
        <AuthPages.SignupPage onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </>
  );
}
