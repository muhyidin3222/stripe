import React from 'react'

//material
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Container, CssBaseline, Typography } from '@material-ui/core';

//style
import useStyles from 'assets/style/component/layout/archIntroLayout'

export default (props) => {
    const { title } = props
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                {props.children}
            </div>
        </Container>
    )
}