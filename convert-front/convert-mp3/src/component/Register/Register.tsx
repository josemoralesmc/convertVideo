import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
  });
  const [checkEmailValid, setCheckEmailValid] = useState(true);
  const [warningInput, setWarningInput] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const registerUser = async () => {
    setShowWarning(false);
    const isValidEmail = checkEmailInput();
   
    if (!user.name || !user.password) {
      setWarningInput(true)
      return
    }

    setCheckEmailValid(isValidEmail);
    if (!isValidEmail) {
      return;
    }
    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await response.json();
    console.log(res);
    if (!res.success == true) {
      navigate("/");
    } else {
      setShowWarning(true);
    }
  };
  const checkEmailInput = () => {
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(user.mail);
  };
  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={1}>
          <TextField
            onChange={handleChange}
            name="name"
            id="name"
            label="Name"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            onChange={handleChange}
            name="mail"
            id="mail"
            label="Email"
            defaultValue=""
          />
          {!checkEmailValid && (
            <p style={{color:"red"}}>
              Please enter valid email
            </p>
          )}
          {showWarning && (
            <p style={{color:"red"}}>Email already exist</p>
          )}
        </Grid>
        <Grid item xs={1}>
          <TextField
            onChange={handleChange}
            name="password"
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        {warningInput && (
          <p style={{color:"red"}}>
          All fields are required</p>
        )}
        <Grid item xs={2}>
          <Button onClick={registerUser} variant="contained">
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
