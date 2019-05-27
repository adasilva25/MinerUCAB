import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {Header} from '../components/Header';
import CambiarContrasena from '../screens/Login/CambiarContrasena';
import ConsultarEmpleados from '../screens/Empleados/ConsultarEmpleados';
import AgregarEmpleados from '../screens/Empleados/AgregarEmpleados';
import DashboardPage from '../components/DashboardPage';
import {NotFoundPage} from '../components/NotFoundPage';
import LoginPage from '../screens/Login/LoginPage';
import {Footer} from '../components/Footer';
import {history} from './History';

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        {/* ------------------------ LOGIN ------------------------ */}
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/cambiar_contrasena" component={CambiarContrasena} />
        {/* ------------------------ EMPLEADOS ------------------------ */}
        <Route path="/agregar_empleados" component={AgregarEmpleados} />
        <Route path="/consultar_empleados" component={ConsultarEmpleados} />
        <Route path="/dashboard" component={DashboardPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;