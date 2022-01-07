import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import axios from "axios";
import SearchQueryCard from "../search-query-card/SearchQueryCard";
import OutsideClick from "./OutsideClick";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState(() => []);
  const [wordEntered, setWordEntered] = useState(() => "");
  const searchRef = useRef(null);
  const outsideClickRef = OutsideClick(searchRef);
  const queryHistory = useHistory();

  const getAnime = async () => {
    if (wordEntered !== "") {
      let query = wordEntered;
      let API_URL = "http://localhost:8080/anime/searchQuery?q=" + query;
      try {
        let anime;
        setTimeout(async () => {
          anime = await axios.get(API_URL);
          console.log(anime.data);
          setFilteredData(anime.data);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if(wordEntered.length > 2){
      getAnime();
    }
  }, [wordEntered]);

  const handleFilter = (event) => {
    try {
      clearTimeout();
    } catch (error) {
      console.log("cancelled");
    }
    const searchWord = event.target.value;
    if (searchWord === "") {
      setFilteredData([]);
    }

    setWordEntered(searchWord);
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const searchQuery = (e) => {
    setWordEntered("");
    setFilteredData([]);
    e.preventDefault();
    if (wordEntered.length > 2)
      queryHistory.push(`/anime?q=${encodeURI(wordEntered)}`);
  };

  console.log(filteredData);
  return (
    <div ref={searchRef} className="search">
      <div className="searchInput">
        <form action="" onSubmit={searchQuery}>
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
        </form>
        <div className="searchIcon">
          {wordEntered === "" ? (
            <p>
              <FontAwesomeIcon
                icon={["fas", "search"]}
                style={{ color: "#44B9DE" }}
              />
            </p>
          ) : (
            <p id="clearBtn" onClick={clearInput}>
              <FontAwesomeIcon
                icon={["fas", "times"]}
                style={{ color: "#44B9DE" }}
              />
            </p>
          )}
        </div>
      </div>
      {wordEntered.length !== 0 && filteredData.length !== 0 ? (
        <div
          className="dataResult"
          style={{ display: outsideClickRef ? "none" : "fixed" }}
        >
          {filteredData?.map((data) => {
            return (
              <Link
                to={`/anime/${data.node.id}`}
                onClick={() => setWordEntered("")}
                style={{ textDecoration: "none" }}
              >
                <SearchQueryCard data={data.node} />
              </Link>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchBar;
