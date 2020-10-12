import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import BulbIcon from '@material-ui/icons/EmojiObjectsOutlined';
import TagIcon from '@material-ui/icons/LabelOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none'
  },
  action: {
    width: '100%',
    minHeight: 50,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    outline: 'none !important',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    border: '1px solid',
    borderColor: 'transparent',
    transition: theme.transitions.create(
      ['padding', 'margin', 'border-radius', 'width'],
      {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
      }
    ),
    '& .MuiListItemIcon-root': {
      padding: '0px 12px'
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '&:focus': {
      borderColor: 'rgba(0, 0, 0, 0.6)'
    }
  },
  actionOpen: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  actionClosed: {
    width: 50,
    borderRadius: '50%',
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0),
    '& .MuiListItemIcon-root': {
      minWidth: 0
    }
  },
  listItem: {
    width: 'auto',
    backgroundColor: 'transparent',
    padding: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  activePath: {
    backgroundColor: `${theme.palette.warning.light} !important`,
    '& .MuiTypography-root': {
      color: `${theme.palette.text.primary} !important`
    },
    '& .MuiListItemIcon-root': {
      color: `${theme.palette.text.primary} !important`
    }
  }
}));

const DrawerItem = ({
  variant,
  to,
  onClick,
  active,
  icon,
  label,
  drawerOpen
}) => {
  // Hooks
  const classes = useStyles();
  const history = useHistory();

  const listItemClass = clsx({
    [classes.listItem]: true,
    [classes.listItemOpen]: drawerOpen,
    [classes.listItemClosed]: !drawerOpen
  });

  const linkClass = clsx({
    [classes.action]: true,
    [classes.actionOpen]: drawerOpen,
    [classes.actionClosed]: !drawerOpen,
    [classes.activePath]: active
  });

  const listItemTextClass = clsx({
    [classes.listItemText]: true,
    [classes.hide]: !drawerOpen
  });

  const icons = {
    bulb: <BulbIcon />,
    tag: <TagIcon />,
    archive: <ArchiveIcon />,
    trash: <TrashIcon />,
    pencil: <EditOutlinedIcon />
  };

  const isLink = variant === 'link';
  const computedOnClick = isLink ? () => history.push(to) : onClick;

  return (
    <ListItem className={listItemClass}>
      <Box
        onClick={computedOnClick}
        className={linkClass}
        role="button"
        tabIndex={0}
      >
        <ListItemIcon>{icons[icon]}</ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            noWrap: true
          }}
          primary={label}
          className={listItemTextClass}
          classes={{ primary: classes.listItemText }}
        />
      </Box>
    </ListItem>
  );
};

DrawerItem.propTypes = {
  variant: PropTypes.oneOf(['link', 'button']),
  to: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  icon: PropTypes.oneOf(['bulb', 'tag', 'archive', 'trash', 'pencil']),
  label: PropTypes.string.isRequired,
  drawerOpen: PropTypes.bool.isRequired
};

DrawerItem.defaultProps = {
  variant: 'link',
  to: '',
  onClick: null,
  active: false,
  icon: 'tag'
};

export default DrawerItem;
