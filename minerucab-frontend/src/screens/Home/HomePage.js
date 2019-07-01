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
        modalShow: false
    };
    constructor(props){
        super(props);
    }
    modalClose = () => this.setState({ modalShow: false });
    modalOpen = () => {
        this.setState({ modalShow: true });
    }  
    render(){

        let actividades = [
            {
                titulo: 'Yacimientos',
                link:'/yacimiento',
                image:'/images/Yacimientos.jpg',
                descripcion:""
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
                descripcion:""
            },

            {
                titulo: 'Explotaciones',
                link:'/explotacion',
                image:'/images/Explotaciones.jpg',
                descripcion:""
            },

            {
                titulo: 'Ventas',
                link:'/venta',
                image:'/images/Ventas.png',
                descripcion:""
            },

            {
                titulo: 'Solicitudes de compra',
                link:'/solicitud_compra',
                image:'/images/Compras.jpg',
                descripcion:""
            },

            {
                titulo: 'Empleados',
                link:'/empleado',
                image:'/images/Empleados.jpg',
                descripcion:""
            },

            {
                titulo: 'Clientes',
                link:'/cliente',
                image:'/images/Clientes.jpg',
                descripcion:""
            },

            {
                titulo: 'Inventario',
                link:'/inventario',
                image:'/images/inventario.jpg',
                descripcion:""
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