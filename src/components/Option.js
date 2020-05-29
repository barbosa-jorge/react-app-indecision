import React from 'react';

const Option = (props) => (
    <div className="option">
        <span className="option__text">{props.index}. {props.optionText}</span>
        <button 
            className="button button--link"
            onClick={ (e) => props.onHandleRemoveOption(props.optionText) } >
            remove
        </button>
    </div>
)

export default Option