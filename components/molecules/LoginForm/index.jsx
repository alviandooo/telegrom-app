import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./styles.module.scss";
import {
  Button,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

function index() {
  return (
    <Card variant="outlined" className={`${styles.cardLogin}`}>
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
        />

        <Button className={`${styles.btnForgotPassword}`}>
          Forgot password?
        </Button>

        <Button className={`${styles.btnLogin}`} size="large" fullWidth>
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

export default index;
