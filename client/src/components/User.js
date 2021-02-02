import React from 'react'

import { 
BrowserRouter as Router, 
Route, 
Switch
    } from "react-router-dom";
    

import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import DaonPage from './views/page/DaonPage/DaonPage';
import CaseManyPage from "./views/page/CasePage/CaseManyPage"
import CaseOnePage from './views/page/CasePage/CaseOnePage'
import LandingPage from "./views/page/LandingPage/LandingPage.js";
import LoginPage from "./views/page/LoginPage/LoginPage.js";
import ErrorPage from './views/commons/ErrorPage';

import Auth from "../hoc/auth";

const NewLandingPaga = Auth(LandingPage, null);
const NewDaonPage =  Auth(DaonPage, null);
const NewCaseManyPage = Auth(CaseManyPage, null);
const NewCaseOnePage = Auth(CaseOnePage, null)
const NewLoginPage = Auth(LoginPage, null);

function User() {
    console.log('user');
    return (
        <>
              <Router>
                <Switch>
                    <Route exact path="/">
                      <NavBar />
                         <NewLandingPaga />
                      <Footer />
                    </Route>
                    <Route  path="/daon">
                      <NavBar />
                          <NewDaonPage />
                      <Footer />
                    </Route>
                    <Route  path="/cases">
                      <NavBar />
                          <NewCaseManyPage />
                      <Footer />
                    </Route>
                    <Route  path="/cases/:caseId">
                      <NavBar />
                          <NewCaseOnePage />
                      <Footer />
                    </Route>
                    <Route  path="/login">
                      <NavBar />
                          <NewLoginPage />
                      <Footer />
                    </Route>
                    <Route component={ErrorPage} />  
                </Switch>
              </Router>
            
        </>
    );
}

export default React.memo(User)
