import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import './index.sass';

/* ------------------------------------------------------------------- */
/*                              Import My Components
/* ------------------------------------------------------------------- */

import Main from './containers/Main';
import Schedule from './containers/Schedule';

/* ------------------------------------------------------------------- */
/*                              ReactDOM.render
/* ------------------------------------------------------------------- */

const App = (
  <Router>
    <Fragment>
      <Route path='/' exact component={Main} />
      <Route path='/:date' component={Schedule} />
    </Fragment>
  </Router>
)

ReactDOM.render(
  App,
  document.getElementById('root')
);

/* ------------------------------------------------------------------- */
/*                              Service workers
/* ------------------------------------------------------------------- */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
