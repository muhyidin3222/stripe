import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useStyles from './style';
import { Divider, Drawer, InputBase } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Profile, SidebarNav } from './components';

const superAdminPages = [
  {
    titleMenu: 'ORDER',
    children: [
      {
        title: 'Transaksi',
        href: '/transaction',
        icon: <ShoppingBasketIcon />
      },
    ]
  },
];

const Sidebar = ({ open, variant, onClose, className, ...rest }) => {
  const [account, setAccount] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const account = localStorage.getItem('currentUser');
    setAccount(JSON.parse(account));
  }, []);

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div {...rest} className={clsx(classes.root, className)} style={{ padding: '0 0 16px 16px' }}>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
