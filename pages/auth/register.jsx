import Head from "next/head";
import React from "react";
import RegisterForm from "@/components/molecules/RegisterForm/Index";
import { Grid } from "@mui/material";

function register() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Register | Telegrom </title>
      </Head>
      <main>
        <Grid
          container
          className="d-flex vh-100 justify-content-center align-items-center"
        >
          <Grid item xs={10} sm={6} md={4} lg={4} xl={3}>
            <RegisterForm />
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default register;
