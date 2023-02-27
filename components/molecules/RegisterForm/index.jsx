import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./styles.module.scss";
import {
  Alert,
  Button,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";

function Index() {
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const provider = new GoogleAuthProvider();

  const manualRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setIsError(false);
        setIsSuccess(true);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsSuccess(false);
        setIsError(true);
        setErrorMsg(errorCode);
      });
  };

  const googleRegister = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setIsError(false);
        setIsSuccess(true);
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        setIsSuccess(false);
        setIsError(true);
        setErrorMsg(errorCode);
      });
  };

  return (
    <Card variant="outlined" className={`${styles.cardRegister}`}>
      <Container>
        <Typography variant="h1" className={`${styles.title}`}>
          Register
        </Typography>

        <Typography className={`${styles.subTitle}`} paragraph={true}>
          Hi, Welcome back!
        </Typography>

        <TextField
          required
          id="standard-required"
          label="Name"
          defaultValue=""
          variant="standard"
          fullWidth
          sx={{
            fontSize: "10px",
          }}
          onChange={(e) => setFullname(e.target.value)}
        />

        <TextField
          required
          id="standard-required"
          label="Email"
          defaultValue=""
          variant="standard"
          fullWidth
          sx={{
            marginTop: "20px",
            fontSize: "10px",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          required
          id="standard-required"
          label="Password"
          defaultValue=""
          variant="standard"
          type="password"
          fullWidth
          sx={{
            fontSize: "10px",
            marginTop: "20px",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isError && (
          <React.Fragment>
            <Alert
              variant="outlined"
              sx={{ marginTop: "20px", marginBottom: "-10px" }}
              severity="error"
            >
              {errorMsg}
            </Alert>
          </React.Fragment>
        )}

        {isSuccess && (
          <React.Fragment>
            <Alert
              variant="outlined"
              sx={{ marginTop: "20px", marginBottom: "-10px" }}
              severity="success"
            >
              Register is successfully!
            </Alert>
          </React.Fragment>
        )}

        <Button
          className={`${styles.btnRegister}`}
          size="large"
          fullWidth
          onClick={manualRegister}
        >
          <b>Register</b>
        </Button>

        <Divider
          sx={{
            marginTop: "25px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              marginX: "30px",
              color: "#848484",
            }}
          >
            Register with
          </Typography>
        </Divider>

        <Button
          size="large"
          fullWidth
          variant="outlined"
          className={`${styles.btnRegisterGoogle}`}
          onClick={googleRegister}
        >
          <GoogleIcon
            sx={{
              marginRight: "10px",
            }}
          />
          <b>Google</b>
        </Button>

        <Container
          sx={{
            marginTop: "40px",
            textAlign: "center",
          }}
        >
          <Typography>
            Already have an account?
            <Button className={`${styles.btnPrimary}`}>
              <Link href="/auth/login">
                <b>Sign In</b>
              </Link>
            </Button>
          </Typography>
        </Container>
      </Container>
    </Card>
  );
}

export default Index;
