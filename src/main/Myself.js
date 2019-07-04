import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image, Alert,
} from 'react-native';


const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

export default class Myself extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    _onPressButton =() =>{
        Alert.alert('点击菜单');
        console.log('okkk')
    };

    render(){
        const {navigation} = this.props;
        let pic = require('../../images/猫咪头像素材.jpg');
        return(
            //主容器
            <View style = {styles.container}>

                {/*头部内容*/}
                <View style={styles.header}>
                    <View style={styles.textView}>
                        <Text style={styles.titleText} >
                            我的
                        </Text>
                    </View>

                    <View style={styles.accountView}>
                        <Image source={pic} style={{width:80,height:80,borderRadius:100}}/>
                        <View style={styles.nameView}>
                            <Text style={styles.nameText1}>
                                小猫咪
                            </Text>
                            <Text style={styles.nameText2}>
                                18213884975
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.main}>
                    {/*<View style={styles.section1}>*/}
                        <TouchableOpacity  style = {styles.settingButton} onPress={this._onPressButton.bind(this)} >
                            <Text style = {styles.settingText} >
                                账户安全
                            </Text>
                            <Text style = {styles.settingText}>
                                >
                            </Text>
                        </TouchableOpacity >

                        <TouchableOpacity  style = {styles.settingButton} onPress={this._onPressButton.bind(this)} >
                            <Text style = {styles.settingText} >
                                通用
                            </Text>
                            <Text style = {styles.settingText}>
                                >
                            </Text>
                        </TouchableOpacity >

                        <TouchableOpacity  style = {styles.settingButton} onPress={this._onPressButton.bind(this)} >
                            <Text style = {styles.settingText} >
                                关于云大食堂APP
                            </Text>
                            <Text style = {styles.settingText}>
                                >
                            </Text>
                        </TouchableOpacity >
                    {/*</View>*/}

                        <TouchableOpacity
                            style = {styles.quitButton}
                            activeOpacity={0.8}
                            onPress={()=>
                            {
                                navigation.navigate('Auth');
                            }}
                        >
                            <Text style = {styles.quitText} >
                                退出登陆
                            </Text>
                        </TouchableOpacity >



                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    accountView:{
        flexDirection:'row',
        marginLeft:10,
        marginTop:10
    },
    quitButton:{
        flex:1,
        height:height*0.5*0.1,
        backgroundColor:'#ffffff',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    quitText:{
        fontFamily: '宋体',
        fontSize: 20,
        fontWeight: 'normal',
        color:'#ff2f38',
    },
    settingText:{
        fontFamily: '宋体',
        fontSize: 20,
        fontWeight: 'normal',
        color:'#000000',
    },
    settingButton:{
        flex:1,
        height:height*0.5*0.05,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
    },

    main:{
        width:width,
        height:height*0.5,
        // backgroundColor: '#cecece',
    },


    nameText2:{
        // fontFamily: '宋体',
        fontSize: 18,
        fontWeight: 'normal',
        color:'#FFFFFF',
        marginLeft:10,
    },
    nameText1:{
        fontFamily: '宋体',
        fontSize: 23,
        fontWeight: 'normal',
        color:'#FFFFFF',
        marginLeft:10,
    },

    nameView:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        paddingTop:10,
    },

    //文字标题
    titleText:{
        fontFamily: '宋体',
        fontSize: 23,
        fontWeight: 'normal',
        color:'#FFFFFF',
    },
    //主title的样式
    textView:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingTop:10,
    },
    // 头部
    header:{
        width:width,
        height:height*0.2,
        backgroundColor:'#FFCC33',
        marginBottom: 20,
    },

    // 主容器
    container:{
        flex : 1,
        alignItems:'center',
    },

});
