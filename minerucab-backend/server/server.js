// https://stackoverflow.com/questions/40844297/what-is-difference-between-axios-and-fetch
// https://www.thepolyglotdeveloper.com/2015/01/parse-xml-response-nodejs/
// https://stackify.com/node-js-error-handling/

require('dotenv').config({ path: '.env.jasper-reports' });
const EmpleadosValidations = require('../validations/EmpleadosValidations');
const Cargos = require('../database/model/Cargos');
const ClientesJuridicos = require('../database/model/ClientesJuridicos');
const ClientesNaturales = require('../database/model/ClientesNaturales');
const DetalleVentas = require('../database/model/DetalleVentas');
const Empleados = require('../database/model/Empleados');
const Explotaciones = require('../database/model/Explotaciones');
const ExplotacionesValidations = require('../validations/ExplotacionesValidations');
const Fases = require('../database/model/Fases');
const JasperReports = require('../reports/jasper-reports/jasper-reports-generator');
const Lugares = require('../database/model/Lugares');
const Maquinarias = require('../database/model/Maquinarias');
const Minerales = require('../database/model/Minerales');
const MineralesValidations = require('../validations/MineralesValidations');
const PagosValidations = require('../validations/PagosValidations');
const Presentaciones = require('../database/model/Presentaciones');
const Roles = require('../database/model/Roles');
const SolicitudesCompra = require('../database/model/SolicitudesCompra');
const SolCompraValidations = require('../validations/SolCompraValidation')
const TiposMaquinaria = require('../database/model/TiposMaquinaria');
const TiposYacimiento = require('../database/model/TiposYacimiento');
const Usuarios = require('../database/model/Usuarios')
const Ventas = require('../database/model/Ventas');
const VentasValidations = require('../validations/VentasValidations');
const Yacimientos = require('../database/model/Yacimientos');
const YacimientoMineral = require('../database/model/YacimientoMineral');
const YacimientosValidations = require('../validations/YacimientosValidations');
const InfoInventario = require('../database/model/InfoInventario');

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.json())
app.use( bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>');
});


/* ----------------------------------- POST ----------------------------------- */
app.post('/crearSolCompra', SolCompraValidations.crearSolCompra);
/* -------------------- CLIENTES -------------------- */
app.post('/createClienteNatural', ClientesNaturales.createClienteNatural);
app.post('/createClienteJuridico', ClientesJuridicos.createClienteJuridico);
/* -------------------- EMPLEADOS -------------------- */
app.post('/crearEmpleado', EmpleadosValidations.crearEmpleado);
/* -------------------- EXPLOTACIONES -------------------- */
app.post('/crearExplotacion', ExplotacionesValidations.crearExplotacion);
/* -------------------- MAQUINARIAS -------------------- */
app.post('/createMaquinaria', Maquinarias.createMaquinaria);
/* -------------------- MINERALES -------------------- */
app.post('/insertPresMinMet', Minerales.insertPresMinMet);
app.post('/insertPresMinNoMet', Minerales.insertPresMinNoMet);
app.post('/insertCompMinMet', Minerales.insertCompMinMet);
app.post('/insertCompMinNoMet', Minerales.insertCompMinNoMet);
app.post('/crearMineralMetalico', MineralesValidations.crearMineralMetalico);
app.post('/crearMineralNoMetalico', MineralesValidations.crearMineralNoMetalico);
/* -------------------- USUARIOS -------------------- */
app.post('/validateUser', Usuarios.validateUser)
app.post('/insertUsuario', Usuarios.insertUsuario)
/* -------------------- VENTAS -------------------- */
app.post('/createVenta', VentasValidations.createVenta);
app.post('/crearEmpleado', EmpleadosValidations.crearEmpleado);
/* -------------------- YacimientosValidations -------------------- */
app.post('/crearConfiguracionYacimiento', YacimientosValidations.crearConfiguracionYacimiento);


/* ----------------------------------- GET ----------------------------------- */
/* -------------------- CARGOS -------------------- */
app.get('/getAllCargos', Cargos.getAllCargos);
app.get('/getCargoByIdEmpleado/:id', Cargos.getCargoByIdEmpleado);
app.get('/getAllRoles', Roles.getAllRoles);
app.get('/getCargosByIdFase/:id', Cargos.getCargosByIdFase);

