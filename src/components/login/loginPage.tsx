import { ChangeEvent, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../providers/auth";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        if (user && setUser) {
          setUser(user);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const setPasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        if (user && setUser) {
          setUser(user);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginInWithEmailAndPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user && setUser) {
          setUser(user);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card>
      <CardContent sx={{ "& .MuiTextField-root": { mb: 2 } }}>
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={setEmailValue}
        />
        <TextField
          id="filled-basic"
          label="Password"
          variant="filled"
          fullWidth
          value={password}
          onChange={setPasswordValue}
          type="password"
        />
      </CardContent>
      <CardActions>
        <Button color="primary" variant="text" onClick={signUp}>
          Register
        </Button>
        <Button variant="text" onClick={loginInWithEmailAndPassword}>
          Login
        </Button>
        <Button variant="text" onClick={loginInWithGoogle}>
          Login with Google
        </Button>
      </CardActions>
    </Card>
  );
};
