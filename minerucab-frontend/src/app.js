import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// const jsx = (
//     <div>
//         <Button variant="primary">Primary</Button>
//         <Button variant="secondary">Secondary</Button>
//         <Button variant="success">Success</Button>
//     </div>
// );

ReactDOM.render(<AppRouter />, document.getElementById('app'));