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
import  validateChangeInput from '../Validation/change'

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
            email:'',
            password:'',
            changePassword:'',
            confirmPassword:'',
        };
    }


    //输入邮箱
    handEmailChanged=(value)=>{
        this.setState({
            email:value
        });
        // console.log(this.state.email);
    };

    //输入原密码
    handPasswordChanged=(value)=>{
        this.setState({
            password:value
        });
        // console.log(this.state.password);

    };

    //输入新密码
    handChangePasswordChanged=(value)=>{
        this.setState({
            changePassword:value
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

    // 点击注册按钮
    changeButton =() => {

        const {navigation} = this.props;
        //判断情况
        const {errors, condition} = validateChangeInput(this.state);

        //判断是否通过
        if (!condition) {
            // console.log(errors);
            Alert.alert('修改密码失败', errors.message);
            this.setState(
                {
                    password: '',
                    confirmPassword: '',
                    changePassword:'',
                }
            )
        } else {
            //进行数据的抓取
            const date = {
                changePassword: this.state.changePassword,
                password: this.state.password,
                email: this.state.email
            };

            // console.log(date);

            //向后端发送注册的请求
            GatherAPI.change(date).then(response => {
                //测试报文
                // console.log(response);
                Alert.alert('修改成功', response.data.message,[
                    {text: '确认', onPress: () =>    navigation.navigate('Auth')}
                ]);
                //清空输入
                this.setState({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    changePassword:'',
                });
                // navigation.navigate('Auth');
            }).catch(error => {
                const strEmail ='Request failed with status code 404';
                const strPassword ='Request failed with status code 401';
                if(strEmail === error.message) {
                    Alert.alert('修改失败', '账户不存在');
                }

                if(strPassword === error.message){
                    Alert.alert('修改失败', '密码错误');
                }
                this.setState({
                    email: '',
                    password: '',
                    changePassword:'',
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

                    {/*邮箱输入 */}
                    <TextInput
                        placeholderTextColor={'white'}
                        placeholder = {'请输入邮箱'}
                        value={this.state.email}
                        style = {styles.textInputStyle1}
                        onChangeText={this.handEmailChanged.bind(this)} //设置改变文本函数
                    />

                    {/*把按钮和文本隐藏结合*/}
                    <View style={styles.passwordView}>
                        {/*输入原密码*/}
                        <TextInput
                            placeholderTextColor={'white'}
                            placeholder = {'请输入密码'}
                            value={this.state.password}
                            secureTextEntry={this.state.secureTextEntry}
                            password={true}
                            style = {styles.textInputStyle2}
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


                    {/*新密码*/}
                    <TextInput
                        placeholderTextColor={'white'}
                        placeholder = {'请输入新密码'}
                        secureTextEntry={this.state.secureTextEntry}
                        value={this.state.changePassword}
                        style = {styles.textInputStyle3}
                        onChangeText={this.handChangePasswordChanged.bind(this)}
                    />

                    {/*确认密码*/}
                    <TextInput
                        placeholderTextColor={'white'}
                        placeholder = {'请输入相同的密码'}
                        secureTextEntry={this.state.secureTextEntry}
                        value={this.state.confirmPassword}
                        style = {styles.textInputStyle3}
                        onChangeText={this.handConfirm.bind(this)}
                    />

                    {/*注册按钮 */}
                    <TouchableOpacity
                        style = {styles.registerButton}
                        onPress={this.changeButton.bind(this)}
                        activeOpacity={0.7}
                    >
                        <Text style = {{color :'white'}} >
                            修改密码
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

    // 主容器
    container:{
        flex : 1,
        alignItems:'center'
    },
});
