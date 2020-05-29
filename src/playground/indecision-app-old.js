
var appRoot = document.getElementById('app');

const app = {
    title: 'Indecision App', 
    subtittle: 'Put your life in the hands of a Computer',
    options: []
}

const onSubmitForm = (e) => {
    e.preventDefault()
    app.options.push(e.target.elements.option.value)
    e.target.elements.option.value = ''
    renderIndecisionApp()
}

let onRemoveAll = () => {
    app.options = []
    renderIndecisionApp()
}

let onHandlePickOne = () => {
    let randomIndex = Math.floor(Math.random() * app.options.length)
    alert(app.options[randomIndex])
}

let renderIndecisionApp = () => {

    var template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtittle && <p>{app.subtittle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <button onClick={onHandlePickOne}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {
                    app.options.map(option => <li key={option}>{option}</li>)
                }
            </ol>
            <form onSubmit={onSubmitForm}>
                <input type='text' name='option'/>
                <button>Add option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);

}

renderIndecisionApp()