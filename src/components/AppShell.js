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

import FullscreenLoader from './FullscreenLoader';
import Navigation from './Navigation';
import ManageLabelsModal from './Modals/ManageLabelsModal';
import ToastNotification from './ToastNotification';
import EditNoteModal from './Modals/EditNoteModal';
import Notes from '../pages/Notes';
import LabelNotes from '../pages/LabelNotes';
import Archive from '../pages/Archive';
import Trash from '../pages/Trash';
import NotFound from '../pages/NotFound';

import { lightTheme, darkTheme } from '../constants/themes';
import { selectColorMode } from '../redux/reducer';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(4)
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
        <FullscreenLoader />
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
              <Route exact path="/archive" component={Archive} />
              <Route exact path="/trash" component={Trash} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Box>
        <ManageLabelsModal open={showLabelModal} closeModal={closeLabelModal} />
        <EditNoteModal />
        <ToastNotification />
      </ThemeProvider>
    </DndProvider>
  );
};

export default AppShell;
