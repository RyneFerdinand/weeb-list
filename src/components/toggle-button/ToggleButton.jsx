import './ToggleButton.css'

function ToggleButton(props){

    function buttonSelect(){
        props.selected = !props.selected;
    }

    return (
        <button value={props.value} className={props.selected ? "toggle-btn btn-selected" : "toggle-btn"} onClick={}>{props.value}</button>
    )
}

export default ToggleButton