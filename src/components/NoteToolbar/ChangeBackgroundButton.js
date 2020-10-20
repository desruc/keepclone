import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import Popover from '@material-ui/core/Popover';

import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

const backgroundColors = [
  {
    key: 'default',
    title: 'Default',
    color: 'transparent'
  },
  {
    key: 'red',
    title: 'Red',
    color: '#5c2b29'
  },
  {
    key: 'light-brown',
    title: 'Light Brown',
    color: '#614a19'
  },
  {
    key: 'yellow',
    title: 'Yellow',
    color: '#635d19'
  },
  {
    key: 'green',
    title: 'Green',
    color: '#345920'
  },
  {
    key: 'aqua',
    title: 'Aqua',
    color: '#16504b'
  },
  {
    key: 'light-blue',
    title: 'Light Blue',
    color: '#2d555e'
  },
  {
    key: 'blue',
    title: 'Blue',
    color: '#1e3a5f'
  },
  {
    key: 'purple',
    title: 'Purple',
    color: '#42275e'
  },
  {
    key: 'pink',
    title: 'Pink',
    color: '#5b2245'
  },
  {
    key: 'brown',
    title: 'Brown',
    color: '#442f19'
  },
  {
    key: 'grey',
    title: 'Grey',
    color: '#3c3f43'
  }
];

const backgroundColorStyles = () => {
  const styles = {};
  backgroundColors.forEach((c) => {
    styles[c.key] = {
      backgroundColor: c.color
    };
  });
  return styles;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 134,
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5px 7px 3px'
  },
  button: {
    borderRadius: '50%',
    height: 26,
    width: 26,
    border: '1px solid',
    borderColor: 'transparent',
    margin: 2,
    cursor: 'pointer',
    '&:hover': {
      borderColor: theme.palette.text.primary
    }
  },
  selected: {
    borderColor: theme.palette.text.primary
  },
  defaultBorder: {
    borderColor: theme.palette.divider
  },
  ...backgroundColorStyles()
}));

const ChangeBackgroundButton = ({ onChange, currentColor }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (e) => setAnchorEl(e.target);
  const closePopover = () => setAnchorEl(null);

  const handleChange = (newColor) => {
    onChange(newColor);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton
        title="Change colour"
        aria-label="change-colour"
        size="small"
        onClick={openPopover}
      >
        <BrushOutlinedIcon />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        PaperProps={{
          className: classes.paper
        }}
      >
        {backgroundColors.map(({ key, title, color: buttonColor }) => {
          const isSelected = buttonColor === currentColor;

          const buttonClass = clsx({
            [classes.button]: true,
            [classes[key]]: true,
            [classes.selected]: isSelected,
            [classes.defaultBorder]: key === 'default'
          });

          return (
            <div
              key={key}
              role="button"
              aria-label={`change to ${title}`}
              title={title}
              tabIndex={0}
              onClick={() => handleChange(buttonColor)}
              onKeyDown={() => handleChange(buttonColor)}
              className={buttonClass}
            >
              {isSelected && <CheckRoundedIcon />}
            </div>
          );
        })}
      </Popover>
    </>
  );
};

ChangeBackgroundButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentColor: PropTypes.string.isRequired
};

export default ChangeBackgroundButton;
