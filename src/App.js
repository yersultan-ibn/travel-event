import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightsList from "./pages/FlightsList/FlightsList";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/results" component={FlightsList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
