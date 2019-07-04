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

//引入验证方法
import  validateRegisterInput from '../Validation/register'

//引入请求API
import  * as GatherAPI from '../Utils/GatherAPI'

//引入图标
import Ionicons from 'react-native-vector-icons/Ionicons'

//引入屏幕尺寸
const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

export default class Registration extends Component {

    constructor(props){
        super(props);
        this.state={
            secureTextEntry:false,
            name:'',
            password:'',
            confirmPassword:'',
            email:'',
        };
    }

    //输入用户名
    handUsernameChanged=(value)=>{
        this.setState({
            name:value
        });
        // console.log(this.state.username);
    };

    //输入邮箱
    handEmailChanged=(value)=>{
        this.setState({
            email:value
        });
        // console.log(this.state.email);
    };

    //输入密码
    handPasswordChanged=(value)=>{
        this.setState({
            password:value
        });
        // console.log(this.state.password);

    };

    //输入确认密码
    handConfirm=(value)=>{
        this.setState({
            confirmPassword:value
        });
        // console.log(this.state.confirmPassword);

    };

    //隐藏密码
    togglePassword(){
        this.setState({
            secureTextEntry:!this.state.secureTextEntry
        });
    }

    //点击注册按钮
    registerButton =() => {

        const {navigation} = this.props;
        //判断情况
        const {errors, condition} = validateRegisterInput(this.state);

        //判断是否通过
        if (!condition) {
            // console.log(errors);
            Alert.alert('注册失败', errors.message);
            this.setState(
                {
                    password: '',
                    confirmPassword: ''
                }
            )
        } else {
            //进行数据的抓取
            const date = {
                name: this.state.name,
                password: this.state.password,
                email: this.state.email
            };

            //向后端发送注册的请求
            // console.log(date);
            GatherAPI.create(date).then(response => {
                //测试报文
                // console.log(response);
                Alert.alert('注册成功', response.data.message,[
                    {text: '确认', onPress: () =>    navigation.navigate('Auth')}
                ]);
                //清空输入
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                // navigation.navigate('Auth');
            }).catch(error => {
                const strEmail ='Request failed with status code 401';
                if(strEmail === error.message) {
                    Alert.alert('注册失败', '邮箱已经注册');
                }
                this.setState({
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            });

        }
    };

    render(){
        return(
            //背景图片
            <ImageBackground style={{ flex: 1 }}
                             source={require('../../images/登录2-4.png')}>
                {/*主容器*/}
                <View style = {styles.container}>


                    {/*返回按钮*/}
                    <TouchableOpacity
                        style = {styles.backButton}
                        onPress={()=>
                        {
                            const {navigation} = this.props;
                            navigation.navigate('Auth');
                        }}
                    >
                        <Ionicons
                            name = {'md-backspace'}
                            size={45}
                            color={'#ffcc33'}
                            // style={styles.icons2}
                        />
                    </TouchableOpacity >


                    {/*用户名输入 */}
                    <TextInput
                        placeholderTextColor={'white'}
                        value={this.state.name}
                        placeholder = {'请输入用户名'}
                        style = {styles.textInputStyle1}
                        onChangeText={this.handUsernameChanged.bind(this)} //设置改变文本函数
                    />

                    {/*邮箱输入 */}
                    <TextInput
                        placeholderTextColor={'white'}
                        placeholder = {'请输入邮箱'}
                        value={this.state.email}
                        style = {styles.textInputStyle2}
                        onChangeText={this.handEmailChanged.bind(this)} //设置改变文本函数
                    />

                    {/*把按钮和文本隐藏结合*/}
                    <View style={styles.passwordView}>
                        <TextInput
                            placeholderTextColor={'white'}
                            placeholder = {'请输入密码'}
                            value={this.state.password}
                            secureTextEntry={this.state.secureTextEntry}
                            password={true}
                            style = {styles.textInputStyle3}
                            onChangeText={this.handPasswordChanged.bind(this)} //设置改变文本函数
                        />

                        {/*隐藏和显示密码*/}
                        <TouchableOpacity
                            style = {styles.hidden}
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

                    {/*确认密码*/}
                    <TextInput
                        placeholderTextColor={'white'}
                        placeholder = {'请输入相同的密码'}
                        secureTextEntry={this.state.secureTextEntry}
                        value={this.state.confirmPassword}
                        style = {styles.textInputStyle4}
                        onChangeText={this.handConfirm.bind(this)}
                    />

                    {/*注册按钮 */}
                    <TouchableOpacity
                        style = {styles.registerButton}
                        onPress={this.registerButton.bind(this)}
                        activeOpacity={0.7}
                    >
                        <Text style = {{color :'white'}} >
                            注册
                        </Text>
                    </TouchableOpacity >

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    //返回按钮
    backButton:{
        position:'absolute',
        top:height*0.05,
        left:width*0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },


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
    textInputStyle4:{
        width: width*0.5,
        height:38,
        marginBottom:30,
        borderBottomWidth:2,
        justifyContent:'center',
        color:'white',
        borderColor: 'white',
    },
    // 文本框样式2
    textInputStyle3:{
        width: width*0.4,
        height:38,
        marginBottom:30,
        borderBottomWidth:2,
        justifyContent:'center',
        color:'white',
        borderColor: 'white',
    },

    // 文本框样式2
    textInputStyle2:{
        width: width*0.5,
        height:38,
        // marginTop:height*0.4,
        marginBottom:30,
        borderBottomWidth:2,
        justifyContent:'center',
        color:'white',
        borderColor: 'white',
    },

    // 文本框样式1
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

    // 主容器
    container:{
        flex : 1,
        alignItems:'center'
    },
});
