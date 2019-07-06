import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import ReactDOMServer from 'react-dom/server';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {history} from '../../routers/History';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import axios from 'axios';
import $ from 'jquery'

export default class GestionarMineralMetalico extends React.Component {  
	state = {
        nombre: '',
        privilegios: [],
        privilegiosrol: [],
        modificar: true,
        predet: false
    }
    componentWillMount = () => {
    	const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        if(this.props.match.params.accion === 'CO'){
            this.setState(() => ({
                modificar: false,
            }))
        }
        //Crear o Modificar (necesito valores predeterminados)
        if(this.props.match.params.accion !== 'CO'){
            axios.get('http://localhost:3000/getAllPrivilegios', config)
                .then((res) => {
                    res.data.forEach(element => {
                        let privilegioInfo = {
                            clave: 1,
                            nombre: '',
                            tipo: '',
                        }
                        privilegioInfo.clave = element.clave;
                        privilegioInfo.nombre = element.nombre;
                        privilegioInfo.tipo = element.tipo;
                        this.setState((prevState) => ({
                            privilegios: prevState.privilegios.concat(privilegioInfo)
                        }));
                    })
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
        //Consultar o modificar (necesito informacion)
        if (this.props.match.params.accion !== 'CR'){
            axios.get(`http://localhost:3000/getRolById/${this.props.match.params.id}`, config)
                .then((res) => {
                  this.setState(() => ({
                    nombre: res.data[0].nombre,
                  }));
                axios.get(`http://localhost:3000/getAllPrivilegiosByIdRol/${this.props.match.params.id}`, config)
                    .then((res) => {
                        res.data.forEach(element => {
                            let privInfo = {
                                privilegio: 0,
                                nombre: '',
                                tipo: '',
                                relacion: 0,
                            }
                            privInfo.relacion = element.relacion;
                            privInfo.privilegio = element.clave;
                            privInfo.nombre = element.nombre;
                            privInfo.tipo = element.tipo;
                            this.setState((prevState) => ({
                                privilegiosrol: prevState.privilegiosrol.concat(privInfo)
                            }));
                        })
                        this.setState(() => ({
                            predet: true,
                        }))
                    }).catch((e) => {
                         console.log('Error en axios')
                    })
              }).catch((e) => {
                  console.log('Error en axios')
              })
        }
    }
    renderPrivilegios = () => {
        let privilegio = [];
        if(this.props.match.params.accion === 'CO'){
            return(
                <Col md={8}> 
                <Form.Row className="div-min-met-presentaciones-form">
                {
                    this.state.privilegiosrol.map((option, index) => {
                        let opcion = '';
                        if(option.tipo==='C'){
                            opcion='Crear'
                        }else if(option.tipo==='R'){
                            opcion='Consultar'
                        }else if(option.tipo==='U'){
                            opcion='Modificar'
                        }else if(option.tipo==='D'){
                            opcion='Eliminar'
                        }
                        return (
                            <Col md={4}>
                                <p className="horizontal-line-title-ventas-form">✓ {opcion} {option.nombre.toLowerCase()}</p>
                            </Col>
                        )
                    })
                }
                </Form.Row>
                </Col>
            )
        }else{
        	return(
                <Col md={8}> 
                <Form.Row className="div-min-met-presentaciones-form">
                {
                    this.state.privilegios.map((option, index) => {
                        let opcion = '';
                        if(option.tipo==='C'){
                            opcion='Crear'
                        }else if(option.tipo==='R'){
                            opcion='Consultar'
                        }else if(option.tipo==='U'){
                            opcion='Modificar'
                        }else if(option.tipo==='D'){
                            opcion='Eliminar'
                        }
                        let existe = 0;
                        privilegio.forEach(element => {
                            if (option.nombre === element){
                                existe = 1;
                            }
                        })
                        if (existe === 0){
                            privilegio.push(option.nombre);
                        }
                        let clase='';
                        let grilla = 3;
                        if((option.nombre==='Inventario')){
                            grilla = 6;
                        }
                        let checked = false;
                        for(let i=0; i<this.state.privilegiosrol.length; i++){
                            if(option.clave === this.state.privilegiosrol[i].privilegio){
                                checked = true;
                            }
                        }
                		return (
            				<Col md={grilla}>
                                    {
                                        (existe===0)&&<p className="horizontal-line-title-ventas-form crudtitle">{option.nombre}</p>
                                    }
                                    {
                                        (existe===1)&&<p className="horizontal-line-title-ventas-form whitetxt">..</p>
                                    }
                                    {
                                        ['checkbox'].map(type => (
                                            <div key={`custom-inline-${type}`} className="mb-2">
                                              <Form.Check
                                                custom
                                                inline
                                                label={opcion}
                                                type={type}
                                                id={`custom-inline-${index}`}
                                                value={option.clave}
                                                name='privilegio'
                                                defaultChecked={checked}
                                              />
                                            </div>
                                        ))
                                    }
            				</Col>
                		)
                    })
                }
                </Form.Row>
                </Col>
            )
        }
    }
    onInputChange = (e) => {
        const modif = e.target.value;

        //Solo letras
        if (e.target.id === 'nombre-rol'){
            this.setState(() => ({
                nombre: modif
            }));
        }
    }
    onSubmit = () => {
        let privilegiosselected = [];
            $.each($("input[name='privilegio']:checked"), function(){ 
                let privilegio = {
                    clave: 0,
                }           
                privilegio.clave = $(this).val();
                privilegiosselected: privilegiosselected.push(privilegio)
            });
        if((this.state.nombre.length>0)){
            if(privilegiosselected.length>0){
                if(this.props.match.params.accion === 'CR'){
                    let rol = {
                        nombre: this.state.nombre,
                        privilegios: privilegiosselected,
                    }
                    console.log(rol)
                    const config = {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        responseType: 'json',
                        data: rol
                    }
                    axios.post('http://localhost:3000/crearRol', config)
                        .then((res) => {
                        }).catch((e) => {
                            console.log('Error en axios')
                        })
                    history.push('/home');
                }
                if(this.props.match.params.accion === 'M'){
                    let privilegiosorg = {
                        insert: [],
                        delete: []
                    }
                    for(let i=0; i<this.state.privilegiosrol.length; i++){
                        let estado = 0;
                        for(let j=0; j<privilegiosselected.length; j++){
                            if(this.state.privilegiosrol[i].privilegio===parseInt(privilegiosselected[j].clave)){
                                estado=1;
                            }
                        }
                        if(estado === 0){
                            let privilegio = {
                                clave: this.state.privilegiosrol[i].privilegio,
                                relacion: this.state.privilegiosrol[i].relacion,
                            }  
                            privilegiosorg.delete.push(privilegio)
                        }
                    }
                    for(let i=0; i<privilegiosselected.length; i++){
                        let nuevo = 1;
                        for(let j=0; j<this.state.privilegiosrol.length; j++){
                            if(this.state.privilegiosrol[j].privilegio===parseInt(privilegiosselected[i].clave)){
                                nuevo=0;
                            }
                        }
                        if(nuevo === 1){
                            let privilegio = {
                                clave: parseInt(privilegiosselected[i].clave),
                            }  
                            privilegiosorg.insert.push(privilegio)
                        }
                    }
                    let rol={
                        nombre: this.state.nombre,
                        clave: this.props.match.params.id,
                        privilegios: privilegiosorg.insert,
                        privilegiosdelete: privilegiosorg.delete
                    }
                    console.log(rol)
                    const config = {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        responseType: 'json',
                        data: rol
                    }
                    axios.put('http://localhost:3000/modificarRol', config)
                    .then((res) => {
                        console.log(res)
                        history.push('/home')
                    }).catch((e) => {
                        console.log(e)
                        history.push('/home')
                    })
                }
            }else{
                alert("El rol debe poseer al menos un privilegio.")
            }
        }else{
            alert("El rol debe poseer un nombre.")
        }
            /*
            if(this.props.match.params.accion === 'M'){
                for (let i = 0; i < this.state.presentacionesmin.length; i++){
                    let pres = {
                        precio: this.state.presentacionesmin[i].precio,
                        idPresentacion: this.state.presentacionesmin[i].presentacion,
                        relacion: this.state.presentacionesmin[i].relacion,
                        mineral: this.props.match.params.id,
                    }
                    //Update
                    if((this.state.presentacionesmin[i].predetdb === true)&&(this.state.presentacionesmin[i].presShow === true)){
                        presentacionesorg.update.push(pres)
                    }
                    //Insert
                    if((this.state.presentacionesmin[i].predetdb === false)&&(this.state.presentacionesmin[i].presShow === true)){
                        presentacionesorg.insert.push(pres)
                    }
                    //Delete
                    if((this.state.presentacionesmin[i].predetdb === true)&&(this.state.presentacionesmin[i].presShow === false)){
                        presentacionesorg.delete.push(pres)
                    }
                }
                for (let i = 0; i < this.state.componentesmin.length; i++){
                    let comp = {
                        idComponente: this.state.componentesmin[i].mineral,
                        porcentaje: parseFloat(this.state.componentesmin[i].porcentaje),
                        relacion: this.state.componentesmin[i].relacion,
                        mineral: this.props.match.params.id,
                    }
                    //Update
                    if((this.state.componentesmin[i].predetdb === true)&&(this.state.componentesmin[i].compShow === true)){
                        componentesorg.update.push(comp)
                    }
                    //Insert
                    if((this.state.componentesmin[i].predetdb === false)&&(this.state.componentesmin[i].compShow === true)){
                        componentesorg.insert.push(comp)
                    }
                    //Delete
                    if((this.state.componentesmin[i].predetdb === true)&&(this.state.componentesmin[i].compShow === false)){
                        componentesorg.delete.push(comp)
                    }
                }

                console.log(presentacionesorg)
                console.log(componentesorg)

                const config = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'json',
                    data: mineral
                }
                axios.put('http://localhost:3000/updateMinMetById', config)
                .then((res) => {
                    console.log(res)
                    if(presentacionesorg.update.length>0){
                        for(let i=0; i<presentacionesorg.update.length; i++){
                            const config = {
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                responseType: 'json',
                                data: presentacionesorg.update[i]
                            }
                            axios.put('http://localhost:3000/updatePresMinMet', config)
                            .then((res) => {
                                console.log(res)
                            }).catch((e) => {
                                console.log(e)
                            })
                        }
                    }
                    if(presentacionesorg.insert.length>0){
                        for(let i=0; i<presentacionesorg.insert.length; i++){
                            const config = {
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                responseType: 'json',
                                data: presentacionesorg.insert[i]
                            }
                            axios.post('http://localhost:3000/insertPresMinMet', config)
                                .then((res) => {
                                    console.log(res)
                                }).catch((e) => {
                                    console.log(e)
                                })
                        }
                    }
                    if(presentacionesorg.delete.length>0){
                        for(let i=0; i<presentacionesorg.delete.length; i++){
                            const config = {
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                responseType: 'json'
                            }
                            axios.delete(`http://localhost:3000/deletePresMin/${presentacionesorg.delete[i].relacion}`, config)
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((e) => {
                                  console.log(e)
                                })
                        }
                    }
                    if(componentesorg.update.length>0){
                        for(let i=0; i<componentesorg.update.length; i++){
                            const config = {
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                responseType: 'json',
                                data: componentesorg.update[i]
                            }
                            axios.put('http://localhost:3000/updateCompMinMet', config)
                            .then((res) => {
                                console.log(res)
                            }).catch((e) => {
                                console.log(e)
                            })
                        }
                    }
                    if(componentesorg.insert.length>0){
                        for(let i=0; i<componentesorg.insert.length; i++){
                            const config = {
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                responseType: 'json',
                                data: componentesorg.insert[i]
                            }
                            axios.post('http://localhost:3000/insertCompMinMet', config)
                                .then((res) => {
                                    console.log(res)
                                }).catch((e) => {
                                    console.log(e)
                                })
                        }
                    }
                    if(componentesorg.delete.length>0){
                        for(let i=0; i<componentesorg.delete.length; i++){
                            const config = {
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                responseType: 'json'
                            }
                            axios.delete(`http://localhost:3000/deleteCompMin/${componentesorg.delete[i].relacion}`, config)
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((e) => {
                                  console.log(e)
                                })
                        }
                    }
                    history.push('/home')
                }).catch((e) => {
                    console.log(e)
                    history.push('/home')
                })
            }*/
    }
    render(){
        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario='Andrea Da Silva'/>
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h5 className="horizontal-line-title cliente-title">Rol</h5>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información del rol</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Form.Row>
                                	<Col md={3}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                id="nombre-rol"
                                                value={this.state.nombre} 
                                                placeholder="Introduzca el nombre del rol"
                                                autoFocus
                                                onChange={this.onInputChange} 
                                                disabled={!this.state.modificar}
                                            />
                                            {
                                                (this.props.match.params.accion!=='CO')&&
                                                <Form.Text className="text-muted">
                                                    Este campo es obligatorio
                                                </Form.Text>
                                            }
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                </Form.Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Privilegios asociados</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            {
                            	((this.props.match.params.accion!='M')||(this.state.predet))&&
                                this.renderPrivilegios()
                            }
                            <Col md={2}></Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h6 className="horizontal-line-ventas-form"></h6>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <div className="div-content-form">
                        <Row className="div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Row>
                                    <Col md={5}>
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={5}>
                                        {
                                            (this.props.match.params.accion !== 'CO') &&
                                            <Button 
                                                className="ccargo-btn btn-block"
                                                onClick={this.onSubmit}
                                            >
                                                Registrar
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                </Container>
            </div>                 
        )
    }
}