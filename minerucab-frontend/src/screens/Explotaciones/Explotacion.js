import React from 'react';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalYesNo from '../../components/ModalYesNo';

export default class Explotacion extends React.Component {
    state = {
        modalShowEliminar: false,
        infoEliminar: ''
    }
    modalEliminarClose = () => this.setState({ modalShowEliminar: false });
    modalEliminarOpen = () => {
        this.setState({ modalShowEliminar: true });
    }
    render(){
        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={'Andrea Da Silva'}/>
                <Container>
                      <Row>
                          <Col md={1}></Col>
                          <Col md={11}>
                              <Row>
                                  <Col md={11}>
                                      <h4 className="horizontal-line-title-ventas-form cliente-title">Explotaciones</h4>
                                  </Col>
                                  <Col md={1}></Col>
                              </Row>
                          </Col>
                      </Row>
                </Container>
                <ModalYesNo
                    show={this.state.modalShowEliminar}
                    onHide={this.modalEliminarClose}
                    mensaje={'¿Está seguro que desea eliminar la explotación'}
                    infoeliminar={this.state.infoEliminar}
                    urleliminar={`http://localhost:3000/FALTAPORDEFINIR/${this.state.idEliminar}`}
                />
                <Container className="pagecontent">
                    <Row>
                        <Col sm={0} md={1}></Col>
                        <Col sm={12} md={10}>
                            <DataTable
                                data={'http://localhost:3000/getAllYacimientos'}
                                textoSingular={'yacimiento'}
                                textoPlural={'yacimientos'}
                                urlModificar={'/modificar_explotacion'}
                                urlConsultar={'/consultar_explotacion'}
                                urlCrear={'/registrar_explotacion'}
                                urlExplotar={'/registrar_explotacion'}
                                agregar={true}
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