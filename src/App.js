import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import DetailPage from './pages/detail-page/DetailPage';
import SearchPage from './pages/search-page/SearchPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Scrollbars } from 'react-custom-scrollbars';
 
library.add(fas);

function App() {
  return (
    
    <Router>
        <Switch>
            <DetailPage/>
          <Route exact path="/search">
            <SearchPage/>
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
