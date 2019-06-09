import React from 'react';
// https://react-bootstrap.github.io/components/buttons/

import Actividad from './Actividad'
import Container from 'react-bootstrap/Container'
import CardDeck from 'react-bootstrap/CardDeck'

export default class SetActividades extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        var {actividades1} = this.props;
        var Actividadeslength = actividades1.length;
        var act = [];
        act[0]=actividades1;

        return (
            <div>
                <Container>
                {act.map((actividad,index)=>{
                    return(
                        <CardDeck className="CardDeckActividad" key={index}>
                            {actividad.map((actividad1,index1)=>{
                                return(
                                    <Actividad act={actividad1} key={index1} />
                                );
                            })}
                        </CardDeck>
                    );
                })}
                </Container>
            </div>
        )
    }

}
