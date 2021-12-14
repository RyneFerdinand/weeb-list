import "./CharacterCard.css"

function CharacterCard(props){
    return(
        <div className="d-flex character-card">
            <img src={props.character.charImage} alt="" />
            <div className="d-flex flex-column justify-content-between character-card__text">
                <div className="character-info">
                    <h5>{props.character.charName}</h5>
                    <p>{props.character.role}</p>
                </div>
                <h5 className="text--blue">{props.character.vaName}</h5>
            </div>
                <img src={props.character.vaImage} alt="" />
        </div>

    )
}

export default CharacterCard