import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(4),
    backgroundColor: '#fff',
    padding: '0 32px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 0 5px 0 rgba(0,0,0,.26)',
    marginTop:'auto',
    minHeight: '50px',
    height: '50px',
    maxHeight: '50px',
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        Copyright ABCD Coffee
        &copy;{' '}
        <Link
          component="a"
          href="https://abcd.coffee/"
          target="_blank"
        >
        </Link>
        2021
      </Typography>
      <Typography variant="caption">
        Develop by <a href="https://wit.id" target="_blank" style={{color:'red'}}>WIT.id</a>
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
