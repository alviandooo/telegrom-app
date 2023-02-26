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

        <Button className={`${styles.btnRegister}`} size="large" fullWidth>
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

export default index;
