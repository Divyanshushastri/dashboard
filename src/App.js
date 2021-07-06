import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Views/Login";
import Dashboard from "./Views/Dashboard";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./Views/PrivateRoute";
function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
      </Router>
    </AuthProvider>
  );
}

export default App;
