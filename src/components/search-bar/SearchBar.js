import React, {useState} from 'react'
import './SearchBar.css'


function SearchBar({ placeholder, data }) {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const handleFilter = (event) =>{
        const searchWord = event.target.value
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.Title.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === ""){
            setFilteredData([]);
        }
        else{

            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");

    }

    return (
        <div className="search">
            <div className="searchInput">
                <input type="text" placeholder={placeholder} value={wordEntered} onChange = {handleFilter}/>
                <div className="searchIcon">
                    {filteredData.length === 0? <p><i class="far fa-search"></i></p>  : <p id="clearBtn" onClick={clearInput}><i class="fal fa-times"></i></p>}
                </div>
            </div>
            {filteredData.length !=0 &&(
            <div className="dataResult">
                {filteredData.slice(0,10).map((value, key) =>{
                    return <a className ="dataItem" href="https://wikipedia.com" target="_blank">
                        <p> {value.Title} </p>
                        </a>
                })}
            </div>
)}
        </div>
    )
}

export default SearchBar