/* -------------------- CLIENTES -------------------- */
app.get('/getClienteNombreApellidoById/:id', ClientesNaturales.getClienteNombreApellidoById);
app.get('/getAllClientes', ClientesNaturales.getAllClientes);
app.get('/getAllClientesJuridicos', ClientesJuridicos.getAllClientesJuridicos);
app.get('/getClienteByCedula/:cedula', ClientesNaturales.getClienteByCedula);
app.get('/getClienteByRIF/:rif', ClientesJuridicos.getClienteByRIF);
app.get('/getClienteNombreById/:id', ClientesJuridicos.getClienteNombreById);
app.get('/getClienteById/:id', ClientesNaturales.getClienteById);
app.get('/getClienteJuridicoById/:id', ClientesJuridicos.getClienteJuridicoById);
/* -------------------- DETALLES DE VENTAS -------------------- */
app.get('/getDetalleVentaByIdVenta/:id', DetalleVentas.getDetalleVentaByIdVenta);
/* -------------------- EMPLEADO -------------------- */
app.get('/getRolByIdEmpleado/:id', Roles.getRolByIdEmpleado);
app.get('/getAllEmpleados', Empleados.getAllEmpleados);
app.get('/getCriticInfoEmpleados', Empleados.getCriticInfoEmpleados)
app.get('/getEmpleadoByCedula/:cedula', Empleados.getEmpleadoByCedula);
app.get('/getEmpleadoById/:id', Empleados.getEmpleadoById);
app.get('/getEmpleadosByIdCargo/:id', Empleados.getEmpleadosByIdCargo);
app.get('/getEmpleadosByIdCargoFase/:id', Empleados.getEmpleadosByIdCargoFase);
app.get('/getHorarioEmpleadoByIdEmpleadoCargoFase/:id', Empleados.getHorarioEmpleadoByIdEmpleadoCargoFase);
/* -------------------- EXPLOTACIONES -------------------- */
app.get('/getAllExplotaciones', Explotaciones.getAllExplotaciones)
app.get('/getEtapasByIdExplotacion/:id', Explotaciones.getEtapasByIdExplotacion);
app.get('/getFasesByIdEtapa/:id', Explotaciones.getFasesByIdEtapa);
app.get('/getCargosExpByIdFase/:id', Explotaciones.getCargosExpByIdFase);
app.get('/getEmpleadosByIdCargoFase/:id', Explotaciones.getEmpleadosByIdCargoFase);
app.get('/getExplotacionById/:id', Explotaciones.getExplotacionById);
/* -------------------- FASES -------------------- */
app.get('/getFasesByIdEtapa/:id', Fases.getFasesByIdEtapa)
/* -------------------- LUGAR -------------------- */
app.get('/getAllEstados', Lugares.getAllEstados);
app.get('/getAllMunicipiosByIdEstado/:id', Lugares.getAllMunicipiosByIdEstado);
app.get('/getAllParroquiasByIdMunicipio/:id', Lugares.getAllParroquiasByIdMunicipio);
app.get('/getLugarByIdParroquia/:id', Lugares.getLugarByIdParroquia);
/* -------------------- MAQUINARIAS -------------------- */
app.get('/getAllMaquinarias', Maquinarias.getAllMaquinarias);
app.get('/getMaquinariaById/:id', Maquinarias.getMaquinariaById);
app.get('/getMaquinariasByIdTipoMaquinaria/:id', Maquinarias.getMaquinariasByIdTipoMaquinaria);
app.get('/getMaquinariaByIdTipoMaquinariaFase/:id', Maquinarias.getMaquinariaByIdTipoMaquinariaFase)
/* -------------------- MINERALES -------------------- */
app.get('/getAllMineralesMetalicos', Minerales.getAllMineralesMetalicos);
app.get('/getAllMineralesNoMetalicos', Minerales.getAllMineralesNoMetalicos);
app.get('/getAllMineralesMetalicosConPresentacion', Minerales.getAllMineralesMetalicosConPresentacion);
app.get('/getAllMineralesNoMetalicosConPresentacion', Minerales.getAllMineralesNoMetalicosConPresentacion);
app.get('/getMineralMetalicoById/:id', Minerales.getMineralMetalicoById);
app.get('/getMineralNoMetalicoById/:id', Minerales.getMineralNoMetalicoById);
app.get('/getNombreMineralMetalicoById/:id', Minerales.getNombreMineralMetalicoById);
app.get('/getNombreMineralNoMetalicoById/:id', Minerales.getNombreMineralNoMetalicoById);
app.get('/getAllComponentesByIdMineralMetalico/:id', Minerales.getAllComponentesByIdMineralMetalico);
app.get('/getAllComponentesByIdMineralNoMetalico/:id', Minerales.getAllComponentesByIdMineralNoMetalico);
app.get('/getAllPresentaciones', Presentaciones.getAllPresentaciones);
app.get('/getAllPresentacionesByIdMineralMetalico/:id', Presentaciones.getAllPresentacionesByIdMineralMetalico);
app.get('/getAllPresentacionesByIdMineralNoMetalico/:id', Presentaciones.getAllPresentacionesByIdMineralNoMetalico);
/* -------------------- PAGOS -------------------- */
app.get('/getPagosChequeDeVenta/:id', PagosValidations.getPagosChequeDeVenta);
app.get('/getPagosTarjetaCreditoDeVenta/:id', PagosValidations.getPagosTarjetaCreditoDeVenta);
app.get('/getPagosTarjetaDebitoDeVenta/:id', PagosValidations.getPagosTarjetaDebitoDeVenta);
app.get('/getPagosTransferenciaDeVenta/:id', PagosValidations.getPagosTransferenciaDeVenta);
/* -------------------- SOLICITUDES DE COMPRA -------------------- */
app.get('/getAllSolicitudesDeCompra', SolicitudesCompra.getAllSolicitudesDeCompra);
app.get('/getEstatusSolicitudDeCompraByIdExplotacion/:id', SolicitudesCompra.getEstatusSolicitudDeCompraByIdExplotacion);
app.get('/getSolicitudDeCompraInfoById/:id', SolicitudesCompra.getSolicitudDeCompraInfoById);
app.get('/getDetalleSolicitudCompraMineralMetalicoById/:id', SolicitudesCompra.getDetalleSolicitudCompraMineralMetalicoById);
app.get('/getDetalleSolicitudCompraMineralNoMetalicoById/:id', SolicitudesCompra.getDetalleSolicitudCompraMineralNoMetalicoById);
app.get('/getMinExpSolicitudDeCompra/:id', SolicitudesCompra.getMinExpSolicitudDeCompra);
app.get('/getMinMetComponentesSolicitudDeCompra/:id', SolicitudesCompra.getMinMetComponentesSolicitudDeCompra);
app.get('/getMinNoMetComponentesSolicitudDeCompra/:id', SolicitudesCompra.getMinNoMetComponentesSolicitudDeCompra);
app.get('/getEmpresaMinMetComponentesSolicitudDeCompra/:id', SolicitudesCompra.getEmpresaMinMetComponentesSolicitudDeCompra);
app.get('/getEmpresaMinNoMetComponentesSolicitudDeCompra/:id', SolicitudesCompra.getEmpresaMinNoMetComponentesSolicitudDeCompra);

