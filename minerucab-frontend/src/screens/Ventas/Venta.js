import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import ModalYesNo from '../../components/ModalYesNo';
import ModalBuscarCliente from '../../components/ModalBuscarCliente';
import DataTable from '../../components/DataTable';

export default class Venta extends React.Component {
    constructor(props){
        super(props);
    }  
    state = { 
      modalShow: false
    };                        
    modalClose = () => this.setState({ modalShow: false });
    modalOpen = () => {
        this.setState({ modalShow: true });
    }
    render(){
        return (
          <div className="contain pagecontent" id="Content">
            <OpcionesGlobales active="Home"/>
            <OpcionesLocales Usuario={'Andrea Da Silva'}/>
            <ModalBuscarCliente
              show={this.state.modalShow}
              onHide={this.modalClose}
              content=
                {
                    'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beerlabore wes anderson cred nesciunt sapiente ea proident.'
                }
            />
            <ModalYesNo
              show={this.state.modalShowEliminar}
              onHide={this.modalEliminarClose}
              mensaje={'¿Está seguro que desea eliminar el cliente'}
              infoeliminar={this.state.infoEliminar}
              urleliminar={`http://localhost:3000/deleteClienteById/${this.state.idEliminar}`}
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
                              <Col sm={0} md={1}></Col>
                              <Col sm={12} md={10}>
                                  <DataTable
                                      columns={'http://localhost:3000/column_names/cliente'} 
                                      data={'http://localhost:3000/getAllClientes'}
                                      urlModificar={'/registrar_cliente_natural'}
                                      urlConsultar={'/registrar_cliente_natural'}
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
                                  />
                              </Col>
                              <Col sm={0} md={1}></Col>
                          </Row>
                      </Container>
                  </div>
              </Container>
            </div>                 
        )
    }
}