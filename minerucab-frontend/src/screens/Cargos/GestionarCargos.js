import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpcionesGlobales from '../../components/OpcionesGlobales'
import OpcionesLocales from '../../components/OpcionesLocales';
import axios from 'axios';
import DataTable from '../../components/DataTable';

export default class GestionarCargos extends React.Component { 
    state = {
      nombre: '',
      descripcion: '',
      modificar: true
    }
    componentDidMount = () => {
      if (this.props.match.params.accion !== 'CR'){
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          responseType: 'json'
        }
        axios.get(`http://localhost:3000/getCargoById/${this.props.match.params.id}`, config)
          .then((res) => {
              console.log(res)
              this.setState(() => ({
                nombre: res.data[0].nombre,
                descripcion: res.data[0].descripcion
              }));
              console.log(this.state.nombre)
          }).catch((e) => {
              console.log('Error en axios')
          })
          if (this.props.match.params.accion === 'CO'){
            this.setState(() => ({
              modificar: false
            }));
          }
      }
    }
    onNameChange = (e) => {
      const nombre = e.target.value;
  
      this.setState(() => ({ nombre }));
    };
    onDescriptionChange = (e) => {
      const descripcion = e.target.value;
  
      this.setState(() => ({ descripcion }));
    };
    renderTitle = () => {
      if (this.props.match.params.accion === 'CR'){
        return <h5 className="horizontal-line-title ccargo-title">Registrar Cargo</h5>
      }
      if (this.props.match.params.accion === 'CO'){
        return <h5 className="horizontal-line-title ccargo-title">Consultar Cargo</h5>
      }
      if (this.props.match.params.accion === 'M'){
        return <h5 className="horizontal-line-title ccargo-title">Modificar Cargo</h5>
      }
    }            
    render(){
        return (
          <div className="contain pagecontent" id="Content">
            <OpcionesGlobales active="Home"/>
            <OpcionesLocales Usuario={'Andrea Da Silva'}/>
              <Container className="container-ccargo-separator pagecontent">
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <Row>
                            <Col md={12}>
                            {this.renderTitle()}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}></Col>
                </Row>
                <div>
                  <Row className="div-content-form-ccargo">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Nombre
                          </p>
                        </Col>
                        <Col md={6}>
                          <Form.Control 
                            type="text" 
                            className="form-input-ccargo" 
                            placeholder="Introduzca el nombre del cargo" 
                            value={this.state.nombre}
                            disabled={!this.state.modificar}
                            onChange={this.onNameChange}
                            />
                          <Form.Text className="text-muted">
                              Este campo es obligatorio
                          </Form.Text>
                        </Col>
                      </Form.Row>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </div>
                <div>
                  <Row className="div-content-form-ccargo">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Descripción
                          </p>
                        </Col>
                        <Col md={6}>
                          <Form.Control 
                            type="text" 
                            className="form-input-ccargo" 
                            placeholder="Introduzca la descripcion del cargo" 
                            value={this.state.descripcion}
                            onChange={this.onDescriptionChange}
                            disabled={!this.state.modificar}
                            />
                          <Form.Text className="text-muted">
                              Este campo es obligatorio
                          </Form.Text>
                        </Col>
                      </Form.Row>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </div>
                <div>
                  <Row className="div-content-form-ccargo">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Roles
                          </p>
                        </Col>
                        <Col md={6}>
                        </Col>
                      </Form.Row>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </div>
                <div>
                  <DataTable
                    columns={'http://localhost:3000/column_names/rol'} 
                    data={'http://localhost:3000/getAllRoles'}
                    textoSingular={'rol'}
                    textoPlural={'roles'}
                  />
                  <Row className="div-btn-form-ccargo">
                    <Col md={3}></Col>
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Button 
                          className="ccargo-btn btn-block"
                      >
                          Crear
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>                 
        )
    }
}