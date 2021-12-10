import React, { Component } from 'react';
import UpperNavigation from './Navigation/upperNavigation';
import AppRouter from '../components/AppRouter';

class App extends Component{
    state = {
        user_detials: {
            name: "Ishwar Deoolkar"
        }
    }
    render() {
        return (
            <div className="app-container">
                <UpperNavigation brandName="RealState"/>
                <AppRouter/>
            </div>
            
        )
    }
}
export default App;