/* -------------------- TIPOS DE MAQUINARIAS -------------------- */
app.get('/getAllTiposMaquinaria', TiposMaquinaria.getAllTiposMaquinaria);
app.get('/getTiposMaquinariaByIdFase/:id', TiposMaquinaria.getTiposMaquinariaByIdFase);
/* -------------------- TIPOS DE YACIMIENTOS -------------------- */
app.get('/getAllTiposYacimiento', TiposYacimiento.getAllTiposYacimiento);
app.get('/getTipoYacimientoByIdYacimiento/:id', TiposYacimiento.getTipoYacimientoByIdYacimiento);
/* -------------------- USUARIOS -------------------- */
app.get('/getUsuarioById/:id', Usuarios.getUsuarioById);
/* -------------------- VENTAS -------------------- */
app.get('/getVentaById/:id', Ventas.getVentaById);
app.get('/getAllVentasClientesNaturales', Ventas.getAllVentasClientesNaturales);
app.get('/getAllVentasClientesJuridicos', Ventas.getAllVentasClientesJuridicos);
app.get('/getVentaInfo/:id', VentasValidations.getVentaInfo);
/* -------------------- YACIMIENTOS -------------------- */
app.get('/getAllYacimientos', Yacimientos.getAllYacimientos);
app.get('/getAllYacimientoInfoById/:id', Yacimientos.getAllYacimientoInfoById);
app.get('/getYacimientoByIdExplotacion/:id', Yacimientos.getYacimientoByIdExplotacion);
app.get('/getAllYacimientosConEstatusInactivo', Yacimientos.getAllYacimientosConEstatusInactivo);
app.get('/getAllYacimientosConEstatusDiferenteAInactivo', Yacimientos.getAllYacimientosConEstatusDiferenteAInactivo);
/* -------------------- YACIMIENTO MINERAL -------------------- */
app.get('/getAllMineralesMetalicosByIdYacimiento/:id', YacimientoMineral.getAllMineralesMetalicosByIdYacimiento)
app.get('/getAllMineralesNoMetalicosByIdYacimiento/:id', YacimientoMineral.getAllMineralesNoMetalicosByIdYacimiento)
/*-------------------- INVENTARIO --------------------*/
app.get('/getInventario', InfoInventario.getInventario)

