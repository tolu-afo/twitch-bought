class StateManager {
    private state;

    constructor() {
        this.state = {};
    }

    get(k:string):any {
        return this.state[k]
    }

    add(k:string, v:any):boolean{
        this.state[k] = v;
        return true
    }
}

export default StateManager;