import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/

import Card from 'react-bootstrap/Card'
import Actividad from './Actividad'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'
import Carousel from 'react-bootstrap/Carousel'

export default class CarouselActividad extends React.Component {
    constructor(props){
        super(props)
        
    }

    
    
                        
    render(){
        var {actividades1} = this.props;
        var Actividadeslength = actividades1.length;
        var act = [];
        var k = -1;
        for (var i = 0; i < Actividadeslength; i=i+3) {
            var item =[]; 
            item = actividades1.splice(0,3);
            act.push(item); 
            k++;
        }

        if( ( act[k].length % 3 ) != 0){
            for( var j=0; j<=( 3-act[k].length); j++ ){
                act[k].push([""]);
            }
        }

        

        return (
            <div>
                {act.map((actividad,index)=>{
                    return(
                        <CardDeck className={index === 0 ? "CardDeckActividad" : "CardDeckActividadEnd"} key={index}>
                            {actividad.map((actividad1,index1)=>{
                                return(
                                    <Actividad title={actividad1} key={index1}>
                                    </Actividad>
                                );
                            })}
                        </CardDeck>
                    );
                })}
            </div>
        )
    }

}
