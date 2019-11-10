/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Appbar from 'components/Appbar';
import Navbar from 'components/Navbar';
import QuestionsPage from 'containers/QuestionsPage';
import HistoryPage from 'containers/History';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Appbar />
      <Navbar />
      <Switch>
        <Route exact path="/" component={QuestionsPage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
