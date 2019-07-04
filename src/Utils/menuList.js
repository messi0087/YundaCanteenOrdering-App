module.exports = function menuList(data) {
    switch(data)
    {
        case 1:
            return '荤菜';
        case 2:
            return '素菜';
        case 3:
            return '饮品';
        case 4:
            return '粥汤';
        case 5:
            return '粉面';
        case 6:
            return '小吃';
        case 7:
            return '饭类';
        default:
            return '错误';
    }
};
