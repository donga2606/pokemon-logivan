import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {pokemon.map((item) => {
        return (
          <CardWrapper item={item} infoPokemon={infoPokemon} key={item?.name} />
        );
      })}
    </>
  );
};
const CardWrapper = ({ item, infoPokemon }) => {
  const [data, setData] = useState({});
  const callApi = async () => {
    const result = await axios.get(item.url);
    console.log({ result });
    setData(result.data);
  };
  useEffect(() => {
    callApi();
  }, []);
  return (
    <>
      <div className="card" key={item.id} onClick={() => infoPokemon(data)}>
        {data?.name && <h2>{data?.name}</h2>}
        {data?.sprites?.front_default && (
          <img src={data.sprites.front_default} alt="" />
        )}
      </div>
    </>
  );
};

export default Card;
