import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, Alert,Image} from 'react-native';

const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

export default class MyOrder extends React.Component {
    _onPressButton: test._onPressButton;
    render() {
        this._onPressButton =() =>{
            Alert.alert('订单');
            console.log('okkk')
        };

        const {navigation} = this.props;

        // 图片的声明区域
        let pic = require('../../images/orderImages/1.jpg');
        let pic1 = require('../../images/orderImages/2.jpg');
        let pic2 = require('../../images/orderImages/3.jpg');
        return (
            <View style={styles.container}>

                {/*头部的文字标题*/}
                <View style={styles.header}>
                    <Text style={styles.textTitle}>
                        我的订单
                    </Text>
                </View>

                {/*下拉订单列表*/}
                <View style={styles.downMenu}>
                    <FlatList
                        data={[
                            {
                                key: '订单一',
                                p:pic
                            },
                            {
                                key: '订单二',
                                p:pic2
                            },
                            {
                                key: '订单三',
                                p:pic1
                            },
                            {
                                key: '订单四',
                                p:pic1
                            },
                            {
                                key: '订单五',
                                p:pic1
                            },
                            {
                                key: '订单六',
                                p:pic1
                            },
                            // {
                            //     key: '订单七',
                            //     p:pic1
                            // },
                        ]}
                        renderItem={({item}) =>
                            <TouchableOpacity
                                onPress={()=>
                                {
                                    navigation.navigate('OrderDetail');
                                }}
                                style={{width:width*0.9,borderTopWidth: 2,borderRightWidth: 2,borderLeftWidth: 2,paddingBottom: 10}}
                            >
                                <View style={styles.itemView1}>
                                    <Text style={styles.item1}>{item.key}</Text>
                                    <Text style={styles.item2}>商家：云南大学食堂一楼</Text>
                                </View>

                                <View style={styles.imageView}>
                                    <View style={styles.itemView2}>
                                        <Text style={styles.item3}>时间：</Text>
                                        <Text style={styles.item4}>金额：</Text>
                                    </View>
                                    <Image source={item.p} style={{width:180,height:80}}/>
                                </View>
                            </TouchableOpacity>
                        }

                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item4:{
        fontSize: 20,
        fontWeight: 'normal',
        color:'#000000',
        // textAlign: 'center',
        marginLeft:width*0.9*0.02,
    },

    item3: {
        fontSize: 20,
        fontWeight: 'normal',
        color:'#000000',
        // textAlign: 'center',
        marginLeft:width*0.9*0.02,
        marginBottom: 10,
    },

    item2: {
        fontSize: 18,
        fontWeight: 'normal',
        color:'#000000',
        // textAlign: 'center',
        marginLeft:width*0.9*0.15,
    },

    item1: {
        fontSize: 20,
        fontWeight: 'normal',
        color:'#000000',
        // textAlign: 'center',
        marginLeft:width*0.9*0.02,
    },

    itemView2:{
        width:width*0.3,
        // backgroundColor:'black',
        // height: height*0.15,
        borderColor:'#676767',
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        paddingBottom:20,
        paddingTop:20,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    itemView1:{
        // width:width*0.9,
        // borderColor:'#676767',
        borderBottomWidth: 1,
        // marginBottom:height*0.7*0.1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    imageView:{
        flexDirection:'row',
        alignItems:'center',
    },
    downMenu: {
        height:height*0.80,
         // width:width*0.9,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: '#000000',
        // paddingTop:height*0.01,
    },

    //标题字体
    textTitle:{
        fontFamily: '宋体',
        fontSize: 25,
        fontWeight: 'bold',
        color:'#ffffff',

    },

    //标题区域
    header:{
        width:width,
        height:height*0.1,
        backgroundColor:'#ffcc33',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:height*0.01
    },

    //容器
    container:{
        flex:1,
        alignItems:'center',
    },
});
