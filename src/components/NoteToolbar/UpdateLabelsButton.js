import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { selectLabels } from '../../redux/reducer';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 225,
    paddingTop: 10,
    borderRadius: theme.shape.borderRadius - 4
  },
  title: {
    fontSize: 14,
    padding: `0px ${theme.spacing(1.5)}px`
  },
  noLabels: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& .MuiTypography-root': {
      fontSize: 12
    }
  },
  bold: {
    fontWeight: 600
  },
  list: {
    maxHeight: 250,
    overflow: 'auto'
  },
  listItem: {
    paddingBottom: 0,
    paddingTop: 0,
    '& .MuiTypography-root': {
      fontSize: 14
    },
    '& .MuiListItemIcon-root': {
      minWidth: 36
    }
  }
}));

const UpdateLabelsButton = forwardRef(({ noteLabels, onChange }, ref) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const labels = useSelector((state) => selectLabels(state));

  const openMenu = (e) => {
    e.stopPropagation();
    setAnchorEl(e.target);
  };

  const closeMenu = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleClick = (e, label) => {
    e.stopPropagation();
    onChange(label);
  };

  const isOpen = Boolean(anchorEl);
  const noLabels = !labels.length;

  const noLabelsJsx = (
    <div className={classes.noLabels}>
      <Typography align="center" className={classes.bold}>
        You have no labels!
      </Typography>
      <Typography align="center">Create some via the side menu</Typography>
    </div>
  );

  return (
    <>
      <IconButton
        title="Manage labels"
        aria-label="manage-labels"
        size="small"
        onClick={openMenu}
      >
        <LabelOutlinedIcon />
      </IconButton>
      <Popover
        ref={ref}
        open={isOpen}
        onClose={closeMenu}
        anchorEl={anchorEl}
        PaperProps={{
          className: classes.paper
        }}
      >
        <Typography className={classes.title}>Label note</Typography>
        {noLabels && noLabelsJsx}
        {!noLabels && (
          <List className={classes.list}>
            {labels.map(({ id, label }) => (
              <ListItem
                key={id}
                button
                className={classes.listItem}
                onClick={(e) => handleClick(e, label)}
              >
                <ListItemIcon>
                  <Checkbox
                    size="small"
                    edge="start"
                    checked={noteLabels.some((l) => l === label)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': label }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={id}
                  primary={label}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Popover>
    </>
  );
});

UpdateLabelsButton.propTypes = {
  noteLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default UpdateLabelsButton;
