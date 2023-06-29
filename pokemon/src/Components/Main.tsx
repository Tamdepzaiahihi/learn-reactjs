import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  // Add other properties of a Pokemon here
}

const Main = (): JSX.Element => {
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [pokeDex, setPokeDex] = useState<string | undefined>(undefined);

  const pokeFun = async (): Promise<void> => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res: { url: string }[]): Promise<void> => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="left-content">
          <Card pokemon={pokeData} loading={loading} infoPokemon={(poke) => setPokeDex(poke)} />

          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};

export default Main;
