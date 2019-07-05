import React from 'react';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalYesNo from '../../components/ModalYesNo';

export default class Yacimiento extends React.Component {
    state = {
        modalShowEliminar: false,
        infoEliminar: '',
        idEliminar: null,
        c: false,
        r: false,
        u: false,
        d: false
    }
    componentWillMount = () => {
        const userInfoString = localStorage.getItem('user')
        const userInfo = JSON.parse(userInfoString);
        console.log(userInfo)

        userInfo.forEach((info) => {
            if (info.nombre.toLowerCase().includes('yacimiento')){
                if (info.tipo_privilegio === 'C') {
                    this.setState({ c: true });
                }
                if (info.tipo_privilegio === 'R') {
                    this.setState({ r: true });
                }
                if (info.tipo_privilegio === 'U') {
                    this.setState({ u: true });
                }
                if (info.tipo_privilegio === 'D') {
                    this.setState({ d: true });
                }
            }
        })
        console.log('state', this.state)
    } 
    modalEliminarClose = () => this.setState({ modalShowEliminar: false });
    modalEliminarOpen = (i) => {
        this.setState({ idEliminar: i, modalShowEliminar: true });
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
                                      <h4 className="horizontal-line-title-ventas-form cliente-title">Yacimientos</h4>
                                  </Col>
                                  <Col md={1}></Col>
                              </Row>
                          </Col>
                      </Row>
                </Container>
                <ModalYesNo
                    show={this.state.modalShowEliminar}
                    onHide={this.modalEliminarClose}
                    mensaje={'¿Está seguro que desea eliminar el yacimiento'}
                    infoeliminar={''}
                    urleliminar={`http://localhost:3000/deleteYacimientoById/${this.state.idEliminar}`}
                />
                <Container className="pagecontent">
                    <Row>
                        <Col sm={0} md={1}></Col>
                        <Col sm={12} md={10}>
                            <DataTable
                                data={'http://localhost:3000/getAllYacimientos'}
                                textoSingular={'yacimiento'}
                                textoPlural={'yacimientos'}
                                urlModificar={'/modificar_yacimiento'}
                                urlConsultar={'/consultar_yacimiento'}
                                urlCrear={'/registrar_yacimiento'}
                                agregar={this.state.c}
                                modificar={this.state.u}
                                consultar={this.state.r}
                                eliminar={this.state.d}
                                modalEliminar={this.modalEliminarOpen}
                                reload={this.state.reload}
                                checktable={false}
                                textoSingular={'yacimiento'}
                                textoPlural={'yacimientos'}
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