import './ToggleButton.css'

function ToggleButton(props){

    return (
        <button value={props.value.genreID} className={props.value.selected ? "toggle-btn btn-selected" : "toggle-btn"} onClick={() => props.buttonState(props.value)}>{props.value.genreName}</button>
    )
}

export default ToggleButton