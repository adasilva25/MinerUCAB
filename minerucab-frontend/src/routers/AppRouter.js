import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../screens/Login/LoginPage';
import CambiarContrasena from '../screens/Login/CambiarContrasena';
import DashboardPage from '../components/DashboardPage';
import AgregarEmpleados from '../screens/Empleados/AgregarEmpleados';
import ConsultarEmpleados from '../screens/Empleados/ConsultarEmpleados';
import RegistrarClienteNatural from '../screens/Clientes/RegistrarClienteNatural';
import RegistrarClienteJuridico from '../screens/Clientes/RegistrarClienteJuridico';
import VentasForm from '../screens/Ventas/VentasForm';
import ModalYesNo from '../components/ModalYesNo';
import RegistrarCargo from '../screens/Cargos/RegistrarCargo';
import RegistrarYacimiento from '../screens/Yacimientos/RegistrarYacimiento';
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
        {/* ------------------------ CLIENTES ------------------------ */}
        <Route path="/registrar_cliente_natural" component={RegistrarClienteNatural} />
        <Route path="/registrar_cliente_juridico" component={RegistrarClienteJuridico} />
        <Route path="/borar_cliente" component={ModalYesNo} />
        {/* ------------------------ VENTAS ------------------------ */}
        <Route path="/ventas" component={VentasForm} />
        {/* ------------------------ CARGOS ------------------------ */}
        <Route path="/registrar_cargo" component={RegistrarCargo} />
        {/* ------------------------ YACIMIENTOS ------------------------ */}
        <Route path="/registrar_yacimiento" component={RegistrarYacimiento} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;