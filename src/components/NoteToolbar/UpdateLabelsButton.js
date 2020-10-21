import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
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
  listItem: {
    paddingBottom: 0,
    paddingTop: 0,
    '& .MuiListItemIcon-root': {
      minWidth: 36
    }
  }
}));

const UpdateLabelsButton = forwardRef(({ noteLabels, onChange }, ref) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const labels = useSelector((state) => selectLabels(state));

  const openMenu = (e) => setAnchorEl(e.target);
  const closeMenu = () => setAnchorEl(null);

  const handleClick = (label) => {
    const isString = typeof label === 'string';
    if (isString) onChange(label);
  };

  const isOpen = Boolean(anchorEl);

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
        onClick={handleClick}
        PaperProps={{
          className: classes.paper
        }}
      >
        <Typography className={classes.title}>Label note</Typography>
        {labels.map(({ id, label }) => (
          <ListItem
            key={id}
            button
            className={classes.listItem}
            onClick={() => handleClick(label)}
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
      </Popover>
    </>
  );
});

UpdateLabelsButton.propTypes = {
  noteLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default UpdateLabelsButton;
