import { observable, action } from 'mobx'

class UserStore {
    @observable isLogin
    @observable userInfo

    constructor() {
        this.isLogin = sessionStorage.getItem('user') ? true : false
        this.userInfo = sessionStorage.getItem('user')
            ?
            JSON.parse(sessionStorage.getItem('user'))
            :
            {}
    }

    @action.bound
    login = (user) => {
        this.isLogin = true
        sessionStorage.setItem('user', JSON.stringify(user))
        this.userInfo = user
    }

    @action.bound
    logout = () => {
        this.isLogin = false
        this.userInfo = {}
    }
}

export default UserStore