import React from 'react';
import { auth } from '../firebase-config';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

interface LoginProps {
  onLogin: () => void; // Callback to notify App when login succeeds
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      if (auth.currentUser) {
        onLogin(); // Notify App that login was successful
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="login-container">
      {user ? (
        <>
          <h1 className="login-title">Welcome to StyleNest</h1>
          <p className="welcome-message">Hello, {user.user.displayName}!</p>
          <button className="login-button" onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h1 className="login-title">Login to StyleNest</h1>
          <button className="login-button" onClick={handleSignIn}>
            Sign In with Google
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
