import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'

import Home from './containers/Home';
import Cart from './containers/Cart';

 const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/cart' component={Cart}/>
        <Route path='/' component={Home}/>
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
