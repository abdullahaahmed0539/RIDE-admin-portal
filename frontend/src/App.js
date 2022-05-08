import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Spinner from "./Components/Spinner";

const LogIn = lazy(() => import("./pages/LogIn"));
const NavBar = lazy(() => import("./Components/Navbar"));
const Requests = lazy(() => import("./pages/Requests"));
const RequestDetail = lazy(() => import("./pages/RequestDetail"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner text="Loading" />}>
        <NavBar />
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          {localStorage.getItem("loggedIn") === "true" && (
            <Route path="/requests/:id">
              <RequestDetail />
            </Route>
          )}
          {localStorage.getItem("loggedIn") === "true" && (
            <Route path="/requests">
              <Requests />
            </Route>
          )}
          <Redirect push to="/login" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
