import React, { Component } from 'react';
import UpperNavigation from './Navigation/upperNavigation';
import AppRouter from '../components/AppRouter';
import { ToastProvider } from 'react-toast-notifications';

class App extends Component{
    state = {
        user_detials: {
            name: "Ishwar Deoolkar"
        }
    }
    render() {
        return (
            <ToastProvider placement="top-center">
                <div className="app-container">
                    <UpperNavigation brandName="RealState"/>
                    <AppRouter/>
                </div>
            </ToastProvider>
        )
    }
}
export default App;