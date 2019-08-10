import * as React from 'react';
import * as DOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '~main.scss';
import { Application } from '~views/application';

DOM.render((
  <Router>
    <Switch>
      <Route path='/' component={Application}/>
    </Switch>
  </Router>
),
document.getElementById('app'));
