import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default class MenuBar extends React.Component {
    render(){
        return (
            <div>
                <Nav className="justify-content-center" variant="pills" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href={this.props.consultar}>Consultar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="navstyle" href={this.props.agregar}>Agregar</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        )
    }
}