import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import ModalYesNo from '../../components/ModalYesNo';
import ModalBuscarCliente from '../../components/ModalBuscarCliente';
import DataTable from '../../components/DataTable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routers/History';

export class Venta extends React.Component {
    constructor(props){
        super(props);
    }  
    state = { 
        modalShow: false,
        modalShowEliminar: false
    };                        
    modalClose = () => this.setState({ modalShow: false });
    modalOpen = () => {
        this.setState({ modalShow: true });
    }
    modalEliminarClose = () => this.setState({ modalShowEliminar: false });
    modalEliminarOpen = (i) => {
        this.setState({ idEliminar: i, modalShowEliminar: true });
    }
    goBack = () => {
        this.props.history.goBack()
    }
    render(){
        return (
          <div className="contain pagecontent" id="Content">
            <OpcionesGlobales active="Home"/>
            <OpcionesLocales Usuario={'Andrea Da Silva'}/>
            <ModalBuscarCliente
              show={this.state.modalShow}
              onHide={this.modalClose}              
            />
            <ModalYesNo
              show={this.state.modalShowEliminar}
              onHide={this.modalEliminarClose}
              mensaje={'¿Está seguro que desea eliminar la venta'}
              infoeliminar={''}
              urleliminar={`http://localhost:3000/deleteVentaById/${this.state.idEliminar}`}
            />
            <Container className="pagecontent">
              <div className="pagecontent">
                  <Container>
                      <Row>
                          <Col md={1}></Col>
                          <Col md={11}>
                              <Row>
                                  <Col md={11}>
                                      <h4 className="horizontal-line-title-ventas-form cliente-title">Ventas</h4>
                                  </Col>
                                  <Col md={1}></Col>
                              </Row>
                          </Col>
                      </Row>
                  </Container>

                  <Container>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={12}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Ventas de Clientes Naturales</h6>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                  </Container>

                      <Container>
                          <Row>
                              <Col sm={0} md={1}></Col>
                              <Col sm={12} md={10}>
                                  <DataTable
                                      data={'http://localhost:3000/getAllVentasClientesNaturales'}
                                      urlModificar={'/modificar_ventas'}
                                      urlConsultar={'/consultar_ventas'}
                                      urlEliminar={'/home'}
                                      agregar={false}
                                      modificar={true}
                                      consultar={true}
                                      eliminar={true}
                                      modalEliminar={this.modalEliminarOpen}
                                      modalCrear={this.modalOpen}
                                      reload={this.state.reload}
                                      checktable={false}
                                      textoSingular={'cliente'}
                                      textoPlural={'clientes'}
                                      size={400}
                                  />
                              </Col>
                              <Col sm={0} md={1}></Col>
                          </Row>
                      </Container>

                        <Container>
                            <Row className="container-datatable-juridico">
                                <Col md={1}></Col>
                                <Col md={10}>
                                    <Row>
                                        <Col md={12}>
                                            <h6 className="horizontal-line-title-ventas-form cliente-title">Ventas de Clientes Juridicos</h6>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Container>
{
    console.log(this.props.user)
}
                      <Container>
                          <Row>
                              <Col sm={0} md={1}></Col>
                              <Col sm={12} md={10}>
                                  <DataTable
                                      data={'http://localhost:3000/getAllVentasClientesJuridicos'}
                                      urlModificar={'/modificar_ventas'}
                                      urlConsultar={'/consultar_ventas'}
                                      urlEliminar={'/home'}
                                      agregar={true}
                                      modificar={true}
                                      consultar={true}
                                      eliminar={true}
                                      modalEliminar={this.modalEliminarOpen}
                                      modalCrear={this.modalOpen}
                                      reload={this.state.reload}
                                      checktable={false}
                                      textoSingular={'cliente'}
                                      textoPlural={'clientes'}
                                      size={400}
                                  />
                              </Col>
                              <Col sm={0} md={1}></Col>
                          </Row>
                      </Container>

                      <Container>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={10}>
                                <FontAwesomeIcon 
                                    className="icons icongoback" 
                                    icon={Icons.faArrowAltCircleLeft}
                                    onClick={this.goBack}
                                />
                            </Col>
                        </Row>
                      </Container>
                  </div>
              </Container>
              <div className="container-datatable-juridico">
                <Row>
                    
                </Row>
            </div>
            </div>                 
        )
    }
}

const mapStateToProps = (state, props) => { // esto pasa a ser un prop
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Venta)