import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import AppNavigator from "./AppNavigator";
import {Provider} from 'mobx-react';
import store from '../store';



const AppStackNavigatorContainer = createAppContainer(AppNavigator);

export default class App extends Component{
    render() {
        return (
            <Provider {...store}>
                <AppStackNavigatorContainer/>
            </Provider>
        );
    }
}
