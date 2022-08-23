import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./component/SignupFormPage/index"
import * as sessionActions from "./store/session";
import Navigation from "./component/Navigation/index"
import DisplaySpots from './component/Spots/index'
import SpotFormPage from "./component/SpotFormPage";
// import SpotId from "./component/Spots/SpotsId";


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
          <Route path='/spots/form'>
            <SpotFormPage />
          </Route>
          <Route path="/spots/:spotId">
            {/* <SpotId /> */}
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <DisplaySpots />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
