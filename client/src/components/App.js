import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
// import Auth from "../hoc/auth";
// pages for this product
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import CaseManyPage from "./views/CasePage/CaseManyPage"
import CaseOnePage from './views/CasePage/CaseOnePage'
import LandingPage from "./views/LandingPage/LandingPage.js";
import AdminPage from "./views/AdminPage/AdminPage";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";


//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />

          <Route exact path="/cases" component={CaseManyPage} />
          <Route exact path="/case/:caseId" component={CaseOnePage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default React.memo(App);
