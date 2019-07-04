import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TouchableNativeFeedback,
    Modal,
} from 'react-native';

import OrderComponent from '../compenent/orderComponent'
import ShoppingCart from '../compenent/ShoppingCart'
import ModalView from '../compenent/ModalView'

//引入请求API
import * as GatherAPI from '../Utils/GatherAPI'

//引入处理菜单列表的方法
import menuList from '../Utils/menuList'

const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

export default class Resturant extends Component {
    constructor(props){
        super(props);

        this.state={
            key:this.props.navigation.state.params.key,
            data:this.props.navigation.state.params.option,
            modalVisible:false,
            menuData:[],
            title:this.props.navigation.state.params.user,
            shopData:[],
            accountMoney:0,
            define :true
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    display =(bool)=>{
        this.getShoppingCart();
        this.setState({
            modalVisible:bool
        });
    };



    handMenuData =(item) =>{
        // Alert.alert('注册成功');
        //进行数据的抓取
        const data = {
            menuTypeid: item.menuTypeid,
            storeid: this.state.key,
        };
        // console.log(data);
        GatherAPI.menuOption(data)
            .then(response=>{
                // console.log(response);
                this.setState({
                    menuData:response.data
                });
                //调用子组件的方法
                this.refs.orderComponent.reloadData()
            }).catch(error => console.log(error.message))
    };

    //渲染列表
    _renderItem = (item) => {
        return(
            <TouchableOpacity onPress={ ()=> this.handMenuData(item)} style={styles.optionLabel} activeOpacity={0.5}>
                <Text style={styles.optiontext}>
                    { menuList(item.menuTypeid )}
                </Text>
            </TouchableOpacity>
        )
    };

    //获取购物车的数据
    getShoppingCart = () => {
        const data ={
        key:this.state.key
        };
        GatherAPI.shoppingCart(data)
            .then(response=>{
                // console.log(response.data);
                this.setState({
                    shopData:response.data
                });
                // //调用子组件的方法
                this.refs.ModalView.reloadData();
                // this.refs.shopCart.refreshMoney();
            }).catch(error => console.log(error.message))
    };

    freshList = (item) =>{
         this.handMenuData(item);
        // console.log(123)
        this.getShoppingMoney();
    };

    //获取购物车的金钱
    getShoppingMoney= () =>{
        const datas = {
            storeid:this.state.key
        };
        GatherAPI.shoppingMoney(datas)
            .then(response =>{
                // console.log(response.data);
                this.setState({
                    accountMoney:response.data[0].money
                });
                this.refs.shopCart.refreshMoney();
            })
    };

    //初始化金钱
    define =()=>{
        if(this.state.define){
            this.getShoppingMoney();
            this.setState({
                define:false
            })
        }
    };

    //清空菜单
    cleanMenu =async () =>{
        // console.log(123)
        const data = await {
            storeid :this.state.key
        };
       await GatherAPI.clearMenu(data).catch(error=>console.log(error.message));

       await this.getShoppingMoney();
        this.setState({
            menuData:''
        });
        //调用子组件的方法
        this.refs.orderComponent.reloadData()
    };

    //通过菜单改变购物车金额
    changeMoney= () =>{
        this.getShoppingMoney();
    };


    render(){
        const {navigation} = this.props;
        //初始化购物车金钱
        this.define();
        return(

                // 主容器
                <View style = {styles.container}>

                    {/*头部栏*/}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style = {styles.backButton}
                            activeOpacity={0.8}
                            onPress={()=>
                            {
                                navigation.navigate('MainMenus');
                            }}
                        >
                        <Text style={{color:'white',fontSize: 25}}>
                            ◀
                        </Text>
                    </TouchableOpacity >
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>
                                {/*食堂一楼*/}
                                {this.state.title}
                            </Text>
                        </View>
                    </View>

                    {/*菜单显示部分*/}
                    <View style={styles.mainView}>

                        {/*左选项内容显示视图*/}
                        <View style={styles.optionView}>

                            <FlatList
                                data={this.state.data}
                                //生成key
                                keyExtractor={(item ,index) => index.toString()}
                                //item显示的布局
                                renderItem={({item}) => this._renderItem(item)}
                            />
                        </View>


                        {/*右选项内容显示视图*/}
                        <View style={styles.orderView}>
                            <OrderComponent ref='orderComponent' menudata={this.state.menuData} change={this.changeMoney} />
                        </View>

                    </View>

                    {/*底部购物车显示部分*/}
                    <View style={styles.footerView}>
                        <View style={styles.ShoppingCartView}>
                        <ShoppingCart greet={this.display}  clean={this.cleanMenu} ref={'shopCart'} money={this.state.accountMoney}/>
                        </View>


                    </View>

                    {/*弹出列表视图*/}
                    <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.modalVisible}
                            // onRequestClose={() => {
                            //     alert("Modal has been closed.");
                            // }}
                        >
                            <View style={styles.modalView}>

                                <TouchableNativeFeedback
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                <View style={{flex:1,backgroundColor:'rgba(206,206,206,0.42)'}}/>
                                </TouchableNativeFeedback>

                                <View style={styles.modalComponent}>
                                    <ModalView ref='ModalView' shopdata={this.state.shopData} change={this.freshList} />
                                </View>
                            </View>
                        </Modal>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    modalComponent:{
        width:width*0.81,
        height:width*0.6,
        position:'absolute',
        bottom:height*0.087,
        backgroundColor:'#ffffff',
        alignSelf:'center',
    },

    //弹出列表视图
    modalView:{
        flex:1,
    },


    optiontext:{
        fontSize:20,
    },
    //选择项
    optionLabel:{
        height:height*0.07,
        // backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderTopWidth:1,
    },

    //购物车视图
    ShoppingCartView:{
        width:width*0.9,
        height:height*0.15*0.5,
    },

    // 底部页脚显示视图
    footerView:{
        height:height*0.10,
        position:'absolute',
        bottom:0,
        width:width,
        backgroundColor: 'rgba(206,206,206,0)',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        zIndex:20,
    },

    // 左选项内容显示视图
    optionView:{
        flex:1,
        // backgroundColor:'red',
        borderWidth:1,
        borderLeftWidth:0,
    },

    // 右菜品选择视图
    orderView:{
        flex:3,
        // backgroundColor:'blue',
        borderWidth:1,
        borderLeftWidth:0,
        borderRightWidth:0,
    },

    //主体内容视图
    mainView:{
        width:width,
        height:height*0.95,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
    },

    // 标题属性
    titleText:{
        fontSize: 25,
        fontWeight: 'normal',
        color:'#ffffff',
        paddingLeft:width*0.2,
        // textAlign: 'center',
    },

    //标题文字视图
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

    // 头部
    header:{
        flexDirection:'row',
        height:height*0.05,
        width:width,
        backgroundColor: '#ffcc33',
    },

    // 主容器
    container:{
        flex : 1,
        alignItems:'center'
    },
});
