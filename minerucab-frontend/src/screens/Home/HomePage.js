import React from 'react';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../../routers/History';
import SetActividades from '../../components/SetActividades'
import OpcionesLocales from '../../components/OpcionesLocales'
import OpcionesGlobales from '../../components/OpcionesGlobales'
import Container from 'react-bootstrap/Container'
import ModalBuscarCliente from '../../components/ModalBuscarCliente';


export default class HomePage extends React.Component {
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
    onClickDashboardPage(){
        history.push('/dashboard');  
    }  
    onClickLoginPage(){
        history.push('/');  
    }  
    render(){

        let actividades = [
            {
                titulo: 'Yacimientos',
                link:'/registrar_yacimiento',
                image:'/images/Yacimientos.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Cargos',
                link:'/cargo',
                image:'/images/Cargos.png',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Minerales',
                link:'#45',
                image:'/images/Minerales.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Explotaciones',
                link:'#45',
                image:'/images/Explotaciones.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Ventas',
                link:'/venta',
                image:'/images/Ventas.png',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Solicitudes de compra',
                link:'#45',
                image:'/images/Compras.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Empleados',
                link:'/empleado',
                image:'/images/Empleados.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Clientes',
                link:'/cliente',
                image:'/images/Clientes.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Maquinarias',
                link:'/maquinaria',
                image:'/images/Maquinarias.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },
            {
                titulo: 'Empresas Aliadas',
                link:'#45',
                image:'/images/Empresas_Aliadas.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            }
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

        var opciones = "Andrea Da Silva";

        return ( 
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={opciones}/>
                <div id="Content" className="contain pagecontent">
                    <Container fluid={true}>
                        <Container fluid={true} className="containerSetActividades">
                            {actividad.map((act,index)=>{
                                return(
                                    <SetActividades actividades1={act} key={index} 
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
