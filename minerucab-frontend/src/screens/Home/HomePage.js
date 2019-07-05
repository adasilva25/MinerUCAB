import React from 'react';
import { connect } from 'react-redux';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../../routers/History';
import SetActividades from '../../components/SetActividades'
import OpcionesLocales from '../../components/OpcionesLocales'
import OpcionesGlobales from '../../components/OpcionesGlobales'
import Container from 'react-bootstrap/Container'


export class HomePage extends React.Component {
    state = { 
        modalShow: false,
        yacimiento: null,
        mineral: null,
        explotacion: null,
        venta: null,
        solicitud: null,
        empleado: false,
        cliente: null,
        inventario: null,
        rol: null
    }
    constructor(props){
        super(props);
    }
    componentDidMount = () => {
        const userInfoString = localStorage.getItem('user')
        const userInfo = JSON.parse(userInfoString);
        console.log(userInfo)

        userInfo.forEach((info) => {
            console.log('info', info.nombre.toLowerCase().includes('empleado'))
            if (info.nombre.toLowerCase().includes('yacimiento')){
                this.setState({ yacimiento: true });
            }
            if (info.nombre.toLowerCase().includes('mineral')){
                this.setState({ mineral: true });
            }
            if (info.nombre.toLowerCase().includes('explotación')){
                this.setState({ explotacion: true });
            }
            if (info.nombre.toLowerCase().includes('venta')){
                this.setState({ venta: true });
            }
            if (info.nombre.toLowerCase().includes('solicitud')){
                this.setState({ solicitud: true });
            }
            if (info.nombre.toLowerCase().includes('empleado')){
                console.log('entro en empleado')
                this.setState({ empleado: true });
                console.log('empleado', this.state)
            }
            if (info.nombre.toLowerCase().includes('cliente')){
                this.setState({ cliente: true });
            }
            if (info.nombre.toLowerCase().includes('inventario')){
                this.setState({ inventario: true });
            }
            if (info.nombre.toLowerCase().includes('rol')){
                this.setState({ rol: true });
            }
        })
        console.log('state', this.state)
    }
    modalClose = () => this.setState({ modalShow: false });
    modalOpen = () => {
        this.setState({ modalShow: true });
    }  
    render(){

        const userInfoString = localStorage.getItem('user')
        const userInfo = JSON.parse(userInfoString);
        console.log(userInfo)

        userInfo.forEach((info) => {
            if (info.nombre.toLowerCase().includes('yacimiento') && this.state.yacimiento !== true){
                this.setState({ yacimiento: true });
            }
            if (info.nombre.toLowerCase().includes('mineral') && this.state.mineral !== true){
                this.setState({ mineral: true });
            }
            if (info.nombre.toLowerCase().includes('explotación') && (this.state.explotacion !== true)){
                this.setState({ explotacion: true });
            }
            if (info.nombre.toLowerCase().includes('venta') && this.state.venta !== true){
                this.setState({ venta: true });
            }
            if (info.nombre.toLowerCase().includes('solicitud') && this.state.solicitud !== true){
                this.setState({ solicitud: true });
            }
            if (info.nombre.toLowerCase().includes('empleado') && !this.state.empleado){
                this.setState({ empleado: true });
            }
            if (info.nombre.toLowerCase().includes('cliente') && this.state.cliente !== true){
                this.setState({ cliente: true });
            }
            if (info.nombre.toLowerCase().includes('inventario') && this.state.inventario !== true){
                this.setState({ inventario: true });
            }
            if (info.nombre.toLowerCase().includes('rol') && this.state.rol !== true){
                this.setState({ rol: true });
            }
        })
        console.log('state', this.state)

        let actividades = [
            {
                titulo: 'Yacimientos',
                link:'/yacimiento',
                image:'/images/Yacimientos.jpg',
                descripcion:"",
                show: this.state.yacimiento
            },

            /*{
                titulo: 'Cargos',
                link:'/cargo',
                image:'/images/Cargos.png',
                descripcion:" 
            },*/

            {
                titulo: 'Minerales',
                link:'/mineral',
                image:'/images/Minerales.jpg',
                descripcion:"",
                show: this.state.mineral
            },

            {
                titulo: 'Explotaciones',
                link:'/explotacion',
                image:'/images/Explotaciones.jpg',
                descripcion:"",
                show: this.state.explotacion
            },

            {
                titulo: 'Ventas',
                link:'/venta',
                image:'/images/Ventas.png',
                descripcion:"",
                show: this.state.venta
            },

            {
                titulo: 'Solicitudes de compra',
                link:'/solicitud_compra',
                image:'/images/Compras.jpg',
                descripcion:"",
                show: this.state.solicitud
            },

            {
                titulo: 'Empleados',
                link:'/empleado',
                image:'/images/Empleados.jpg',
                descripcion:"",
                show: this.state.empleado
            },

            {
                titulo: 'Clientes',
                link:'/cliente',
                image:'/images/Clientes.jpg',
                descripcion:"",
                show: this.state.cliente
            },

            {
                titulo: 'Inventario',
                link:'/inventario',
                image:'/images/inventario.jpg',
                descripcion:"",
                show: this.state.inventario
            },
            /*{
                titulo: 'Empresas Aliadas',
                link:'#45',
                image:'/images/Empresas_Aliadas.jpg',
                descripcion:" 
            }*/
        ];

        let Actlength= actividades.length;
        let actividad=[];
        var NumCards= 3;
        var k = -1;

        for (var i = 0; i < Actlength; i=i+NumCards) {
            var item =[];
            item = actividades.splice(0,NumCards);
            actividad.push(item);
            k++;
        }
        Actlength= actividad[k].length;
        if( ( actividad[k].length % NumCards ) != 0){
            for( var j=0; j<( NumCards-Actlength); j++ ){
                actividad[k].push([""]);
            }
        }
        

        var opciones = "Diego Gutiérrez";

        return ( 
            <div className="contain pagecontent" id="Content">
            {
                console.log('user', this.props.user)
            }
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={opciones}/>
                <div id="Content" className="contain pagecontent">
                    <Container fluid={true}>
                        <Container fluid={true} className="containerSetActividades">
                            {actividad.map((act,index)=>{
                                return(
                                    <SetActividades actividades1={act} key={index} history={this.props.history}
                                    />
                                );
                            })}
                        </Container>
                    </Container>
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

export default connect(mapStateToProps)(HomePage)