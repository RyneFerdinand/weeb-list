import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import DetailPage from "./pages/detail-page/DetailPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/react-fontawesome";
import AnimePage from "./pages/anime-page/AnimePage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/home-page/HomePage";
import WatchlistPage from "./pages/watchlist-page/WatchlistPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import Login from "./pages/login-page/Login";
import Register from "./pages/register-page/Register";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import WatchlistPage from './pages/watchlist-page/WatchlistPage';

library.add(fas);

function App() {
  
  const [loggedIn, setLoggedIn] = useState(()=>false);
  
  return (
    <div>
      <Router>
        <Header loggedIn={loggedIn} login={(state)=>setLoggedIn(state)} />
        <Switch>
          <Route path="/login">
            <Login login={(state)=>setLoggedIn(state)} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/anime/:id">
            <DetailPage />
          </Route>
          <Route path="/anime">
            <AnimePage />
          </Route>
          <Route path="/watchlist">
            <WatchlistPage loggedIn={loggedIn}/>
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
