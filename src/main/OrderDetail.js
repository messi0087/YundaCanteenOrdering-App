import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Alert,
    Button, FlatList, Image
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

export default class OrderDetail extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    _onPressButton =() =>{
        Alert.alert('返回');
        console.log('okkk')
    };
    render(){
        const {navigation} = this.props;

        return(
            // 主容器
            <View style = {styles.container}>

                {/*头部视图*/}
                <View style={styles.header}>
                    <TouchableOpacity
                        style = {styles.backButton}
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
                            订单详情
                        </Text>
                    </View>
                </View>

                {/*下部菜单细节视图*/}
                <View style={styles.downMenu}>

                    {/*第一项*/}
                    <View style={styles.itemView}>
                        <View style={styles.itemDetail1}>
                            <Ionicons
                                name = {'logo-yen'}
                                size={32}
                                style={styles.icons}
                            />
                            <Text style={styles.item1}>交易金额</Text>
                        </View>
                        <View style={styles.itemDetail2}>
                            <Text style={styles.item2}>XXXXXX¥</Text>
                        </View>
                    </View>

                    {/*第二项*/}
                    <View style={styles.itemView}>
                        <View style={styles.itemDetail1}>
                            <Ionicons
                                name = {'md-appstore'}
                                size={32}
                                style={styles.icons}
                            />
                            <Text style={styles.item1}>商家信息</Text>
                        </View>
                        <View style={styles.itemDetail2}>
                            <Text style={styles.item2}>XXXXXX</Text>
                        </View>
                    </View>

                    {/*第三项*/}
                    <View style={styles.itemView}>
                        <View style={styles.itemDetail1}>
                            <Ionicons
                                name = {'md-pizza'}
                                size={32}
                                style={styles.icons}
                            />
                            <Text style={styles.item1}>套餐详情</Text>
                        </View>
                        <View style={styles.itemDetail2}>
                            <Text style={styles.item2}>XXXXXX</Text>
                        </View>
                    </View>

                    {/*第四项*/}
                    <View style={styles.itemView}>
                        <View style={styles.itemDetail1}>
                            <Ionicons
                                name = {'md-alarm'}
                                size={32}
                                style={styles.icons}
                            />
                            <Text style={styles.item1}>订单时间</Text>
                        </View>
                        <View style={styles.itemDetail2}>
                            <Text style={styles.item2}>XXXXXX</Text>
                        </View>
                    </View>

                    {/*第五项*/}
                    <View style={styles.itemView}>
                        <View style={styles.itemDetail1}>
                            <Ionicons
                                name = {'md-archive'}
                                size={32}
                                style={styles.icons}
                            />
                            <Text style={styles.item1}>收费单位</Text>
                        </View>
                        <View style={styles.itemDetail2}>
                            <Text style={styles.item2}>XXXXXX</Text>
                        </View>
                    </View>

                    {/*结束视图*/}
                    <View style={styles.endView}>
                            <Ionicons
                                name = {'md-checkmark-circle-outline'}
                                size={32}
                                style={styles.icons2}
                            />
                            <Text style={styles.item1}>交易完成</Text>
                    </View>

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    icons2:{
        color:'#ff3c55',
        marginLeft:width*0.9*0.02,
    },
    //图标
    icons:
        {
            color:'#5f5f5f',
            marginLeft:width*0.9*0.02,
        },
    //字体2
    item2: {
        fontSize: 20,
        fontWeight: 'normal',
        color:'#000000',
        // textAlign: 'center',
        marginRight:width*0.9*0.02,
    },

    //字体1
    item1: {
        fontSize: 20,
        fontWeight: 'normal',
        color:'#000000',
        // textAlign: 'center',
        marginLeft:width*0.9*0.02,
        marginTop:2,
    },

    //最后一项表明情况
    endView:{
        width:width*0.9,
        flex:1,
        borderWidth:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    //每一项中的两行
    itemDetail2:{
        width:width*0.9,
        flex:1,
        alignItems: 'flex-end',
        // backgroundColor: 'blue',
    },


    itemDetail1:{
        width:width*0.9,
        flex:1,
        // borderBottomWidth: 1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: 'blue',
        marginTop:10,
    },

    //每一项细节菜单
    itemView:{
        // backgroundColor: 'yellow',
        flex:2,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
    },

    //细节详情菜单
    downMenu: {
        height:height*0.75,
        width:width*0.9,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:10,
    },


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
