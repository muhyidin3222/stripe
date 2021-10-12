import React from 'react';
import {useState, useEffect} from 'react'
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: '80%',
    height: 'auto',
    borderRadius:0,
    padding: '20px',
    paddingLeft:0
  },
  name: {
    // marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const user = {
    // name: 'Welcome, '+currentUser.username,
    avatar: '/images/logos/abc-black.png',
    // bio: 'Brain Director'
    // name: currentUser.nama,
    // avatar: '/images/avatars/avatar_11.png',
    // bio: currentUser.email
  };

  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  //   console.log(currentUser);
  //   console.log('aa');
  // })

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      {/* <Typography
        className={user.nama}
        variant="h4"
        style={{fontSize:'18px'}}
      >
        {user.name}
      </Typography> */}
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
