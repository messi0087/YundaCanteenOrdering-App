import {
    createStackNavigator,
    createBottomTabNavigator ,
    createMaterialTopTabNavigator,
    createDrawerNavigator,
    DrawerItems,
    createSwitchNavigator
} from 'react-navigation';

import React from 'react';
import Login from '../Login/LoginView'
import MainMenus from '../main/MainMenus'
import Csstest from '../test/Csstest'
import MyOrder from '../main/MyOrder'
import Myself from '../main/Myself'
import OrderDetail from '../main/OrderDetail'
import Resturant from '../main/Resturant'
import Registration from '../Login/Registration'
import modal from '../test/modal'
import Example from '../test/Example'
import ChangePassword from '../Login/ChangePassword'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const AppStackNavigator = createStackNavigator({
    OrderDetail: {
        screen: OrderDetail,
        navigationOptions: {
            header: null,
        }
    },

    Resturant: {
        screen: Resturant,
        navigationOptions: {
            header: null,
        }
    },
});

export const AppTabNavigator = createBottomTabNavigator({
    MainMenus: {
        screen: MainMenus,
        navigationOptions: {
            header: null,
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name = {'ios-home'}
                    size={26}
                    style={{color:tintColor}}
                />
            ),
        }
    },
    MyOrder: {
        screen: MyOrder,
        navigationOptions: {
            header: null,
            tabBarLabel: '订单',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name = {'ios-aperture'}
                    size={26}
                    style={{color:tintColor}}
                />
            ),
        }
    },
    Myself: {
        screen: Myself,
        navigationOptions: {
            header: null,
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name = {'ios-people'}
                    size={26}
                    style={{color:tintColor}}
                />
            ),
        }
    },

}, {

    tabBarOptions: {
        activeTintColor: '#e91e63'
    }
});


export default createSwitchNavigator(
    {
        // Auth: MainMenus,
        Auth:Example,
        // Auth: Login,
        MainMenus: AppTabNavigator,AppStackNavigator,

        // 登陆注册界面的跳转
        Registration: Registration,
        ChangePassword: ChangePassword,
    },
    {
        initialRouteName: 'Auth',
    }
);
