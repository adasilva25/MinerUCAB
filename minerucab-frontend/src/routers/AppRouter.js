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
import GestionarCargos from '../screens/Cargos/GestionarCargos';
import RegistrarYacimiento from '../screens/Yacimientos/RegistrarYacimiento';
import {NotFoundPage} from '../components/NotFoundPage';
import {history} from './History';
import HomePage from '../screens/Home/HomePage'
import Cargo from '../screens/Cargos/Cargo';
import Cliente from '../screens/Clientes/Cliente';
import Yacimiento from '../screens/Yacimientos/Yacimiento';
import ModalBuscarCliente from '../components/ModalBuscarCliente';

// history back --> https://stackoverflow.com/questions/19051212/add-a-parameter-with-js-function-window-history-back
// history props --> https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4/45263164#45263164

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
        {/*<Route path="/consultar_empleados" component={ConsultarEmpleados} />*/}
        <Route path="/consultar_empleado/:userId/:option" component={ConsultarEmpleados}/>}
        {/* ------------------------ CLIENTES ------------------------ */}
        <Route path="/clientes" component={Cliente} />
        <Route path="/buscar_cliente" component={ModalBuscarCliente} />
        <Route path="/registrar_cliente_natural" component={RegistrarClienteNatural} />
        <Route path="/registrar_cliente_juridico" component={RegistrarClienteJuridico} />
        <Route path="/borar_cliente" component={ModalYesNo} />
        {/* ------------------------ VENTAS ------------------------ */}
        <Route path="/ventas/:id" component={VentasForm} />
        {/* ------------------------ CARGOS ------------------------ */}
        <Route path="/cargo" component={Cargo} />
        <Route path="/gestionar_cargos/:id/:accion" component={GestionarCargos} />
        {/* ------------------------ YACIMIENTO ------------------------ */}
        <Route path="/yacimiento" component={Yacimiento} />
        <Route path="/registrar_yacimiento" component={RegistrarYacimiento} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;