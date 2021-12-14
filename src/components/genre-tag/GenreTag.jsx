import './GenreTag.css'

function GenreTag(props) {
    return (
        <p className="d-flex align-items-center genre-tag">{props.tag}</p>
    )
}

export default GenreTag