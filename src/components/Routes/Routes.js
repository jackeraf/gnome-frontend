import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GnomeList from '../../containers/GnomeList/GnomeList';
import GnomeDetail from '../../containers/GnomeDetail/GnomeDetail';
import './Routes.css';

class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Router>
          <Switch>
            {this.props.children}
            <Route path="/" component={GnomeList} exact={true} />
            <Route path="/:id" component={GnomeDetail}  />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
