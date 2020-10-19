import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';

import MenuIcon from '@material-ui/icons/Menu';

import UserAuth from './UserAuth';
import DrawerItem from './DrawerItem';

import { selectLabels, selectSelectedLabel } from '../redux/reducer';
import { CHANGE_COLOR_MODE } from '../redux/types';

const computeHeading = (pathname, currentLabel) => {
  if (currentLabel) return currentLabel.label;

  switch (pathname) {
    case '/archive':
      return 'Archive';

    case '/trash':
      return 'Trash';

    default:
      return 'Notes';
  }
};

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
  },
  pageHeading: {
    fontWeight: 600
  }
}));

const Navigation = ({ colorMode, openLabelManager }) => {
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // Hook state
  const [open, setOpen] = useState(true);

  // Redux
  const labels = useSelector((state) => selectLabels(state));
  const { label: selectedLabel } = useSelector((state) => selectSelectedLabel(state));

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

  // Constants
  const computedLabel = pathname.includes('/label/') && selectedLabel;
  const lightMode = colorMode === 'light';

  // Toggle color modes
  const toggleColorMode = () => {
    dispatch({
      type: CHANGE_COLOR_MODE,
      colorMode: lightMode ? 'dark' : 'light'
    });
  };

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
      {labels.map(({ label }) => (
        <DrawerItem
          key={label}
          to={`/label/${label}`}
          label={label}
          active={pathname.includes('/label/') && label === selectedLabel}
          drawerOpen={open}
        />
      ))}
      <DrawerItem
        variant="button"
        icon="pencil"
        label="Edit labels"
        onClick={openLabelManager}
        drawerOpen={open}
      />
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
          <Box flex={1} display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={toggleDrawer}
              className={toggleMenuButtonClass}
            >
              <MenuIcon />
            </IconButton>
            <Typography color="textPrimary" className={classes.pageHeading}>
              {computeHeading(pathname, computedLabel)}
            </Typography>
          </Box>
          <Box>
            <UserAuth />
            <Switch
              checked={!lightMode}
              onChange={toggleColorMode}
              title="Theme switch"
              name="themeSwitch"
              inputProps={{ 'aria-label': 'theme switch' }}
              size="small"
            />
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
};

Navigation.propTypes = {
  colorMode: PropTypes.string.isRequired,
  openLabelManager: PropTypes.func.isRequired
};

export default Navigation;
