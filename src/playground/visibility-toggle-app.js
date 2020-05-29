class VisibilityToggle extends React.Component {

    constructor(props) {
        super(props)
        this.onToggleButton = this.onToggleButton.bind(this)
        this.state = {
            visibility: false
        }
    }

    onToggleButton() {
         this.setState(() => ({ visibility: !this.state.visibility }))
    }

    render() {
        return (
            <div>
            <h1>Visibility Toggle App</h1>

            <button onClick={this.onToggleButton}>
                {
                    this.state.visibility ? 'Hide content' : 'Display content'
                }
            </button>

            {
                this.state.visibility && <p>This is the content of the page!</p>
            }

        </div>
        )
    }

}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'))