/* ----------------------------------- UPDATE ----------------------------------- */
/* -------------------- CLIENTES -------------------- */
app.put('/updateClienteNaturalById', ClientesNaturales.updateClienteNaturalById);
app.put('/updateClienteJuridicoById', ClientesJuridicos.updateClienteJuridicoById);
/* -------------------- EMPLEADOS -------------------- */
app.put('/updateEmpleadoById', Empleados.updateEmpleadoById)
app.put('/updateUsuarioById', Usuarios.updateUsuarioById)
/* -------------------- MAQUINARIAS -------------------- */
app.put('/updateMaquinariaById/:id', Maquinarias.updateMaquinariaById)
/* -------------------- MINERALES -------------------- */
app.put('/updateMinMetById', Minerales.updateMinMetById)
app.put('/updateMinNoMetById', Minerales.updateMinNoMetById)
app.put('/updatePresMinMet', Minerales.updatePresMinMet)
app.put('/updatePresMinNoMet', Minerales.updatePresMinNoMet)
app.put('/updateCompMinMet', Minerales.updateCompMinMet)
app.put('/updateCompMinNoMet', Minerales.updateCompMinNoMet)
/* -------------------- VENTAS -------------------- */
app.put('/updateVenta', VentasValidations.updateVenta);



/* ----------------------------------- DELETE ----------------------------------- */
/* -------------------- CLIENTES -------------------- */
app.delete('/deleteClienteById/:id', ClientesNaturales.deleteClienteById);
app.delete('/deleteClienteJuridicoById/:id', ClientesJuridicos.deleteClienteJuridicoById);
/* -------------------- EMPLEADO -------------------- */
app.delete('/deleteEmpleadoById/:id', Empleados.deleteEmpleadoById)
app.delete('/deleteUsuarioById/:id', Usuarios.deleteUsuarioById)
/* -------------------- MAQUINARIAS -------------------- */
app.delete('/deleteMaquinariaById/:id', Maquinarias.deleteMaquinariaById)
/* -------------------- MINERALES -------------------- */
app.delete('/deleteMineralMetalicoById/:id', Minerales.deleteMineralMetalicoById);
app.delete('/deleteMineralNoMetalicoById/:id', Minerales.deleteMineralNoMetalicoById);
app.delete('/deletePresMin/:id', Minerales.deletePresMin);
app.delete('/deleteCompMin/:id', Minerales.deleteCompMin);
/* -------------------- VENTAS -------------------- */
app.delete('/deleteVentaById/:id', Ventas.deleteVentaById);


/* ------------------------------ DELETE ------------------------------ */
//  COMENTADO DEL MERGE DE ALBITA
// app.delete('/deleteClienteById/:id', Clientes.deleteClienteById);




/* -------------------------------------------------------------------- */








app.get('/pepito', (req, res) => {
  
  JasperReports.generateReport('DYNAMIC_REPORT').then((data) => {
    if (data === true){
      res.sendFile(path.join(__dirname, '../reports/outputs/Dynamic_Report.html'));
    }
  }).catch((e) => {
    console.log('Error returning the response')
  })
  

  // const data = {
  //   "reportUnitUri" : "/reports/Test/First_Report",
  //   "async" : false,
  //   "freshData" : true,
  //   "saveDataSnapshot" : false,
  //   "outputFormat" : "html",
  //   "interactive" : true,
  //   "ignorePagination" : true
  // }

  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   auth: {
  //     'username': 'jasperadmin',
  //     'password': 'jasperadmin'
  //   },
  //   responseType: 'document',
  //   withCredentials: true
  // }

  // const JRReportExecution = axios.create(config);
});

app.get('/pdf', (req, res) => {
  const pdfReport = window.open(path.join(__dirname, '../reports/jasper-reports/outputs/Dynamic_Report.html'), '_blank');
  
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});