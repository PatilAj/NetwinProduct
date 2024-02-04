import { useState } from "react";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { TextField, Button, Container, Grid } from '@mui/material';
import './login.css';
import { useAuth } from "../AuthProvider/AuthProvider";
import { FormHelperText } from '@mui/material';

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("pleae provide a valid input");
  };

  return (
<>
      <div className="login-container">
        <Container maxWidth="xs">
          <h1 className='heading'><ConnectWithoutContactIcon style={{ width: '3em', height: '4em' }} />Netwin Product</h1>
          <form onSubmit={handleSubmitEvent}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User Name"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  aria-invalid="false"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                fullWidth
                  label="Password"
                  placeholder="password"
                  type="password"
                  id="password"
                  name="password"
                  aria-invalid="false"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} color='danger'>
              {auth.loginError && <FormHelperText error>{auth.loginError}</FormHelperText>}
            </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ fontSize: '18px' }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
        </div>
      </>
      )
};
export default Login;

