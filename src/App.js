import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import DetailPage from "./pages/detail-page/DetailPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons'
import AnimePage from "./pages/anime-page/AnimePage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/home-page/HomePage";
import WatchlistPage from "./pages/watchlist-page/WatchlistPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import Login from "./pages/login-page/Login";
import Register from "./pages/register-page/Register";
import { useState } from "react";

library.add(fas);
library.add(fab);
library.add(far);

function App() {
  
  const [loggedIn, setLoggedIn] = useState(()=>false);
  const [profileImage, setProfileImage] = useState(()=>"");

  return (
    <div>
      <Router>
        <Header loggedIn={loggedIn} login={(state)=>setLoggedIn(state)} profileImage={profileImage} />
        <Switch>
          <Route path="/login">
            <Login login={(state)=>setLoggedIn(state)} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/anime/:id">
            <DetailPage loggedIn={loggedIn}/>
          </Route>
          <Route path="/anime">
            <AnimePage loggedIn={loggedIn}/>
          </Route>
          <Route path="/watchlist">
            <WatchlistPage loggedIn={loggedIn} login={(state)=>setLoggedIn(state)}/>
          </Route>
          <Route path="/profile">
            <ProfilePage setProfile={(image)=> setProfileImage(image)} login={(state)=>setLoggedIn(state)} />
          </Route>
          <Route path="/">
            <HomePage loggedIn={loggedIn}/>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
