import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom';
import DasboardWapperContainer from '../screens/Dashboard/DashboardWrapperContainer';
import CreateWrapperContainer from '../screens/CreateProperty/CreateWrapperContainer';
import PageNotFound from '../components/PageNotFound';

class AppRouter extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Fragment>
                <Switch>
                    <Route
                        exact
                        path="/home"
                        render={(props) => <DasboardWapperContainer />}
                    />
                    <Route
                        exact
                        path="/create"
                        render={(props) => <CreateWrapperContainer />}
                    />
                    <Route component={PageNotFound}/>
                </Switch>
            </Fragment>
        )
    }
}
export default AppRouter;