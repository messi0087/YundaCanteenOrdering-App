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
import * as GatherAPI from '../Utils/GatherAPI'

//引入图表
import Ionicons from "react-native-vector-icons/Ionicons";

//引入登陆验证
import validateLoginInput from '../Validation/login'

const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');


export default class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            secureTextEntry:true,
        };
    }

    ///函数功能部分

    //输入用户名
    handUsernameChanged=(value)=>{
        this.setState({
            email:value
        });
    };


    //输入密码
    handPasswordChanged=(value)=>{
        this.setState({
            password:value
        });

    };
    //隐藏密码
    togglePassword(){
        this.setState({
            secureTextEntry:!this.state.secureTextEntry
        });
    }

    //点击登陆操作
    LoginButton =() => {

        const {navigation} = this.props;
        //判断情况
        const {errors, condition} = validateLoginInput(this.state);
        this.setState({
            email: '',
            password: ''
        });

        //判断是否通过
        if (!condition) {
            // console.log(errors);
            Alert.alert('注册失败', errors.message);
            this.setState(
                {
                    name: '',
                    password: ''
                }
            )
        } else {
            //进行数据的抓取
            const date = {
                email: this.state.email,
                password: this.state.password,
            };

            //向后端发送注册的请求
            // console.log(date);
            GatherAPI.login(date).then(async response => {
                //测试报文
                // console.log(response);
                Alert.alert('登陆', '登陆成功',[
                    {text: '确认', onPress: () =>  navigation.navigate('MainMenus')},
                ]);
                //清空输入
                await this.setState({
                    name: '',
                    password: '',
                });
            }).catch(error => {
                // console.log(error.message);
                const strPassword ='Request failed with status code 401';
                const strEmail ='Request failed with status code 404';

                if(strPassword === error.message) {
                    Alert.alert('登陆失败', '密码错误');
                }else if(strEmail === error.message){
                    Alert.alert('登陆失败', '用户不存在');
                }

                this.setState({
                    // email: '',
                    password: '',
                });
            });
        }
    };



    render(){
        const {navigation} = this.props;

        // // 测试axios的请求是否成功
        // GatherAPI.getAll().then(
        //     response =>{
        //         console.log(response)
        //     }
        // ).catch(
        //     error => console.log(error.message)
        // );

        return(
            //背景图片
            <ImageBackground style={{ flex: 1 }}
                             source={require('../../images/登录2-4.png')}>
                {/*主容器*/}
                <View style = {styles.container}>

                    {/*账号 */}
                    <TextInput
                        ref="username"  //设置描述
                        placeholderTextColor={'white'}  //设置首先默认的输入的字体颜色
                        placeholder = {'请输入邮箱'} //设置首先默认的输入
                        autoCapitalize='none'  //设置首字母不自动大写
                        value={this.state.email}
                        onChangeText={this.handUsernameChanged.bind(this)} //设置改变文本函数
                        style = {styles.textInputStyle1}
                    />

                    {/*密码和按钮结合*/}
                    <View style={styles.passwordView}>
                        {/*密码*/}
                        <TextInput
                            ref="password"  //设置描述
                            placeholderTextColor={'white'} //设置首先默认的输入的字体颜色
                            placeholder = {'请输入密码'}  //设置首先默认的输入
                            autoCapitalize='none'  //设置首字母不自动大写
                            value={this.state.password}
                            secureTextEntry={this.state.secureTextEntry} //设置隐藏密码
                            onChangeText={this.handPasswordChanged.bind(this)} //设置改变文本函数
                            style = {styles.textInputStyle2}
                        />

                        {/*隐藏和显示密码*/}
                        <TouchableOpacity
                            style={styles.hidden}
                            onPress={this.togglePassword.bind(this)}
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

                    {/*登陆 */}
                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress={this.LoginButton.bind(this)}
                        activeOpacity={0.7}
                    >
                        <Text style = {{color :'white'}} >
                            登陆
                        </Text>
                    </TouchableOpacity >

                    {/*跳转修改密码和注册*/}
                    <View style = {styles.settingStyle}>
                        <Text style ={{color:'white'}}
                            onPress={()=>
                            {
                                navigation.navigate('ChangePassword');
                            }}
                        >
                            修改密码
                        </Text>
                        <Text style ={{color:'white'}}
                            onPress={()=>
                            {
                                navigation.navigate('Registration');
                            }}
                        >
                            新用户注册
                        </Text>
                    </View>



                </View>
            </ImageBackground>
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

    settingStyle:{
        width: width*0.5,
        flexDirection:'row',
        justifyContent:'space-between'
    },

    loginButton:{
        height:height*0.08,
        width:width*0.5,
        backgroundColor: '#ffcc33',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor:"white",
        // borderWidth:2,
        // borderRadius:8
    },

    // 隐藏和显示视图
    passwordView:{
        width:width,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    textInputStyle2:{
        width: width*0.4,
        height:38,
        marginBottom:30,
        borderBottomWidth:2,
        justifyContent:'center',
        color:'white',
        borderColor: 'white',
    },

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

    container:{
        flex : 1,
        alignItems:'center'
    },

});
