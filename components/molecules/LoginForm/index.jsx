import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./styles.module.scss";
import * as authReducer from "@/store/reducers/authSlice";
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

import { auth } from "@/utils/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import * as useDb from "@/utils/database";

function Index() {
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const checkAuth = useSelector((state) => state.auth);
  const router = useRouter();

  React.useEffect(() => {
    if (checkAuth.accessToken && checkAuth.accessToken !== null) {
      router.replace("/");
    }
  }, []);

  const manualLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        useDb.getData(`users/${user?.uid}`, (snapshot) => {
          const users = snapshot.val();
          if (users) {
            // store user data to redux
            dispatch(
              authReducer.setAuth({
                user: {
                  uid: user?.uid,
                  fullname: user?.fullname,
                  email: user?.email,
                  emailVerified: user?.emailVerified,
                  photoURL: user?.photoURL,
                },
                accessToken: user.accessToken,
              })
            );
          }
        });

        // // set status online
        // useDb
        //   .updateData(`users/${user?.uid}`, {
        //     isOnline: true,
        //   })
        //   .then(() => {
        //     console.log("data updated");
        //   })
        //   .catch((err) => console.log(err));
        // ...

        setIsError(false);
        setIsSuccess(true);
        router.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setIsSuccess(false);
        setIsError(true);
        setErrorMsg(errorCode);
      });
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setIsError(false);
        setIsSuccess(true);
        // IdP data available using getAdditionalUserInfo(result)
        // store user data to redux
        dispatch(
          authReducer.setAuth({
            user: {
              uid: user?.uid,
              fullname: user?.displayName || fullname,
              email: user?.email,
              emailVerified: user?.emailVerified || false,
              photoURL: user?.photoURL,
              accessToken: user.accessToken,
            },
            accessToken: user.accessToken,
          })
        );
        // ...
        router.replace("/");
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
    <Card
      variant="outlined"
      className={`${styles.cardLogin}`}
      sx={{ borderRadius: "30px" }}
    >
      <Container>
        <Typography variant="h1" className={`${styles.title}`}>
          LOGIN
        </Typography>

        <Typography className={`${styles.subTitle}`} paragraph={true}>
          Hi, Welcome back!
        </Typography>

        <TextField
          required
          id="standard-required"
          label="Email"
          defaultValue=""
          variant="standard"
          fullWidth
          sx={{
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
              Login is successfully!
            </Alert>
          </React.Fragment>
        )}

        <Button className={`${styles.btnForgotPassword}`}>
          Forgot password?
        </Button>

        <Button
          className={`${styles.btnLogin}`}
          size="large"
          fullWidth
          onClick={manualLogin}
        >
          <b>Login</b>
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
            Login with
          </Typography>
        </Divider>

        <Button
          size="large"
          fullWidth
          variant="outlined"
          className={`${styles.btnLoginGoogle}`}
          onClick={googleLogin}
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
            Don’t have an account?
            <Button className={`${styles.btnPrimary}`}>
              <Link href="/auth/register">
                <b>Sign Up</b>
              </Link>
            </Button>
          </Typography>
        </Container>
      </Container>
    </Card>
  );
}

export default Index;
