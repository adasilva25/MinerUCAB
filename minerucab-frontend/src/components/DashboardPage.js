const path = require('path');

import React from 'react';
import { history } from '../routers/History';

import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/

// import ToggleButton from 'react-bootstrap/ToggleButton'
// https://react-bootstrap.github.io/components/buttons/

import Collapse from 'react-bootstrap/Collapse';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// https://react-bootstrap.github.io/components/tabs/

import Accordion from 'react-bootstrap/Accordion'
// https://react-bootstrap.netlify.com/components/accordion/#accordion
// https://stackoverflow.com/questions/27012800/react-bootstrap-accordion-not-working-properly

export default class DashboardPage extends React.Component {
    constructor(props){
        super(props);
       
        this.state = {
            open: false,
            openCollapseFirstButtonInsideTab: false,
            openCollapseSecondButtonInsideTab: false,
            tabs: 3,
            // tabs: [{
            //     text: 'Etapa 1',
            //     description: 'Exploración'
            // }, {
            //     text: 'Etapa 2',
            //     description: 'Perforación'
            // }, {
            //     text: 'Etapa 3',
            //     description: 'Explotación'
            // }],
            accordion: [{
                text: 'Fase 1',
                description: 'Exploración'
            }, {
                text: 'Fase 2',
                description: 'Perforación'
            }, {
                text: 'Fase 3',
                description: 'Explotación'
            }]
            // accordion: ['Andreita', 'Albita', 'Yeyo']
        }
    }
    onClickNewWindow(){
        // console.log(path.join(__dirname, '../../../minerucab-backend/reports/outputs/Dynamic_Report.html'))
        // window.open('file:///Users/andreadasilva/Desktop/bases-de-datos/minerucab-backend/reports/outputs/Dynamic_Report.html');
        // window.open('file:///Users/andreadasilva/Desktop/bases-de-datos/minerucab-backend/reports/outputs/Dynamic_Report.html');
        // window.open('http://www.google.com');
        // history.push('/jahsdjha');   // Como es NotFoundPage, no importa la dirección que ponga, 
    }                                   // está hecha para agarrar cualquier error en cuanto a la URL
    onClickLoginPage(){
        history.push('/');
    }
    renderTabs = (index) => (
        console.log(index)
    )
    renderAccordion = () => (
        this.state.accordion.map((option, index) => (
            <div key={index}>
                <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                {option.text}
                </Accordion.Toggle>
                <Button variant="light" onClick={() => this.setState((prevState) => ({
                    accordion: prevState.accordion.filter((item, index) => item !== option)
                        .map((item, index) => ({
                            text: `Fase ${index+1}`,
                            description: item.description
                        }))
                }))
                }>X</Button>
                <Accordion.Collapse eventKey={index}>
                    <div>
                        {option.description}
                    </div>
                </Accordion.Collapse>
            </div> 
        ))
    )
    handleSelect = (key) => {
        if (key === 'addOne'){
            this.setState({tabs: this.state.tabs+1})
        }
    }
    render(){
        const { open } = this.state;
        const { tabs } = this.state;
        const { openCollapseFirstButtonInsideTab } = this.state;
        const { openCollapseSecondButtonInsideTab } = this.state;
        return (
            <div>
                
                <Button variant="primary" onClick={this.onClickLoginPage}>Go to LoginPage</Button>
                <Button variant="danger" onClick={this.onClickNewWindow}>Open a Window</Button>

                {/*Collapse*/}
                <Button
                    onClick={() => this.setState({ open: !open })}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >Collapse Button</Button>
                <Collapse in={this.state.open}>
                    <div id="example-collapse-text">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </Collapse>

                
                {/*Toggleable / Dynamic Tabs*/}
                <div>
                    <Tabs id="dynamicTab" defaultActiveKey="profile" id="uncontrolled-tab-example" onSelect={this.handleSelect}>
                        <Tab eventKey="home" title={`Etapa ${tabs - 2}`}>
                            <div>
                                <div>
                                    <Button
                                        onClick={() => this.setState({ openCollapseFirstButtonInsideTab: !openCollapseFirstButtonInsideTab })}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openCollapseFirstButtonInsideTab}
                                        >Collapse Button
                                    </Button>
                                    <Collapse in={this.state.openCollapseFirstButtonInsideTab}>
                                        <div id="example-collapse-text">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                            labore wes anderson cred nesciunt sapiente ea proident.
                                        </div>
                                    </Collapse>
                                </div>

                                {/*Accordion*/}
                                <div>
                                    <Accordion>
                                    {
                                        this.renderAccordion()
                                    }
                                    </Accordion>
                                    
                                    <Button 
                                        onClick={() => this.setState((prevState) => ({
                                            accordion: prevState.accordion.concat({
                                                text: `Etapa ${prevState.accordion.length + 1}`,
                                                description: `Descripción etapa ${prevState.accordion.length + 1}`
                                            })
                                        }))}
                                    >
                                        <h3>+</h3>
                                    </Button>
                                    {/*<Accordion>
                                        <div>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Click me!
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <div>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                    terry richardson ad squid
                                                </div>
                                            </Accordion.Collapse>
                                        </div>   
                                        <div>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                Click me!
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <div>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                    terry richardson ad squid
                                                </div>
                                            </Accordion.Collapse>
                                        </div>  
                                    </Accordion>*/}
                                </div>
                            </div>
                        </Tab>
                        
                        <Tab eventKey="profile" title={<span>Etapa {tabs - 1} <button onClick={() => console.log('clicked')}>x</button></span>}>
                            <div>
                                <div>
                                    Te quiero
                                </div>
                                <div>
                                    <Button
                                        onClick={() => this.setState({ openCollapseSecondButtonInsideTab: !openCollapseSecondButtonInsideTab })}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openCollapseSecondButtonInsideTab}
                                        >Collapse Button
                                    </Button>
                                    <Collapse in={this.state.openCollapseSecondButtonInsideTab}>
                                        <div id="example-collapse-text">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                            labore wes anderson cred nesciunt sapiente ea proident.
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="remove" as={Button} title="x">
                            </Tab>
                        <Tab eventKey="contact" title="Contact" disabled>
                            <div id="example-collapse-text">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                labore wes anderson cred nesciunt sapiente ea proident.
                            </div>
                        </Tab>
                        <Tab eventKey="addOne" title="+">
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}