import React,{Component} from "react";
import {Image, Text, FlatList, View, Alert, StyleSheet, TextInput, TouchableOpacity} from "react-native";

//引入图表
import Ionicons from "react-native-vector-icons/Ionicons";

//引入请求API
import * as GatherAPI from '../Utils/GatherAPI'

export default class ModalView extends Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.shopdata.shopData,
            newData:[],
            test:[
                {key:1},
                {key:2}
            ],
        }
    }

    _onPressButton =() =>{
        Alert.alert('注册成功');
        console.log('okkk')
    };

    //头部内容时的flatlist的样式
    _ListHeaderComponent = () =>{
        return (
            <View style={{height: 20,backgroundColor:'white'}}/>
        );
    };

    //分隔线
    _seperator = () => {
        return (
            <View style={{height: 20,backgroundColor:'white'}}/>
        );
    };

    //脚部内容时的flatlist的样式
    _ListFooterComponent= () =>{
        return (
            <View style={{height: 100,backgroundColor:'white'}}/>
        );
    };

    //增加数据
    addButton =async (item) => {
        //初始化发送的数据
        const data= await {
            num : item.num +1,
            menuid:item.menuid,
        };

        //改变数字返回重新查询的方法
        await GatherAPI.menuChange(data)
            .then(response=>{
                this.setState({
                    newData:response.data
                });
                // console.log(this.state.newData)
            }).catch(error => console.log(error.message));

        //改变数字返回重新查询的key
        const datas = await{
            key: this.state.newData[0].storeid
        };

        //重新查询数据并且刷新页面
        await  GatherAPI.shoppingCart(datas).then(response=>{
            this.setState({
                data:response.data
            })
        });

        const newdata = await{
            storeid: this.state.newData[0].storeid,
            menuTypeid:this.state.newData[0].menuTypeid,
        };

        //触发改变菜品列表
       await this.props.change(newdata);
    };

    //减少数据
    subButton =async (item) =>{
        if(item.num >0){
            const data= await {
                num : item.num -1,
                menuid:item.menuid,
            };

            //改变数字返回重新查询的方法
            await GatherAPI.menuChange(data)
                .then(response=>{
                    this.setState({
                        newData:response.data
                    });
                    // console.log(this.state.newData)
                }).catch(error => console.log(error.message));

            //改变数字返回重新查询的key
            const datas = await{
                key: this.state.newData[0].storeid
            };

            //重新查询数据并且刷新页面
            await  GatherAPI.shoppingCart(datas).then(response=>{
                this.setState({
                    data:response.data
                })
            });

            const newdata = await{
                storeid: this.state.newData[0].storeid,
                menuTypeid:this.state.newData[0].menuTypeid,
            };

            //触发改变菜品列表
            await this.props.change(newdata);
        }else {
            Alert.alert('减少失败','该商品已经为0')
        }
    };

    // 渲染菜单的函数
    _renderItem = ({item}) => {
        // console.log(item);
        const str =item.picture;
        let pic = {
            uri: str
        };

        return (
            // 每一项的菜单
            <View style={styles.orderLabel}>
                {/*菜品图片展示*/}
                <Image source={pic} style={styles.image}/>

                {/*文字显示内容*/}
                <View style={styles.content}>
                    {/*头部菜品名字*/}
                    <Text style={styles.textTitle}>
                        {item.name}
                    </Text>

                    <View style={styles.downMenu}>
                        <Text style={styles.textPrice}>
                            {'¥'+item.price}
                        </Text>

                        <View style={styles.shopCard}>
                            <View style={styles.container1}>
                                <TouchableOpacity
                                    onPress={ ()=> this.subButton(item)}
                                    activeOpacity={0.5}
                                >
                                    <Ionicons
                                        name = {'md-remove-circle'}
                                        size={25}
                                        color={'#c5c5c5'}
                                        style={styles.icons1}
                                    />
                                </TouchableOpacity>

                                <Text
                                    style={styles.textInput}
                                >
                                    {item.num}
                                </Text>
                                <TouchableOpacity
                                    onPress={ ()=> this.addButton(item)}
                                    activeOpacity={0.5}
                                >
                                    <Ionicons
                                        name = {'md-add-circle'}
                                        size={25}
                                        color={'#ffcc33'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        );
    };

    //没有内容时的flatlist的样式
    _createEmptyView = () =>{
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    您的购物车空空如也，请加入相应的菜项哦(*^▽^*)
                </Text>
            </View>
        )
    };

    reloadData= ()=>{
        this.setState({
            data:this.props.shopdata,
        });
    };

    render() {
        // console.log(this.props.menudata);
        return (
            <View style={styles.container}>
                <FlatList
                    //确定数据是否增加
                    extraData={this.state}
                    //源数据
                    data={this.state.data}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //头部布局
                    ListHeaderComponent={this._ListHeaderComponent}
                    //尾部布局
                    ListFooterComponent={this._ListFooterComponent}
                    //生成key
                    keyExtractor={(item ,index) => index.toString()}
                    //渲染组件
                    renderItem={this._renderItem}
                    style={styles.listComponent}
                    //中间分界线
                    ItemSeparatorComponent={this._seperator}
                />
            </View>
        );
    }
}

const styles=StyleSheet.create({
    shopCard:{
        flex:3,
    },

    container1:{
        flex:1,
        flexDirection:'row',
        // backgroundColor:'black',
        alignItems: 'center',
        justifyContent:'center',
    },

    textInput:{
        width:30,
        textAlign: 'center'
    },

    downMenu:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        fontSize: 20
    },

    content:{
        flex:3,
        justifyContent: 'space-between'
    },

    image:{
        flex:2,
        borderRadius:5,
        marginLeft:10
    },

    listComponent:{
        // backgroundColor:'blue',
    },

    orderLabel:{
        height:100,
        flexDirection:'row',
    },

    container:{
        flex:1
    },

});
