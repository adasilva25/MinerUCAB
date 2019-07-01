import React from 'react';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalYesNo from '../../components/ModalYesNo';
import ModalExplotar from '../../components/ModalExplotar';
import axios from 'axios';

export default class Explotacion extends React.Component {
    state = {
        modalShowEliminar: false,
        infoEliminar: '',
        modalShowExplotar: false,
        infoExplotar: '',
        tipoSol: '',
        mineralesMet: [],
        mineralesNoMet: [],
        expl: 0,
        idEliminar: null
    }
    modalEliminarClose = () => this.setState({ modalShowEliminar: false });
    modalEliminarOpen = (i) => {
        this.setState({ idEliminar: i, modalShowEliminar: true });
    }
    modalExplotarClose = () => this.setState({ modalShowExplotar: false });
    modalExplotarOpen = (idExp) => {
        console.log("Abre modal")
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        axios.get(`http://localhost:3000/getEstatusSolicitudDeCompraByIdExplotacion/${idExp}`, config)
                .then((res) => {
                    console.log("Primera consulta", res)
                    if(res.data.length === 0){
                        //No tiene solicitud de compra asociada
                        console.log("NA")
                        axios.get(`http://localhost:3000/getMinExpSolicitudDeCompra/${idExp}`, config)
                            .then((res) => {
                                console.log("MinExp", res)
                                res.data.forEach(element => {
                                    if((element.claveminnomet !== null)||(element.claveminnomet !== undefined)){
                                        var mineralesnomet = []
                                        axios.get(`http://localhost:3000/getMinNoMetComponentesSolicitudDeCompra/${element.claveminnomet}`, config)
                                            .then((res) => {
                                                console.log("resminnomet",res)
                                                res.data.forEach(element => {
                                                    let minnomet = {
                                                        clave: 1,
                                                        nombre: '',
                                                        porcentaje: 1
                                                    }
                                                    minnomet.clave = element.clave;
                                                    minnomet.nombre = element.nombre;
                                                    minnomet.porcentaje = element.porcentaje;
                                                    mineralesnomet.push(minnomet);
                                                })
                                                this.setState(
                                                    { 
                                                        mineralesNoMet: mineralesnomet
                                                    }
                                                )
                                            })
                                            .catch((e) => {
                                                console.log('Error con el modal explotar');
                                            })
                                    }else if((element.claveminmet === null)||(element.claveminmet !== undefined)){
                                        var mineralesmet = []
                                        axios.get(`http://localhost:3000/getMinMetComponentesSolicitudDeCompra/${element.claveminmet}`, config)
                                            .then((res) => {
                                                res.data.forEach(element => {
                                                    let minmet = {
                                                        clave: 1,
                                                        nombre: '',
                                                        porcentaje: 1,
                                                    }
                                                    minmet.clave = element.clave;
                                                    minmet.nombre = element.nombre;
                                                    minmet.porcentaje = element.porcentaje;
                                                    mineralesmet.push(minmet);
                                                })
                                                this.setState(
                                                    { 
                                                        mineralesMet: mineralesmet,
                                                    }
                                                )
                                            })
                                            .catch((e) => {
                                                console.log('Error con el modal explotar');
                                            })
                                    }
                                })
                                this.setState(
                                    { 
                                        infoExplotar: 'Antes de iniciar la explotación es necesario comprar los minerales requeridos.',
                                        tipoSol: 'NA',
                                        modalShowExplotar: true,
                                        expl: idExp
                                    }
                                )
                            })
                            .catch((e) => {
                                console.log('Error con el modal explotar');
                            })
                    }else if(res.data[0].nombre === "En proceso"){
                        //Cambia la solicitud
                        this.setState(
                            { 
                                infoExplotar: 'Es necesario que los minerales requeridos para iniciar esta explotación a esta explotación sean recibidos antes de comenzar.',
                                modalShowExplotar: true,
                                tipoSol: 'En proceso'
                            }
                        )
                    }else if(res.data[0].nombre === "Entregado"){
                        //Listo para explotar
                        this.setState(
                            { 
                                modalShowExplotar: false
                            }
                        )
                        window.location.href = `/registrar_explotacion/CR/${idExp}`;
                    }
                    
                })
                .catch((e) => {
                    console.log('Error con el modal explotar');
                })
    }
    render(){
        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={'Andrea Da Silva'}/>
                <ModalYesNo
                    show={this.state.modalShowEliminar}
                    onHide={this.modalEliminarClose}
                    mensaje={'¿Está seguro que desea eliminar la explotación'}
                    infoeliminar={''}
                    urleliminar={`http://localhost:3000/deleteExplotacionById/${this.state.idEliminar}`}
                />
                <ModalExplotar
                    show={this.state.modalShowExplotar}
                    onHide={this.modalExplotarClose}
                    infoExplotar={this.state.infoExplotar}
                    tipoSol={this.state.tipoSol}
                    minMet={this.state.mineralesMet}
                    minNoMet={this.state.mineralesNoMet}
                    exp={this.state.expl}
                />
                <Container>
                      <Row>
                          <Col md={1}></Col>
                          <Col md={11}>
                              <Row>
                                  <Col md={11}>
                                      <h6 className="horizontal-line-title-ventas-form cliente-title">Yacimientos Disponibles para Explotación</h6>
                                  </Col>
                                  <Col md={1}></Col>
                              </Row>
                          </Col>
                      </Row>
                </Container>
                <Container className="pagecontent">
                    <Row>
                        <Col sm={0} md={1}></Col>
                        <Col sm={12} md={10}>
                            <DataTable
                                data={'http://localhost:3000/getAllExplotaciones'}
                                textoSingular={'yacimiento'}
                                textoPlural={'yacimientos'}
                                urlModificar={'/modificar_explotacion'}
                                urlConsultar={'/consultar_explotacion'}
                                urlCrear={'/registrar_explotacion'}
                                modalExplotar={this.modalExplotarOpen}
                                agregar={false}
                                modificar={true}
                                consultar={true}
                                eliminar={true}
                                explotar={true}
                                modalEliminar={this.modalEliminarOpen}
                                reload={this.state.reload}
                                checktable={false}
                                textoSingular={'explotación'}
                                textoPlural={'explotaciones'}
                                size={500}
                            />
                        </Col>
                        <Col sm={0} md={1}></Col>
                    </Row>
                </Container>
                
                
            </div>
        )
    }
}