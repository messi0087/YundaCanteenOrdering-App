import React, { Component } from 'react';
import {
    View, StyleSheet, Text, Alert, TouchableOpacity, TouchableHighlight, Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state={
            account:0
        };
    }

    handleVisible(){
        this.props.greet(true);
    };

    handleClean(){
        if(this.state.account>0) {
            this.props.clean();
        }else {
            Alert.alert('清空失败','请先添加商品')
        }
    };

    refreshMoney =() =>{
        this.setState({
            account:this.props.money
        });
    };

    finishOrder =() =>{
        if(this.state.account >0) {
            Alert.alert('提交订单', '是否要提交订单',[
                {text: '不提交', onPress: () =>  {}},
                {text: '提交', onPress: () =>  navigation.navigate('MainMenus')},
            ]);
            // console.log('okkk')
        }else {
            Alert.alert('提交订单失败','请先添加商品')
        }
    };
    render(){
        return(
            <View style={styles.container}>
                <Ionicons
                    name = {'md-cart'}
                    color={'white'}
                    size={45}
                    style={styles.icons}
                    // onPress={() => {
                    //     this.setModalVisible(true);
                    // }}
                    onPress={this.handleVisible.bind(this)}
                />

                <Text style={styles.accountText}>
                    ¥总金额：
                    <Text style={styles.accountText2}>{this.state.account}元</Text>
                </Text>

                <Ionicons
                    name = {'md-trash'}
                    color={'white'}
                    size={45}
                    style={styles.icons}
                    // onPress={() => {
                    //     this.setModalVisible(true);
                    // }}
                    onPress={this.handleClean.bind(this)}
                />
                <TouchableOpacity onPress={this.finishOrder.bind(this)} style={styles.Button}   activeOpacity={0.8}>
                    <Text style={styles.finishText}>去结算</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles =StyleSheet.create({
    Button:{
        borderLeftWidth: 1,
        // borderRadius:80,
        flex:1,
        backgroundColor: '#FFCC33',
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
    },

    //主要的文字
    finishText:{
        color:'#000',
        fontSize:20,
        // marginLeft:90,
    },

    //主要的文字
    accountText2:{
        color:'#FFFFFf',
        fontSize:15,
        alignSelf:'center',
        // marginLeft:90,
    },
    //主要的文字
    accountText:{
        flex:2,
        color:'#FFFFFf',
        fontSize:15,
        alignSelf:'center',
        // marginLeft:90,
    },

    //购物车按钮
    icons:{
        flex:1,
        marginLeft:20,
        marginTop:5,
    },
    //主容器
    container:{
        backgroundColor: '#000000',
        borderWidth:1,
        borderRadius:80,
        flexDirection:'row',
        overflow:'hidden',

    },

});

ShoppingCart.propTypes = {
    greet: PropTypes.func,
};
