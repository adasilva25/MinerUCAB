import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { history } from '../routers/History';
import { Link } from 'react-router';
// https://react-bootstrap.github.io/components/buttons/


export default class Actividad extends React.Component {
  constructor(props){
      super(props);
  }
  routeTo(link){
    window.open(link,'_self');
  }
  render(){
      const {act} = this.props;
      var clase = "actividad";
      if ( act== "" ){
        clase = "No_visible"
      }
      return (
          <Card  style={{ width: '18rem' }} className={clase}>
            <Card.Img variant="top" src={act.image} />
            <Card.Body>
              <Card.Title>{act.titulo}</Card.Title>
              <Card.Text>
                Descripcion actividad.{/*act.descripcion*/}
              </Card.Text>
              <Button variant="primary" onClick={()=>this.routeTo(act.link)}>Go somewhere</Button>
            </Card.Body>
          </Card>
      )
  }
}