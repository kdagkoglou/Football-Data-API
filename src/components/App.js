import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompsList from './competitions/comps';
import CompInfo from './competitions/comp';
import NotFound from './NotFound';
import Header from './Header';
import Footer from './Footer';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route path="/competitions" exact component={CompsList} />
            <Route path="/competitions/:id" exact component={CompInfo} />
            <Route path="*" exact component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }

}

export default App;
