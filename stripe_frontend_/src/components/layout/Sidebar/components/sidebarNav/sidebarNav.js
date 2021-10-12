/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors, Collapse, Divider } from '@material-ui/core';
import { Menu } from 'antd';

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
const { SubMenu } = Menu;

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    // fontWeight: theme.typography.fontWeightMedium,
    fontWeight: '400',
    '&:active': {
      border: "none",
      background: 'white'
    },
    '&:hover': {
      background: '#f3f3f3',
      color: '#D1901B'
      // fontWeight:'900'
    },
  },
  SubBtn: {
    height: '35px',
    paddingLeft: '35px',
    marginTop: '5px',
    '&:hover': {
      background: '#efefef',
      borderTopRightRadius: '1.875rem',
      borderBottomRightRadius: '1.875rem',
      width: '90%',
    },
  },
  icon: {
    // color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    // marginRight: theme.spacing(1),
    '&:hover': {
      color: '#D1901B'
    },
  },
  active: {
    color: '#D1901B',
    color: theme.palette.primary.main,
    // fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      // color: theme.palette.primary.main
    }
  },
  Subactive: {
    color: '#D1901B',
    // fontWeight: theme.typography.fontWeightMedium,
    background: '#efefef',
    borderTopRightRadius: '1.875rem',
    borderBottomRightRadius: '1.875rem',
    width: '90%',
  },
  titleMenu: {
    color: '#868e96',
    marginBottom: '7px',
    fontWeight: 700,
    fontSize: '12px',
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleClick () {
    setOpen(!open);
  }

  useEffect(() => {
    // classes.Subactive ? setOpen(true) : setOpen(false);
    if (classes.active) {
      setOpen(false);
    }
  }, [classes.active]);

  return (
    <div>
      <List
        {...rest}
        className={clsx(classes.root, className)}
        style={{ paddingRight: '15px' }}
      >
        {pages.map(v => (
          <div style={{ margin: '25px 0' }}>
            <p className={classes.titleMenu}>{v.titleMenu}</p>
            {
              v.children && v.children.map(page => (
                <>
                  <ListItem
                    className={classes.item}
                    disableGutters
                    key={page.title}
                  >
                    {
                      (page.items) && (page.items.length > 0) ?
                        <div
                          className={`${classes.button} ${classes.btnDropdown}`}
                          onClick={handleClick}
                          style={{ display: 'inherit', cursor: 'pointer' }}

                        >
                          <div className={classes.icon} style={{ float: 'left' }}>{page.icon}</div>
                          <label style={{ fontSize: '14.5px', cursor: 'pointer' }}>{page.title}</label>
                          {((page.items) && (page.items.length > 0)) && !open && <IconExpandMore style={{ position: 'absolute', right: '10' }} />}
                          {((page.items) && (page.items.length > 0)) && open && <IconExpandLess style={{ position: 'absolute', right: '10' }} />}
                        </div>
                        :
                        <Button
                          activeClassName={classes.active}
                          className={classes.button}
                          component={CustomRouterLink}
                          to={page.href}
                        >
                          <div className={classes.icon}>{page.icon}</div>
                          {page.title}
                        </Button>
                    }
                  </ListItem>
                  {
                    (page.items) && (page.items.length > 0) ?
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Divider />
                        <ListItem
                          className={classes.item}
                          disableGutters
                          key={page.title}
                          disablePadding
                        >
                          {page.items && page.items.map((subpage) => (
                            <Button
                              activeClassName={`${classes.Subactive}`}
                              className={`${classes.button} ${classes.SubBtn}`}
                              component={CustomRouterLink}
                              to={subpage.href}
                            >
                              <div className={classes.icon}>{subpage.icon}</div>
                              {subpage.title}
                            </Button>
                          ))}
                        </ListItem>

                      </Collapse>
                      :
                      null
                  }
                </>
              ))
            }
            <Divider />
          </div>
        ))}
      </List>

    </div>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
