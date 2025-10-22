import React from "react";
import { AuthPages } from "../component/AuthPages"; 

export default function Login() {
  const [showSignup, setShowSignup] = React.useState(false);

  return (
    <>
      {showSignup ? (
        <AuthPages.SignupPage onSwitchToLogin={() => setShowSignup(false)} />
      ) : (
        <AuthPages.LoginPage onSwitchToSignup={() => setShowSignup(true)} />
      )}
    </>
  );
}
