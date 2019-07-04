import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native';

//引入请求API
import  * as GatherAPI from '../Utils/GatherAPI'

//引入图标
import Ionicons from 'react-native-vector-icons/Ionicons'

//引入屏幕尺寸
const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

export default class makeOrder extends Component {
    constructor(props){
        super(props);
        this.state={
        };
    }


    render(){
        return(
                // 主容器
                <View style = {styles.container}>
                    {/*返回按钮*/}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style = {styles.backButton}
                            onPress={()=>
                            {
                            }}
                        >
                            <Text style={{color:'white',fontSize: 25}}>
                                ◀
                            </Text>
                        </TouchableOpacity >
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>
                                提交订单
                            </Text>
                        </View>
                    </View>


                        {/*隐藏和显示密码*/}
                        <TouchableOpacity
                            style = {styles.hidden}
                            onPress={}
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name = {'md-eye-off'}
                                size={32}
                                color={'#ffcc33'}
                                // style={styles.icons2}
                            />
                        </TouchableOpacity >




                </View>
        );
    }
}

const styles = StyleSheet.create({
    // 隐藏和显示的按钮
    hidden:{
        width:width*0.1,
        height:height*0.05,
        // backgroundColor: '#ffcc33',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // 隐藏和显示视图
    passwordView:{
        width:width,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    // 注册按钮的样式
    registerButton:{
        height:height*0.08,
        width:width*0.5,
        backgroundColor: '#ffcc33',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor:"white",
        // borderWidth:2,
        // borderRadius:8
    },

    // 文本框样式3
    textInputStyle3:{
        width: width*0.5,
        height:38,
        marginBottom:30,
        borderBottomWidth:2,
        justifyContent:'center',
        color:'white',
        borderColor: 'white',
    },
    // 文本框样式2
    textInputStyle2:{
        width: width*0.4,
        height:38,
        marginBottom:30,
        borderBottomWidth:2,
        justifyContent:'center',
        color:'white',
        borderColor: 'white',
    },

    // 文本框样式2
    textInputStyle1:{
        width: width*0.5,
        height:38,
        marginTop:height*0.4,
        marginBottom:30,
        borderBottomWidth:2,
        justifyContent:'center',
        color:'white',
        borderColor: 'white',
    },

    // // 文本框样式1
    // textInputStyle1:{
    //     width: width*0.5,
    //     height:38,
    //     marginTop:height*0.4,
    //     marginBottom:30,
    //     borderBottomWidth:2,
    //     justifyContent:'center',
    //     color:'white',
    //     borderColor: 'white',
    // },


    //标题文字
    titleText:{
        fontSize: 25,
        fontWeight: 'bold',
        color:'#ffffff',
        paddingLeft:width*0.22,
        // textAlign: 'center',
    },

    //标题视图
    titleView:{
        flex:5,
        height:height*0.05,
        justifyContent: 'center',

    },

    // 注册按钮的样式
    backButton:{
        flex:1,
        height:height*0.05,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor:"white",
        // borderWidth:2,
        // borderRadius:8
    },
    // //返回按钮
    // backButton:{
    //     position:'absolute',
    //     top:height*0.05,
    //     left:width*0.1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },

    // 头部
    header:{
        flexDirection:'row',
        height:height*0.1,
        width:width,
        backgroundColor: '#ffcc33',
        alignItems:'center',
    },

    // 主容器
    container:{
        flex : 1,
        alignItems:'center'
    },
});
