import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import './styles/commonStyles.scss';

class Index extends Component{
    render(){
        return (
            <Router>
                <App/>
            </Router>
        )
    }
}
render(<Index/>, document.getElementById('root'));