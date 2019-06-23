import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../screens/Login/LoginPage';
import CambiarContrasena from '../screens/Login/CambiarContrasena';
import DashboardPage from '../components/DashboardPage';
import Empleado from '../screens/Empleados/Empleado';
import GestionarEmpleado from '../screens/Empleados/GestionarEmpleado';
import RegistrarClienteNatural from '../screens/Clientes/RegistrarClienteNatural';
import RegistrarClienteJuridico from '../screens/Clientes/RegistrarClienteJuridico';
import VentasForm from '../screens/Ventas/VentasForm';
import ModalYesNo from '../components/ModalYesNo';
import GestionarCargos from '../screens/Cargos/GestionarCargos';
import RegistrarYacimiento from '../screens/Yacimientos/RegistrarYacimiento';
import ModificarYacimiento from '../screens/Yacimientos/ModificarYacimiento';
import {NotFoundPage} from '../components/NotFoundPage';
import {history} from './History';
import HomePage from '../screens/Home/HomePage'
import Cargo from '../screens/Cargos/Cargo';
import Cliente from '../screens/Clientes/Cliente';
import Yacimiento from '../screens/Yacimientos/Yacimiento';
import ModalBuscarCliente from '../components/ModalBuscarCliente';
import RegistrarCargo from '../screens/Cargos/RegistrarCargo';
import Venta from '../screens/Ventas/Venta';
import Maquinaria from '../screens/Maquinarias/Maquinaria';
import GestionarMaquinaria from '../screens/Maquinarias/GestionarMaquinaria';
import Mineral from '../screens/Minerales/Mineral';
import RegistrarMineralMetalico from '../screens/Minerales/RegistrarMineralMetalico';
import RegistrarMineralNoMetalico from '../screens/Minerales/RegistrarMineralNoMetalico';

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
        {/* ------------------------ CARGOS ------------------------ */}
        /*<Route path="/cargo" component={Cargo} />
        <Route path="/registrar_cargo" component={RegistrarCargo} />
        <Route path="/gestionar_cargos/:accion/:id?" component={GestionarCargos} />*/
        {/* ------------------------ CLIENTES ------------------------ */}
        <Route path="/cliente" component={Cliente} />
        <Route path="/buscar_cliente" component={ModalBuscarCliente} />
        <Route path="/registrar_cliente_natural/:accion/:id?" component={RegistrarClienteNatural} />
        <Route path="/registrar_cliente_juridico/:accion/:id?" component={RegistrarClienteJuridico} />
        <Route path="/borar_cliente" component={ModalYesNo} />
        {/* ------------------------ EMPLEADOS ------------------------ */}
        <Route path="/empleado" component={Empleado} />
        <Route path="/registrar_empleado/:accion/:id?" component={GestionarEmpleado} />
        {/* ------------------------ MAQUINARIAS ------------------------ */}
        <Route path="/maquinaria" component={Maquinaria} />
        <Route path="/gestionar_maquinaria/:accion/:id?" component={GestionarMaquinaria}/>
        {/* ------------------------ MINERALES ------------------------ */}
        <Route path="/mineral" component={Mineral} />
        <Route path="/registrar_mineral_metalico/:accion:id?" component={RegistrarMineralMetalico} />
        <Route path="/registrar_mineral_no_metalico/:accion:id?" component={RegistrarMineralNoMetalico} />
        {/* ------------------------ VENTAS ------------------------ */}
        <Route path="/venta" component={Venta} />
        <Route path="/gestionar_ventas/:id?" component={VentasForm} />
        {/* ------------------------ YACIMIENTO ------------------------ */}
        <Route path="/yacimiento" component={Yacimiento} />
        <Route path="/registrar_yacimiento" component={RegistrarYacimiento} />
        <Route path="/modificar_yacimiento" component={ModificarYacimiento} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;