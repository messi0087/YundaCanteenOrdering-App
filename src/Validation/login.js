const Validator = require('validator');

module.exports = function validateLoginInput(data){
    let errors ={};
    let condition =true;


    // console.log(Validator.isEmail(data.email));
    //判断邮箱是否为空
    if( Validator.isEmpty(data.email) ){
        errors.message = '邮箱不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断邮箱是否合法
        if( !Validator.isEmail(data.email) ){
            errors.message = '邮箱错误';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }


    //判断密码是否为空
    if( Validator.isEmpty(data.password) ){
        errors.message = '密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断密码是否合法
        if( !Validator.isLength(data.password, {min: 6 ,max : 16} ) ){
            errors.message = '密码长度不能小于6位且不能大于16位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }


    if(condition) {
        if (typeof (errors.message) == 'undefined'){
            errors.message='成功';
            return {
                errors,
                condition
            };
        }
    }
};



