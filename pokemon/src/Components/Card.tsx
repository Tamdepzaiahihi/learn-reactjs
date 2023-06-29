import React from "react";

interface CardProps {
  pokemon: any[];
  loading: boolean;
  infoPokemon: (item: any) => void;
}

const Card: React.FC<CardProps> = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
              <h2>{item.id}</h2>
              <img src={item.sprites.front_default} alt="" />
              <h2>{item.name}</h2>
            </div>
          );
        })
      )}
    </>
  );
};

export default Card;
