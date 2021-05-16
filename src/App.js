import React, { useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import SimpleBottomNavigation from "./components/Nav/Mainnav";
import { Route, Router, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import Movies from "./pages/Movies/Movies";
import Trending from "./pages/Trending/Trending";
import Tvseries from "./pages/Tvseries/Tvseries";
import Search from "./pages/Search/Search";
import Banner from "./components/Banner/Banner";
import Login from "./pages/Login/Login";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./store/user";
import Profile from "./pages/Profile/Profile";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <div>
                <Nav />
            <Switch>
              <Route path='/profile' component={Profile}/>
              <Container>
                <Banner />
                <Route path="/" exact component={Trending} />
                <Route path="/movies" component={Movies} />
                <Route path="/tvseries" component={Tvseries} />
                <Route path="/search" component={Search} />
              </Container>
              
            </Switch>
            <SimpleBottomNavigation />
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
