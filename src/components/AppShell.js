import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Navigation from './Navigation';
import ManageLabelsModal from './Modals/ManageLabelsModal';
import Notes from '../pages/Notes';
import LabelNotes from '../pages/LabelNotes';
import NotFound from '../pages/NotFound';

import { lightTheme, darkTheme } from '../constants/themes';
import { selectColorMode } from '../redux/reducer';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(16)
  }
}));

const AppShell = () => {
  // Hooks
  const classes = useStyles();

  // Local state
  const [showLabelModal, setShowLabelModal] = useState(false);

  // Redux
  const colorMode = useSelector((state) => selectColorMode(state));

  // Event handlers
  const openLabelModal = () => setShowLabelModal(true);
  const closeLabelModal = () => setShowLabelModal(false);

  // Constants
  const theme = colorMode === 'light' ? lightTheme : darkTheme;

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box id="page-wrap" display="flex">
          <Navigation colorMode={colorMode} openLabelManager={openLabelModal} />
          <Container
            id="content-container"
            maxWidth="xl"
            className={classes.container}
          >
            <Switch>
              <Route exact path={['/', '/notes']} component={Notes} />
              <Route exact path="/label/:label" component={LabelNotes} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Box>
        <ManageLabelsModal open={showLabelModal} closeModal={closeLabelModal} />
      </ThemeProvider>
    </DndProvider>
  );
};

export default AppShell;
