import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image, FlatList, Alert,
} from 'react-native';

//引入请求API
import * as GatherAPI from '../Utils/GatherAPI'

//引入图表
import Ionicons from "react-native-vector-icons/Ionicons";

const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');


export default class MainMenus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            //列表项目
            flatList: [],
            //触发一次函数
            bool: true
        };
    }

    //获取饭店的数据
    handStoreButton = () => {
        if (this.state.bool) {
            GatherAPI.storeData().then(response => {
                this.setState({
                    flatList: response.data,
                    bool: false
                });
                console.log(response.data)
            }).catch(error => console.log(error.message))
        }
    };


    //没有内容时的flatlist的样式
    _createEmptyView = () => {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    暂无商店数据
                </Text>
            </View>
        )
    };

    //头部内容时的flatlist的样式
    _ListHeaderComponent = () => {
        return (
            <View style={{height: 20, backgroundColor: 'white'}}/>
        );
    };

    //分隔线
    _seperator = () => {
        return (
            <View style={{height: 20, backgroundColor: 'white'}}/>
        );
    };

    //脚部内容时的flatlist的样式
    _ListFooterComponent = () => {
        return (
            <View style={{height: 30, backgroundColor: 'white'}}/>
        );
    };

    dealDescribe = (data) => {
        if (data === '优') {
            return '☆☆☆☆☆'
        }
        else if(data === '良'){
            return '☆☆☆☆'
        }


    };

    // 渲染菜单的函数
    _renderItem = ({item}) => {
        // console.log(item);
        const str =item.picture;
        // const str ='http://n1.image.pg0.cn/T1A6DlBsZk1RCvBVdK.jpg';
        let pic = {
            uri: str
        };
        return (
            // 每一项的菜单
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={ ()=> {this.handMenuButton(item);/* navigation.navigate('Resturant',{user:item.name, option: this.state.options1, });*/}}
            >
                <View style={styles.orderLabel}>
                    {/*菜品图片展示*/}
                    <Image source={pic} style={styles.image}/>

                    {/*文字显示内容*/}
                    <View style={styles.content}>
                        {/*头部菜品名字*/}
                        <Text style={styles.textTitle}>
                            店名：{item.name}
                        </Text>
                        <Text style={styles.textTitle}>
                            位置：{item.location}
                        </Text>
                        <Text style={styles.textTitle}>
                            评价：{ this.dealDescribe(item.describe)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    //获取菜单的数据
    handMenuButton =(data) =>{
        const {navigation} = this.props;
        // console.log(data);
        if(data.storeid !==0) {
            // console.log(data.key);
            GatherAPI.menuList({key:data.storeid}).then(response =>{
                if(response.data===null){
                    return 0;
                }
                //数据测试
                // console.log(response.data);
                this.setState({
                    options:response.data
                });
                navigation.navigate('Resturant', {user: data.name, option: this.state.options, key:data.storeid});
            }).catch(error =>console.log(error.message))
            // navigation.navigate('Resturant', {user: data.name, option: this.state.options1,});
        }
    };

    render(){
        this.handStoreButton();
        return(
        //主容器
        <View style = {styles.container}>

            {/*头部内容*/}
            <View style={styles.header}>
                <View style={styles.textView}>
                    <Text style={styles.titleText} >
                        云南大学
                    </Text>
                </View>
                {/*搜索框*/}
                <View style={styles.searchView}>
                    <TextInput
                        placeholder = {'请输入菜品名称'}
                        style = {styles.textInputStyle1}
                    />
                </View>
            </View>

            {/*轮播图*/}
            <View>
                <Image source={require('../../images/图片1.jpg') }
                       style={styles.sildeShow}
                />
            </View>

            {/*食堂界面标题*/}
            <View style={styles.textMainView}>
                {/*//文字标题*/}
                <View>
                    <Text style={styles.titleMain} >
                        我的食堂
                    </Text>
                </View>
            </View>


            {/*食堂底部选择*/}
            <View style={styles.downMenu}>
                <FlatList
                    data={this.state.flatList}
                    //生成key
                    keyExtractor={(item ,index) => index.toString()}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //渲染组件
                    renderItem={this._renderItem}
                    //头部布局
                    ListHeaderComponent={this._ListHeaderComponent}
                    //尾部布局
                    ListFooterComponent={this._ListFooterComponent}
                    //中间分界线
                    ItemSeparatorComponent={this._seperator}
                />
            </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput:{
        width:30,
        textAlign: 'center'
    },

    orderLabel:{
        height:height*0.1,
        width:width*0.8,
        flexDirection:'row',
    },

    textPrice:{
        paddingLeft:10,
        color:'#ff3c55',
        fontSize: 20,
        flex:2,
        // backgroundColor:'blue',

    },

    textTitle:{
        paddingLeft:10,
        color:'#000000',
        fontSize: 18,
        marginLeft:10,
    },

    content:{
        flex:4,
        justifyContent: 'space-between'
    },

    image:{
        flex:3,
        borderRadius:5,
        marginLeft:10
    },



    //底部菜单的设置
    item: {
        fontSize: 23,
        fontWeight: 'normal',
        color:'#000000',
        // textAlign: 'center',
    },
    itemView:{
        width:width*0.9*0.8,
        height: height*0.3*0.6,
        borderColor:'#676767',
        borderWidth: 1,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    downMenu: {
        height:height*0.35,
        width:width*0.9,
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000000'
    },

    //文字标题
    titleMain:{
        fontFamily: '宋体',
        fontSize: 23,
        fontWeight: 'bold',
        color:'#000000',
    },

    // 文字视图
    textMainView:{
        height:height*0.1,
        width:width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center',

    },


    sildeShow:{
    height:height*0.2,
    width:width*0.9
    },

    // 搜索框文本
    textInputStyle1:{
        width: width*0.5,
        height:height*0.08,
        color:'black',
        backgroundColor:'white',
        borderColor: '#718093',
        borderWidth:1,
        borderRadius:80,
        marginBottom:10,
    },

    // 搜索框部件
    searchView:{
        flex:2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'center',
    },

    //主title的样式
    textView:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
    },

    //文字标题
    titleText:{
        fontFamily: '宋体',
        fontSize: 18,
        fontWeight: 'bold',
        color:'#FFFFFF',
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
