import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {Header} from '../components/Header';
import CambiarContrasena from '../screens/CambiarContrasena';
import DashboardPage from '../components/DashboardPage';
import {NotFoundPage} from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import {Footer} from '../components/Footer';
import {history} from './History';

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/cambiar_contrasena" component={CambiarContrasena} />
        <Route path="/dashboard" component={DashboardPage} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;