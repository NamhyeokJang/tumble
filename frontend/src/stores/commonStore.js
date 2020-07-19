import { observable, action } from 'mobx'

class CommonStore {
    @observable isHeader
    @observable headerType

    constructor() {
        this.isHeader = false
        this.headerType = 'none'
    }

    @action.bound
    setHeader = () => {
        this.isHeader = !this.isHeader
    }
}

export default CommonStore