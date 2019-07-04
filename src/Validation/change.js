const Validator = require('validator');

module.exports = function validateChangeInput(data){
    let errors ={};
    let condition =true;


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

    //判断新密码是否为空
    if( Validator.isEmpty(data.changePassword) ){
        errors.message = '确认密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断新密码是否合法
        if( !Validator.isLength(data.changePassword, {min: 6 ,max : 16} ) ){
            errors.message = '确认密码不能为空长度不能小于6位且不能大于16位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }

    //判断新密码和原密码是否相同
    if( Validator.equals( data.password , data.changePassword) ) {
        errors.message = '两次输入的密码相同';
        condition = false;
        return {
            errors,
            condition
        };
    }

    //判断重复密码是否为空
    if( Validator.isEmpty(data.confirmPassword) ){
        errors.message = '确认密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断重复密码是否合法
        if( !Validator.isLength(data.confirmPassword, {min: 6 ,max : 16} ) ){
            errors.message = '确认密码不能为空长度不能小于6位且不能大于16位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }

    //判断重复密码和新密码是否相同
    if( !Validator.equals( data.changePassword , data.confirmPassword) ) {
        errors.message = '两次输入的密码不一致';
        condition = false;
        return {
            errors,
            condition
        };
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



