import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./component/SignupFormPage/index"
import * as sessionActions from "./store/session";
import Navigation from "./component/Navigation/index"
import DisplaySpots from './component/Spots/index'
import SpotFormPage from "./component/SpotFormPage";
import SpotId from "./component/SpotById/index";
import EditSpot from "./component/EditSpots";
import BecomeHost from "./component/BecomeAHost";
import CreateReview from "./component/ReviewFormPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact={true} path="/">
            <DisplaySpots />
          </Route>
          <Route path="/spots/:spotId/review">
            <CreateReview />
          </Route>
          <Route path="/spots/current">
            <BecomeHost />
          </Route>
          <Route path='/spots/create'>
            <SpotFormPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotId />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <EditSpot />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route>
            404 page not found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
