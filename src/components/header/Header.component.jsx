import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "#ffffff"
    },
    btn:{
        flexGrow: 1,
        justifyContent: 'flex-end',
        display: 'flex'
    }
}))
const Header = () => {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', false);
    },[])

    const onLogIn = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
    }

    const onLogOut = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', false);
    }

    return (
        <>
            <AppBar variant="elevation" color="primary">
                <Toolbar>
                    {/* <Typography variant="h6" >Home</Typography> */}
                    <Button color="inherit"><Link to="/" className={classes.link}>Home</Link></Button>
                    <Button color="inherit"><Link to="/student" className={classes.link}>Student</Link></Button>
                    <Button color="inherit"><Link to="/teacher" className={classes.link}>Teacher</Link></Button>
                    <div className={classes.btn} >
                        {!isLoggedIn && <Button color="inherit" onClick={onLogIn}>LogIn</Button>}
                        {isLoggedIn && <Button color="inherit" onClick={onLogOut}>LogOut</Button>}
                        
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;