import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Selects from "./pages/Selects/Selects";
import FlightDetails from "./components/FlightDetails/FlightDetails";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/results" component={Selects} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
