import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState } from "react";
import ListOfTodo from "./components/ListOfTodo";

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);

  const loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        if (userCred) {
          setAuth(true);
          window.localStorage.setItem("auth", "true");
        }
      });
  };

  return (
    <div className="App">
      <SignOut authHandler={setAuth} />
      {auth ? (
        <ListOfTodo token={token} />
      ) : (
        <button onClick={loginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
}

function SignOut({ authHandler }) {
  const handleSignOut = () => {
    window.localStorage.setItem("auth", "false");
    authHandler(false);
    firebase.auth().signOut();
  };
  return (
    firebase.auth().currentUser && (
      <button onClick={() => handleSignOut()}>Logout</button>
    )
  );
}

export default App;
