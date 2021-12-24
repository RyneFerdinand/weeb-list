import './App.css';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import DetailPage from './pages/detail-page/DetailPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import AnimePage from './pages/anime-page/AnimePage';
 
library.add(fas);

function App() {
  return (
    
    <Router>
        <Switch>

          <Route exact path="/search">
            <AnimePage/>
          </Route>
          <DetailPage/>
        </Switch>
      </Router>
  )
}

export default App;
