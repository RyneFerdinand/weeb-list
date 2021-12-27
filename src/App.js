import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import DetailPage from './pages/detail-page/DetailPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import AnimePage from './pages/anime-page/AnimePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/home-page/HomePage';
import WatchlistPage from './pages/watchlist-page/WatchlistPage';
// import WatchlistPage from './pages/watchlist-page/WatchlistPage';
 
library.add(fas);

function App() {
  return (
    <div>
        <Router>
          <Header/>
            <Switch>
              <Route path="/anime/:id">
                <DetailPage/>
              </Route>
              <Route path="/anime">
                <AnimePage/>
              </Route>
              <Route path="/watchlist">
                <WatchlistPage/>
              </Route>
              <Route path="/">
                <HomePage/>
              </Route>
            </Switch>
          <Footer/>
        </Router>
    </div>
  )
}

export default App;
