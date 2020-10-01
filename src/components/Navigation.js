import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

// Material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

import DrawerItem from './DrawerItem';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: theme.palette.background.default,
    boxShadow: `inset 0 -1px 0 0 ${theme.palette.divider}`
  },
  iconButton: {
    marginLeft: -6
  },
  icon: {
    color: theme.palette.text.primary
  },
  menuButton: {
    marginRight: 36
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(11) + 2
    }
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
    border: 'none'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }
}));

export default function Navigation() {
  // Hooks
  const classes = useStyles();
  const { pathname } = useLocation();

  // Hook state
  const [open, setOpen] = useState(false);

  // Event handlers
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Classes
  const appBarClasses = clsx({
    [classes.appBar]: true
  });

  const toggleMenuButtonClass = clsx({
    [classes.icon]: true,
    [classes.iconButton]: true,
    [classes.menuButton]: true
  });

  const drawerClass = clsx({
    [classes.drawer]: true,
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open
  });

  const drawerPaperClass = clsx({
    [classes.drawerPaper]: true,
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open
  });

  // Separate menu items to avoid duplication
  const drawerLinks = (
    <List>
      <DrawerItem
        to="/notes"
        icon="bulb"
        label="Notes"
        active={pathname === '/notes' || pathname === '/'}
        drawerOpen={open}
      />
      {/* TODO: Render tag links */}
      <DrawerItem
        to="/archive"
        icon="archive"
        label="Archive"
        active={pathname === '/archive'}
        drawerOpen={open}
      />
      <DrawerItem
        to="/trash"
        icon="trash"
        label="Trash"
        active={pathname === '/trash'}
        drawerOpen={open}
      />
    </List>
  );

  return (
    <>
      <AppBar position="fixed" className={appBarClasses}>
        <Toolbar>
          <Box flex={1}>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={toggleDrawer}
              className={toggleMenuButtonClass}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          className={classes.drawer}
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          {drawerLinks}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          variant="permanent"
          className={drawerClass}
          classes={{ paper: drawerPaperClass }}
        >
          <div className={classes.toolbar} />
          {drawerLinks}
        </Drawer>
      </Hidden>
    </>
  );
}
