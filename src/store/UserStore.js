// user
import { observable, action } from "mobx";

class UserStore {
    @observable userId; // 注册变量，使其成为可检测的

    constructor() {
        this.userId = 0; // 初始化变量，可以定义默认值
    }

    @action  // 方法推荐用箭头函数的形式
    SetId = (data) => {
        this.userId = data;
    };
}

const userStore = new UserStore();

export { userStore };
