import { observable, action } from 'mobx'

class CommonStore {
    @observable enable
    @observable headerType

    constructor() {
        this.isHeader = false
        this.headerType = 'none'
    }

    @action.bound
    enableHeader = (type) => {
        this.enable = true
        this.headerType = type
    }

    @action.bound
    disableHeader = () => {
        this.enable = false
        this.headerType = 'none'
    }
}

export default CommonStore