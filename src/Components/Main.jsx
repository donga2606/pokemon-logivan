import React from "react";
import Card from "./Card";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const itemsPerPage = 10;

const Main = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [pokeData, setPokeData] = useState([]);
//   const [narrowedData, setNarrowedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokeDex, setPokeDex] = useState();
  const [currentPage, setCurrentPage] = useState(params?.get("page") || 1);
  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };
  const pokemonUrl = (page) => {
    const offset = (page - 1) * itemsPerPage;
    return `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`;
  };
//   const currentData = narrowedData.slice(
//     (currentPage - 1) * itemsPerPage,
//     (currentPage - 1) * itemsPerPage + itemsPerPage
//   );
  const pokeFun = async () => {
    setLoading(true);
    setPokeData([]);
    const res = await axios.get(pokemonUrl(currentPage));
    setPokeData(res.data.results);
    // getPokemon(res.data.results);
    setLoading(false);
  };
  //   const getPokemon = async (res) => {
  //     res.map(async (item) => {
  //       const result = await axios.get(item.url);
  //       setPokeData((state) => {
  //         state = [...state, result.data];
  //         state.sort((a, b) => (a.id > b.id ? 1 : -1));
  //         return state;
  //       });
  //     });
  //   };

  const onHandleSearch = (e) => {
    const searchValue = e.target.value;
    const filteredData = pokeData.filter((item) =>
      item.name.includes(searchValue)
    );
    // setNarrowedData(filteredData);
    setCurrentPage(1);
  };
  useEffect(() => {
    pokeFun();
  }, [currentPage]);
//   useEffect(() => {
//     setNarrowedData(pokeData);
//   }, [pokeData]);
  return (
    <>
      <div className="container">
        <div className="left-content">
          <Pokeinfo data={pokeDex} />
        </div>
        <div className="right-container">
          {/* <div className="search">
            <input onChange={onHandleSearch}></input>
          </div> */}
          <div className="card-wrapper">
            <Card
              pokemon={pokeData}
              loading={loading}
              infoPokemon={(poke) => setPokeDex(poke)}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            changeCurrentPage={changeCurrentPage}
            theme="bottom-border"
          />
        </div>
      </div>
    </>
  );
};
export default Main;
