import React from 'react'; // potentially import useEffect here
import { auth } from '../firebase-config'; // need to import db here
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
// import { doc, setDoc } from 'firebase/firestore'

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

// I couldnt get this code to work and route to the homepage correctly. It was bringing me to a screen that looked like our login page but wiht a signout button
// these code segments would go under "  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);"
/*
const result = await signInWithGoogle();
      if (result?.user) { // need to save userID into firebase db
        const {uid, displayName} = result.user
        await setDoc (doc(db, 'users', uid), {
          uid,
          displayName
        }, {merge: true}); // dont want to overwrite existing data

*/

/*useEffect(() => {
    const storeUserData = async () => {
      if (auth.currentUser) {
        const currentUser = auth.currentUser;

        // Store user data in Firestore
        await setDoc(doc(db, "users", currentUser.uid), {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "Anonymous",
          email: currentUser.email,
          createdAt: new Date().toISOString(),
        });

        // Notify parent component (if needed)
        onLogin();
      }
    };

    if (auth.currentUser) {
      storeUserData().catch((err) => console.error("Error storing user data:", err));
    }
  }, [auth.currentUser, onLogin]);
 */