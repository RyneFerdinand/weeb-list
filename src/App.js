import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import DetailPage from './pages/detail-page/DetailPage';
import SearchPage from './pages/search-page/SearchPage';

function App() {
  return (
      <Router>
      <Switch>
        <Route exact path="/detail">
          <DetailPage/>
        </Route>
        <Route exact path="/search">
          <SearchPage/>
        </Route>
      </Switch>

      </Router>
  );
}

export default App;
