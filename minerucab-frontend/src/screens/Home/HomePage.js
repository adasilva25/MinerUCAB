import React from 'react';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../../routers/History';
import SetActividades from '../../components/SetActividades'
import OpcionesLocales from '../../components/OpcionesLocales'
import OpcionesGlobales from '../../components/OpcionesGlobales'
import Container from 'react-bootstrap/Container'


export default class HomePage extends React.Component {
    constructor(props){
        super(props);
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
                link:'#45',
                image:'/images/Yacimientos.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Cargos',
                link:'#45',
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
                link:'#45',
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
                titulo: 'Yacimientos1',
                link:'#45',
                image:'/images/Yacimientos.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Cargos1',
                link:'#45',
                image:'/images/Cargos.png',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Minerales1',
                link:'#45',
                image:'/images/Minerales.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },
            {
                titulo: 'Explotaciones1',
                link:'#45',
                image:'/images/Explotaciones.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Ventas1',
                link:'#45',
                image:'/images/Ventas.png',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Solicitudes de compra1',
                link:'#45',
                image:'/images/Compras.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Yacimientos2',
                link:'#45',
                image:'/images/Yacimientos.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Cargos2',
                link:'#45',
                image:'/images/Cargos.png',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Minerales2',
                link:'#45',
                image:'/images/Minerales.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Explotaciones2',
                link:'#45',
                image:'/images/Explotaciones.jpg',
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tortor dui. Nulla facilisi. Quisque et commodo nisl. Phasellus nibh libero, vehicula quis euismod nec, accumsan vitae enim. Etiam eu malesuada quam, vel ullamcorper diam. Morbi euismod sapien id nisl rhoncus porta. Integer venenatis sapien vel neque condimentum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            },

            {
                titulo: 'Ventas2',
                link:'#45',
                image:'/images/Ventas.png',
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

        var opciones = "Diego Gutiérrez";

        return ( 

            <div>
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={opciones}/>
                <div id="Content">
                    <Container fluid={true}>
                        <Container fluid={true} className="containerSetActividades">
                            {actividad.map((act,index)=>{
                                return(
                                    <SetActividades actividades1={act} key={index} />
                                );
                            })}
                        </Container>
                    </Container>
                </div>
            </div>
        )
    }

}
