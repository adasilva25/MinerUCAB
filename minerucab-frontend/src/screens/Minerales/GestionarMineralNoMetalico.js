import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
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

export default class GestionarMineralNoMetalico extends React.Component {  
	state = {
        nombre: '',
        uso: '',
        descripcion: '',
        porcentaje: 1,
        precio: '',
        presentaciones: [],
        presentacionesmin: [],
        componentes: [],
        componentesmin: [],
        modificar: true,
    }
    componentDidMount = () => {
    	const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }

        if(this.props.match.params.accion === 'CR'){
            this.setState(() => ({
                presentacionesmin: [{
                    presentacion: 1,
                    nombre: 'Liquido',
                    precio: 1,
                    presShow: true,
                    numero: 1,
                    numeroV:1,
                    predetdb:false,
                }],
                componentesmin: [{
                    mineral: 1,
                    nombre: 'Arcilla',
                    porcentaje: 1,
                    compShow: true,
                    numero: 1,
                    numeroV:1,
                    predetdb:false,
                }]
            }))
        }
        if(this.props.match.params.accion === 'CO'){
            this.setState(() => ({
                modificar: false,
            }))
        }
        //Crear o Modificar (necesito valores predeterminados)
        if(this.props.match.params.accion !== 'CO'){
            axios.get('http://localhost:3000/getAllPresentaciones', config)
                .then((res) => {
                    res.data.forEach(element => {
                        let presentacionInfo = {
                            clave: 1,
                            nombre: ''
                        }
                        presentacionInfo.clave = element.clave;
                        presentacionInfo.nombre = element.nombre;
                        this.setState((prevState) => ({
                            presentaciones: prevState.presentaciones.concat(presentacionInfo)
                        }));
                    })
                }).catch((e) => {
                    console.log('Error en axios')
                })
                
            axios.get('http://localhost:3000/getAllMineralesNoMetalicos', config)
                .then((res) => {
                    res.data.forEach(element => {
                        let componenteInfo = {
                            clave: 1,
                            nombre: ''
                        }
                        componenteInfo.clave = element.clave;
                        componenteInfo.nombre = element.nombre;
                        this.setState((prevState) => ({
                            componentes: prevState.componentes.concat(componenteInfo)
                        }));
                    })
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
        //Consultar o modificar (necesito informacion)
        if (this.props.match.params.accion !== 'CR'){
            axios.get(`http://localhost:3000/getMineralNoMetalicoById/${this.props.match.params.id}`, config)
                .then((res) => {
                  this.setState(() => ({
                    nombre: res.data[0].nombre,
                    uso: res.data[0].uso,
                    descripcion: res.data[0].descripcion,
                  }));
                axios.get(`http://localhost:3000/getAllPresentacionesByIdMineralNoMetalico/${this.props.match.params.id}`, config)
                    .then((res) => {
                        res.data.forEach(element => {
                            let presInfo = {
                                presentacion: 1,
                                nombre: '',
                                precio: 0,
                                presShow: true,
                                numero: this.state.presentacionesmin.length+1,
                                numeroV: this.state.presentacionesmin.length+1,
                                predetdb: true,
                                relacion: 0,
                            }
                            presInfo.relacion = element.relacion;
                            presInfo.presentacion = element.clave;
                            presInfo.nombre = element.nombre;
                            presInfo.precio = element.precio;
                            this.setState((prevState) => ({
                                presentacionesmin: prevState.presentacionesmin.concat(presInfo)
                            }));
                        })
                  }).catch((e) => {
                      console.log('Error en axios')
                  })
                axios.get(`http://localhost:3000/getAllComponentesByIdMineralNoMetalico/${this.props.match.params.id}`, config)
                    .then((res) => {
                        res.data.forEach(element => {
                            let compInfo = {
                                mineral: 1,
                                nombre: '',
                                porcentaje: 1,
                                compShow: true,
                                numero: this.state.componentesmin.length+1,
                                numeroV: this.state.componentesmin.length+1,
                                predetdb: true,
                                relacion: 0,
                            }
                            compInfo.relacion = element.relacion;
                            compInfo.mineral = element.clave;
                            compInfo.nombre = element.nombre;
                            compInfo.porcentaje = element.porcentaje;
                            this.setState((prevState) => ({
                                componentesmin: prevState.componentesmin.concat(compInfo)
                            }));
                        })
                    }).catch((e) => {
                         console.log('Error en axios')
                    })
              }).catch((e) => {
                  console.log('Error en axios')
              })
            
        }
    }
    addPresentacionesMin = (e) => {
        var presentacAux = this.state.presentacionesmin;
        var nuevaPresentacion = {
            presentacion: 1,
            nombre: 'Liquido',
            precio: 1,
            presShow: true,
            numero: 1,
            numeroV:1,
            predetdb:false,
        };

        if(this.state.presentacionesmin.length === 0){
            this.setState(() => ({
                presentacionesmin: [{
                    presentacion: 1,
                    nombre: 'Liquido',
                    precio: 1,
                    presShow: true,
                    numero: 1,
                    numeroV:1,
                    predetdb:false,
                }],
            }));
        }else{
            for (var i = presentacAux.length - 1; i >= 0; i--) {
                if(presentacAux[i].numero!=0){
                    nuevaPresentacion.numero=presentacAux[i].numero+1;
                    break;
                }
            }
            nuevaPresentacion.numeroV=presentacAux[presentacAux.length-1].numeroV+1;
            this.setState((prevState) => ({
                presentacionesmin: prevState.presentacionesmin.concat(nuevaPresentacion),
            }));
        }
    }
    addComponentesMin = (e) => {
        var componenteAux = this.state.componentesmin;
        var nuevoComponente = {
            mineral: 1,
            nombre: 'Arcilla',
            porcentaje: 1,
            compShow:true,
            numero: 1,
            numeroV:1,
            predetdb:false,
        };

        if(this.state.componentesmin.length === 0){
            this.setState(() => ({
                componentesmin: [{
                    mineral: 1,
                    nombre: 'Arcilla',
                    porcentaje: 1,
                    compShow:true,
                    numero: 1,
                    numeroV:1,
                    predetdb:false,
                }],
            }));
        }else{
            for (var i = componenteAux.length - 1; i >= 0; i--) {
                if(componenteAux[i].numero!=0){
                    nuevoComponente.numero=componenteAux[i].numero+1;
                    break;
                }
            }
            nuevoComponente.numeroV=componenteAux[componenteAux.length-1].numeroV+1;
            this.setState((prevState) => ({
                componentesmin: prevState.componentesmin.concat(nuevoComponente),
            }));
        }
    }
    deleteComponentesMin = (ind) => {
        var componentesMinAux = this.state.componentesmin;
        componentesMinAux[ind].compShow=false;
        componentesMinAux[ind].numero=0;

        for(var i = ind; i < componentesMinAux.length; i++) {
            if(componentesMinAux[i].numero!=0){
                componentesMinAux[i].numero--;
            }
        }

        this.setState(() => ({
            componentesmin: componentesMinAux,
        }));

        $('#form'+ind).remove();

        console.log(this.state.componentesmin)
        /*this.state.componentesmin.splice(ind,1);
        console.log(this.state.componentesmin)*/
    }
    deletePresentacionesMin = (ind) => {
        var presentacionesMinAux = this.state.presentacionesmin;
        presentacionesMinAux[ind].presShow=false;
        presentacionesMinAux[ind].numero=0;

        for(var i = ind; i < presentacionesMinAux.length; i++) {
            if(presentacionesMinAux[i].numero!=0){
                presentacionesMinAux[i].numero--;
            }
        }

        this.setState(() => ({
            presentacionesmin: presentacionesMinAux,
        }));

        $('#formpres'+ind).remove();

        console.log(this.state.presentacionesmin)
        /*this.state.componentesmin.splice(ind,1);
        console.log(this.state.componentesmin)*/
    }
    renderOptions = (tipo, indexF) => {
        if(tipo === 'presentacion'){
            let presentacion = [];
            return (this.state.presentaciones.map((optionPre, index) => {
                let existe = 0;
                //TODOS console.log("this.state.presentaciones",this.state.presentaciones)
                presentacion.forEach(element => {
                    //console.log(element, index)
                    if (optionPre.nombre === element){
                        existe = 1;
                    }
                })
                if (existe === 0){
                    presentacion.push(optionPre.nombre);
                    return(<option value={optionPre.clave} id={optionPre.nombre}>{optionPre.nombre}</option>)
                }
            }));
        }
        if(tipo === 'componente'){
            let componente = [];
            return (this.state.componentes.map((optionPre, index) => {
                let existe = 0;
                componente.forEach(element => {
                    if (optionPre.nombre === element){
                        existe = 1;
                    }
                })
                if ((existe === 0)&&(optionPre.clave !== parseInt(this.props.match.params.id))){
                    componente.push(optionPre.nombre);
                    return(<option value={optionPre.clave} id={optionPre.nombre}>{optionPre.nombre}</option>)
                }
            }));
        }
    }
    renderPresentacionesMin = () => {
        if(this.props.match.params.accion === 'CO'){
            return this.state.presentacionesmin.map((option, index) => {
                const nombrePresentacion = option.nombre
                const precio = option.precio
                return (
                    <Form.Row className="div-min-met-presentaciones-form" key={index} id={'formpres'+index}>
                        <Col md={12}>
                            <Row>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Presentación</Form.Label>
                                    <Form.Control 
                                        key={index} 
                                        id={''+index}
                                        className="form-input form-input-dropdown-mineral-met-presentacion"
                                        value={option.nombre}
                                        disabled={true}
                                    />
                                </Col>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Precio</Form.Label>
                                        <Form.Group>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control
                                                    className="form-input form-input-text-precio" 
                                                    key={index} 
                                                    id={''+index}
                                                    value={option.precio}
                                                    disabled={true}
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text className="input-append-ventas-form" key={index}>$</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Form.Row>
                )
            })
        }else{
        	return this.state.presentacionesmin.map((option, index) => {
        		return (
        			<Form.Row className="div-min-met-presentaciones-form" key={index} id={'formpres'+index}>
        				<Col md={12}>
        					<Row>
    		    				<Col md={5}>
    			    				<Form.Label className="cliente-description-fields-text">Presentación</Form.Label>
    			                    <Form.Control 
    			                        as="select" 
    			                        key={index} 
    			                        id={''+index}
    			                        className="form-input form-input-dropdown-mineral-no-met-presentacion"
                                        onChange={(e) => this.onDropdownChange(e, index, 'presentacion')} 
                                        value={option.presentacion}
                                    >
    			                        {
    			                            this.renderOptions('presentacion')
    			                        }
    			                    </Form.Control>
    		    				</Col>
    		    				<Col md={5}>
    		    					<Form.Label className="cliente-description-fields-text">Precio</Form.Label>
    			    					<Form.Group>
    		                                <InputGroup className="MyInputGroup">
    		                                    <Form.Control
    		                                    	type="number" 
    		                                    	step="0.01"
    		                                        className="form-input form-input-text-precio-min-no-met" 
    		                                        key={index} 
    		                                        id={''+index}
    		                                        min="0"
                                                    value={option.precio}
                                                    onChange={(e) => this.onDropdownChange(e, index, 'presentacion')} 
    		                                    />
    		                                    <InputGroup.Append>
    		                                        <InputGroup.Text className="input-append-ventas-form" key={index}>$</InputGroup.Text>
    		                                    </InputGroup.Append>
    		                                </InputGroup>
    		                            </Form.Group>
    				                    <Form.Text className="text-muted">
    				                        Este campo es obligatorio
    				                    </Form.Text>
    		                    </Col>
    		    				<Col md={1}>
                                    <Form.Label className="cliente-description-fields-text"></Form.Label>
                                    <Button 
                                        variant="outline-danger"
                                        className="btn-block"
                                        onClick={() => this.deletePresentacionesMin(index)}
                                    >
                                        x
                                    </Button>
                                </Col>
                                <Col md={1}></Col>
    		    			</Row>
        				</Col>
        			</Form.Row>
        		)
        	})
        }
    }
    renderComponentesMin = () => {
        if(this.props.match.params.accion === 'CO'){
            return this.state.componentesmin.map((option, index) => {
                return (
                    <Form.Row className="div-min-met-componentes-form" key={index} id={'form'+index}>
                        <Col md={12}>
                            <Row>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Mineral</Form.Label>
                                    <Form.Control 
                                        key={index} 
                                        id={''+index}
                                        className="form-input form-input-dropdown-min-no-met-componente"
                                        value={option.nombre}
                                        disabled={true}
                                    />
                                </Col>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Porcentaje</Form.Label>
                                        <Form.Group>
                                            <InputGroup className="MyInputGroup InputGroupPorcentajeCompone">
                                                <Form.Control 
                                                    className="form-input" 
                                                    id='porcentaje-compone-min-no-met'
                                                    value={option.porcentaje}
                                                    disabled={true}
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text className="input-append-ventas-form">%</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Form.Row>
                )
            })
        }else{
            return this.state.componentesmin.map((option, index) => {
                return (
                    <Form.Row className="div-min-met-componentes-form" key={index} id={'form'+index}>
                        <Col md={12}>
                            <Row>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Mineral</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        key={index} 
                                        id={''+index}
                                        value={option.mineral}
                                        className="form-input form-input-dropdown-min-no-met-componente"
                                        onChange={(e) => this.onDropdownChange(e, index, 'componente')}>
                                        {
                                            this.renderOptions('componente')
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Porcentaje</Form.Label>
                                        <Form.Group>
                                            <InputGroup className="MyInputGroup InputGroupPorcentajeCompone">
                                                <Form.Control 
                                                    type="number" 
                                                    className="form-input form-input-text-porcentaje-min-no-met" 
                                                    id={''+index}
                                                    value={option.porcentaje}
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                    onChange={(e) => this.onDropdownChange(e, index, 'componente')}
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text className="input-append-ventas-form">%</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Text className="text-muted">
                                            Este campo es obligatorio
                                        </Form.Text>
                                </Col>
                                <Col md={1}>
                                    <Form.Label className="cliente-description-fields-text"></Form.Label>
                                    <Button 
                                        variant="outline-danger"
                                        className="btn-block"
                                        onClick={() => this.deleteComponentesMin(index)}
                                    >
                                        x
                                    </Button>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Form.Row>
                )
            })
        }
    }
    onDropdownChange = (e, indexMap, tipo) => {
        if(tipo === 'presentacion'){
            if (e.target.className === 'form-input form-input-dropdown-mineral-no-met-presentacion form-control'){
                this.state.presentacionesmin.forEach(element => {
                    if((element.numeroV-1).toString() === e.target.id){
                        element.presentacion = this.state.presentaciones[e.target.value-1].clave
                        element.nombre = this.state.presentaciones[e.target.value-1].nombre
                    }
                })
                this.setState({aux: [
                    ...this.state.presentacionesmin.filter((item, index) => index === indexMap)
                ]})
            }else if (e.target.className === 'form-input form-input-text-precio-min-no-met form-control'){
                this.state.presentacionesmin.forEach(element => {
                    if((element.numeroV-1).toString() === e.target.id){
                        element.precio = e.target.value
                    }
                })
                this.setState({aux: [
                    ...this.state.presentacionesmin.filter((item, index) => index === indexMap)
                ]})
            }
        }
        if(tipo === 'componente'){
            if (e.target.className === 'form-input form-input-dropdown-min-no-met-componente form-control'){
                this.state.componentesmin.forEach(element => {
                    if((element.numeroV-1).toString() === e.target.id){
                        element.mineral = this.state.componentes[e.target.value-1].clave
                        element.nombre = this.state.componentes[e.target.value-1].nombre
                    }
                })
                this.setState({auxi: [
                    ...this.state.componentesmin.filter((item, index) => index === indexMap)
                ]})
            }else if (e.target.className === 'form-input form-input-text-porcentaje-min-no-met form-control'){
                this.state.componentesmin.forEach(element => {
                    if((element.numeroV-1).toString() === e.target.id){
                        element.porcentaje = e.target.value
                    }
                })
                this.setState({aux: [
                    ...this.state.presentacionesmin.filter((item, index) => index === indexMap)
                ]})
            }
        }
    }
    onInputChange = (e) => {
        const modif = e.target.value;

        //Solo letras
        if (!modif || modif.match(/^[ñA-Za-zÁ-Úá-ú _]*[ñA-Za-zÁ-Úá-ú][ñA-Za-zÁ-Úá-ú _]*$/)) {
            if (e.target.id === 'nombre-mineral-no-metalico'){
                this.setState(() => ({
                    nombre: modif
                }));
            }
        }

        //Cualquier caracter
        if (e.target.id === 'uso-mineral-no-metalico'){
            this.setState(() => ({
                uso: modif
            }));
        }

        if (e.target.id === 'descripcion-mineral-no-metalico'){
            this.setState(() => ({
                descripcion: modif
            }));
        }
    }
    onSubmit = () => {
        let repetido = 0
        var tienepres = false
        for (let i=0; i<this.state.presentacionesmin.length; i++){
            for (let k=1; k<this.state.presentacionesmin.length; k++){
                if((i!=k) && (this.state.presentacionesmin[i].presentacion === this.state.presentacionesmin[k].presentacion) && (this.state.presentacionesmin[i].presShow === true) && (this.state.presentacionesmin[k].presShow === true)){
                    repetido = 1;
                }
            }
            if(this.state.presentacionesmin[i].presShow === true){
                tienepres = true
            }
        }
        var tienecomp = false
        for (let i=0; i<this.state.componentesmin.length; i++){
            for (let k=1; k<this.state.componentesmin.length; k++){
                if((i!=k) && (this.state.componentesmin[i].mineral === this.state.componentesmin[k].mineral) && (this.state.componentesmin[i].compShow === true) && (this.state.componentesmin[k].compShow === true)){
                    repetido = 1;
                }
            }
            if(this.state.componentesmin[i].compShow === true){
                tienecomp = true
            }
        }
        if(repetido === 1){
            alert("Existe una presentación o un mineral repetido. Revise e intente de nuevo.")
        }else if(repetido === 0){
            if((this.state.nombre.length>0)&&(this.state.uso.length>0)){
                var desc
                if((this.state.descripcion === null) || (this.state.descripcion.length===0)){
                    desc = null
                }else{
                    desc = this.state.descripcion
                }
                let mineral = {
                    mineralid: this.props.match.params.id,
                    nombre: this.state.nombre,
                    uso: this.state.uso,
                    descripcion: desc,
                    tienec: tienecomp,
                    componentes: [],
                    tienep: tienepres,
                    presentaciones: [],
                }
                
                for (let i = 0; i < this.state.presentacionesmin.length; i++){
                    if(this.state.presentacionesmin[i].presShow === true){
                        let presentacion = {
                            idPresentacion: this.state.presentacionesmin[i].presentacion,
                            precio: parseFloat(this.state.presentacionesmin[i].precio)
                        }
            
                        mineral.presentaciones.push(presentacion)
                    }
                }

                for (let i = 0; i < this.state.componentesmin.length; i++){
                    if(this.state.componentesmin[i].compShow === true){
                        let componente = {
                            idComponente: this.state.componentesmin[i].mineral,
                            porcentaje: parseFloat(this.state.componentesmin[i].porcentaje)
                        }
            
                        mineral.componentes.push(componente)
                    }
                }

                if(this.props.match.params.accion === 'CR'){
                    const config = {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        responseType: 'json',
                        data: mineral
                    }
                    
                    axios.post('http://localhost:3000/crearMineralNoMetalico', config)
                        .then((res) => {
                        }).catch((e) => {
                            console.log('Error en axios')
                        })
                    history.push('/home');
                }

                if(this.props.match.params.accion === 'M'){
                    console.log(mineral)
                    let presentacionesorg = {
                        insert: [],
                        update: [],
                        delete: [],
                    }
                    let componentesorg = {
                        insert: [],
                        update: [],
                        delete: [],
                    }
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
                    axios.put('http://localhost:3000/updateMinNoMetById', config)
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
                                axios.post('http://localhost:3000/insertPresMinNoMet', config)
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
                                axios.put('http://localhost:3000/updateCompMinNoMet', config)
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
                                axios.post('http://localhost:3000/insertCompMinNoMet', config)
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
                }
            }else{
                alert("Existen campos invalidos. Revise e intente de nuevo.")
            }
        }
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
                                    <h5 className="horizontal-line-title cliente-title">Registrar Mineral No Metalico</h5>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información del mineral</h6>
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
                                                id="nombre-mineral-no-metalico"
                                                value={this.state.nombre} 
                                                placeholder="Introduzca el nombre del mineral"
                                                autoFocus
                                                onChange={this.onInputChange} 
                                                disabled={!this.state.modificar}
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                </Form.Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Form.Row>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Uso</Form.Label>
	                                            <Form.Control 
	                                                type="text" 
                                                    as="textarea"
                                                    rows="2"
	                                                className="form-input" 
	                                                id='uso-mineral-no-metalico'
	                                                placeholder="Introduzca el uso del mineral"
	                                                value={this.state.uso}
	                                                onChange={this.onInputChange}
                                                    disabled={!this.state.modificar}
	                                            />
	                                            <Form.Text className="text-muted">
	                                                Este campo es obligatorio
	                                            </Form.Text>
                                        </Form.Group>   
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Descripción</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                as="textarea"
                                                rows="2" 
                                                id="descripcion-mineral-no-metalico"
                                                className="form-input" 
                                                value={this.state.descripcion} 
                                                placeholder="Introduzca la descripción" 
                                                onChange={this.onInputChange} 
                                                disabled={!this.state.modificar}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Presentaciones disponibles</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                            {
                            	this.renderPresentacionesMin()
                            }
                            </Col>
                            <Col md={1}></Col>
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
                    <div>
                        <Row className="div-content-form div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Row>
                                    <Col md={9}></Col>
                                    <Col md={3}>
                                        {
                                            (this.props.match.params.accion !== 'CO') &&
                                            <Button 
                                                className="ventas-form-btn btn-block"
                                                onClick={this.addPresentacionesMin}
                                            >
                                                +
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Minerales que lo componen</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                            {
                                this.renderComponentesMin()
                            }
                            </Col>
                            <Col md={1}></Col>
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
                            <Col md={10}>
                                <Row>
                                    <Col md={9}></Col>
                                    <Col md={3}>
                                        {
                                            (this.props.match.params.accion !== 'CO') &&
                                            <Button 
                                                className="ventas-form-btn btn-block"
                                                onClick={this.addComponentesMin}
                                            >
                                                +
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
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