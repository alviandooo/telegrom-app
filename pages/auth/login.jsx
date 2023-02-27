import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";
import LoginForm from "@/components/molecules/LoginForm/Index";

function login() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Login | Telegrom</title>
      </Head>
      <main>
        <Grid
          container
          className="d-flex vh-100 justify-content-center align-items-center"
        >
          <Grid item xs={10} sm={6} md={4} lg={4} xl={3}>
            <LoginForm />
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default login;
