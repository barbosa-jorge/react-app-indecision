import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {

    state = {
        options: [], 
        selectedOption: undefined
    }
    
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }))    
    }

    onHandleAction = () =>  {
        let randomIndex = Math.floor(Math.random() * this.state.options.length)
        this.setState(() => ({ selectedOption: this.state.options[randomIndex]}))
    }

    onRemoveAll = () =>  {
        this.setState(() => ({ options: [] }))
    }

    onAddOption = (option) => {
        
        if (!option) {
            return 'Please, Enter a valid option'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists!'
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }))
        
    }

    onHandleRemoveOption = (optionToRemove) => {
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
                <Header 
                    title={title} 
                    subtitle={subtitle} 
                />
                <div className="container">
                    <Action 
                        onHandleAction={this.onHandleAction} 
                        hasOptions={this.state.options.length > 0}
                    />
                    <div className="widget">
                        <Options options={this.state.options} 
                            onRemoveAll={this.onRemoveAll} 
                            onHandleRemoveOption={this.onHandleRemoveOption} />
                        <AddOption 
                            onAddOption={this.onAddOption}
                    />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption} 
                    handleClearSelectedOption={this.handleClearSelectedOption} 
                />
            </div>
        
        )
    }
}