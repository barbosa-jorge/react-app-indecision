class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.onHandleAction = this.onHandleAction.bind(this)
        this.onAddOption = this.onAddOption.bind(this)
        this.onRemoveAll = this.onRemoveAll.bind(this)
        this.onHandleRemoveOption = this.onHandleRemoveOption.bind(this)
        this.state = {
            options: []
        }
    }

    onHandleAction() {
        let randomIndex = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[randomIndex])
    }

    onRemoveAll() {
        this.setState(() => ({ options: [] }))
    }

    onAddOption(option) {
        
        if (!option) {
            return 'Please, Enter a valid option'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists!'
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }))
        
    }

    onHandleRemoveOption(optionToRemove) {
        this.setState((prevState) => ( 
            { options: prevState.options.filter((option) => option !== optionToRemove ) }) 
        )
    }

    componentDidMount() {
        
        try {
            const options = localStorage.getItem('options')
            if (options) {
                this.setState(() => ({ options: JSON.parse(options)}))
            }
        } catch(e) {
             
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            localStorage.setItem('options', JSON.stringify(this.state.options))
        }
    }

    render() {

        let title = 'Indecision App'
        let subtitle = 'Put your life in the computers hands'
        
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action onHandleAction={this.onHandleAction} 
                        hasOptions={this.state.options.length > 0}
                />
                <Options options={this.state.options} 
                         onRemoveAll={this.onRemoveAll} 
                         onHandleRemoveOption={this.onHandleRemoveOption} />
                <AddOption onAddOption={this.onAddOption}/>
            </div>
        
        )
    }
}

const Header = (props) => (
    <div>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
    </div>
)

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => (
    <div>
        <button disabled={!props.hasOptions} 
                onClick={props.onHandleAction}>
            What should I do? 
        </button>
    </div>
)


const Options = (props) => (
    <div>
        <button disabled={!props.options.length > 0} 
                onClick={props.onRemoveAll}>
            Remove All
        </button>
        {
            props.options.map(option => 
                <Option key={option} 
                        optionText={option} 
                        onHandleRemoveOption={props.onHandleRemoveOption} 
                />)
        }
    </div>
)


const Option = (props) => (
    <div>
        <span>{props.optionText}</span>
        <button onClick={ (e) => props.onHandleRemoveOption(props.optionText) } >
            remove
        </button>
    </div>
)

class AddOption extends React.Component {

    constructor(props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: ''
        }
    }

    handleAddOption(e) {
        e.preventDefault()

        let value = e.target.elements.option.value.trim();
        let error = this.props.onAddOption(value)

        if (error) {
            this.setState(() => {
                return {
                    error
                }
            })
        }

        e.target.elements.option.value = ''

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))
