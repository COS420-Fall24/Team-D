import React from 'react';
import './App.css';

import {auth} from "./firebase-config";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";


function App() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth); // user state (user information), loading (t/f on if they are signing in, error if something goes wrong

  return (
    <div className="App">
      <div>
      <button onClick={() => signInWithGoogle()}>Sign In</button>
      </div>
    </div>
  );
}

export default App;
