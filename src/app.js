import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import Authorization from './hoc/authorization';

const App = () => {
  const renderSwitch = () => (
    <Switch>
      {routes.map(route => {
        const component = route.isPrivate ? Authorization(route.component) : route.component;
        return (
          <Route
            key={route.path}
            exact={route.isExact}
            path={route.path}
            component={component}
          />
        );
      })}
    </Switch>
  );

  return (
    <Router>
      <React.Fragment>
        <div id='ui-content'>
          {renderSwitch()}
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;
