const axios = require('axios');
const config =require('../config/default');
const api = config.port;


//这是前端发送GET\POST请求的地方
// http://localhost:5000/api/user/test



/**
 *@method GET
 *@desc 测试获取数据
 * */
export const getAll = () =>
    axios.get(`${api}/api/user/test`);



/**
 *@method GET
 *@desc 获取饭店数据
 * */
export const storeData = () =>
    axios.get(`${api}/api/menu/storeData`);



/**
 *@method POST
 *@desc 注册请求
 * */
export const create =(body) =>
    axios.post(`${api}/api/user/register`,body);



/**
 *@method POST
 *@desc 登陆请求
 * */
export const login =(body) =>
    axios.post(`${api}/api/user/login`,body);



/**
 *@method POST
 *@desc 修改密码请求
 * */
export const change =(body) =>
    axios.post(`${api}/api/user/change`,body);



/**
 *@method POST
 *@desc 请求获取列表数据
 * */
export const menuList =(body) =>
    axios.post(`${api}/api/menu/menuList`,body);



/**
 *@method POST
 *@desc 请求获取菜单数据
 * */
export const menuOption =(body) =>
    axios.post(`${api}/api/menu/menuOption`,body);


/**
 *@method POST
 *@desc 修改菜品数量
 * */
export const menuChange =(body) =>
    axios.post(`${api}/api/menu/menuChange`,body);



/**
 *@method POST
 *@desc 获取购物车的数据
 * */
export const shoppingCart =(body) =>
    axios.post(`${api}/api/menu/shoppingCart`,body);

/**
 *@method POST
 *@desc 获取购物车的money
 * */
export const shoppingMoney =(body) =>
    axios.post(`${api}/api/menu/shoppingMoney`,body);



/**
 *@method POST
 *@desc 清空购物车
 * */
export const clearMenu =(body) =>
    axios.post(`${api}/api/menu/clearMenu`,body);

