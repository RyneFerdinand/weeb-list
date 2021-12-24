import "./CharacterCard.css"

function CharacterCard(props){

    let getJapaneseVA = (voiceActors) => {
        for (let i = 0; i < voiceActors.length; i++) {
            const va = voiceActors[i];
            if(va.language === "Japanese"){
                return va;
            }
        }
        return voiceActors[0];
    }

    return(
        <div className="d-flex character-card">
            <img src={props.character.image_url} alt="" />
            <div className="d-flex flex-column justify-content-between character-card__text">
                <div className="character-info">
                    <h5>{props.character.name}</h5>
                    <p>{props.character.role}</p>
                </div>
                <h5 className="text--blue">{getJapaneseVA(props.character.voice_actors).name}</h5>
            </div>
                <img src={getJapaneseVA(props.character.voice_actors).image_url} alt="" />
        </div>

    )
}

export default CharacterCard