import React from 'react';
import './App.css';
import { auth } from './firebase-config';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';


function App() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <p>Welcome, {user.user.displayName}</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default App;
