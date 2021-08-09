import "./App.css";
import Layout from "./layout";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Customer from "./pages/customer";
import Transaction from "./pages/transaction";
import SystemUser from "./pages/systemuser";
import Login from "./pages/login";
import { useState } from "react";
import LoaderContext from "./loaderContext";
import { ProtectedRoute } from "./protectedroute.js";
import Logout from "./pages/logout";

function App() {
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  // if (pathname === "/login") {
  //   return (
  //     <Switch>
  //       <Route path="/login" component={Login} />
  //     </Switch>
  //   );
  // }
  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <Layout>
        <Switch>
          <ProtectedRoute path="/" exact component={Dashboard} />
          <ProtectedRoute path="/customer" component={Customer} />
          {/* <ProtectedRoute path="/transaction" component={Transaction} />
          <ProtectedRoute path="/users" component={SystemUser} /> */}
          <Route path="/logout" component={Logout} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </LoaderContext.Provider>
  );
}

export default App;
