import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "../base";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const SignUp = ({ history, style, border, button, errorStyle }) => {
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [error, setError] = useState({});
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
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

  return (
    <div className={border}>
      <h3>SIGN UP</h3>
      <form className={style} onSubmit={handleSignUp}>
        <TextField
          error={emailErr}
          required
          label="Email"
          type="text"
          name="email"
        />
        <TextField
          error={passwordErr}
          required
          label="Password"
          type="password"
          name="password"
        />
        <p className={errorStyle}>{error && error.message}</p>
        <Button
          className={button}
          variant="outlined"
          color="primary"
          type="submit"
        >
          sign up
        </Button>
      </form>
    </div>
  );
};
export default withRouter(SignUp);
