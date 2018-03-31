class View {
    constructor(type){
        this.node = document.createElement(type);

    }

    render() {
        document.getElementById('root').appendChild(this.node);
    }
}

class InputView extends View {
    constructor(){
        super('input');
        this.node.setAttribute('class', 'new')
        console.log(this.node);
    }
}

export  {View, InputView};