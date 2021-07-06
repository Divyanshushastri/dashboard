import React, { useCallback, useContext, useState } from "react";
import { Redirect, withRouter } from "react-router";
import SignUp from "./SignUp";
import app from "../base";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../Auth";
import Button from "@material-ui/core/Button";

const Login = ({ history }) => {
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [error, setError] = useState({});
  const classes = useStyles();
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (err) {
        if (err.code.match("email")) {
          setEmailErr(true);
        } else {
          setPasswordErr(true);
        }
        setError(err);
      }
    },
    [history]
  );
  const currentUser = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div
      className={classes.background}
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80")`,
      }}
    >
      <div className="container px-4">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2 d-flex flex-column flex-lg-row justify-content-between py-5">
            <div className={`${classes.blackBorder} p-5`}>
              <h3>LOG-IN</h3>
              <form className={classes.root} onSubmit={handleLogin}>
                <TextField
                  error={emailErr}
                  label="Email"
                  required
                  type="text"
                  name="email"
                />
                <TextField
                  error={passwordErr}
                  label="Password"
                  required
                  type="password"
                  name="password"
                />
                <p className={classes.error}> {error && error.message}</p>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </div>
            <div>
              <SignUp
                style={classes.root}
                errorStyle={classes.error}
                border={`${classes.blackBorder} p-5`}
                button={classes.button}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Login);

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "#111c33",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: "200px",
      maxWidth: "280px",
      display: "flex",
      flexDirection: "column",
    },
  },
  error: {
    color: "red",
  },
  blackBorder: {
    minWidth: "280px",
    maxWidth: "360px",
    marginTop: "30px",
    backgroundColor: "rgb(184,182,200)",
    border: "2px solid #6781ab",
    borderRadius: "8px",
  },
  button: {
    width: "100%",
    margin: "20px 0px 0px 0px",
  },
}));
