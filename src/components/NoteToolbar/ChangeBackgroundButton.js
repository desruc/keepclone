import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import Popover from '@material-ui/core/Popover';

import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

import {
  backgroundColorStyles,
  getBackgroundColors
} from '../../constants/backgroundColors';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 134,
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5px 7px 3px',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius - 4
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
  ...backgroundColorStyles(theme)
}));

const ChangeBackgroundButton = forwardRef(({ onChange, currentColor }, ref) => {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (e) => {
    e.stopPropagation();
    setAnchorEl(e.target);
  };

  const closePopover = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleChange = (e, newColor) => {
    e.stopPropagation();
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
        ref={ref}
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
        {getBackgroundColors(theme).map(({ key, title }) => {
          const isSelected = key === currentColor;

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
              onClick={(e) => handleChange(e, key)}
              onKeyDown={(e) => handleChange(e, key)}
              className={buttonClass}
            >
              {isSelected && <CheckRoundedIcon />}
            </div>
          );
        })}
      </Popover>
    </>
  );
});

ChangeBackgroundButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentColor: PropTypes.string.isRequired
};

export default ChangeBackgroundButton;
