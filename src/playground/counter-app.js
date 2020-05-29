class Counter extends React.Component {

    constructor(props) {
        super(props)
        this.addOne = this.addOne.bind(this)
        this.minusOne = this.minusOne.bind(this)
        this.reset = this.reset.bind(this)
        this.state = {
            counter: 0 
        }
    }

    componentDidMount() {
        const counterAsString =  localStorage.getItem('counter')
    
        const currentCounter = parseInt(counterAsString, 10)
        if (!isNaN(currentCounter)) {
            this.setState(() => ({ counter: currentCounter }) )    
        }
    }

    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('counter', this.state.counter)
    }

    addOne() {
        this.setState((prevState) => ({ counter: ++prevState.counter }))
    }

    minusOne() {
        this.setState((prevState)=> ({ counter: --prevState.counter }))
    }

    reset() {
        this.setState(() => ({ counter: 0 }))
    }

    render() {
        return (
            <div>
                <h1>Counter: {this.state.counter}</h1>
                <button onClick={this.addOne}>+1</button>
                <button onClick={this.minusOne}>-1</button>
                <button onClick={this.reset}>reset</button>
            </div>    
        )
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
