// https://stackoverflow.com/questions/40844297/what-is-difference-between-axios-and-fetch
// https://www.thepolyglotdeveloper.com/2015/01/parse-xml-response-nodejs/

require('dotenv').config({ path: '.env.jasper-reports' });
const JasperReports = require('../reports/jasper-reports/jasper-reports-generator');
const Empleados = require('../database/model/Empleados');
const Minerales = require('../database/model/Minerales');
const Presentaciones = require('../database/model/Presentaciones');
const General = require('../database/model/General');
const Cargos = require('../database/model/Cargos');
const ClientesNaturales = require('../database/model/ClientesNaturales');
const ClientesJuridicos = require('../database/model/ClientesJuridicos');
const DetalleVentas = require('../database/model/DetalleVentas');
const PagosValidations = require('../validations/PagosValidations');
const Roles = require('../database/model/Roles');
const Ventas = require('../database/model/Ventas');
const VentasValidations = require('../validations/VentasValidations');
const Usuarios = require('../database/model/Usuarios')
const Lugares = require('../database/model/Lugares');
const TiposMaquinaria = require('../database/model/TiposMaquinaria');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})



/* ----------------------------------- POST ----------------------------------- */
app.post('/createClienteNatural', ClientesNaturales.createClienteNatural);
app.post('/createVenta', VentasValidations.createVenta);

/* ----------------------------------- GET ----------------------------------- */

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>');
});
/* -------------------- CARGOS -------------------- */
app.get('/getAllCargos', Cargos.getAllCargos);
app.get('/getCargoByIdEmpleado/:id', Cargos.getCargoByIdEmpleado);
app.get('/getAllRoles', Roles.getAllRoles);
app.get('/getRolByIdEmpleado/:id', Roles.getRolByIdEmpleado);
app.get('/getAllEmpleados', Empleados.getAllEmpleados);
app.get('/getCriticInfoEmpleados', Empleados.getCriticInfoEmpleados)
app.get('/getEmpleadoByCedula/:cedula', Empleados.getEmpleadoByCedula);
app.get('/getEmpleadoById/:id', Empleados.getEmpleadoById);
/* -------------------- CLIENTE -------------------- */
app.get('/getClienteNombreApellidoById/:id', ClientesNaturales.getClienteNombreApellidoById);
app.get('/getAllClientes', ClientesNaturales.getAllClientes);
app.get('/getClienteByCedula/:cedula', ClientesNaturales.getClienteByCedula);
app.get('/getClienteByRIF/:rif', ClientesJuridicos.getClienteByRIF);
app.get('/getClienteNombreById/:cedula', ClientesJuridicos.getClienteNombreById);
app.get('/getClienteById/:id', ClientesNaturales.getClienteById);
app.get('/getClienteJuridicoById/:id', ClientesJuridicos.getClienteJuridicoById);
/* -------------------- DETALLES DE VENTAS -------------------- */
app.get('/getDetalleVentaByIdVenta/:id', DetalleVentas.getDetalleVentaByIdVenta);
/* -------------------- LUGAR -------------------- */
app.get('/getAllEstados', Lugares.getAllEstados);
app.get('/getAllMunicipiosByIdEstado/:id', Lugares.getAllMunicipiosByIdEstado);
app.get('/getAllParroquiasByIdMunicipio/:id', Lugares.getAllParroquiasByIdMunicipio);
app.get('/getLugarByIdParroquia/:id', Lugares.getLugarByIdParroquia);
/* -------------------- MAQUINARIAS -------------------- */
app.get('/getAllTiposMaquinaria', TiposMaquinaria.getAllTiposMaquinaria);
/* -------------------- MINERALES -------------------- */
app.get('/getAllMineralesMetalicos', Minerales.getAllMineralesMetalicos);
app.get('/getAllMineralesNoMetalicos', Minerales.getAllMineralesNoMetalicos);
app.get('/getAllMineralesMetalicosConPresentacion', Minerales.getAllMineralesMetalicosConPresentacion);
app.get('/getAllMineralesNoMetalicosConPresentacion', Minerales.getAllMineralesNoMetalicosConPresentacion);
app.get('/getMineralMetalicoById/:id', Minerales.getMineralMetalicoById);
app.get('/getMineralNoMetalicoById/:id', Minerales.getMineralNoMetalicoById);
app.get('/getNombreMineralMetalicoById/:id', Minerales.getNombreMineralMetalicoById);
app.get('/getNombreMineralNoMetalicoById/:id', Minerales.getNombreMineralNoMetalicoById);
app.get('/getAllPresentaciones', Presentaciones.getAllPresentaciones);
app.get('/getAllPresentacionesByIdMineralMetalico/:id', Presentaciones.getAllPresentacionesByIdMineralMetalico);
app.get('/getAllPresentacionesByIdMineralNoMetalico/:id', Presentaciones.getAllPresentacionesByIdMineralNoMetalico);
/* -------------------- USUARIOS -------------------- */
app.get('/getUsuarioById/:id', Usuarios.getUsuarioById);
/* -------------------- VENTAS -------------------- */
app.get('/getVentaById/:id', Ventas.getVentaById);
app.get('/getAllVentasClientesNaturales', Ventas.getAllVentasClientesNaturales);
app.get('/getAllVentasClientesJuridicos', Ventas.getAllVentasClientesJuridicos);
app.get('/getVentaInfo/:id', VentasValidations.getVentaInfo);
/* -------------------- PAGOS -------------------- */
app.get('/getPagosChequeDeVenta/:id', PagosValidations.getPagosChequeDeVenta);
app.get('/getPagosTarjetaCreditoDeVenta/:id', PagosValidations.getPagosTarjetaCreditoDeVenta);
app.get('/getPagosTarjetaDebitoDeVenta/:id', PagosValidations.getPagosTarjetaDebitoDeVenta);
app.get('/getPagosTransferenciaDeVenta/:id', PagosValidations.getPagosTransferenciaDeVenta);



/* ----------------------------------- DELETE ----------------------------------- */
/* -------------------- CLIENTES -------------------- */
app.delete('/deleteClienteById/:id', ClientesNaturales.deleteClienteById);
/* -------------------- EMPLEADO -------------------- */
app.delete('/deleteEmpleadoById/:id', Empleados.deleteEmpleadoById)
/* -------------------- MINERALES -------------------- */
app.delete('/deleteMineralMetalicoById/:id', Minerales.deleteMineralMetalicoById);
app.delete('/deleteMineralNoMetalicoById/:id', Minerales.deleteMineralNoMetalicoById);



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