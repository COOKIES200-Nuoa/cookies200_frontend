import * as React from "react";

import loginImg from "../../../assets/img/bg.jpeg";
import logo from "../../../assets/img/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { setLocalStorage } from "../../../helpers";

const Copyright = (props: any) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link to="#">
                Nuoa
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const Login: React.FC = (): JSX.Element => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = {
            username: username,
            password: password, 
        }

        console.log("userData: ", userData);

        //? saving username and password state to redux / localStorage
        setLocalStorage("LOGIN_USER", JSON.stringify(userData))

        //? 
        navigate("/")
    };

    return (
        <Grid container component="div" sx={{ height: "100vh" }}>
            <Grid
                item
                xs={false}
                sm={false}
                md={6}
                sx={{
                    backgroundImage: `url(${loginImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid
                item
                xs={12}
                sm={12}
                md={6}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                    }}
                    className="sm:my-8 sm:mx-4 m-0 md:p-10 p-3"
                >
                    <img className="mb-5" src={logo} width={60} height={60} />
                    <Typography component="h1" className="!font-bold !text-3xl">
                        Welcome Back!
                    </Typography>
                    <Typography
                        component="p"
                        className="!font-medium !text-slate-600"
                    >
                        Please fill in your account information
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                        className="w-full"
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            size="medium"
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, p: 1 }}
                            className="!bg-green-600 !font-bold"
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                            </Grid>
                            <Grid item>
                                <Link to="#" className="!font-semibold !text-md text-blue-500">
                                    Forgot your password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
