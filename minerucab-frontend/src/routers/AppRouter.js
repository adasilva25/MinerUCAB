import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../screens/Login/LoginPage';
import CambiarContrasena from '../screens/Login/CambiarContrasena';
import DashboardPage from '../components/DashboardPage';
import AgregarEmpleados from '../screens/Empleados/AgregarEmpleados';
import ConsultarEmpleados from '../screens/Empleados/ConsultarEmpleados';
import Ventas from '../screens/Ventas/Ventas';
import {NotFoundPage} from '../components/NotFoundPage';
import {history} from './History';
import HomePage from '../screens/Home/HomePage'

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        {/* ------------------------ LOGIN ------------------------ */}
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/cambiar_contrasena" component={CambiarContrasena} />
        {/* ------------------------ HOME ------------------------ */}
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/home" component={HomePage} />
        {/* ------------------------ EMPLEADOS ------------------------ */}
        <Route path="/agregar_empleados" component={AgregarEmpleados} />
        <Route path="/consultar_empleados" component={ConsultarEmpleados} />
        //<Route path="/consultar_empleado/:userId" />}
        {/* ------------------------ VENTAS ------------------------ */}
        <Route path="/ventas" component={Ventas} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;